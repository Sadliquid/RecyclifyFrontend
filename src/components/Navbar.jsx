import { Box, Heading } from "@chakra-ui/react"


function Navbar() {
    return (
        <Box as="nav" bg="#4DCBA4" w="90%" maxW="1200px" m="20px auto 20px auto" p="10px" color="white" position="fixed" top="0" left="0" right="0" rounded="10px"
            zIndex={1} >
            <Heading>RECYCLIFY</Heading>
        </Box>
    );
}

export default Navbar