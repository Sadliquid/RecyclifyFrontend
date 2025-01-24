/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import { Box, Heading, Text, Button, Spinner } from '@chakra-ui/react';
import { Toaster, toaster } from "@/components/ui/toaster"
import { PinInput } from "@/components/ui/pin-input"
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from "framer-motion"
import ShowToast from '../../Extensions/ShowToast';
import server from '../../../networking';

function ClassEnrolment() {
    const [classJoinPin, setClassJoinPin] = useState(Array(6).fill(''));
    const [pinValid, setPinValid] = useState(false);
    const [checked, setChecked] = useState(false);
    const [available, setAvailable] = useState(false);

    const { user, loaded, error } = useSelector((state) => state.auth);

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
                        setAvailable(true)
                        resolve("Class joined successfully!");
                    }
                })
                .catch(error => {
                    if (error.response && error.response.data && error.response.data.error && typeof error.response.data.error === "string") {
                        if (error.response.data.error.startsWith("UERROR")) {
                            setAvailable(false)
                            ShowToast("error", error.response.data.error.substring("UERROR: ".length))
                            reject(error.response.data.error.substring("UERROR: ".length));
                        } else {
                            setAvailable(false)
                            ShowToast("error", error.response.data.error.substring("UERROR: ".length))
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
                    title: "Success",
                    description: "Class joined successfully!",
                },
                error: (err) => ({
                    title: "Error",
                    description: `${err}`,
                }),
            });
        }
    };

    const checkStudentEnrolment = async (studentID) => {
        console.log("Sent studentID: ", studentID);
        if (!error && loaded && user) {
            try {
                const response = await server.get(`/api/student/check-student-enrolment?studentID=${studentID}`);
                if (response.status === 200) {
                    setAvailable(true)
                }
            } catch (error) {
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
        if (!error && loaded && user) {
            checkStudentEnrolment(user.id)
        }
    }, [error, loaded, user])

    if (checked == true && available == false) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Box 
                    display="flex" 
                    justifyContent="center" 
                    alignItems="center" 
                    flexDir="column" 
                    height="80vh"
                >
                    <Spinner 
                        color="#3A9F83" 
                        animationDuration="0.5s" 
                        css={{ "--spinner-track-color": "colors.gray.200" }} 
                    />
                    <Text mt={4}>You can't enrol into a class at the moment. Please try again later.</Text>
                </Box>
            </motion.div>
        )
    }

    if (available && !error && loaded && user) return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
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
            
                            <PinInput size="md" otp mt={10} value={classJoinPin} onValueChange={handlePinChange} />
            
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
                                onClick={handleJoinClass}
                                disabled={!pinValid}
                            >
                                <Text ml={2}>Join class</Text>
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </motion.div>
            
            <Toaster />
        </>
    );
    
}

export default ClassEnrolment