
import React from 'react';
import { Switch, Route, Redirect} from 'react-router-dom';

//internal imports
import Login from './Login';
import Register from './Register';
import Navbar from './NavBar';
import LandingPage from './LandingPage'; 
import Question from './Question';
import { Component } from 'react';


import {SignOut,isLoggedIn} from '../authentication/auth';
import DisplayQuestions from './DisplayQuestions';
import DisplayOneQuestion from './DisplayOneQuestion';

class MainRouter extends Component {

    constructor(){
        super();
        this.state=({
          loggedIn:isLoggedIn()
        })
      }
    
      toggleState = (name) => {
    
        if(name ==="signout"){
          SignOut();
        }
        this.setState({
          loggedIn:!this.state.loggedIn
        })
      }

    render() {
        return (<React.Fragment>
        <Navbar loggedIn={this.state.loggedIn} toggleState={this.toggleState}/>
        <div >
        
        <Switch>
            <Route exact path="/" component= {LandingPage} />
            <Route exact path="/login" render={() => <Login toggleState={this.toggleState}/>} />
            <Route exact path="/register" render={() => <Register toggleState={this.toggleState}/>} />
            <Route exact path="/questions" component={DisplayQuestions} />
            
            <Route exact path="/question/:questionId" component={DisplayOneQuestion} />
        {this.state.loggedIn ?
         <Route exact path={`/question/new/${isLoggedIn().user._id}`} component={Question} />
        : <Redirect to="/login" /> }
       
        </Switch>
        </div>
        </React.Fragment>
        )
    }
        
    
}

export default MainRouter;

/**
 * https://reactrouter.com/web/guides/quick-start
 */


