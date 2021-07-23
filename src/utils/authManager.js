const accessTokenKey = "ACCESS_TOKEN";
const profileKey = "PROFILE";

export const isUserSaved = () => !!localStorage.getItem(accessTokenKey);

export const signIn = (response) => {
	console.log(response);
	localStorage.setItem(accessTokenKey, response.accessToken);
	localStorage.setItem(profileKey, JSON.stringify(response.profileObj));
};

export const logout = () => {
	localStorage.removeItem(accessTokenKey);
	localStorage.removeItem(profileKey);
};
