import React from 'react'
import PropTypes from 'prop-types';

export default function ArticleItem({title, content, timestamp}) {
  return (
    <>
        <h3>{title.toUpperCase()}</h3>
        <small>Posted on: {timestamp}</small>
        <p>{content.substr(1,100)+"..."}</p>
        <hr style={{color:"#000"}} />
    </>
  )
}

ArticleItem.propTypes =
{
    title       : PropTypes.string.isRequired,
    content     : PropTypes.any.isRequired,
    timestamp   : PropTypes.any.isRequired,
}
