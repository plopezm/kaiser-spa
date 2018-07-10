import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ApolloProvider } from 'react-apollo';
import  apolloClient from './graphql/client';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <ApolloProvider client={apolloClient}>
        <App />
    </ApolloProvider>,
     document.getElementById('root'));
registerServiceWorker();
