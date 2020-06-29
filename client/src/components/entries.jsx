import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

export const Entries = (props) => {
  const [entryItems, setEntryItems] = useState([]);
  const token = sessionStorage.getItem('token');

  const handleLoggedOutUser = () =>
    sessionStorage.getItem('token') ? null : <Redirect to="/login" />;

  useEffect(() => {
    async function getEntries() {
      let entriesResponse;
      try {
        entriesResponse = await fetch(`http://localhost:5000/api/entries`, {
          headers: { token },
        });
        const entriesData = await entriesResponse.json();

        await setEntryItems(
          <ul>
            {entriesData.entries.map((entry) => {
              return <li key={entry._id}>{entry.item.name}</li>;
            })}
          </ul>
        );
      } catch (err) {
        console.log(err);
        handleLoggedOutUser();
      }
    }

    getEntries();
  }, [token]);

  return (
    <div className="login">
      {handleLoggedOutUser()}
      <br></br>
      <h3>Entries</h3>
      {entryItems}
    </div>
  );
};
