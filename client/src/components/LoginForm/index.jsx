import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button, Form, Message, Segment,
} from 'semantic-ui-react';

import EmailInput from '../EmailInput';
import PasswordInput from '../PasswordInput';
import { useInput } from '../../hooks';

const LoginForm = () => {
  const [email, setEmail] = useInput('');
  const [password, setPassword] = useInput('');

  const onLogin = () => {
    console.log(email, password);
  };

  return (
    <>
      <Form size="large" onSubmit={onLogin}>
        <Segment>
          <EmailInput focus value={email} onChange={setEmail} />
          <PasswordInput value={password} onChange={setPassword} />
          <Button type="submit" color="teal" fluid size="large">
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
