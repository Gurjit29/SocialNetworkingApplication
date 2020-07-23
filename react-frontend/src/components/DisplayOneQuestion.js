import React, { Component } from 'react';

import { getAllQuestions ,isLoggedIn} from '../authentication/auth';


class DisplayOneQuestion extends Component {

    constructor() {
        super();
        this.state = {
            question: '',
            user: '',
            hashtags: [],
            comment : '',
            comments : []
        }
    }

    displayData = () => {
        getAllQuestions()
            .then((data) => {

                //how to query URL String reference =>  https://stackoverflow.com/questions/35352638/react-how-to-get-parameter-value-from-query-string


                var questionId = this.props.match.params.questionId;

                let questionsArray = data.questions;
                //finding an object with given value in JavaScript object arr => https://stackoverflow.com/questions/12462318/find-a-value-in-an-array-of-objects-in-javascript

                let desiredQuestion = questionsArray.find((question) => {
                    return question._id === questionId;
                });

                

                var commentsArr = desiredQuestion.commentsBy.map(function (x, i) { 
                    //return [x, ar2[i]] 
                    return {
                        "authorId":x._id,
                        "authorName":x.name,
                        "comment":desiredQuestion.comments[i]
                    }
                });

                console.log("New Comments Arr ",commentsArr)

                this.setState({ 
                    question: desiredQuestion, 
                    hashtags: desiredQuestion.hashtags, 
                    user: desiredQuestion.postedBy ,
                    comments : commentsArr.reverse()});

            });
    }

    componentDidMount() {

        this.displayData();

    }

    displayQuestion = () => {

        const { question, user, hashtags } = this.state;
        return (<div >
            <div style={{ 'border': '2px solid black', 'margin': '10px', 'padding': '10px', 'borderRadius': '8px' }}>
                <h3>{question.title + "   "}
                    <button type="button" className="btn btn-dark"><b>{"Posted By: " + user.name}</b></button>
                </h3>
                <p>{question.body}</p>
                <ul className="list-group list-group-horizontal" style={{ 'listStyle': 'none' }}>
                    {hashtags.map((hashtag, i) => {

                        return <li key={i} style={{ 'marginRight': '5px' }} >
                            <button type="button" className="btn btn-info"><b># {hashtag}</b></button>
                        </li>
                    })}
                </ul>
            </div>
        </div>)
    }

    
    postComment = (e) => {

        e.preventDefault();
       // console.log("onClick = > ",this.state.comment);

        if(this.state.comment) {

            
        const userComment = {
            comments : this.state.comment
        }

        console.log(JSON.stringify(userComment));

        fetch(`http://localhost:8080/comment/on/${this.state.question._id}/by/${isLoggedIn().user._id}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${isLoggedIn().token}`
            },
            body: JSON.stringify(userComment)
        })
            .then(response => {
                return response.json();
            })
            .catch(err => console.log(err))
            .then((data) => {


                if (data.error) {
                    console.log(data.error)
                }
                else {

                    console.log(data.question);

                    this.setState({comment:''})

                    this.displayData();


                }
            });
        }
       
    }

    userComment = (e) => {

        e.preventDefault();
        this.setState({comment:e.target.value});
        
    }
    

    commentTextBox = (name) => {

        return <div className="form-group">
            <label htmlFor="comment">Comment</label>
            <input type="text" className="form-control" id="comment"  onChange={this.userComment} value={this.state.comment}
            /><br />
            <button className="btn btn-dark" onClick={this.postComment}>Post Comment</button>
        </div>
    }


    render() {
        
        console.log("STate ==> ",this.state.comments);

        return <div className="container">
            {this.displayQuestion()}
            {this.commentTextBox()}
            {<h2>Comments</h2>}
            {/* {JSON.stringify(this.state.comments[0])}  */}
            {/* {JSON.parse(this.state.comments[0]).authorName} */}
            {this.state.comments.map((comment) => {
       return <div class="card">
       <div class="card-body">
        <p>{comment.comment}</p>
        <button className="btn btn-dark"><b>Posted By {comment.authorName}</b></button>
       </div>
     </div>
    }) 
}
        </div>

    }

}

export default DisplayOneQuestion;