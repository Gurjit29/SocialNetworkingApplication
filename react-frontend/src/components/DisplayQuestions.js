import React, { Component } from 'react';

import { getAllQuestions } from '../authentication/auth';
import { Redirect } from 'react-router-dom';

class DisplayQuestions extends Component {

    constructor() {
        super();
        this.state = {
            questions: []
        };
    }

    componentDidMount() {

        getAllQuestions()
            .then((data) => {
                this.setState({ questions: data.questions })
            });
    }

    questionClickListener = (question) => (event) => {

        event.preventDefault();


        console.log(question);
        console.log(question.title);
        
        this.props.history.push(`/question/${question.postedBy._id}`);

    }

    render() {

        const { questions } = this.state;


        return (
            <React.Fragment>
                <ul className="container" style={{ 'listStyle': 'none' }}>
                    {questions.map((question, index) => {
                        return <li className="container" key={index} onClick={this.questionClickListener(question)} style={{ 'border': '2px solid black', 'margin': '10px', 'padding': '10px', 'borderRadius': '8px' }}>

                            <h3>{question.title + "   "}
                                <button type="button" className="btn btn-dark"><b>{"Posted By: " + question.postedBy.name}</b></button>
                            </h3>
                            <p>{question.body}</p>
                            <ul className="list-group list-group-horizontal" style={{ 'listStyle': 'none' }}>
                                {question.hashtags.map((hashtag, i) => {

                                    return <li key={i} style={{ 'marginRight': '5px' }} >
                                        <button type="button" className="btn btn-info"><b># {hashtag}</b></button>
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