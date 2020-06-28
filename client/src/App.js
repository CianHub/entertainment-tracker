import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import { Provider } from 'react-redux';

import './App.css';
import store from './store/store';
import { Entries } from './components/entries';
import { Login } from './components/login';

function App() {
  const handleIndex = () => localStorage.getItem('token') ? <Redirect to="/entries" /> : <Redirect to="/login" />

  return (
    <Provider store={store}>
      <Router>
        <div className="App container">
          {handleIndex()}
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/entries" component={Entries} />
          </Switch>
        </div>
      </Router>
    </Provider>

  );
}

export default App;
