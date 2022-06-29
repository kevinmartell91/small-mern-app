import React from 'react';
import { render } from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { Listings } from './section';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
} from '@apollo/react-hooks';
import './styles/index.css';
// import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: '/api',
  cache: new InMemoryCache(),
});

render(
  <ApolloProvider client={client}>
    <Listings title="tiny house!!!"></Listings>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
