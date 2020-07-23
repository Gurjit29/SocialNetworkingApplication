import React, { Component } from 'react';

import {isLoggedIn} from '../authentication/auth';

class DisplayComments extends Component {

    editComment = () => {

        return <div class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Modal title</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p>Modal body text goes here.</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary">Save changes</button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    }

    render() {
    return (this.props.comments.map((comment,index) => {
        return <div key={index} className="card" style={{ 'marginBottom': '20px', 'border': '2px solid black', 'width': '98%', 'marginLeft': 'auto', 'marginRight': 'auto' }}>
            <div className="card-body">
                <button className="btn btn-dark"><b>Posted By: {comment.authorName}</b></button>
                <p id={index} style={{ 'marginTop': '5px', 'paddingLeft': '5px' }}>{comment.comment}</p>
                {/* {
                    isLoggedIn().user._id === comment.authorId 
                    &&
                    <React.Fragment>
                    <button type="button" className="btn btn-primary" style={{'marginRight':'5px'}} data-toggle="modal" data-target="#exampleModal">Edit</button>
                    <button type="button" className="btn btn-danger">Delete</button>
                    </React.Fragment>
                } */}
           
            </div>
        </div>
    })
    )
}   
}

export default DisplayComments;