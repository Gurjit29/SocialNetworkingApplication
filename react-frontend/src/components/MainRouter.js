
import React from 'react';
import { Switch, Route } from 'react-router-dom';

//internal imports
import Login from './Login';
import Register from './Register';

const MainRouter = () => {

        return <div>
            <p>This is placeholder for navbar</p>
        <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
        </Switch>
        </div>
    
}

export default MainRouter;

/**
 * https://reactrouter.com/web/guides/quick-start
 */


