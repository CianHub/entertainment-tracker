import React from 'react';
import './App.css';
import { Login } from './components/login';
import { Provider } from 'react-redux';
import store from './store/store';
import { Entries } from './components/entries';

const token = store.getState().token

function App() {

  return (
    <Provider store={store}>
      <div className="App container">
        {token ? <Entries></Entries>
          : <Login></Login>}
      </div>
    </Provider>

  );
}

export default App;
