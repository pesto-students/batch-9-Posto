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
  const [submitLoading, setSubmitLoading] = useState(false);

  const handleLogin = async () => {
    const data = { email, password };
    try {
      setSubmitLoading(true);
      const user = await signin(data);
      localStorage.setItem('user', JSON.stringify(user));
      dispatch({ type: USER, payload: user });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <Form size="large" onSubmit={handleLogin}>
        <Segment>
          <EmailInput focus value={email} onChange={setEmail} />
          <PasswordInput value={password} onChange={setPassword} />
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
