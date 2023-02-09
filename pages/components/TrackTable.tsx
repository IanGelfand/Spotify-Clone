import { Flex, Td, Tr, Image, Text, Icon } from "@chakra-ui/react";
import React from "react";
import { BsFillPlayFill } from "react-icons/bs";

function TrackTable({ track, index }: any) {
	function msToMinutesAndSeconds(ms: number) {
		const minutes = Math.floor(ms / 60000);
		const seconds: any = ((ms % 60000) / 1000).toFixed(0);
		return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
	}

	const [isHovered, setIsHovered] = React.useState(false);

	return (
		<Tr
			key={index}
			_hover={{
				bg: "#282828",
				cursor: "pointer",
			}}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<Td>
				{isHovered ? (
					<Icon
						onClick={() => {
							window.localStorage.setItem(
								"currentSong",
								JSON.stringify(track.uri)
							);
						}}
						fontSize="18"
						color={"white"}
						as={BsFillPlayFill}
					/>
				) : (
					<Text>{index + 1}</Text>
				)}
			</Td>
			<Td>
				<Flex align={"center"}>
					<Image
						src={track.album.images[0].url}
						alt={track.name}
						w={35}
						h={35}
						mr={2}
						borderRadius={"md"}
					/>
					<Flex h={"full"} direction={"column"}>
						<Text>{track.name}</Text>
						<Text textColor={"#9D9D9D"} fontSize={"xs"}>
							{track.artists[0].name}
						</Text>
					</Flex>
				</Flex>
			</Td>
			<Td>{track.album.name}</Td>

			<Td>{msToMinutesAndSeconds(track.duration_ms)}</Td>
		</Tr>
	);
}

export default TrackTable;
