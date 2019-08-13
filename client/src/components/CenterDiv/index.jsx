import React from "react";
import { Grid } from "semantic-ui-react";

const CenterDiv = () => {
	return (
		<Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
			{props.children}
		</Grid>
	);
};

export default CenterDiv;
