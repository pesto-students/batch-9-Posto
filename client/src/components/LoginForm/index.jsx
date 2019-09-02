import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  Button, Form, Message, Segment,
} from 'semantic-ui-react';

import GlobalContext from '../../context/GlobalContext';
import { signin } from '../../API';
import EmailInput from '../EmailInput';
import PasswordInput from '../PasswordInput';
import { useInput } from '../../hooks';
import { USER } from '../../context/constants';

const LoginForm = () => {
  const { dispatch } = useContext(GlobalContext);
  const [email, setEmail] = useInput('');
  const [password, setPassword] = useInput('');
  const [error, setError] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setSubmitLoading(true);
      setError('');
      const data = { email, password };
      const user = await signin(data);
      localStorage.setItem('user', JSON.stringify(user));
      dispatch({ type: USER, payload: user });
    } catch (err) {
      setSubmitLoading(false);
      setError(err.message);
    }
  };

  return (
    <>
      <Form size="large" onSubmit={handleLogin}>
        <Segment>
          <EmailInput focus value={email} onChange={setEmail} />
          <PasswordInput value={password} onChange={setPassword} />
          {
            error
              ? (
                <Message negative>
                  {error}
                </Message>
              )
              : null
          }
          <Button
            fluid
            type="submit"
            color="teal"
            size="large"
            loading={submitLoading}
            disabled={submitLoading}
          >
            Login
          </Button>
        </Segment>
      </Form>
      <Message>
        New to us? <Link to="/signup">Sign Up</Link>
      </Message>
    </>
  );
};

export default LoginForm;
