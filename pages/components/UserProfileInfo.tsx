import {
	Avatar,
	Box,
	Flex,
	HStack,
	Text,
	VStack,
	useMediaQuery,
	Button,
} from "@chakra-ui/react";
import React from "react";
import { logout } from "../../spotify";

function UserProfileInfo({ user }: { user: any }) {
	const [isMobile] = useMediaQuery("(min-width: 768px)");

	return (
		<Flex alignItems={"center"} direction={["column", "row"]}>
			{user?.images?.length > 0 && (
				<Avatar
					size="3xl"
					name={user?.display_name}
					src={user?.images[0]?.url}
				/>
			)}

			<Flex
				ml={{
					base: "0",
					md: "10",
				}}
				direction={"column"}
				justify={"flex-start"}
			>
				<Text color={"white"} fontSize={"5xl"} fontWeight={"bold"}>
					{user?.display_name}
				</Text>
				<Flex
					w={"full"}
					ml={"0.5"}
					alignItems={{
						base: "center",
						md: "flex-start",
					}}
					mb={2}
				>
					<Text color={"#BDBDBD"}>Followers</Text>
					<Text ml={2} color={"#00FF96"} fontWeight={"bold"}>
						{user?.followers?.total || 0}
					</Text>
				</Flex>
				<Button colorScheme="red" variant="outline">
					<Text fontWeight={"bold"}>Log out</Text>
				</Button>
			</Flex>
		</Flex>
	);
}

export default UserProfileInfo;
