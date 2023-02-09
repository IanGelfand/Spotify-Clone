import React, { ReactNode } from "react";
import {
	IconButton,
	Box,
	CloseButton,
	Flex,
	Icon,
	useColorModeValue,
	Link,
	Drawer,
	DrawerContent,
	Text,
	useDisclosure,
	BoxProps,
	FlexProps,
} from "@chakra-ui/react";
import {
	FiHome,
	FiTrendingUp,
	FiCompass,
	FiStar,
	FiSettings,
	FiMenu,
} from "react-icons/fi";
import { TbMicrophone2, TbPlaylist } from "react-icons/tb";
import { BsMusicNoteBeamed, BsSpotify } from "react-icons/bs";
import { MdReplay } from "react-icons/md";
import { IconType } from "react-icons";
import { ReactText } from "react";

interface LinkItemProps {
	name: string;
	icon: IconType;
	href: string;
}
const LinkItems: Array<LinkItemProps> = [
	{ name: "Home", icon: FiHome, href: "/" },
	{ name: "Artists", icon: TbMicrophone2, href: "/artists" },
	{ name: "Tracks", icon: BsMusicNoteBeamed, href: "/tracks" },
	{ name: "Recent", icon: MdReplay, href: "/recent" },
	{ name: "Playlists", icon: TbPlaylist, href: "/playlists" },
];

export default function SimpleSidebar({ children }: { children: ReactNode }) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<Box minH="100vh" bg={"#121212"}>
			<SidebarContent
				bg={"#050308"}
				onClose={() => onClose}
				display={{ base: "none", md: "block" }}
			/>

			{/* mobilenav */}
			<Box pl={{ base: 0, md: 40 }} bg={"#121212"} h={"100vh"}>
				{children}
			</Box>
			<MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
		</Box>
	);
}

interface SidebarProps extends BoxProps {
	onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
	return (
		<Box bg={"#050308"} w={20} pos="fixed" h="full" {...rest}>
			<Flex alignItems="center" mt={5} justifyContent="center">
				<Icon as={BsSpotify} fontSize="48" color={"white"} />
			</Flex>
			<Flex
				mt={"-20"}
				direction={"column"}
				justify={"center"}
				h={"full"}
				w={"full"}
				align={"center"}
			>
				{LinkItems.map((link) => (
					<NavItem key={link.name} icon={link.icon} href={link.href}>
						{link.name}
					</NavItem>
				))}
			</Flex>
		</Box>
	);
};

interface NavItemProps extends FlexProps {
	icon: IconType;
	children: ReactText;
	href: string;
}
const NavItem = ({ icon, href, children, ...rest }: NavItemProps) => {
	return (
		<Link
			href={href}
			style={{ textDecoration: "none" }}
			_focus={{ boxShadow: "none" }}
		>
			<Flex
				p="4"
				justify={"center"}
				align={"center"}
				w={"20"}
				direction={"column"}
				cursor="pointer"
				textColor={"white"}
				_hover={{
					bg: "rgb(27, 30, 30)",
					borderLeft: "5px solid rgb(30, 215, 96)",
					marginLeft: "-5px",
					color: "white",
				}}
				{...rest}
			>
				{icon && <Icon fontSize="22" color={"white"} as={icon} />}
				{children}
			</Flex>
		</Link>
	);
};

interface MobileProps extends FlexProps {
	onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
	return (
		<Flex
			zIndex={"1"}
			height="20"
			alignItems="center"
			bg={"#050308"}
			justify={"space-around"}
			{...rest}
		>
			{LinkItems.map((link) => (
				<NavItem key={link.name} icon={link.icon} href={link.href}>
					{link.name}
				</NavItem>
			))}
		</Flex>
	);
};
