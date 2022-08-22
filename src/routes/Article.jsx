import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HttpHandler from '../globals/HttpHandler';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogItem, resetBlogItem } from '../redux/actions/BlogActions';
import { setError, resetError } from '../redux/actions/ValidationActions';
import CommentForm from '../components/CommentForm';

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
                        <CommentForm blog_id={id} />
                    </>
                )
            }
            
        </>
    )
}
