import React, { Component } from 'react';


import { isLoggedIn, getAllQuestions } from '../authentication/auth';

class Question extends Component {

    constructor() {
        super();

        this.state = {
            title: "",
            body: "",
            hashtags: [],
            errors: "",
            questionPosted: false,
            hashtagMatches: []
        }
    }


    //Event Listener for input changes
    inputChangeListener = (name) => (event) => {
      
        //to make errors disappear when user is typing
        this.setState({ error: "" })



        if (name !== "hashtags") {
            this.setState({ [name.toString()]: event.target.value });
        }
        else {

           
            const inputValue = event.target.value;

            if(inputValue) {

            let hashtags = [];

            //Load questions from backend Node API to get available hashtags
            getAllQuestions()
                .then((data) => {

                    let arr = data.questions;
                    arr.map((element) => {
                        element.hashtags.map((tag) => {
                            //only Load unique hashtags & ignore duplicates
                            if (hashtags.indexOf(tag) === -1)
                                hashtags.push(tag)
                        })
                    });

                    this.setState({ hashtagMatches: [] });

                    hashtags.map((hashtag) => {

                        //Iterate over each hashtag in array to find if there is match
                        
                        const match=hashtag.substring(0, inputValue.length) === inputValue.toLowerCase()

                        if (match) {
                            let hashtagMatches = [...this.state.hashtagMatches];

                            if(!this.state.hashtags.includes(hashtag))
                            hashtagMatches.push(hashtag);
                        
                            this.setState({ hashtagMatches });
                        }
                    })
                });
        
            }
        }
    }

    pressEnterListener = (event) => {

        if (event.which === 13) {
            this.setState({ hashtagMatches: [] });

            if (event.target.value) {

                var hashtags = [...this.state.hashtags];

                if (!this.state.hashtags.includes(event.target.value)) {
                    hashtags.push(event.target.value.toLowerCase());
                }
                this.setState({ hashtags });
                document.getElementById("hashtags").value = "";

            }
        }
    }

    listItemClickListener = (item) => (event) => {

        event.preventDefault();

        var hashtags = [...this.state.hashtags];

        hashtags.push(item);
        this.setState({ hashtags: hashtags, hashtagMatches: [] });
        document.getElementById("hashtags").value = "";
    }

    componentDidMount() {
        document.getElementById("hashtags").addEventListener('keypress', this.pressEnterListener);

    }

    //Generic reusable template for form fields
    formElement = (name) => {

        return (<div className="form-group">
            {/* convert name to Name & email to Email */}
            <label htmlFor={name}>{name.charAt(0).toUpperCase() + name.slice(1)}</label>
            <input type={name} className="form-control" id={name}
                onChange={this.inputChangeListener(name)}
            />
        </div>)

    }

    //Handle click on submit button and fetch data from Node API
    clickSubmit = (event) => {

        event.preventDefault();

        const { title, body, hashtags } = this.state;

        const question = {
            title: title,
            body: body,
            hashtags: hashtags
        };


        fetch(`http://localhost:8080/question/new/${isLoggedIn().user._id}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${isLoggedIn().token}`
            },
            body: JSON.stringify(question)
        })
            .then(response => {
                return response.json();
            })
            .catch(err => console.log(err))
            .then((data) => {


                if (data.error) {
                    this.setState({ error: data.error, questionPosted: false });
                }
                else {

                    this.setState({
                        title: "",
                        body: "",
                        hashtags: [],
                        errors: "",
                        questionPosted: true
                    });

                    this.clearForm();


                }
            });

    }


    clearForm = () => {
        document.getElementById("question-form").reset();
    }


    //Delete hashtag when user clicks X icon
    deleteHashtag = (index) => (event) => {

        event.preventDefault();

        let hashtags = [...this.state.hashtags];

        hashtags.splice(index, 1);

        this.setState({ hashtags });

    }

    render() {

        const { error, questionPosted, hashtags, hashtagMatches } = this.state;

        return (
            <div className="container" style={{ 'width': '60%', 'marginTop': '20px' }}>
                <h2 className="btn-dark" style={{ 'padding': '10px', 'borderRadius': '10px', 'textAlign': 'center' }}>Post Question</h2><br />
                {error && <div className="alert alert-danger" role="alert">
                    {error}
                </div>}
                {questionPosted && <div className="alert alert-success" role="alert">
                    Question Posted!
                </div>}

                <form id="question-form">
                    {this.formElement("title")}
                    {this.formElement("body")}
                    {this.formElement("hashtags")}

                    <ul className="list-group">
                        {hashtagMatches.map((matches, index) => {
                            return <li className="list-group-item" key={index} onClick={this.listItemClickListener(matches.toString())}>{matches}</li>
                        })}
                    </ul>

                </form>

                {hashtags.map((hashtag, index) => {
                    return (<div style={{ 'display': 'inline' }} key={Math.random()}>
                        <button type="button" className="btn btn-dark" style={{ 'marginBottom': '10px', 'marginRight': '10px' }}>{hashtag}
                            <span type="button" className="close" aria-label="Close">
                            </span>
                            <span aria-hidden="true" style={{ 'padding': '10px' }} onClick={this.deleteHashtag(index.toString())}>&times;</span>
                        </button>
                    </div>)

                })}

                <br /><br />
                {error && !questionPosted ?
                    (
                        <button type="button"
                            className="btn btn-danger" onClick={this.clickSubmit}>Submit</button>
                    ) :
                    (
                        <button type="button"
                            className="btn btn-dark" onClick={this.clickSubmit}>Submit</button>
                    )}

            </div>
        )
    }
}



export default Question;
