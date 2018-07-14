import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomeContainer from '../containers/home.container';
import JobListContainer from '../containers/joblist-container/joblist.container';

const AppRouter = () => {
    return (        
        <Switch>
            <Route exact path="/" component={HomeContainer} />
            <Route exact path="/jobs" component={JobListContainer} />
        </Switch>        
    );
}

export default AppRouter;