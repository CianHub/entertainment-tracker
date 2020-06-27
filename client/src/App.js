import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux';

import './App.css';
import store from './store/store';
import { Entries } from './components/entries';
import { Login } from './components/login';

const token = store.getState().token

function App() {

  return (
    <Provider store={store}>
      <Router>
        <div className="App container">
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/entries">
              <Entries />
            </Route>
            <Route path="/new-entry">
              <h2>New Entry</h2>
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>

  );
}

export default App;
