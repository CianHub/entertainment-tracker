import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import * as Icons from '@fortawesome/free-solid-svg-icons';

import './App.css';
import store from './store/store';
import { Entries } from './components/entries';
import { Login } from './components/login';
import { NavbarComponent } from './components/navbar';
import { Logout } from './components/logout';
import { addToken } from './actions/actions';
import { Register } from './components/register';

const iconList = Object
  .keys(Icons)
  .filter(key => key !== "fas" && key !== "prefix")
  .map(icon => Icons[icon])

library.add(...iconList)

const App = () => {
  const token = sessionStorage.getItem('token') !== "undefined" && sessionStorage.getItem('token') ? sessionStorage.getItem('token') : null
  store.dispatch(addToken(token))

  const redirectIndex = () => {
    return token ? <Redirect to="/entries" />
      : null
  }
  const handleIndex = () => token ? <Entries> </Entries> : <Login></Login>

  return (

    <div className="App">
      <br></br>
      <div className="container">
        <NavbarComponent ></NavbarComponent>
        {redirectIndex()}
        <Switch>
          <Route exact path="/" component={handleIndex} />

          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/entries" component={Entries} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
