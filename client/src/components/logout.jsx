import React, { useEffect } from 'react';
import axios from 'axios';
import store from '../store/store';
import { addToken } from '../actions/actions';

export const Logout = (props) => {
  const handleLogout = async () => {
    try {
      await axios.get(`/auth/logout`, {
        headers: { token: store.getState().token },
      });
      sessionStorage.removeItem('token');
      store.dispatch(addToken(null));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const logout = async () => {
      handleLogout();
    };
    logout();
  }, []);
  return <div> </div>;
};
