import React from "react";
import { Header } from "semantic-ui-react";

const Title = props => <Header as={props.as}>{props.children}</Header>;

export default Title;
