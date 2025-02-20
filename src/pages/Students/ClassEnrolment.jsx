/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Heading, Text, Button, Flex } from '@chakra-ui/react';
import { toaster } from "@/components/ui/toaster"
import { PinInput } from "@/components/ui/pin-input"
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion"
import ShowToast from '../../Extensions/ShowToast';
import server from '../../../networking';
import { FiArrowRight, FiBookOpen } from 'react-icons/fi';

const MotionBox = motion(Box);
const MotionButton = motion(Button);

function ClassEnrolment() {
    const [classJoinPin, setClassJoinPin] = useState(Array(6).fill(''));
    const [pinValid, setPinValid] = useState(false);
    const [checked, setChecked] = useState(false);
    const [enrolled, setEnrolled] = useState(false);

    const { user, loaded, error } = useSelector((state) => state.auth);

    const navigate = useNavigate();

    const handlePinChange = (e) => {
        const updatedPin = e.value.filter((val) => val.trim() !== "");
    
        setClassJoinPin(e.value);
    
        setPinValid(updatedPin.length === 6);
    }

    const handleJoinClass = () => {
        if (!error && loaded && user) {
            const pin = classJoinPin.join('');
            const formData = new FormData();
            formData.append('studentID', user.id);
            formData.append('joinCode', pin);
    
            if (!pinValid) {
                toaster.promise(Promise.reject(), {
                    error: {
                        title: "Error",
                        description: "Invalid Join Code",
                    },
                });
                return;
            }
    
            const promise = new Promise((resolve, reject) => {
                server.post('/api/student/join-class', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    transformRequest: formData => formData,
                })
                .then(response => {
                    if (response.status === 200) {
                        resolve();
                        navigate('/student/myClass');
                    }
                })
                .catch(error => {
                    if (error.response && error.response.data && error.response.data.error && typeof error.response.data.error === "string") {
                        if (error.response.data.error.startsWith("UERROR")) {
                            reject(error.response.data.error.substring("UERROR: ".length));
                        } else {
                            reject(error.response.data.error.substring("ERROR: ".length));
                        }
                    } else {
                        reject("An unknown error occurred.");
                    }
                });
            });
    
            toaster.promise(promise, {
                loading: { title: "Joining Class...", description: "Please wait" },
                success: {
                    title: "",
                    description: "Class joined successfully!",
                },
                error: (err) => ({
                    title: "",
                    description: `${err}`,
                }),
            });
        }
    };

    const checkStudentEnrolment = async (studentID) => {
        if (!error && loaded && user) {
            try {
                const response = await server.get(`/api/student/check-student-enrolment?studentID=${studentID}`);
                if (response.status === 200) {
                    setEnrolled(false);
                }
            } catch (error) {
                setEnrolled(true);
                if (error.response && error.response.data && error.response.data.error && typeof error.response.data.error === "string") {
                    if (error.response.data.error.startsWith("UERROR")) {
                        ShowToast("error", error.response.data.error.substring("UERROR: ".length))
                    } else {
                        ShowToast("error", error.response.data.error.substring("ERROR: ".length))
                    }
                } else {
                    ShowToast("error", "An unknown error occurred.")
                }
            } finally {
                setChecked(true)
            }
        }
    }

    useEffect(() => {
        if (!error && loaded && user && user.userRole === "student") {
            checkStudentEnrolment(user.id)
        }
    }, [error, loaded, user])

    if (checked == true && enrolled == true) {
        return (
            <MotionBox
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                display="flex"
                justifyContent="center"
                alignItems="center"
                minH="80vh"
                bgGradient="linear(to-br, #6366f1 0%, #a855f7 50%, #ec4899 100%)"
            >
                <MotionBox
                    bg="whiteAlpha.900"
                    p={8}
                    borderRadius="2xl"
                    boxShadow="2xl"
                    textAlign="center"
                    whileHover={{ scale: 1.02 }}
                >
                    <Text fontSize="xl" fontWeight="semibold" color="gray.700">
                        You are already enrolled into a class!
                    </Text>

                    <Button
                        backgroundColor={"#4F46E5"}
                        color="white"
                        borderRadius="xl"
                        mt={6}
                        onClick={() => navigate('/student/myClass')}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Go to My Class
                    </Button>
                </MotionBox>
            </MotionBox>
        )
    }

    if (checked && !error && loaded && user) return (
        <Flex
            minH="80vh"
            align="center"
            justify="center"
            p={4}
        >
            <MotionBox
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
                w="100%"
                maxW="lg"
                bg="whiteAlpha.900"
                borderRadius="3xl"
                p={8}
                boxShadow="2xl"
                backdropFilter="blur(20px)"
                position="relative"
                overflow="hidden"
                _before={{
                    content: '""',
                    position: 'absolute',
                    top: '-50%',
                    left: '-50%',
                    w: '200%',
                    h: '200%',
                    pointerEvents: 'none',
                }}
            >
                <Box textAlign="center" mb={8}>
                    <MotionBox
                        animate={{ y: [-5, 5, -5] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        display="inline-block"
                        mb={6}
                    >
                        <FiBookOpen size="48px" color="#4F46E5" />
                    </MotionBox>
                    <Heading
                        backgroundColor={"#4F46E5"}
                        bgClip="text"
                        fontSize="4xl"
                        fontWeight="extrabold"
                        mb={4}
                    >
                        Join Your Class
                    </Heading>
                    <Text color="gray.600" fontSize="lg">
                        Enter the 6-digit code provided by your teacher
                    </Text>
                </Box>

                <Box mb={8}>
                    <PinInput size="md" otp mt={10} value={classJoinPin} onValueChange={handlePinChange} />
                </Box>

                <AnimatePresence>
                    {pinValid && (
                        <MotionBox
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                        >
                            <MotionButton
                                w="100%"
                                size="lg"
                                colorScheme="purple"
                                backgroundColor={"#4F46E5"}
                                _hover={{ bgGradient: 'linear(to-r, #6366f1, #a855f7)', transform: 'scale(1.02)' }}
                                _active={{ transform: 'scale(0.98)' }}
                                onClick={handleJoinClass}
                                rightIcon={<FiArrowRight />}
                                fontWeight="bold"
                                borderRadius="xl"
                                py={6}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Join Class Now
                            </MotionButton>
                        </MotionBox>
                    )}
                </AnimatePresence>

                <Text mt={6} textAlign="center" color="gray.500" fontSize="sm">
                    Need help? Contact your teacher for the class code
                </Text>
            </MotionBox>
        </Flex>
    );
}

export default ClassEnrolment