import React, { Component } from 'react';

const DisplayComments = (props) => {

    return  props.comments.map((comment) => {
       return <div>
        <h3>{comment.comment}</h3>
        <p>{comment.authorName}</p>
        </div>
    })
}

export default DisplayComments;