import React,{Component} from 'react';

import {getAllQuestions} from '../authentication/auth';

class DisplayQuestions extends Component{

    constructor(){
        super();
        this.state = {
            questions: [],
            questionsLoaded: false
        };
    }

    componentDidMount() {

        getAllQuestions()
        .then((data) => { 

            let questions=JSON.stringify(data.questions);
            let questionsArr=JSON.parse(questions);
            //console.log(questionsArr.length);
            this.setState({questions: data.questions,questionsLoaded:true})
            //console.log(this.state.questions)
           // console.log("state within API call ==> ",this.state.questionsLoaded);

            
        });
    }

    render() {

        const {questions,questionsLoaded} = this.state;
    //this.loadQuestions() ;
    console.log(questionsLoaded);
    console.log(questions);

       return (
           <div>
           <h2>Questions:</h2>
           {questions.map((question) => {
               return <p>{question.title}</p>
           })

           }
           
           </div>
       )

    }


}

export default DisplayQuestions;