import React, { Component } from 'react';

class Register extends Component {

    constructor() {
        super();

        this.state = {
            name: "",
            email: "",
            password: "",
            error: "",
            registrationSuccess: false
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

    clearForm = () => {
        document.getElementById("registration-form").reset();
    }

    //Handle click on submit button and fetch data from Node API
    clickSubmit = (event) => {

        
        event.preventDefault();

        const { name, email, password } = this.state;

        const user = {
            //upper case names
            name: name,
            email: email,
            password: password
        };


        fetch(`http://localhost:8080/register`, {
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
                    this.setState({ error: data.error, registrationSuccess: false });
                }
                else { 
                    // this.props.toggleState("register");
                    this.setState({
                        error: "",
                        name: "",
                        email: "",
                        password: "",
                        registrationSuccess: true
                    }) ;

                    //clear form on sucessfull registration
                    this.clearForm();
                }
            });

    }

    render() {

        // const {name,email,password,
        const { error, registrationSuccess } = this.state;

        return (
            <div className="container" style={{ 'width': '60%', 'marginTop': '20px' }}>
                <h2 className="btn-dark" style={{ 'padding': '10px', 'borderRadius': '10px', 'textAlign': 'center' }}>Registration Form</h2><br />
                {error && <div className="alert alert-danger" role="alert">
                    {error}
                </div>}
                {registrationSuccess && <div className="alert alert-success" role="alert">
                    Registration Successful! Please Sign in.
                </div>}

                <form id="registration-form">
                    {this.formElement("name")}
                    {this.formElement("email")}
                    {this.formElement("password")}
                </form>
                {error && !registrationSuccess ?
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

export default Register;