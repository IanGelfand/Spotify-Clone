import React, { useEffect, useState } from "react";
import {
	Button,
	Box,
	Link,
	Input,
	Avatar,
	Text,
	VStack,
	HStack,
	Image,
	Center,
	Card,
	Flex,
	useMediaQuery,
	Table,
	Thead,
	Tr,
	Th,
	Tbody,
	Td,
} from "@chakra-ui/react";
import Lottie from "react-lottie";
import { getUserProfile, getTop, logout } from "../spotify";
import ArtistCard from "./components/ArtistCard";
import UserProfileInfo from "./components/UserProfileInfo";
import TrackTable from "./components/TrackTable";

function Home() {
	const [token, setToken] = useState("");
	const [user, setUser]: any = useState({});
	const [topArtists, setTopArtists]: any = useState([]);
	const [topTracks, setTopTracks]: any = useState([]);
	const [currentSong, setCurrentSong]: any = useState([]);

	const [isMobile] = useMediaQuery("(min-width: 768px)");

	const [loading, setLoading] = useState(true);
	useEffect(() => {
		let token: any = window.localStorage.getItem("token");
		setToken(token);
		if (token) {
			getUserProfile(token).then((user: any) => {
				setUser(user);
			});

			getTop(token, "artists").then((artists: any) => {
				setTopArtists(artists);
			});

			getTop(token, "tracks").then((tracks: any) => {
				setTopTracks(tracks);
			});
		}
		setLoading(false);
	}, [token]);

	if (loading) {
		return (
			<Box
				bg={"#121212"}
				h={"100vh"}
				display="flex"
				alignItems="center"
				justifyContent="center"
			>
				<Lottie
					options={{
						loop: true,
						autoplay: true,
						animationData: require("../public/loaders/bars.json"),
						rendererSettings: {
							preserveAspectRatio: "xMidYMid slice",
						},
					}}
					height={100}
					width={100}
				/>
			</Box>
		);
	}

	return (
		<Box
			bg={"#121212"}
			h={"100%"}
			w={"full"}
			display="flex"
			overflow={"auto"}
			m={0}
		>
			<Flex justifyContent={"flex-start"} direction={"column"}>
				<UserProfileInfo user={user} />
				<Flex
					alignItems={{
						base: "center",
						md: "flex-start",
					}}
					direction={"column"}
					mt={10}
				>
					<Text mb={5} color={"white"} fontSize={"2xl"} fontWeight={"medium"}>
						Top artists this month
					</Text>

					<Flex
						w={"full"}
						ml={"-4"}
						direction={{
							base: "column",
							md: "row",
						}}
						alignItems={{
							base: "center",
							md: "flex-start",
						}}
					>
						{topArtists?.items?.map((artist: any, index: number) => (
							<ArtistCard key={index} artist={artist} />
						))}
					</Flex>
				</Flex>
				<Flex
					alignItems={{
						base: "center",
						md: "flex-start",
					}}
					direction={"column"}
					mt={10}
				>
					<Text mb={5} color={"white"} fontSize={"2xl"} fontWeight={"medium"}>
						Top tracks this month
					</Text>

					<Table mb={10} variant={"unstyled"} textColor={"white"}>
						<Thead>
							<Tr>
								<Th>#</Th>
								<Th>Title</Th>
								<Th>Album</Th>
								<Th>Duration</Th>
							</Tr>
						</Thead>
						<Tbody>
							{topTracks?.items?.map((track: any, index: number) => (
								<TrackTable key={index} track={track} index={index} />
							))}
						</Tbody>
					</Table>
				</Flex>
			</Flex>
		</Box>
	);
}

export default Home;
