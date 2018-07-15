import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomeContainer from '../containers/home.container';
import JobListContainer from '../containers/joblist-container/joblist.container';
import JobDetailsContainer from '../containers/jobdetails.container';

const AppRouter = () => {
    return (        
        <Switch>
            <Route exact path="/" component={HomeContainer} />
            <Route exact path="/jobs" component={JobListContainer} />
            <Route exact path="/jobs/:jobId" component={JobDetailsContainer} />
        </Switch>        
    );
}

export default AppRouter;