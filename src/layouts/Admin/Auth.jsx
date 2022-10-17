import React from "react";
import Auth from 'views/Login'
import { BackgroundColorContext } from "contexts/BackgroundColorContext"

function Login(props) {
	return (
		<BackgroundColorContext.Consumer>
		{({ color }) => (
			<React.Fragment>
			<div className="wrapper">
			<div className="main-panel" data={color}>
				<Auth />
			</div>
			</div>
			</React.Fragment>
			)}
			</BackgroundColorContext.Consumer>
			);
		}
		export default Login;