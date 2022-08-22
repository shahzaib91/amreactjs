import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setError, resetError } from '../redux/actions/ValidationActions';
import HttpHandler from '../globals/HttpHandler';
import { useNavigate } from 'react-router-dom';


export default function CreateArticle() 
{
    const error                     = useSelector((state) => state.Validation);
    const [title, setTitle]         = useState('');
    const [content, setContent]     = useState('');
    const dispatch                  = useDispatch();
    const {http}                    = HttpHandler();
    const navigate                  = useNavigate();

    const submitForm = async () => {
        if(!title){
            dispatch(setError('Please enter article title!'));
        } else if(!content){
            dispatch(setError('Please enter article content!'));
        } else {
            const response = await http.post('/createBlog',{title:title, content:content}).catch((err)=>{
                dispatch(setError(err.code+' '+err.message));
            });
            dispatch(resetError());
            if(response.data.status){
                navigate('/');
            }
        }
    }

    useEffect(() => {
        dispatch(resetError());
    },[]);

    return (
        <>
            <div className='navbar-light bg-light my-5 px-5 py-5'>
                <h3>New Article</h3>
                <fieldset>
                    {error && (<div className='alert alert-danger  my-2'>{error}</div>)}
                    <div className='form-group'>
                        <label className='my-2'>Title</label>
                        <input type="text" placeholder="Some text here..." className="form-control my-2" onChange={e=> setTitle(e.target.value)} />
                    </div>
                    <div className='form-group'>
                        <label className='my-2'>Content</label>
                        <textarea type="text" placeholder="Some text here..." className="form-control my-2" rows="5" onChange={e=> setContent(e.target.value)} />
                    </div>
                    <div className='form-group' style={{textAlign:"right"}}>
                        <button type='button' onClick={()=>{submitForm()}} className='btn btn-success btn-lg my-2'>Create Article</button>
                    </div>
                </fieldset>
            </div>
        </>
    )
}
