import { Box, Heading, Text, Button, VStack } from '@chakra-ui/react';
import { PinInput } from "@/components/ui/pin-input"
import ShowToast from '../../Extensions/ShowToast';
import { StepsItem, StepsList, StepsRoot, } from "@/components/ui/steps"
import { useState } from 'react';

function EmailVerification() {

    return (
            <Box
                bgPosition="center"
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Box
                    p={8}
                    borderRadius={15}
                >
                    <VStack 
                        spacing={4}
                    >
                        <Heading
                            fontSize='30px'
                            mb={10} 
                            textAlign="center"
                        >
                            Verify Your Email
                        </Heading>
    
                        {/* Progress bar */}
                        <StepsRoot 
                            defaultStep={1} 
                            count={3} 
                            linear="true" 
                            size="lg" 
                            width={900}
                        >
                            <StepsList>
                                <StepsItem index={0} title="Step 1" description="Account Details" />
                                <StepsItem index={1} title="Step 2" description="Verify Email" />
                                <StepsItem index={2} title="Step 3" description="Verify Contact" />
                            </StepsList>
                        </StepsRoot>

                        <Heading mt={14}>
                            Check your inbox
                        </Heading>

                        <Text mt={2}>
                            We've sent a verification code to your email inbox!
                        </Text>
                        
                        <PinInput size="md" otp mt={10} p={10} />

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
                            w={150}
                        >
                            <Text>Verify Email</Text>
                        </Button>
                    </VStack>
                </Box>
            </Box>

        //     <Box display="flex" flexDir="column" justifyContent="center" alignItems="center" minHeight="80vh">
      
        //     <Box
        //         display="flex"
        //         flexDir="column"
        //         justifyContent="space-around"
        //         backgroundColor="#E5ECFF"
        //         borderRadius={20}
        //         width="50%"
        //         margin="auto"
        //         p={5}
        //     >
        //         <Box display="flex" flexDir="column" justifyContent="center">
        //             <Text fontWeight="bold">Enter join code</Text>
    
        //             <PinInput size="md" otp mt={10} value={classJoinPin} onValueChange={handlePinChange} />
    
        //             <Button
        //                 display="flex"
        //                 justifyContent="center"
        //                 backgroundColor="#2D65FF"
        //                 mb={2}
        //                 colorScheme="white"
        //                 _hover={{ bg: "#1752FD" }}
        //                 borderRadius="30px"
        //                 alignItems="center"
        //                 mt={10}
        //                 onClick={handleJoinClass}
        //                 disabled={!pinValid}
        //             >
        //                 <Text ml={2}>Join class</Text>
        //             </Button>
        //         </Box>
        //     </Box>
        // </Box>
        
        // <Toaster />
    );
}

export default EmailVerification