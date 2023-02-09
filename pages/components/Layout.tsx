import { Box, Button, Center, Link, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getRecentlyPlayed, logout } from "../../spotify";
import Sidebar from "./Sidebar";
import WebPlayer from "./WebPlayer";

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
const REDIRECT_URI = process.env.REDIRECT_URI || "http://localhost:3000";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";
const SCOPES = [
	"user-read-private",
	"user-read-email",
	"user-read-playback-state",
	"user-modify-playback-state",
	"user-read-currently-playing",
	"user-top-read",
	"user-read-recently-played",
	"user-library-read",
	"user-library-modify",
	"playlist-read-private",
	"playlist-read-collaborative",
	"playlist-modify-public",
	"playlist-modify-private",
	"user-follow-read",
	"user-follow-modify",
	"streaming",
];

function Layout({ children }: any) {
	const [currentSong, setCurrentSong]: any = useState([]);
	const [token, setToken] = useState("");
	useEffect(() => {
		document.addEventListener("visibilitychange", () => {
			if (document.hidden) {
				document.title = "Come Back :(";
			} else {
				document.title = "Spotify Profile";
			}
		});

		const hash: any = window.location.hash;
		let token: any = window.localStorage.getItem("token");

		if (!token && hash) {
			token = hash
				.substring(1)
				.split("&")
				.find((elem: any) => elem.startsWith("access_token"))
				.split("=")[1];

			window.location.hash = "";
			window.localStorage.setItem("token", token);
			const expirationTime = new Date().getTime() + 3600 * 1000;
			window.localStorage.setItem("expirationTime", expirationTime.toString());
			setToken(token);
		}

		if (token) {
			const expirationTime = window.localStorage.getItem("expirationTime");
			if (expirationTime && new Date().getTime() > parseInt(expirationTime)) {
				logout();
			}
			setToken(token);
			getRecentlyPlayed(token).then((currentSong: any) => {
				setCurrentSong(currentSong?.items[0].track.uri);
			});
		}

		const storedValue = localStorage.getItem("currentSong");
		setCurrentSong(storedValue);
	}, []);

	if (!token) {
		return (
			<Center bg={"#121212"} h={"100vh"}>
				<VStack mb={20}>
					<Text mb={5} fontSize={"4xl"} fontWeight={"bold"} color={"white"}>
						Spotify Profile
					</Text>

					<Button
						onClick={() => {
							window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES.join(
								"%20"
							)}&response_type=${RESPONSE_TYPE}&show_dialog=true`;
						}}
						size={"lg"}
						borderRadius={"full"}
						bg={"#1ed760"}
						p={7}
						color={"white"}
						_hover={{ bg: "#1fdf64" }}
						_active={{ bg: "#1fdf64" }}
					>
						LOGIN WITH SPOTIFY
					</Button>
				</VStack>
			</Center>
		);
	}

	return (
		<Box h={"100vh"}>
			<Sidebar>
				{children}
				{token && <WebPlayer token={token} currentSong={currentSong} />}
			</Sidebar>
		</Box>
	);
}

export default Layout;
