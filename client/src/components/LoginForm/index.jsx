import React from "react";
import { Button, Form, Message, Segment } from "semantic-ui-react";

import EmailInput from "../EmailInput";
import PasswordInput from "../PasswordInput";

const Login = () => (
	<>
		<Form size="large">
			<Segment stacked>
				<EmailInput />
				<PasswordInput />
				<Button color="teal" fluid size="large">
					Login
				</Button>
			</Segment>
		</Form>
		<Message>
			New to us? <a href="https://google.com">Sign Up</a>
		</Message>
	</>
);

export default Login;
