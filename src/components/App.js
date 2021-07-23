import React, { useState } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { createGlobalStyle } from "styled-components";
import { isUserSaved, logout, signIn } from "../utils/authManager";
import Dashboard from "./Dashboard";

const GlobalStyle = createGlobalStyle`
	body {
		background-color: #34495e;
		font-family: "Montserrat", sans-serif;
		color: #fff;
	}

	#root {
		width: 80%;
		max-width: 800px;
		margin: auto;
	}

	.apexcharts-text {
		fill: #fff !important;
	}

	.apexcharts-tooltip {
		color: #222;
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

	return (
		<>
			<GlobalStyle />
			{!isSignedIn ? (
				<GoogleLogin
					clientId={process.env.CLIENT_ID}
					onSuccess={onSuccessfulLogin}
					onFailure={(err) => console.log(err)}
					cookiePolicy={"single_host_origin"}
					responseType="code,token"
					scope={`https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.location.read https://www.googleapis.com/auth/fitness.body.read https://www.googleapis.com/auth/fitness.sleep.read`}
				/>
			) : (
				<>
					<GoogleLogout
						clientId={process.env.CLIENT_ID}
						onLogoutSuccess={onSuccessfulLogout}
					/>
					<Dashboard
						accessToken={localStorage.getItem("ACCESS_TOKEN")}
					/>
				</>
			)}
		</>
	);
};

export default App;
