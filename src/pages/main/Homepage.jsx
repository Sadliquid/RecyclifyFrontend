import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function Homepage() {
    const navigate = useNavigate();

    return (
        <>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="80vh"
                mt={10}
            >
                <Flex
                    align="center"
                    justify="center"
                    height="85vh"
                    width="100vw"
                    bgImage="url('homepageBg.jpeg')"
                    bgSize="cover"
                    borderRadius={"md"}
                >
                    <Box
                        borderRadius="lg"
                        boxShadow="lg"
                        border="2px solid white"
                        backdropFilter="blur(20px)"
                        p={8}
                        maxW="md"
                        w="full"
                    >
                        <Image src="RecyclifyTransparentLogoV1.png" alt="logo" />
                        <Text color="white">Recyclify today for a better tomorrow</Text>
                        <Box
                            backgroundColor={"#4DCBA4"}
                            w="full"
                            mt={4}
                            borderRadius={"lg"}
                            padding={3}
                            cursor="pointer"
                            _hover={{ backgroundColor: "#3DAF8B" }}
                            transition={"all 0.2s"}
                            onClick={() => navigate('/auth/login')}
                        >
                            <Text color="white">Get started</Text>
                        </Box>
                    </Box>
                </Flex>
            </Box>
        </>
    );
}

export default Homepage;