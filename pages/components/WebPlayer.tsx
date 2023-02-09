import { Box } from "@chakra-ui/react";
import React from "react";
import SpotifyPlayer from "react-spotify-web-playback";

function WebPlayer({ token, currentSong }: any) {
	return (
		<Box
			ml={"-20"}
			bottom={{
				base: "0",
				md: "200px",
			}}
		>
			<SpotifyPlayer
				styles={{
					bgColor: "#181818",
					color: "#fff",
					height: "60px",
				}}
				initialVolume={0.1}
				token={token}
				uris={currentSong}
			/>
		</Box>
	);
}

export default WebPlayer;
