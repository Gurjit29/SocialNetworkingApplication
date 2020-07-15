
import React from 'react';
import { Switch, Route} from 'react-router-dom';

//internal imports
import Login from './Login';
import Register from './Register';
import Navbar from './NavBar';
import LandingPage from './LandingPage'; 

const MainRouter = () => {

        return <React.Fragment>
        <Navbar/>
        <div className="jumbotron" style={{'height':'100vh'}}>
        
        <Switch>
            <Route exact path="/" component= {LandingPage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
        </Switch>
        </div>
        </React.Fragment>
        
    
}

export default MainRouter;

/**
 * https://reactrouter.com/web/guides/quick-start
 */


