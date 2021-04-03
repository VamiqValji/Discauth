// import React from 'react';
// import logo from './logo.svg';
import './App.scss';
// import Test from "./pages/Test";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Documentation from "./pages/Documentation";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache()
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <div className="nav">
          <nav>
            <ul>
            <span className="leftNav">
              <li>
                <Link to="/">Home</Link>
              </li>
              {/* <li>
                <Link to="/test">Test</Link>
              </li> */}
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/documentation">Documentation</Link>
              </li>
              </span>
              <span className="rightNav"><li><Login /></li></span>
            </ul>
          </nav>
          </div>
          <div className="appContainer">
            <Switch>
              {/* <Route path="/test">
                <Test />
              </Route> */}
              <Route path="/dashboard">
                <Dashboard />
              </Route>
              <Route path="/documentation">
                <Documentation />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
}