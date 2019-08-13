import React from "react";
import { Form } from "semantic-ui-react";

const InputField = props => (
	<Form.Input
		fluid
		icon={props.icon}
		iconPosition={props.iconPosition}
		placeholder={props.placeholder}
		type={props.type}
		required
	/>
);

export default InputField;
