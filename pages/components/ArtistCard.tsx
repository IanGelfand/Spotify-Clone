import React from "react";
import { Avatar, Box, Card, Flex, Image, Text } from "@chakra-ui/react";

function ArtistCard({ artist }: any) {
	return (
		<Card
			key={artist?.id}
			bg={"#1b1e1e"}
			m={4}
			p={5}
			w={{
				base: "50%",
				md: "200px",
			}}
			maxH={"250px"}
			_hover={{
				bg: "#282828",
			}}
			transition={"all 0.3s ease"}
			alignItems={"center"}
		>
			<Avatar
				src={artist?.images[0]?.url}
				name={artist?.name}
				size={"2xl"}
				my={5}
				mt={0}
			/>
			<Flex
				m={5}
				direction={"column"}
				h={"full"}
				w={"full"}
				alignItems={{
					base: "center",
					md: "flex-start",
				}}
			>
				<Text
					isTruncated
					color={"#fef2e1"}
					textAlign={"start"}
					fontSize={"md"}
					fontWeight={"bold"}
				>
					{artist?.name}
				</Text>
				<Text
					color={"#fef2e1"}
					textAlign={"start"}
					fontSize={"xs"}
					textColor={"#909090"}
				>
					Artist
				</Text>
			</Flex>
		</Card>
	);
}

export default ArtistCard;
