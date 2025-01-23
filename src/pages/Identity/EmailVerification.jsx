import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { Box, Heading, Text, Button, VStack } from '@chakra-ui/react';
import { PinInput } from "@/components/ui/pin-input"
import { StepsItem, StepsList, StepsRoot } from "@/components/ui/steps"

function EmailVerification() {
    const navigate = useNavigate();
    const { user, loaded, error, authToken } = useSelector((state) => state.auth);
    const [isLoading, setIsLoading] = useState(false);
    const [isResending, setIsResending] = useState(false);

    useEffect(() => {
        if (user?.emailVerified) {
            navigateBasedOnRole();
        }
    }, [user]);

    const navigateBasedOnRole = () => {
        if (user?.userRole === "student") {
            navigate("/student/home");
        } else if (user?.userRole === "teacher") {
            navigate("/teachers");
        } else {
            navigate("/admin/dashboard");
        }
    };

    const verifyEmail = async () => {
        if (!verificationCode || verificationCode.length !== 6) {
            toast({
                title: "Invalid Code",
                description: "Please enter a 6-digit verification code",
                status: "error",
            });
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.post(
                '/api/identity/verifyEmail',
                { code: verificationCode },
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                }
            );

            if (response.data.message === "SUCCESS: Email verified successfully") {
                await updateUser(); // Refresh user data
                toast({
                    title: "Email Verified!",
                    status: "success",
                });
                navigateBasedOnRole();
            }
        } catch (error) {
            const errorMessage = error.response?.data?.error || "Verification failed";
            toast({
                title: "Error",
                description: errorMessage,
                status: "error",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const sendVerificationEmail = async () => {
        setIsResending(true);
        try {
            const response = await axios.post(
                '/api/identity/emailVerification',
                {},
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                }
            );

            if (response.data.message === "SUCCESS: Verification code sent") {
                toast({
                    title: "Code Sent!",
                    description: "Check your email for a new verification code",
                    status: "success",
                });
            }
        } catch (error) {
            const errorMessage = error.response?.data?.error || "Failed to send code";
            toast({
                title: "Error",
                description: errorMessage,
                status: "error",
            });
        } finally {
            setIsResending(false);
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
                        mb={4}
                        colorScheme="white"
                        _hover={{ bg: "#1752FD" }}
                        borderRadius="30px"
                        alignItems="center"
                        mt={8}
                        w={150}
                        onClick={verifyEmail}
                        isLoading={isLoading}
                        loadingText="Verifying..."
                    >
                        <Text>Verify Email</Text>
                    </Button>

                    <Text
                        mt={2}
                        fontSize={12}
                    >
                        Didn’t receive the email? 
                        <Button 
                            variant="link" 
                            colorScheme="blue" 
                            ml={2}
                            size={'sm'}
                            onClick={sendVerificationEmail}
                            isLoading={isResending}
                            loadingText="Sending..."
                        >
                            Resend Email
                        </Button>
                    </Text> 
                </VStack>
            </Box>
        </Box>
    );
}

export default EmailVerification