import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { setError, resetError } from '../redux/actions/ValidationActions';
import HttpHandler from '../globals/HttpHandler';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CommentList from './CommentList';


export default function CommentForm({ blog_id }) {
    const dispatch  = useDispatch();
    const { http }  = HttpHandler();
    const initState =
    {
        user_name: "",
        content: "",
        belongs_to: blog_id,
    }
    const [comment, setComment] = useState(initState);
    const error = useSelector((state) => state.Validation);
    const navigate = useNavigate();

    const onInputChange = e => {
        setComment({ ...comment, [e.target.name]: e.target.value });
    }

    const submitForm = async () => {
        if (!comment.user_name) {
            dispatch(setError('Please enter your name!'));
        } else if (!comment.content) {
            dispatch(setError('Please enter your message!'));
        } else {
            const response = await http.post('/createComment', { user_name: comment.user_name, content: comment.content, belongs_to: comment.belongs_to }).catch((err) => {
                dispatch(setError(err.code + ' ' + err.message));
            });
            dispatch(resetError());
            if (response.data.status) {
                setComment(initState);
                window.location.reload(0);
            }
        }
    }

    return (
        <>
            <div className='navbar-light bg-light my-5 px-5 py-5'>
                <h3>Submit Comment</h3>
                <fieldset>
                    {error && (<div className='alert alert-danger my-2'>{error}</div>)}
                    <div className='form-group'>
                        <label className='my-2'>Your Name</label>
                        <input type="text" placeholder="Name" className="form-control my-2" name="user_name" value={comment.user_name} onChange={(e) => onInputChange(e)} />
                    </div>
                    <div className='form-group'>
                        <label className='my-2'>Comment</label>
                        <textarea type="text" placeholder="Comment" className="form-control my-2" rows="3" value={comment.content} name="content" onChange={(e) => onInputChange(e)} />
                    </div>
                    <div className='form-group' style={{ textAlign: "right" }}>
                        <button type='button' onClick={() => { submitForm() }} className='btn btn-success btn-lg my-2'>Post</button>
                    </div>
                </fieldset>
            </div>
            <CommentList blog_id={blog_id} />
        </>
    )
}

CommentForm.propTypes =
{
    blog_id: PropTypes.any.isRequired
}