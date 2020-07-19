import React, { Component } from 'react';


import { isLoggedIn } from '../authentication/auth';

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

        //storing data in state in array
        // https://stackoverflow.com/questions/44519850/how-to-save-data-in-an-array-inside-state-in-react-js/44520155#:~:text=First%20create%20a%20copy%20of,let%20todos%20%3D%20%5B...


        //to make errors disappear when user is typing
        this.setState({ error: "" })
      

        // if(name==="hashtags"){
        //     var hashtags =[...this.state.hashtags];

        //     hashtags.push(event.target.value);
        //     this.setState({hashtags})

        // }
        // else
        if (name !== "hashtags") {
            this.setState({ [name.toString()]: event.target.value });
        }
        else {
           
            let hashtags = ["node", "react", "express", "tech"];
            const inputValue = event.target.value;


            // https://www.geeksforgeeks.org/substring-check-in-javascript/#:~:text=Values%20using%20JavaScript%20%3F-,Substring%20check%20in%20JavaScript,This%20method%20is%20case%20sensitive.
            if (!event.target.value) {

                this.setState({ hashtagMatches: [] });

            } else {
                hashtags.map((hashtag) => {
                    // console.log("Hashtag => " + hashtag);
                    // console.log("InputVal => " + inputValue)
                    const match = hashtag.includes(inputValue, 0);
                    if (match) {
                        let hashtagMatches = [...this.state.hashtagMatches];

                        // for(var i=0;i<hashtagMatches.length;i++){
                        //     if(!(hashtagMatches[i].equals(hashtag))){
                            console.log("State ==> ",this.state.hashtags);
                            console.log("hashtag => ",hashtag);
                           if(!this.state.hashtags.includes(hashtag)) {
                                hashtagMatches.push(hashtag);
                            }
                                const uniqueArr = new Set(hashtagMatches);
                                hashtagMatches = [...uniqueArr];
                        this.setState({ hashtagMatches });
                            

                    }
                    // console.log(match);
                })

            }

        }
    }

    pressEnterListener = (event) => {

        if (event.which === 13) {
            this.setState({ hashtagMatches: [] });
            // console.log(event.target.value);
            if (event.target.value) {

                var hashtags = [...this.state.hashtags];

                console.log("state ==> ",hashtags);
                console.log("event.target.value ",event.target.value);
                if(!this.state.hashtags.includes(event.target.value)) {
                hashtags.push(event.target.value);
                }
                this.setState({ hashtags });
                document.getElementById("hashtags").value = "";
                 
            }
        }
    }

    listItemClickListener = (item) => (event) => {

        event.preventDefault();

        // console.log("You clicked=> " +  item);

        var hashtags = [...this.state.hashtags];

                hashtags.push(item);
                this.setState({ hashtags: hashtags,hashtagMatches: [] });
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



    render() {

        // const {name,email,password,
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
                        {hashtagMatches.map((matches,index) => {


                            return <li className="list-group-item" key={index} onClick={this.listItemClickListener(matches.toString())}>{matches}</li>

                        })}
                    </ul>

                </form>

                {hashtags.map((hashtag, index) => {
                    return (<div style={{ 'display': 'inline' }} key={Math.random()}>
                        <button type="button" className="btn btn-dark" style={{ 'marginBottom': '10px', 'marginRight': '10px' }}>{hashtag}
                            <span type="button" className="close" aria-label="Close">
                            </span>
                            <span aria-hidden="true" style={{ 'padding': '10px' }}>&times;</span>
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
