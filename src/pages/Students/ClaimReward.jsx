import { Box, Heading, Text, Spinner, Button } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BsCheckCircleFill } from 'react-icons/bs';
import { PiWarningCircleFill } from 'react-icons/pi';
import ShowToast from '../../Extensions/ShowToast';
import server from "../../../networking";
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

const MotionBox = motion(Box);
const MotionButton = motion(Button);

function ClaimReward() {
    const [searchParams] = useSearchParams();
    const studentID = searchParams.get('studentID');
    const redemptionID = searchParams.get('redemptionID');
    const [isLoading, setIsLoading] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const redeemReward = async () => {
            try {
                if (studentID == null || redemptionID ==  null) {
                    ShowToast('error', 'Required parameters are missing.');
                }

                const response = await server.get(`/api/student/claim-reward?studentID=${studentID}&redemptionID=${redemptionID}`);

                if (response.status === 200) {
                    setIsSuccess(true);
                    setMessage(response.data.message.substring("SUCCESS:".length) || 'Reward redeemed successfully!');
                }
            } catch (error) {
                if (error.response && error.response.data && error.response.data.error && typeof error.response.data.error === "string") {
                    if (error.response.data.error.startsWith("UERROR")) {
                        setErrorMessage(error.response.data.error.substring("UERROR:".length));
                        setIsSuccess(false);
                        return;
                    } else {
                        setErrorMessage(error.response.data.error.substring("ERROR:".length));
                        setIsSuccess(false);
                        return;
                    }
                }
            } finally {
                setIsLoading(false);
            }
        };

        if (studentID && redemptionID) {
            redeemReward();
        } else {
            setIsLoading(false);
            setErrorMessage('Required parameters are missing.');
        }
    }, [studentID, redemptionID]);

    return (
        <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            minH="100vh"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            p={4}
        >
            <MotionBox
                bg="rgba(255, 255, 255, 0.1)"
                backdropFilter="blur(20px)"
                borderRadius="3xl"
                boxShadow="2xl"
                p={8}
                maxW="md"
                w="full"
                border="1px solid rgba(255, 255, 255, 0.2)"
            >
                <Heading
                    bgClip="text"
                    fontSize="4xl"
                    fontWeight="extrabold"
                    mb={8}
                    textAlign="center"
                >
                    {isSuccess ? 'Reward Unlocked!' : 'Claiming Reward'}
                </Heading>

                {isLoading ? (
                    <MotionBox
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                        textAlign="center"
                    >
                        <Spinner
                            thickness="4px"
                            speed="0.65s"
                            emptyColor="gray.200"
                            color="purple.500"
                            size="xl"
                        />
                        <Text mt={4} color="#39B58A" fontWeight="medium">
                            Securing your reward...
                        </Text>
                    </MotionBox>
                ) : isSuccess ? (
                    <MotionBox
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        textAlign="center"
                    >
                        <MotionBox
                            animate={{ y: [-10, 10, -10] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            display="inline-block"
                            mb={6}
                        >
                            <BsCheckCircleFill size="80px" color="#4ade80" />
                        </MotionBox>
                        <Text
                            fontSize="xl"
                            color="#39B58A"
                            fontWeight="semibold"
                            mb={8}
                        >
                            {message}
                        </Text>
                    </MotionBox>
                ) : (
                    <MotionBox
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        textAlign="center"
                    >
                        <MotionBox
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            display="inline-block"
                            mb={6}
                        >
                            <PiWarningCircleFill size="80px" color="#f59e0b" />
                        </MotionBox>
                        <Text
                            fontSize="xl"
                            color="red"
                            fontWeight="semibold"
                            mb={8}
                        >
                            {errorMessage}
                        </Text>
                        <MotionButton
                            w="full"
                            size="lg"
                            colorScheme="purple"
                            backgroundColor={"red"}
                            _active={{ transform: 'scale(0.98)' }}
                            onClick={() => window.location.reload()}
                            rightIcon={<FiArrowRight />}
                            borderRadius="xl"
                            py={6}
                            whileTap={{ scale: 0.98 }}
                        >
                            Try Again
                        </MotionButton>
                    </MotionBox>
                )}
            </MotionBox>
        </MotionBox>
    );
}

export default ClaimReward;