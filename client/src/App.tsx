// import React from 'react';
import './App.scss';
import Home from "./pages/Home/Home";
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
      </Router>
    </ApolloProvider>
  );
}