import React from "react";
import { Form } from "semantic-ui-react";

const PasswordInput = () => (
	<Form.Input
		fluid
		icon="lock"
		iconPosition="left"
		placeholder="Password"
		type="password"
		required
	/>
);

export default PasswordInput;
