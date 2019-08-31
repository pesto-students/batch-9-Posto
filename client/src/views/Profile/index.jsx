/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useContext, lazy } from 'react';
import { Grid, Form, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { updateUser } from '../../API';
import { USER } from '../../context/constants';
import GlobalContext from '../../context/GlobalContext';
import Loader from '../../components/Loader';

const CenterDiv = lazy(() => import('../../components/CenterDiv'));
const Header = lazy(() => import('../../components/Header'));

const Profile = () => {
  const { state, dispatch } = useContext(GlobalContext);

  const [name, setName] = useState(state.user.name);
  const [gender, setGender] = useState(state.user.gender);
  const [dob, setDob] = useState(state.user.DOB.slice(0, 10));
  const [btnDisable, setBtnDisable] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = [
    { key: 'm', text: 'Male', value: 'Male' },
    { key: 'f', text: 'Female', value: 'Female' },
    { key: 'o', text: 'Other', value: 'Other' },
  ];

  const handleError = () => {
    setBtnDisable(false);
    setLoading(false);
    setError('Some error occurred, try again');
  };

  const handleSubmit = async () => {
    setLoading(true);
    setBtnDisable(true);
    let response;
    try {
      response = await updateUser(state.user.id, {
        name, gender, email: state.user.email, DOB: dob,
      });
      const user = {
        ...response.response.data.updatedUser,
        token: response.token,
        id: response.response.data.updatedUser._id,
      };
      delete user._id;
      localStorage.setItem('user', JSON.stringify(user));
      setLoading(false);
      dispatch({ type: USER, payload: user });
    } catch (err) {
      handleError();
    }
  };

  const conditionallyRenderForm = () => {
    if (loading) {
      return <Loader />;
    }
    return (
      <CenterDiv>
        <Grid.Column style={{ paddingTop: '100px', maxWidth: '400px' }}>
          <p>Profile Data</p>
          <h3>{error}</h3>
          <Form>
            <Form.Field>
              <label htmlFor="name">Name:</label>
              <input
                id="name"
                value={name}
                onChange={(e) => {
                  setError(null);
                  setName(e.target.value);
                  setBtnDisable(false);
                }}
              />
            </Form.Field>
            <Form.Field>
              <label htmlFor="dob">DOB:</label>
              <input
                id="dob"
                type="date"
                value={dob}
                onChange={(e) => {
                  setError(null);
                  setDob(e.target.value);
                  setBtnDisable(false);
                }}
              />
            </Form.Field>
            <Form.Select
              inline
              fluid
              label="Gender:"
              options={options}
              placeholder="Gender"
              value={gender}
              onChange={(e, { value }) => {
                setError(null);
                setGender(value);
                setBtnDisable(false);
              }}
            />
            <Link to="/">
              <Button secondary>Cancel</Button>
            </Link>
            <Button
              primary
              disabled={btnDisable}
              onClick={handleSubmit}
            >Submit
            </Button>
          </Form>
        </Grid.Column>
      </CenterDiv>
    );
  };

  return (
    <>
      <Header />
      {conditionallyRenderForm()}
    </>
  );
};

export default Profile;
