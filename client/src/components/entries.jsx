import React, { useState, useEffect } from 'react';
import store from '../store/store';

export const Entries = (props) => {
  const [entryItems, setEntryItems] = useState([]);
  const token = store.getState().token;

  useEffect(() => {
    async function getEntries() {
      const entriesResponse = await fetch(`http://localhost:5000/api/entries`, {
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
    }
    getEntries();
  }, []);

  return (
    <div className="login">
      <br></br>
      <h3>Entries</h3>
      {entryItems}
    </div>
  );
};
