import axios from "axios";

export const getUserProfile = async (token: any) => {
	try {
		const { data } = await axios.get("https://api.spotify.com/v1/me", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const getTop = async (token: any, type: string) => {
	try {
		const { data } = await axios.get(
			`https://api.spotify.com/v1/me/top/${type}?time_range=short_term&limit=5`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const getRecentlyPlayed = async (token: any) => {
	try {
		const { data } = await axios.get(
			"https://api.spotify.com/v1/me/player/recently-played?limit=1",
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const logout = () => {
	window.localStorage.removeItem("token");
	window.localStorage.removeItem("expirationTime");
	window.location.reload();
};
