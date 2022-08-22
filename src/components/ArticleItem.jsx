import React from 'react'
import PropTypes from 'prop-types';
import { Clock, Pencil, Trash } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import Moment from 'moment';
import HttpHandler from '../globals/HttpHandler';
import { useDispatch } from 'react-redux';
import { delBlogItem } from '../redux/actions/BlogActions';


export default function ArticleItem({ id, title, content, timestamp }) {

  const date        = new Date(timestamp);
  const {http}      = HttpHandler();
  const dispatch    = useDispatch();

  const onDelete = async (id) => {
    if (id!=="" && window.confirm("Are you sure you want to delete this item?")) {
      const response = await http.get(`deleteBlog/${id}`).catch((err)=>{
        // console.log(err);
      });
      if(response.data.status===true){
        dispatch(delBlogItem(id));
      }
    }
  }

  return (
    <div className="row">
      <div className="col-md-12">
        <h3><Link to={'/article/' + id}>{title.toUpperCase()}</Link></h3>
        <small><Clock /> {Moment(date).format('MMM DD, YYYY') + " AT " + Moment(date).format('hh:mm:ss A')}</small>
        <p className="my-2">{content.substr(0, 180) + "..."}</p>
        <Link className='btn btn-success btn-sm' to={`/editPost/${id}`}><small><Pencil /></small></Link>
        <Link className='btn btn-danger  btn-sm mx-2' to="#" onClick={() => (onDelete(id))}><small><Trash /></small></Link>
        <hr style={{ color: "#000" }} />
      </div>
    </div>
  )
}

ArticleItem.propTypes =
{
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.any.isRequired,
  timestamp: PropTypes.any.isRequired,
}
