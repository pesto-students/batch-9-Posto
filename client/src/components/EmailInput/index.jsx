import React from "react";
import { Form } from "semantic-ui-react";

const EmailInput = () => (
	<Form.Input
		fluid
		icon="user"
		iconPosition="left"
		placeholder="E-mail address"
		type="email"
		required
	/>
);

export default EmailInput;
