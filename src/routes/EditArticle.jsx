import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setError, resetError } from '../redux/actions/ValidationActions';
import HttpHandler from '../globals/HttpHandler';
import { useParams, useNavigate } from 'react-router-dom';

export default function CreateArticle() 
{
    const error                     = useSelector((state) => state.Validation);
    const [editBlog, seteditBlog]   = useState({
        title : "",
        content:"",
        timestamp:"",
        id:""
    });
    const {title, content}          = editBlog;
    const dispatch                  = useDispatch();
    const {http}                    = HttpHandler();
    const navigate                  = useNavigate();
    const { id }                    = useParams();

    const onInputChange = e =>{
        seteditBlog({...editBlog,[e.target.name]:e.target.value});
    }

    const submitForm = async () => {
        if(!title){
            dispatch(setError('Please enter article title!'));
        } else if(!content){
            dispatch(setError('Please enter article content!'));
        } else {
            const response = await http.post('/updateBlog',{title:title, content:content, id:id}).catch((err)=>{
                dispatch(setError(err.code+' '+err.message));
            });
            dispatch(resetError());
            if(response.data.status){
                navigate('/article/'+id);
            }
        }
    }

    const fetchBlogDetail = async () => {
        const response = await http.get(`/readBlog/${id}`).catch((err) => {
            navigate('/404');
        });
        seteditBlog(response.data.record);
    }

    useEffect(() => {
        if (id && id !== "") fetchBlogDetail();
        return () => {
            dispatch(resetError());
        }
    },[id]);
    
    return (
        <>
            <div className='navbar-light bg-light my-5 px-5 py-5'>
                <h3>Edit Article</h3>
                <fieldset>
                    {error && (<div className='alert alert-danger  my-2'>{error}</div>)}
                    <div className='form-group'>
                        <label className='my-2'>Title</label>
                        <input type="text" placeholder="Some text here..." name="title" className="form-control my-2" value={title} onChange={(e) =>onInputChange(e)} />
                    </div>
                    <div className='form-group'>
                        <label className='my-2'>Content</label>
                        <textarea type="text" placeholder="Some text here..." name="content" className="form-control my-2" rows="5" value={content} onChange={(e) =>onInputChange(e)} />
                    </div>
                    <div className='form-group' style={{textAlign:"right"}}>
                        <button type='button' onClick={()=>{submitForm()}} className='btn btn-success btn-lg my-2'>Update Article</button>
                    </div>
                </fieldset>
            </div>
        </>
    )
}
