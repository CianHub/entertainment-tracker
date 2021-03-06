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
  const [newEntrySuccess, setNewEntrySuccess] = useState(false);
  const [newEntryFailure, setNewEntryFailure] = useState(false);
  const [starRating, setStarRating] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [formValue, setFormValue] = useState({
    item: {
      name: '',
      itemCategory: { name: '', points: 0 },
    },
    user: { userId: '' },
    rating: 0,
  });

  const handleFormValidation = () => {
    const nameValid = formValue?.item?.name?.trim()?.length > 0;
    const ratingValid =
      starRating.filter((rating) => rating === true).length > 0;
    const categoryValid =
      formValue?.item?.itemCategory?.name?.trim()?.length > 0 &&
      formValue?.item?.itemCategory?.points > 0;
    return nameValid && categoryValid && ratingValid;
  };

  const showNewEntrySuccessMessage = () => {
    return newEntrySuccess ? (
      <span className="text-success">
        <br></br>New entry logged successfully.
      </span>
    ) : null;
  };

  const showNewEntryFailureMessage = () => {
    return newEntryFailure ? (
      <span className="text-danger">
        <br></br>New entry attempt failed, please try again.
      </span>
    ) : null;
  };

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

  const handleFormChange = (e) => {
    let { name, value } = e.target;
    let newEntry = { ...formValue };
    if (name === 'itemCategory') {
      newEntry.item.itemCategory = itemCategories.find(
        (category) => category._id === JSON.parse(value)._id
      );
    } else if (name === 'name') {
      newEntry.item.name = value;
    }
    setFormValue({ ...formValue, ...newEntry });
  };

  const handleClose = () => {
    setShow(false);
    setStarRating([false, false, false, false, false]);
    setFormValue({
      item: {
        name: '',
        itemCategory: { name: '', points: 0 },
      },
      user: { userId: '' },
      rating: 0,
    });
  };

  const handleSubmit = async () => {
    const dataToSend = {
      item: {
        name: formValue.item.name,
        itemCategory: {
          name: formValue.item.itemCategory.name,
          points: formValue.item.itemCategory.points,
        },
      },
      rating: starRating.filter((star) => star === true).length,
    };
    try {
      await fetch(`/api/entries`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          token,
        },
        body: JSON.stringify(dataToSend),
      });
      setNewEntrySuccess(true);
      setTimeout(() => setNewEntrySuccess(false), 10000);
    } catch (err) {
      console.log(err);
      setNewEntryFailure(true);
      setTimeout(() => setNewEntryFailure(false), 10000);
    }

    handleClose();
    getUserEntries();
  };

  const handleShow = () => setShow(true);

  const token = sessionStorage.getItem('token');

  const handleLoggedOutUser = () => {
    const token = sessionStorage.getItem('token');
    return token && token !== 'undefined' ? null : <Redirect to="/login" />;
  };

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
              <Form.Label>Name *</Form.Label>
              <Form.Control
                name="name"
                value={formValue.item.name}
                type="text"
                placeholder="Enter a name for your entry"
                onChange={handleFormChange}
              />
            </Form.Group>

            <Form.Group controlId="itemCategory">
              <Form.Label>Category *</Form.Label>
              <Form.Control
                name="itemCategory"
                as="select"
                onChange={handleFormChange}
                value={JSON.stringify(formValue.item.itemCategory)}
              >
                <option
                  value={JSON.stringify({ name: '', points: 0 })}
                  disabled
                >
                  Please select a category for your entry
                </option>
                {itemCategories
                  ? itemCategories.map((itemCategory) => {
                      return (
                        <option
                          key={itemCategory._id}
                          value={JSON.stringify(itemCategory)}
                        >
                          {itemCategory.name}
                        </option>
                      );
                    })
                  : handleLoggedOutUser()}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="rating">
              <Form.Label>Rating *</Form.Label>
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
            <Form.Text className="text-muted">* required</Form.Text>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="success"
            onClick={handleSubmit}
            disabled={!handleFormValidation()}
          >
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
        {showNewEntrySuccessMessage()}
        {showNewEntryFailureMessage()}
        <br></br>
        {newEntryModal()}
        <h3>Summary</h3>
        <p>
          In <b>{new Date().getFullYear()}</b> so far, <b>{user?.name}</b> has{' '}
          <b>{user?.points}</b> points from <b>{numberEntries} </b>entries, the
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

  const deleteEntry = async (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      try {
        fetch(`/api/entries/${id}`, {
          method: 'DELETE',
          headers: { token },
        });
        setLoading(true);

        setTimeout(async () => {
          await getUserEntries();
          setLoading(false);
        }, 100);
      } catch (err) {
        console.log(err);
      }
    } else {
    }
  };

  const getUserEntries = async () => {
    let entriesResponse;
    try {
      entriesResponse = await fetch(`/api/entries`, {
        headers: { token },
      });
      let entriesData = await entriesResponse.json();
      entriesData.entries = entriesData?.entries?.filter(
        (entry) => entry?.year === new Date().getFullYear().toString()
      );
      setNumberEntries(entriesData?.entries?.length);
      setHighestRated(
        [...entriesData.entries]?.sort(
          (a, b) => parseFloat(b?.rating) - parseFloat(a?.rating)
        )[0]?.item?.name
      );
      await setEntryItems(
        entriesData?.entries && entriesData?.entries.length ? (
          <Table striped hover responsive="true">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Category</th>
                <th>Rating</th>
                <th>Points</th>
                <th>Year</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {entriesData?.entries
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
                      <td>
                        <FontAwesomeIcon
                          className="delete-icon"
                          icon="trash"
                          onClick={() => deleteEntry(entry._id)}
                        ></FontAwesomeIcon>
                      </td>
                    </tr>
                  );
                })
                .reverse()}
            </tbody>
          </Table>
        ) : (
          <p>No entries logged yet!</p>
        )
      );
    } catch (err) {
      console.log(err);
      handleLoggedOutUser();
    }
  };

  useEffect(() => {
    async function getEntries() {
      getUserEntries();
    }

    async function getUser() {
      let userResponse;
      try {
        userResponse = await fetch(`/api/users/current`, {
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
        itemCategoryResponse = await fetch(`/api/item-categories`, {
          headers: { token },
        });
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

  return (
    <div className="entries">
      {handleLoggedOutUser()}
      {loading ? loader() : content()}
    </div>
  );
};
