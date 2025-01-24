import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { Toaster, toaster } from "@/components/ui/toaster"
import { PinInput } from "@/components/ui/pin-input"
import { useState } from 'react';
import { useSelector } from 'react-redux';
import server from '../../../networking';

function ClassEnrolment() {
    const [classJoinPin, setClassJoinPin] = useState(Array(6).fill(''));
    const [pinValid, setPinValid] = useState(false);

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
                        resolve("Class joined successfully!");
                    } else {
                        reject(`Unexpected response status: ${response.status}`);
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

    if (!error && loaded && user) return (
        <>
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
            
            <Toaster />
        </>
    );
    
}

export default ClassEnrolment