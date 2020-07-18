import React, { Component } from 'react';

import {Redirect} from 'react-router-dom';
import LandingPage from './LandingPage';

class Login extends Component {

    constructor() {
        super();

        this.state = {
            email: "",
            password: "",
            error: "",
            loginSuccess: false
        }
    }


    //Event Listener for input changes
    inputChangeListener = (name) => (event) => {


        //to make errors disappear when user is typing
        this.setState({ error: "" })

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

        const { email, password } = this.state;

        const user = {
            email: email,
            password: password
        };


        fetch(`http://localhost:8080/login`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(response => {
                return response.json();
            })
            .catch(err => console.log(err))
            .then((data) => {
               

                if (data.error) {
                    this.setState({ error: data.error, loginSuccess: false });
                }
                else {
            
                    //toggle state on successful login ==> set isLoggedIn to true 
                    localStorage.setItem("userInfo",JSON.stringify(data));
                    this.props.toggleState();
                    

                    //stringy json data
                   

                    
                    this.setState({
                        error: "",
                        email: "",
                        password: "",
                        loginSuccess: true
                    }) ;

                   
                }
            });

    } 

    

    render() {

        // const {name,email,password,
        const { error, loginSuccess } = this.state;

        return (
            <div className="container" style={{ 'width': '60%', 'marginTop': '20px' }}>
                <h2 className="btn-dark" style={{ 'padding': '10px', 'borderRadius': '10px', 'textAlign': 'center' }}>Login Form</h2><br />
                {error && <div className="alert alert-danger" role="alert">
                    {error}
                </div>}
                {loginSuccess && 
                <Redirect path="/" to={LandingPage} />
                }

                <form id="login-form">
                    {this.formElement("email")}
                    {this.formElement("password")}
                </form>
                {error && !loginSuccess ?
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

export default Login;