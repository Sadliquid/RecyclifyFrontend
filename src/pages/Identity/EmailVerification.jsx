import { Box, Heading, Text, Button, VStack } from '@chakra-ui/react';
import { PinInput } from "@/components/ui/pin-input"
import ShowToast from '../../Extensions/ShowToast';
import { StepsItem, StepsList, StepsRoot, } from "@/components/ui/steps"
import { useState } from 'react';

function EmailVerification() {
    const [classJoinPin, setClassJoinPin] = useState(Array(6).fill(''));
    const [pinValid, setPinValid] = useState(false);

    const handlePinChange = (e) => {
        const updatedPin = e.value.filter((val) => val.trim() !== "");
    
        setClassJoinPin(e.value);
    
        setPinValid(updatedPin.length === 6);
    }


    const handleJoinClass = () => {
        const pin = classJoinPin.join('');
        if (pin.length === 6) {
            ShowToast("success", "Successfully joined class");
        } else {
            ShowToast("error", "Please enter a valid 6-digit join code");
        }
    };

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