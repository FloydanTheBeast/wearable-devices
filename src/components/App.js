import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import styled, { createGlobalStyle } from "styled-components";
import { isUserSaved, logout, signIn } from "../utils/authManager";
import Dashboard from "./Dashboard";
import Profile from "./Profile";

const GlobalStyle = createGlobalStyle`
	body {
		background-color: #2f3640;
		font-family: "Montserrat", sans-serif;
		color: #fff;
		margin: 0;
	}

	.apexcharts-text {
		fill: #fff !important;
	}

	.apexcharts-tooltip {
		color: #222;
	}
`;

const UnauthorizedContainer = styled.div`
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	display: flex;
	flex-flow: column;
	align-items: center;
	width: 60%;
	max-width: 600px;
	min-width: 400px;

	& > h1 {
		color: #ddd;
		text-align: center;
	}
`;

const App = () => {
	const [isSignedIn, changeSignIn] = useState(isUserSaved());

	const onLogin = (response) => {
		signIn(response);
		changeSignIn(true);
	};

	const onLogout = () => {
		changeSignIn(false);
		logout();
	};

	return (
		<>
			<GlobalStyle />
			{!isSignedIn ? (
				<UnauthorizedContainer>
					<h1>
						Wearable Devices requires authorization via Google
						account
					</h1>
					<GoogleLogin
						clientId={process.env.CLIENT_ID}
						onSuccess={onLogin}
						onFailure={(err) => console.log(err)}
						cookiePolicy={"single_host_origin"}
						responseType="code,token"
						scope={`https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.location.read https://www.googleapis.com/auth/fitness.body.read https://www.googleapis.com/auth/fitness.sleep.read`}
					/>
				</UnauthorizedContainer>
			) : (
				<>
					<Profile
						user={JSON.parse(localStorage.getItem("PROFILE"))}
						onLogout={onLogout}
						accessToken={localStorage.getItem("ACCESS_TOKEN")}
					></Profile>
					<Dashboard
						accessToken={localStorage.getItem("ACCESS_TOKEN")}
					/>
				</>
			)}
		</>
	);
};

export default App;
