import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Clock } from 'react-bootstrap-icons';
import Moment from 'moment';
import ProfilePic from '../noimg.png';
import {Link} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import HttpHandler from '../globals/HttpHandler';

export default function CommentItem({comment_id, user_name, content, timestamp, replyable, lvl }) {
    const date              = new Date(timestamp);
    const level             = (lvl > 1 ? lvl * 20 : lvl);
    const [reply,setReply]  = useState(false);
    const { id }            = useParams();
    const {http}            = HttpHandler();
    const initState         =
    {
        r_user_name         : "",
        r_content           : "",
        belongs_to          : id,
    }
    const [comment, setComment] = useState(initState);
    const onInputChange = e => {
        setComment({ ...comment, [e.target.name]: e.target.value });
    }

    const submitForm = async () => {
        if (!comment.r_user_name) {
            alert('Please enter your name!')
        } else if (!comment.r_content) {
            alert('Please enter your message!')
        } else {
            const response = await http.post('/createComment', { user_name: comment.r_user_name, content: comment.r_content, belongs_to: comment.belongs_to, parent:comment_id }).catch((err) => {
            });
            if (response.data.status) {
                window.location.reload(0);
            }
        }
    }

    const showReplyForm = (mbool) => {
        setReply(mbool);
    }

    return (
        <div className='row px-3 py-3 my-3' style={{ backgroundColor: "#fff", borderRadius: "15px", marginLeft:level+"px" }}>
            <div className='col-12 col-md-1'>
                <img src={ProfilePic} style={{ width: "100%" }} />
            </div>
            <div className='col-12 col-md-11'>
                <div className='row'>
                    <div className='col-12 col-md-12'>
                        <h3>{user_name}</h3>
                        <small><Clock /> {Moment(date).format('MMM DD, YYYY') + " AT " + Moment(date).format('hh:mm:ss A')}</small>
                    </div>
                    <div className='col-12 col-md-12'>
                        {content}
                    </div>
                    <div className='col-12 col-md-12'>
                        {replyable && !reply && ( <Link onClick={(e) => (showReplyForm(true))} to="#">Reply</Link> )}
                        {replyable && reply && ( 
                            <>
                            <div className='row my-5'>
                                <div className='col-12 col-md-5'>
                                    <input className='form-control' type="text" name="r_user_name" value={comment.r_user_name} onChange={(e) => onInputChange(e)} placeholder="Your Name" />
                                </div>
                                <div className='col-12 col-md-5'>
                                    <input className='form-control' type="text" name="r_content" value={comment.r_content} onChange={(e) => onInputChange(e)} placeholder="Your Reply" />
                                </div>
                                <div className='col-12 col-md-2'>
                                    <button type='button' onClick={(e) => (submitForm(false))} className='btn btn-info'>Reply</button>
                                </div>
                            </div>
                            <Link onClick={(e) => (showReplyForm(false))} to="#">Cancel</Link>
                            </>
                         )}
                    </div>
                </div>
            </div>
        </div>
    )
}

CommentItem.propTypes =
{
    comment_id      : PropTypes.number.isRequired,
    lvl             : PropTypes.number.isRequired,
    user_name       : PropTypes.any.isRequired,
    content         : PropTypes.any.isRequired,
    timestamp       : PropTypes.any.isRequired,
    replyable       : PropTypes.bool.isRequired
}
