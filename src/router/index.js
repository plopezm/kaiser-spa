import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomeContainer from '../containers/home.container';

const AppRouter = () => {
    return (
        <Switch>
            <Route exact path="/" component={HomeContainer} />
        </Switch>
    );
}

export default AppRouter;