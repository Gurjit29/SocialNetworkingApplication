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
            questionPosted: false
        }
    }


    //Event Listener for input changes
    inputChangeListener = (name) => (event) => {

        //storing data in state in array
        // https://stackoverflow.com/questions/44519850/how-to-save-data-in-an-array-inside-state-in-react-js/44520155#:~:text=First%20create%20a%20copy%20of,let%20todos%20%3D%20%5B...


        //to make errors disappear when user is typing
        this.setState({ error: "" })

        if(name==="hashtags"){
            var hashtags =[...this.state.hashtags];

            hashtags.push(event.target.value);
            this.setState({hashtags})

        }
        else
        this.setState({ [name.toString()]: event.target.value });
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
    clickSubmit =  (event) => {

        
        event.preventDefault();

        const { title,body,hashtags } = this.state;

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
                Authorization:`Bearer ${isLoggedIn().token}`
            },
            body: JSON.stringify(question)
        })
            .then(response => {
                return response.json();
            })
            .catch(err => console.log(err))
            .then((data) => {
               

                if (data.error) {
                    this.setState({ error: data.error,questionPosted:false});
                }
                else {
            
                    this.setState({
                        title: "",
                        body: "",
                        hashtags: [],
                        errors: "",
                        questionPosted:true
                    }) ;

                    this.clearForm();

                   
                }
            });

    } 


    clearForm =()=> {
        document.getElementById("question-form").reset();
    }

    

    render() {

        // const {name,email,password,
        const { error,questionPosted } = this.state;

        return (
            <div className="container" style={{ 'width': '60%', 'marginTop': '20px' }}>
                <h2 className="btn-dark" style={{ 'padding': '10px', 'borderRadius': '10px', 'textAlign': 'center' }}>Post Question</h2><br />
                {error &&  <div className="alert alert-danger" role="alert">
                    {error}
                </div>  }
                {questionPosted && <div className="alert alert-success" role="alert">
                    Question Posted!
                </div>}
                
                <form id="question-form">
                    {this.formElement("title")}
                    {this.formElement("body")}
                    {this.formElement("hashtags")}
                </form>
                {error  && !questionPosted?
                (
                    <button type="button" 
                    className="btn btn-danger" onClick={this.clickSubmit}>Submit</button>
                ):
                (
                    <button type="button" 
                    className="btn btn-dark" onClick={this.clickSubmit}>Submit</button>
                )}
               
            </div>
        )
    }
}



export default Question;
