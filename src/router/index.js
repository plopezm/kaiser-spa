import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomeContainer from '../containers/home.container';
import JobListContainer from '../containers/joblist-container/joblist.container';
import JobDetailsContainer from '../containers/jobdetails.container';
import CreateJobContainer from '../containers/create-job.container';

const AppRouter = () => {
    return (        
        <Switch>
            <Route exact path="/" component={HomeContainer} />
            <Route exact path="/jobs" component={JobListContainer} />
            <Route exact path="/jobs/:jobId" component={JobDetailsContainer} />
            <Route exact path="/createjob" component={CreateJobContainer} />
        </Switch>        
    );
}

export default AppRouter;