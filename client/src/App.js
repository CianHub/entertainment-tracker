import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import { Provider, } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core'
import * as Icons from '@fortawesome/free-solid-svg-icons';

import './App.css';
import store from './store/store';
import { Entries } from './components/entries';
import { Login } from './components/login';
import { NavbarComponent } from './components/navbar';
import { Logout } from './components/logout';
import { addToken } from './actions/actions';

const iconList = Object
  .keys(Icons)
  .filter(key => key !== "fas" && key !== "prefix")
  .map(icon => Icons[icon])

library.add(...iconList)

const App = () => {
  store.dispatch(addToken(sessionStorage.getItem('token')))

  const handleIndex = () => store.getState().token
    ? <Redirect to="/entries" />
    : <Redirect to="/login" />

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <br></br>
          <div className="container">
            <NavbarComponent ></NavbarComponent>
            {handleIndex()}
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/logout" component={Logout} />
              <Route exact path="/entries" component={Entries} />
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
