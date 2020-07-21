import React, { Component } from 'react';

import {getAllQuestions} from '../authentication/auth';

class DisplayOneQuestion extends Component{

    constructor(){
        super();
        this.state={
            question:'',
            user:'',
            hashtags:[]
        }
    }

    componentDidMount(){

        getAllQuestions()
        .then((data) => {

             //how to query URL String reference =>  https://stackoverflow.com/questions/35352638/react-how-to-get-parameter-value-from-query-string


       var questionId=this.props.match.params.questionId;

       let questionsArray=data.questions;
      //finding an object with given value in JavaScript object arr => https://stackoverflow.com/questions/12462318/find-a-value-in-an-array-of-objects-in-javascript
       
          let desiredQuestion= questionsArray.find((question) => {
                return question._id===questionId;
            });

           
            this.setState({question:desiredQuestion,hashtags:desiredQuestion.hashtags,user:desiredQuestion.postedBy});

        });
       
    }


    render() {

       const {question,user,hashtags}=this.state;
       


       return <div className="container">
       <div  style={{ 'border': '2px solid black', 'margin': '10px', 'padding': '10px', 'borderRadius': '8px' }}>
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
   </div>
       
    }

}

export default DisplayOneQuestion;