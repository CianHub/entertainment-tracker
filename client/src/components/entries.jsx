import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Table, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Entries = (props) => {
  const [entryItems, setEntryItems] = useState([]);
  const [highestRated, setHighestRated] = useState('');
  const [numberEntries, setNumberEntries] = useState(0);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const token = sessionStorage.getItem('token');

  const handleLoggedOutUser = () =>
    sessionStorage.getItem('token') ? null : <Redirect to="/login" />;

  const handleIcon = (categoryName) => {
    switch (categoryName) {
      case 'Manga Volume':
        return 'atlas';
      case 'Book':
        return 'book';
      case 'Film':
        return 'film';
      case 'Video Game':
        return 'gamepad';
      case 'Sport':
        return 'trophy';
      case 'TV Show':
        return 'tv';
      default:
        return null;
    }
  };

  const loader = () => {
    return (
      <div className="d-flex justify-content-center">
        <br />
        <Spinner
          as="span"
          animation="grow"
          style={{ width: '5em', height: '5rem' }}
          role="status"
          aria-hidden="true"
          className="loader"
        />
      </div>
    );
  };

  const content = () => {
    return (
      <React.Fragment>
        {handleLoggedOutUser()}
        <br></br>
        <h3>Summary</h3>
        <p>
          In <b>{new Date().getFullYear()}</b> so far, <b>{user.name}</b> has{' '}
          <b>{user.points}</b> points from <b>{numberEntries} </b>entries, the
          highest rated entry is <b>{highestRated}</b>.
        </p>
        {entryItems}
      </React.Fragment>
    );
  };

  useEffect(() => {
    async function getEntries() {
      setLoading(true);
      let entriesResponse;
      try {
        entriesResponse = await fetch(`http://localhost:5000/api/entries`, {
          headers: { token },
        });
        let entriesData = await entriesResponse.json();
        console.log(new Date().getFullYear());
        entriesData.entries = entriesData.entries.filter(
          (entry) => entry.year === new Date().getFullYear().toString()
        );
        setNumberEntries(entriesData.entries.length);
        setHighestRated(
          [...entriesData.entries].sort(
            (a, b) => parseFloat(b.rating) - parseFloat(a.rating)
          )[0].item.name
        );
        await setEntryItems(
          <Table striped bordered hover reponsive="true">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Category</th>
                <th>Rating</th>
                <th>Points</th>
                <th>Year</th>
              </tr>
            </thead>
            <tbody>
              {entriesData.entries
                .sort((a, b) => a.date - b.date)
                .map((entry, index) => {
                  return (
                    <tr key={entry._id}>
                      <td>{index + 1}</td>
                      <td>{entry.item.name}</td>
                      <td>
                        <FontAwesomeIcon
                          icon={handleIcon(entry.item.itemCategory.name)}
                        ></FontAwesomeIcon>{' '}
                        {entry.item.itemCategory.name}
                      </td>
                      <td>{entry.rating}</td>
                      <td>{entry.item.itemCategory.points}</td>
                      <td>{entry.year}</td>
                    </tr>
                  );
                })
                .reverse()}
            </tbody>
          </Table>
        );
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
        handleLoggedOutUser();
      }
    }

    async function getUser() {
      let userResponse;
      try {
        userResponse = await fetch(`http://localhost:5000/api/users/current`, {
          headers: { token },
        });
        const userData = await userResponse.json();
        setUser(userData.user);
        console.log(user);
      } catch (err) {
        console.log(err);
      }
    }
    getUser();
    getEntries();
  }, [token]);

  return <div className="entries">{loading ? loader() : content()}</div>;
};
