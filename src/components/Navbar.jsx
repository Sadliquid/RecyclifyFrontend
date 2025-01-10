import { Flex, Heading} from "@chakra-ui/react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Avatar } from "@/components/ui/avatar";

function Navbar() {
    return (
        <Flex as="nav" bg="#4DCBA4" w="95%" m="20px auto 20px auto" p="10px 24px 10px 24px" position="fixed" top="0" left="0" right="0" rounded="10px" justify="space-between" align="center">
            <RxHamburgerMenu ml={"400px"} size="24px" color="white" cursor="pointer"/>
            <Heading color="white" cursor="pointer">RECYCLIFY</Heading>
            <Avatar name="Joshua Long" src="https://replace.with.your.image.url" size="sm" cursor="pointer" />
        </Flex>
    );
}

export default Navbar;