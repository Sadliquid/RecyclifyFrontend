import { DialogActionTrigger, DialogBody, DialogCloseTrigger, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Box, Heading, Text, Image, Button, Tabs } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion } from "framer-motion";
import ShowToast from '../../Extensions/ShowToast';
import server from "../../../networking";

function MyRewards() {
    const [activeRewards, setActiveRewards] = useState(null);
    const [claimedRewards, setClaimedRewards] = useState(null);
    const [value, setValue] = useState("available");

    const { user, loaded } = useSelector((state) => state.auth);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: "numeric", month: "long", day: "numeric" };
        return date.toLocaleDateString(undefined, options);
    };

    const fetchStudentRewards = async (studentID) => {
        console.log("Fetching student rewards for student ID:", studentID);
        try {
            const response = await server.get(`/api/student/get-student-rewards?studentID=${studentID}`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
                const allRewards = response.data.data;
                const receivedActiveRewards = allRewards.filter(reward => reward.redemptionStatus === "Pending");
                const receivedClaimedRewards = allRewards.filter(reward => reward.redemptionStatus === "Claimed");
                console.log("All rewards:", allRewards);
                console.log("Received rewards:", receivedActiveRewards);
                console.log("Claimed rewards:", receivedClaimedRewards);
                setActiveRewards(receivedActiveRewards);
                setClaimedRewards(receivedClaimedRewards);
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error && typeof error.response.data.error === "string") {
                if (error.response.data.error.startsWith("UERROR")) {
                    ShowToast("error", error.response.data.error.substring("UERROR:".length));
                    return;
                } else {
                    ShowToast("error", error.response.data.error.substring("ERROR:".length));
                    return;
                }
            }
        }
    };

    useEffect(() => {
        if (loaded && user && user.userRole === "student") {
            fetchStudentRewards(user.id);
        }
    }, [loaded, user]);

    if (activeRewards != null && claimedRewards != null) return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Box display="flex" justifyContent="center" flexDir="column" alignItems="center" mt={10}>
                <Heading fontSize="30px" mb={10} textAlign="center">My Rewards</Heading>

                <Tabs.Root variant="enclosed" maxW="1200px" width="100%" value={value} onValueChange={(e) => setValue(e.value)}>
                    <Box display="flex" justifyContent="center" width="100%">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Tabs.List display="flex" justifyContent="center" mb={6} width="auto" borderBottom="2px solid" borderColor="gray.200">
                                <Tabs.Trigger value="available" backgroundColor="inherit" px={6} py={2} _selected={{ borderBottom: "2px solid", borderColor: "#4DCBA4", color: "#3BA684" }}>
                                    Available
                                </Tabs.Trigger>
                                <Tabs.Trigger value="claimed" backgroundColor="inherit" px={6} py={2} _selected={{ borderBottom: "2px solid", borderColor: "#4DCBA4", color: "#3BA684" }}>
                                    Claimed
                                </Tabs.Trigger>
                            </Tabs.List>
                        </motion.div>
                    </Box>

                    <Tabs.Content
                        unmountOnExit
                        value="available"
                        _open={{
                            animationName: "fade-in, scale-in",
                            animationDuration: "300ms",
                        }}
                    >
                        {activeRewards.length > 0 ? (
                            <Box
                                display="grid"
                                gridTemplateColumns="repeat(2, 1fr)"
                                gap={6}
                                maxWidth="1200px"
                                width="100%"
                                mt={10}
                                px={4}
                                mx="auto"
                            >
                                {activeRewards.map((reward, index) => (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                        key={index}
                                    >
                                        <Box
                                            key={index}
                                            display="flex"
                                            flexDirection="row"
                                            overflow="hidden"
                                            borderRadius="lg"
                                            boxShadow="lg"
                                            backgroundColor="white"
                                        >
                                            <Image
                                                objectFit="cover"
                                                maxW="200px"
                                                src={"https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"}
                                                alt={reward.rewardTitle}
                                            />
                                            <Box flex={1} p={4}>
                                                <Heading fontSize="xl" mb={2} isTruncated>{reward.rewardTitle}</Heading>
                                                <Text
                                                    noOfLines={2}
                                                    display="-webkit-box"
                                                    overflow="hidden"
                                                    textOverflow="ellipsis"
                                                    style={{
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: 'vertical'
                                                    }}
                                                    mb={4}
                                                >
                                                    {reward.rewardDescription}
                                                </Text>
                                                <Text fontWeight="bold" mb={4}>Required leafs: {reward.requiredPoints}</Text>
                                                <DialogRoot placement="center" motionPreset="slide-in-bottom">
                                                    <DialogTrigger asChild>
                                                        <Button color="white" variant="outline" backgroundColor="#4DCBA4" _hover={{ bg: "#41B594" }}>
                                                            Redeem
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>Redeem reward</DialogTitle>
                                                        </DialogHeader>
                                                        <DialogBody>
                                                            <Text>Are you sure you want to redeem this reward?</Text>
                                                        </DialogBody>
                                                        <DialogFooter>
                                                            <DialogActionTrigger asChild>
                                                                <Box display="flex" gap={4}>
                                                                    <Button variant="outline">Cancel</Button>
                                                                    <Button color="white" backgroundColor="#2D65FF">
                                                                        Redeem
                                                                    </Button>
                                                                </Box>
                                                            </DialogActionTrigger>
                                                        </DialogFooter>
                                                        <DialogCloseTrigger />
                                                    </DialogContent>
                                                </DialogRoot>
                                            </Box>
                                        </Box>
                                    </motion.div>
                                ))}
                            </Box>
                        ) : (
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
                                    height="30vh"
                                >
                                    <Text fontFamily={"Lilita One"} mt={4} color="#3BA684">You do not have any available rewards</Text>
                                </Box>
                            </motion.div>
                        )}
                    </Tabs.Content>

                    <Tabs.Content
                        unmountOnExit
                        value="claimed"
                        _open={{
                            animationName: "fade-in, scale-in",
                            animationDuration: "300ms",
                        }}
                    >
                        {claimedRewards.length > 0 ? (
                            <Box
                                display="grid"
                                gridTemplateColumns="repeat(2, 1fr)"
                                gap={6}
                                maxWidth="1200px"
                                width="100%"
                                mt={10}
                                px={4}
                                mx="auto"
                            >
                                {claimedRewards.map((reward, index) => (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                        key={index}
                                    >
                                        <Box
                                            display="flex"
                                            flexDirection="row"
                                            overflow="hidden"
                                            borderRadius="lg"
                                            boxShadow="lg"
                                            backgroundColor="white"
                                        >
                                            <Image
                                                objectFit="cover"
                                                maxW="200px"
                                                src={"https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"}
                                                alt={reward.rewardTitle}
                                            />
                                            <Box flex={1} p={4}>
                                                <Heading fontSize="xl" mb={2}>{reward.rewardTitle}</Heading>
                                                <Text noOfLines={3} mb={4}>{reward.rewardDescription}</Text>
                                                <Text fontWeight="bold">
                                                    Claimed on: { reward.claimedOn ? formatDate(reward.claimedOn) : "Date not available" }
                                                </Text>
                                            </Box>
                                        </Box>
                                    </motion.div>
                                ))}
                            </Box>
                        ) : (
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
                                    height="30vh"
                                >
                                    <Text fontFamily={"Lilita One"} color="#3BA684" mt={4}>You do not have any previously claimed rewards</Text>
                                </Box>
                            </motion.div>
                        )}
                    </Tabs.Content>
                </Tabs.Root>
            </Box>
        </motion.div>
    );
}

export default MyRewards;