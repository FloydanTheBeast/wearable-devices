const accessTokenKey = "ACCESS_TOKEN";

export const isUserSaved = () => !!localStorage.getItem(accessTokenKey);

export const signIn = (response) => {
	localStorage.setItem(accessTokenKey, response.accessToken);
};

export const logout = () => {
	localStorage.removeItem(accessTokenKey);
};
