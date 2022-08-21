import React from 'react'
import PropTypes from 'prop-types';
import { Clock, Pencil, Trash } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';


export default function ArticleItem({title, content, timestamp}) {
  return (
    <div className="row">
        <div className="col-md-12">
            <h3>{title.toUpperCase()}</h3>
            <small><Clock /> {timestamp}</small>
            <p className="my-2">{content.substr(0,180)+"..."}</p>
            <Link className='btn btn-success btn-sm' to="/editPost"><small><Pencil /></small></Link>
            <Link className='btn btn-danger  btn-sm mx-2' to="/editPost"><small><Trash /></small></Link>
            <hr style={{color:"#000"}} />
        </div>
    </div>
  )
}

ArticleItem.propTypes =
{
    title       : PropTypes.string.isRequired,
    content     : PropTypes.any.isRequired,
    timestamp   : PropTypes.any.isRequired,
}
