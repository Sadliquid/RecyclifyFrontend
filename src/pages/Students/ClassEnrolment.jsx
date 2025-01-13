import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { PinInput } from "@/components/ui/pin-input"

function ClassEnrolment() {


    return (
        <Box display="flex" flexDir="column" justifyContent="center" alignItems="center" minHeight="80vh">
            <Box display="flex" justifyContent="center" mt={10}>
                <Heading fontSize="30px">Enrol into your class</Heading>
            </Box>
    
            <Box
                display="flex"
                flexDir="column"
                justifyContent="space-around"
                backgroundColor="#E5ECFF"
                borderRadius={20}
                width="50%"
                margin="auto"
                p={5}
            >
                <Box display="flex" flexDir="column" justifyContent="center">
                    <Text fontWeight="bold">Enter join code</Text>
    
                    <PinInput size="md" otp mt={10} />
    
                    <Button
                        display="flex"
                        justifyContent="center"
                        backgroundColor="#2D65FF"
                        mb={2}
                        colorScheme="white"
                        _hover={{ bg: "#1752FD" }}
                        borderRadius="30px"
                        alignItems="center"
                        mt={10}
                    >
                        <Text ml={2}>Join class</Text>
                    </Button>
                </Box>
            </Box>
        </Box>
    );
    
}

export default ClassEnrolment