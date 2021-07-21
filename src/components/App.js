import React, { useState } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { createGlobalStyle } from "styled-components";
import { isUserSaved, logout, signIn } from "../utils/authManager";

const GlobalStyle = createGlobalStyle`
	body {
		background-color: #34495e;
	}
`;

const App = () => {
	const [isSignedIn, changeSignIn] = useState(isUserSaved());

	const onSuccessfulLogin = (response) => {
		changeSignIn(true);
		signIn(response);
	};

	const onSuccessfulLogout = () => {
		changeSignIn(false);
		logout();
	};

	console.log("test");

	return (
		<>
			<GlobalStyle />
			{!isSignedIn ? (
				<GoogleLogin
					clientId=""
					onSuccess={onSuccessfulLogin}
					onFailure={(err) => console.log(err)}
					cookiePolicy={"single_host_origin"}
					responseType="code,token"
				/>
			) : (
				<GoogleLogout
					clientId=""
					onLogoutSuccess={onSuccessfulLogout}
				/>
			)}
		</>
	);
};

export default App;
