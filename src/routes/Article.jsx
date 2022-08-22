import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HttpHandler from '../globals/HttpHandler';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogItem, resetBlogItem } from '../redux/actions/BlogActions';
import { setError, resetError } from '../redux/actions/ValidationActions';

export default function Home() {
    const article       = useSelector((state) => state.Article);
    const { id }        = useParams();
    const { http }      = HttpHandler();
    const dispatch      = useDispatch();
    const error         = useSelector((state) => state.Validation);

    const fetchBlogDetail = async () => {
        const response = await http.get(`/readBlog/${id}`).catch((err) => {
            if(err.response.status===404){
                dispatch(setError("Requested resource not found!"));
            } else {
                dispatch(setError(err.code+": "+err.message));
            }
            
        });
        dispatch(getBlogItem(response.data.record));
    }

    useEffect(() => {
        if (id && id !== "") fetchBlogDetail();
        return () => {
            dispatch(resetBlogItem());
            dispatch(resetError());
        }
    }, [id]);

    return (
        <>
            {error && (<div className='alert alert-danger my-2'>{error}</div>)}
            {
                article.title && 
                (
                    <>
                        <div className='navbar-light bg-light px-5 py-5'>
                            <h1>{article.title}</h1>
                            <p>{article.content}</p>
                        </div>
                        <div className='navbar-light bg-light my-5 px-5 py-5'>
                            <h3>Submit Comment</h3>
                            <fieldset>
                                <div className='form-group'>
                                    <label className='my-2'>Your Name</label>
                                    <input type="text" placeholder="Name" className="form-control my-2" />
                                </div>
                                <div className='form-group'>
                                    <label className='my-2'>Comment</label>
                                    <textarea type="text" placeholder="Comment" className="form-control my-2" rows="3" />
                                </div>
                            </fieldset>
                        </div>
                    </>
                )
            }
            
        </>
    )
}
