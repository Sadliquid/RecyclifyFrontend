import { Flex, Heading} from "@chakra-ui/react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Avatar } from "@/components/ui/avatar";

function Navbar() {
    return (
        <Flex as="nav" bg="#4DCBA4" w="100%" p="8px 24px 8px 24px" rounded="10px" justify="space-between" align="center" alignItems="center">
            <RxHamburgerMenu ml={"400px"} size="24px" color="white" cursor="pointer"/>
            <Heading color="white" cursor="pointer">RECYCLIFY</Heading>
            <Avatar name="Joshua Long" src="https://replace.with.your.image.url" size="sm" cursor="pointer" />
        </Flex>
    );
}

export default Navbar;