import { Box, Heading, Text, Button, VStack } from '@chakra-ui/react';
import { PinInput } from "@/components/ui/pin-input"
import ShowToast from '../../Extensions/ShowToast';
import { StepsItem, StepsList, StepsRoot, } from "@/components/ui/steps"
import { useState } from 'react';


function ContactVerification() {
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
                        Verify Your Contact
                    </Heading>

                    {/* Progress bar */}
                    <StepsRoot 
                        defaultStep={2} 
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
    )
}

export default ContactVerification