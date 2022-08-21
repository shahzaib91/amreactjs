import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBlogList } from "../redux/actions/BlogActions";
import ArticleItem from '../components/ArticleItem';
import HttpHandler from '../globals/HttpHandler';
import { ExclamationCircleFill } from 'react-bootstrap-icons';

export default function Home() 
{
    const {BlogData} = useSelector((state)=>state);
    const {http, baseUrl} = HttpHandler();
    const dispatch = useDispatch()

    const fetcBlogList = async () => {
        const response = await http.get(baseUrl+"readBlogs").catch((err)=>{
            console.log(err);
            alert("Failed! "+err.code+" "+err.message);
        });
        if(response.data.records!=null)
        {
            dispatch(setBlogList(response.data.records));
        }
    }

    useEffect(() => {
        fetcBlogList();
    },[]);

    return (
        <>
            {
                BlogData.BlogList.length>0 ? 
                BlogData.BlogList.map( (item, i) => ( <ArticleItem key={i} title={item.title} content={item.content} timestamp={item.timestamp} /> )) 
                : (<div className='alert alert-info'><ExclamationCircleFill /> No articles to display!</div>)
            }
        </>
    )
}
