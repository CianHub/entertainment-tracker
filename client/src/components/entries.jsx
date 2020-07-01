import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Table, Spinner, Modal, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Entries = (props) => {
  const [entryItems, setEntryItems] = useState([]);
  const [highestRated, setHighestRated] = useState('');
  const [numberEntries, setNumberEntries] = useState(0);
  const [user, setUser] = useState({});
  const [itemCategories, setItemCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [starRating, setStarRating] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  const rateEntry = (starIndex) => {
    const newStarRating = [false, false, false, false, false];
    newStarRating.forEach((star, index) => {
      newStarRating[index] = index <= starIndex ? true : false;
    });
    return setStarRating(newStarRating);
  };

  const handleStarColor = (starIndex) => {
    return starRating[starIndex] ? 'rating-star checked-star' : 'rating-star';
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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

  const newEntryModal = () => {
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Log A New Entry!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="itemName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a name for your entry"
              />
            </Form.Group>

            <Form.Group controlId="itemCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control as="select">
                <option value="" disabled selected>
                  Select a category for your entry
                </option>
                {itemCategories.map((itemCategory) => {
                  return (
                    <option key={itemCategory._id} value={itemCategory}>
                      {itemCategory.name}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="rating">
              <Form.Label>Rating</Form.Label>
              <br />
              <FontAwesomeIcon
                onClick={() => rateEntry(0)}
                className={handleStarColor(0)}
                icon="star"
              ></FontAwesomeIcon>
              <FontAwesomeIcon
                onClick={() => rateEntry(1)}
                className={handleStarColor(1)}
                icon="star"
              ></FontAwesomeIcon>
              <FontAwesomeIcon
                onClick={() => rateEntry(2)}
                className={handleStarColor(2)}
                icon="star"
              ></FontAwesomeIcon>
              <FontAwesomeIcon
                onClick={() => rateEntry(3)}
                className={handleStarColor(3)}
                icon="star"
              ></FontAwesomeIcon>
              <FontAwesomeIcon
                onClick={() => rateEntry(4)}
                className={handleStarColor(4)}
                icon="star"
              ></FontAwesomeIcon>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Log Entry
          </Button>
        </Modal.Footer>
      </Modal>
    );
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

  const displayRating = (rating) => {
    const starRatingArray = [];
    for (let i = 0; i < rating; i++) {
      starRatingArray.push(
        <FontAwesomeIcon
          key={i}
          className="checked-star"
          icon="star"
        ></FontAwesomeIcon>
      );
    }
    return starRatingArray;
  };

  const content = () => {
    return (
      <React.Fragment>
        {handleLoggedOutUser()}
        <br></br>
        {newEntryModal()}
        <h3>Summary</h3>
        <p>
          In <b>{new Date().getFullYear()}</b> so far, <b>{user.name}</b> has{' '}
          <b>{user.points}</b> points from <b>{numberEntries} </b>entries, the
          highest rated entry is <b>{highestRated}</b>.
        </p>
        <div>
          <Button variant="primary" onClick={handleShow}>
            Log New Entry
          </Button>
          <br />
          <br />
        </div>
        <div>{entryItems}</div>
      </React.Fragment>
    );
  };

  useEffect(() => {
    async function getEntries() {
      let entriesResponse;
      try {
        entriesResponse = await fetch(`http://localhost:5000/api/entries`, {
          headers: { token },
        });
        let entriesData = await entriesResponse.json();
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
          <Table striped hover responsive="true">
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
                      <td>{displayRating(entry.rating)}</td>
                      <td>{entry.item.itemCategory.points}</td>
                      <td>{entry.year}</td>
                    </tr>
                  );
                })
                .reverse()}
            </tbody>
          </Table>
        );
      } catch (err) {
        console.log(err);
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
      } catch (err) {
        console.log(err);
      }
    }

    async function getItemCategories() {
      let itemCategoryResponse;
      try {
        itemCategoryResponse = await fetch(
          `http://localhost:5000/api/item-categories`,
          {
            headers: { token },
          }
        );
        itemCategoryResponse = await itemCategoryResponse.json();
        setItemCategories(itemCategoryResponse.itemCategories);
      } catch (err) {
        console.log(err);
      }
    }
    const getData = async () => {
      setLoading(true);
      await getItemCategories();
      await getUser();
      await getEntries();
      setLoading(false);
    };
    getData();
  }, [token]);

  return <div className="entries">{loading ? loader() : content()}</div>;
};
