import React, { useEffect, useState } from "react";
import { GoogleLogout } from "react-google-login";
import styled from "styled-components";
import { getUserDevices } from "../utils/googleApiManager";

const StyledProfile = styled.div`
	display: flex;
	flex-flow: column nowrap;
	align-items: center;
	background-color: #262b33;
	padding: 30px;

	& > h2 {
		margin: 20px 0 0 0;
	}
`;

const DevicesList = styled.div`
	display: flex;
	margin-bottom: 16px;

	& > div {
		margin: 6px;
		padding: 6px 10px;
		border: 2px solid #fff;
		border-radius: 8px;
		transition: all 0.2s;

		&:hover {
			background-color: #fff;
			color: #222;
		}
	}
`;

const Profile = ({ user, onLogout, accessToken }) => {
	const [devices, changeDevices] = useState([]);

	useEffect(() => {
		getUserDevices(accessToken).then((devices) => changeDevices(devices));
	}, []);

	return (
		<StyledProfile>
			<img src={user.imageUrl} />
			<h2>{user.name}</h2>
			<p>{user.email}</p>
			<DevicesList>
				{devices.map((device, index) => (
					<div key={`device-${index}`}>{device}</div>
				))}
			</DevicesList>
			<GoogleLogout
				clientId={process.env.CLIENT_ID}
				onLogoutSuccess={onLogout}
			/>
		</StyledProfile>
	);
};

export default Profile;
