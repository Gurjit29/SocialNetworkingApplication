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
           <React.Fragment>
           <ul className="container" style={{'listStyle':'none'}}>
           {questions.map((question) => {
               return <li className="container" style={{'border':'2px solid black','margin':'10px','padding':'10px'}}>
                   <h3>{question.title}</h3>
                   <p>{question.body}</p>
                   <ul className="list-group list-group-horizontal" style={{'listStyle':'none'}}>
                      {question.hashtags.map((hashtag) => {

                        return <li style={{'marginRight':"5px"}} >
                            <button type="button" class="btn btn-primary"># {hashtag}</button>
                        </li>
                       })}
                   </ul>
               </li>
           })
           }
           </ul>
           
           </React.Fragment>
       )

    }


}

export default DisplayQuestions;