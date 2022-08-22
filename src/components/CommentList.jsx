import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { setArticleComments, resetArticleComments } from '../redux/actions/BlogActions';
import { setError, resetError } from '../redux/actions/ValidationActions';
import { useDispatch, useSelector } from 'react-redux';
import HttpHandler from '../globals/HttpHandler';
import CommentItem from './CommentItem';


// sort of helper (three level comments)
const recurveComment = (level, node) => {
    level++;
    var p_level = level;
    level++;
    const nestedComments = (node.childNodes || []).map(node => {
        // return <CommentItem lvl={level} key={node.id} comment_id={node.id} user_name={node.user_name} content={node.content} timestamp={node.timestamp} replyable={false} />
        var p2_level = level;
        level++;
        const nestedComments_2 = (node.childNodes || []).map(n2 => {
            return <CommentItem lvl={level} key={n2.id} comment_id={n2.id} user_name={n2.user_name} content={n2.content} timestamp={n2.timestamp} replyable={false} />
        });
        return (
            <>
                <CommentItem lvl={p2_level} key={node.id} comment_id={node.id} user_name={node.user_name} content={node.content} timestamp={node.timestamp} replyable={true} />
                {nestedComments_2}
            </>
        )
    });
    return (
        <>
            <CommentItem lvl={p_level} key={node.id} comment_id={node.id} user_name={node.user_name} content={node.content} timestamp={node.timestamp} replyable={true} />
            {nestedComments}
        </>
    )
}

export default function CommentList({ blog_id }) {
    const { CommentList } = useSelector(state => state);
    const { http } = HttpHandler();
    const dispatch = useDispatch();

    const fetchBlogComments = async () => {
        const response = await http.get(`readComments/${blog_id}`).catch((err) => {
            dispatch(setError(err.code + " " + err.message));
        });
        if (response.data.records != null) {
            dispatch(setArticleComments(response.data.records));
        }
    }

    useEffect(() => {
        fetchBlogComments();
        return () => {
            dispatch(resetError());
            dispatch(resetArticleComments())
        }
    }, []);

    

    return (
        <div className='navbar-light bg-light my-5 px-5 py-5'>
            <h3 className='my-3'>Discussion ({CommentList.length})</h3>
            {Object.keys(CommentList).map((key, index) => {
                return recurveComment(0, CommentList[key])
            })}
        </div>
    )
}

CommentList.propTypes =
{
    blog_id: PropTypes.any.isRequired
}