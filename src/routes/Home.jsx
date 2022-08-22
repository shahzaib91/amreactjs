import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBlogList } from "../redux/actions/BlogActions";
import { setError, resetError } from '../redux/actions/ValidationActions';
import ArticleItem from '../components/ArticleItem';
import HttpHandler from '../globals/HttpHandler';
import { ExclamationCircleFill } from 'react-bootstrap-icons';

export default function Home() 
{
    const {BlogList}        = useSelector((state)=>state.BlogData);
    const {http}            = HttpHandler();
    const dispatch          = useDispatch();
    const error             = useSelector((state) => state.Validation);

    const fetcBlogList = async () => {
        const response = await http.get("readBlogs").catch((err)=>{
            dispatch(setError(err.code+" "+err.message));
        });
        if(response.data.records!=null)
        {
            dispatch(setBlogList(response.data.records));
        }
    }

    useEffect(() => {
        dispatch(resetError());
        fetcBlogList();
    },[]);

    return (
        <>
            {error && (<div className='alert alert-danger my-2'>{error}</div>)}
            {
                BlogList.length>0 ? 
                BlogList.map( (item, i) => ( <ArticleItem key={i} id={item.id} title={item.title} content={item.content} timestamp={item.timestamp} /> )) 
                : (<div className='alert alert-info'><ExclamationCircleFill /> No articles to display!</div>)
            }
        </>
    )
}
