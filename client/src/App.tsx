// import React from 'react';
// import logo from './logo.svg';
import './App.scss';
// import Test from "./pages/Test";
import Home from "./pages/Home/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Documentation from "./pages/Documentation";
import Nav from "./components/NavBar/Nav";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import Account from './pages/Account';

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache()
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Nav />
          <div className="appContainer">
            <Switch>
              <Route path="/documentation">
                <Documentation />
              </Route>
              <Route path="/dashboard">
                <Dashboard />
              </Route>
              <Route path="/account">
                <Account />
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