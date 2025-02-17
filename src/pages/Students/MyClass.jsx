import { Box, Heading, Table, Flex, Image, Text, Button, Tabs, Stack, Badge, Progress } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LuDiamond } from 'react-icons/lu';
import { motion } from 'framer-motion';
import { PiCloverFill } from 'react-icons/pi';
import ShowToast from '../../Extensions/ShowToast';
import server from '../../../networking';
import { FiArrowRight, FiBookOpen } from 'react-icons/fi';

const MotionBox = motion(Box);
const MotionButton = motion(Button);

function MyClass() {
    const { user, loaded, error } = useSelector((state) => state.auth);
    const [classID, setClassID] = useState(null);
    const [classQuests, setClassQuests] = useState([]);
    const [studentsList, setStudentsList] = useState(null);
    const [available, setAvailable] = useState(false)
    const [checked, setChecked] = useState(false);
    const [value, setValue] = useState("myClass");
    const navigate = useNavigate();

    const fetchStudents = async (studentID) => {
        console.log("Fetching students...");
        try {
            const response = await server.get(`/api/student/get-class-students?studentID=${studentID}`);
            if (response.status === 200) {
                setStudentsList(response.data.data);
                setAvailable(true)
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
        } finally {
            setChecked(true);
        }
    };

    const fetchStudentClassID = async (studentID) => {
        console.log("Fetching classID for studentID: ", studentID);
        try {
            const response = await server.get(`/api/student/get-student-classID?studentID=${studentID}`);
            if (response.status === 200) {
                console.log("ClassID: ", response.data.data);
                setClassID(response.data.data);
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

    const fetchClassQuests = async (classID) => {
        console.log("Fetching class quests for classID: ", classID);
        try {
            const response = await server.get(`/api/student/get-class-quests?classID=${classID}`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status == 200) {
                console.log("Class Quests: ", response.data.data);
                setClassQuests(response.data.data);
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
    }


    useEffect(() => {
        if (!error && loaded && user && user.userRole == "student") {
            fetchStudents(user.id);
            if (studentsList != null) {
                fetchStudentClassID(user.id);
            }
        }
    }, [error, loaded, user, studentsList]);

    useEffect(() => {
        if (!error && loaded && user && user.userRole == "student") {
            if (classID != null) {
                fetchClassQuests(classID);
            }
        }
    }, [error, loaded, user, classID]);

    if (checked && !available) {
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
                >
                    <MotionBox
                        animate={{ y: [-5, 5, -5] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        display="inline-block"
                        mb={6}
                    >
                        <FiBookOpen size="48px" color="#4F46E5" />
                    </MotionBox>
                    <Heading
                        backgroundColor="#4F46E5"
                        bgClip="text"
                        fontSize="4xl"
                        fontWeight="extrabold"
                        mb={4}
                    >
                        No Class Found
                    </Heading>
                    <Text color="gray.600" fontSize="lg" mb={6}>
                        Class details not available. Please try again later.
                    </Text>
                    <MotionButton
                        w="100%"
                        size="lg"
                        colorScheme="purple"
                        backgroundColor="#4F46E5"
                        _hover={{ bgGradient: 'linear(to-r, #6366f1, #a855f7)', transform: 'scale(1.02)' }}
                        _active={{ transform: 'scale(0.98)' }}
                        onClick={() => navigate("/student/joinClass")}
                        rightIcon={<FiArrowRight />}
                        fontWeight="bold"
                        borderRadius="xl"
                        py={6}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Join a Class
                    </MotionButton>
                </MotionBox>
            </MotionBox>
        );
    }

    if (available && !error && loaded && user && studentsList != null) return (
        <Box width="100%" height="100%" display="flex" justifyContent="center" alignItems="center" flexDir="column" mt={10}>
            <Tabs.Root variant="enclosed" maxW="1200px" width="100%" value={value} onValueChange={(e) => setValue(e.value)}>
                <Box display="flex" justifyContent="center" width="100%">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Tabs.List display="flex" justifyContent="center" mb={6} width="auto" borderBottom="2px solid" borderColor="gray.200">
                            <Tabs.Trigger value="myClass" backgroundColor="inherit" px={6} py={2} _selected={{ borderBottom: "2px solid", borderColor: "#4DCBA4", color: "#3BA684" }}>
                                My Class
                            </Tabs.Trigger>
                            <Tabs.Trigger value="classQuests" backgroundColor="inherit" px={6} py={2} _selected={{ borderBottom: "2px solid", borderColor: "#4DCBA4", color: "#3BA684" }}>
                                Class Quests
                            </Tabs.Trigger>
                        </Tabs.List>
                    </motion.div>
                </Box>

                <Tabs.Content
                    value="myClass"
                    _open={{
                        animationName: "fade-in, scale-in",
                        animationDuration: "300ms",
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Box display="flex" justifyContent={"center"} flexDir="column">
                            <Heading fontSize="30px">My Class</Heading>
                            <Box maxH={"70dvh"} p={4} bg="#E5ECFF" borderRadius="xl" boxShadow="md" overflowX="auto" mt={10}>
                                <Table.Root size="sm">
                                    <Table.Header>
                                        <Table.Row bg="bg.subtle">
                                            <Table.ColumnHeader>Student Name</Table.ColumnHeader>
                                            <Table.ColumnHeader>League</Table.ColumnHeader>
                                            <Table.ColumnHeader>Current Points</Table.ColumnHeader>
                                            <Table.ColumnHeader>Total Points</Table.ColumnHeader>
                                            <Table.ColumnHeader>Redemptions</Table.ColumnHeader>
                                            <Table.ColumnHeader>Student Email</Table.ColumnHeader>
                                            <Table.ColumnHeader>Parent Email</Table.ColumnHeader>
                                            
                                        </Table.Row>
                                    </Table.Header>

                                    <Table.Body>
                                        {studentsList.map((student, index) => (
                                            <Table.Row key={index}>
                                                <Table.Cell color="black">
                                                    <Flex gap={2} align="center">
                                                        <LuDiamond />
                                                        {student.name}
                                                    </Flex>
                                                </Table.Cell>
                                                <Table.Cell color="black">
                                                    <Image
                                                        src={
                                                            student.league === "Gold"
                                                                ? "/gold-medal.png"
                                                                : student.league === "Silver"
                                                                ? "/silver-medal.png"
                                                                : "/bronze-medal.png"
                                                        }
                                                        alt={student.league}
                                                        w="30px"
                                                        h="30px"
                                                    />
                                                </Table.Cell>
                                                <Table.Cell color="black">{student.currentPoints}</Table.Cell>
                                                <Table.Cell color="black">{student.totalPoints}</Table.Cell>
                                                <Table.Cell color="black">{student.redemptions ? student.redemptions : 0}</Table.Cell>
                                                <Table.Cell color="black">{student.email ? student.email : "N/A"}</Table.Cell>
                                                <Table.Cell color="black">{student.parentEmail ? student.parentEmail : "N/A"}</Table.Cell>
                                            </Table.Row>
                                        ))}
                                    </Table.Body>
                                </Table.Root>
                            </Box>
                        </Box>
                    </motion.div>
                </Tabs.Content>

                <Tabs.Content
                    value="classQuests"
                    _open={{
                        animationName: "fade-in, scale-in",
                        animationDuration: "300ms",
                    }}
                >
                    <Heading fontSize="30px">Class Quests</Heading>
                    <Stack gap={4} overflowY="auto" h="calc(100% - 60px)" mt={10}>
                        {classQuests.map((quest, index) => (
                            <Box
                                key={index}
                                w="100%"
                                p={4}
                                bg={quest.completed === quest.totalAmountToComplete ? "#C6F6D5" : "#EDEEFC"}
                                borderRadius="xl"
                                transition="all 0.3s ease"
                                opacity={quest.completed === quest.totalAmountToComplete ? 0.7 : 1}
                                _hover={{ transform: 'translateY(-4px)', boxShadow: 'lg' }}
                            >
                                <Stack align="start" gap={2}>
                                    {/* Quest Title and Points */}
                                    <Flex w="100%" justify="space-between">
                                        <Flex direction="row" align="center" gap={2}>
                                            <Text fontSize="lg" fontWeight="bold" color="black">
                                                {quest.questTitle}
                                            </Text>
                                            <Badge variant="solid" bg="#AEC7ED" color="black" borderRadius="full" px={2} py={1}>
                                                {quest.questType}
                                            </Badge>
                                        </Flex>
                                        <Badge variant="solid" bg="white" color="black" borderRadius="full" px={2} py={1}>
                                            {quest.questPoints}

                                            <Text as={PiCloverFill} boxSize={5} color="#2CD776" />
                                        </Badge>
                                    </Flex>

                                    {/* Quest Description */}
                                    <Text fontSize="sm" color="gray.600">
                                        {quest.questDescription}
                                    </Text>
                                </Stack>

                                {/* Progress Bar */}
                                <Box w="100%" mt={2} textAlign="left">
                                    {quest.amountCompleted === quest.totalAmountToComplete ? (
                                        <Text fontSize="sm" color="black" fontWeight="bold">
                                            ✅ Quest Completed!
                                        </Text>
                                    ) : (
                                        <Text fontSize="sm" color="black" fontWeight="bold">
                                            {quest.amountCompleted} / {quest.totalAmountToComplete} Completed
                                        </Text>
                                    )}
                                    <Progress.Root w="100%" value={quest.amountCompleted} max={quest.totalAmountToComplete} mt={2}>
                                        <Stack direction="row" justify="space-between" align="center">
                                            <Progress.Track flex="1">
                                                {quest.amountCompleted === quest.totalAmountToComplete ? (
                                                    <Progress.Range bg="#2CD776" />
                                                ) : (
                                                    <Progress.Range bg="#6A6AFF" />
                                                )}
                                            </Progress.Track>
                                            <Progress.ValueText>{quest.amountCompleted / quest.totalAmountToComplete}%</Progress.ValueText>
                                        </Stack>
                                    </Progress.Root>
                                </Box>
                            </Box>
                        ))}
                    </Stack>
                </Tabs.Content>
            </Tabs.Root>
        </Box>
    );
}

export default MyClass;