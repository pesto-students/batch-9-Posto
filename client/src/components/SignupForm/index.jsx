import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  Button, Form, Message, Segment,
} from 'semantic-ui-react';

import GlobalContext from '../../context/GlobalContext';
import { signup } from '../../API';
import EmailInput from '../EmailInput';
import PasswordInput from '../PasswordInput';
import TextInput from '../TextInput';
import { useInput } from '../../hooks';

const SignupForm = () => {
  const { dispatch } = useContext(GlobalContext);
  const [email, setEmail] = useInput('');
  const [name, setName] = useInput('');
  const [password, setPassword] = useInput('');
  const [verifyPassword, setVerifyPassword] = useInput('');

  const onSignup = async () => {
    try {
      const data = { name, email, password };
      const user = await signup(data);
      dispatch({ type: user, payload: user });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <Form size="large" onSubmit={onSignup}>
        <Segment>
          <TextInput focus name="Name" value={name} onChange={setName} />
          <EmailInput value={email} onChange={setEmail} />
          <PasswordInput value={password} onChange={setPassword} />
          <PasswordInput
            value={verifyPassword}
            onChange={setVerifyPassword}
            userPassword={password}
            verify
          />
          <Button type="submit" color="teal" fluid size="large">
            Sign up
          </Button>
        </Segment>
      </Form>
      <Message>
        Already a user? <Link to="/login">Login</Link>
      </Message>
    </>
  );
};

export default SignupForm;
