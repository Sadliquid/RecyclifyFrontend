/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Heading, Text, Image, HStack, Button } from '@chakra-ui/react';
import LeaderboardPlaceCard from '../../components/Students/LeaderboardPlaceCard';
import LeaderboardProfileIcon from '../../components/Students/LeaderboardProfileIcon';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import server from "../../../networking";
import ShowToast from '../../Extensions/ShowToast';
import { motion } from 'framer-motion';
import { FiArrowRight, FiTrendingUp } from 'react-icons/fi';

const MotionBox = motion(Box);
const MotionButton = motion(Button);

function Leaderboards() {
    const [allStudents, setAllStudents] = useState([]);
    const [studentsFetched, setStudentsFetched] = useState(false)
    const [sessionStudent, setSessionStudent] = useState(null);
    const [available, setAvailable] = useState(false);
    const [checked, setChecked] = useState(false);
    const navigate = useNavigate();

    const { user, loaded, error } = useSelector((state) => state.auth);

    const fetchAllStudents = async (studentID) => {
        try {
            const response = await server.get(`/api/student/get-all-students?studentID=${studentID}`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status == 200) {
                setAllStudents(response.data.data);
                setStudentsFetched(true)
                setSessionStudent(response.data.data.find(student => student.studentID == user.id))
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
    }
    
    useEffect(() => {
        if (!error && loaded && user && user.userRole == "student") {
            fetchAllStudents(user.id);
        }
    }, [loaded]);

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
                        <FiTrendingUp size="48px" color="#4F46E5" />
                    </MotionBox>
                    <Heading
                        backgroundColor="#4F46E5"
                        bgClip="text"
                        fontSize="4xl"
                        fontWeight="extrabold"
                        mb={4}
                    >
                        Leaderboard Unavailable
                    </Heading>
                    <Text color="gray.600" fontSize="lg" mb={6}>
                        Leaderboard details not available. Please try again later.
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

    if (studentsFetched && user != null && sessionStudent != null) return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Box display="flex" justifyContent={"center"} flexDir="column" mt={10} width={"100%"}>
                <Heading fontSize="30px">Leaderboards</Heading>

                <Box display="flex" justifyContent={"space-between"} width="100%" height={"67vh"} mt={10} boxSizing={"border-box"}>
                    <Box display="flex" flexDir={"column"} justifyContent={"space-between"} width="28%">
                        <Box display="flex" flexDir={"column"} justifyContent={"space-around"} alignItems={"center"} backgroundColor="#E5ECFF" borderRadius={20} height="100%" padding={2}>
                            <LeaderboardProfileIcon userId={user.id} boxSize={"150px"} />
                            <Heading fontSize={"30px"} mt={2}>{user.name}</Heading>
                            <Heading color="#2CD776">{sessionStudent.totalPoints} Leafs</Heading>
                            <Box display="flex" justifyContent={"center"} alignItems={"center"} border="3px solid" borderColor={sessionStudent.league === "Gold" ? "gold" : sessionStudent.league === "Silver" ? "silver" : "#F6B191"} borderRadius={20} height="20%" mt={2} padding={5} width={"90%"}>
                                <Box mr={2}>
                                    <Image src={sessionStudent.league === "Bronze" ? "/bronze-medal.png" : sessionStudent.league === "Silver" ? "/silver-medal.png" : "/gold-medal.png"} boxSize={10} mt={2}/>
                                </Box>

                                <Box display="flex" flexDir={"column"} ml={2} >
                                    <Text textAlign={"left"} fontSize={"md"}>{sessionStudent.league} League</Text>
                                    <Text textAlign={"left"} fontSize={"sm"}>{sessionStudent.leagueRank == 1 ? "1st" : sessionStudent.leagueRank == 2 ? "2nd" : sessionStudent.leagueRank == 3 ? "3rd" : sessionStudent.leagueRank + "th"} place</Text>
                                </Box>
                            </Box>

                            <Text fontFamily={"Lilita One"} color={sessionStudent.league === "Gold" ? "#BFA428" : sessionStudent.league === "Silver" ? "#BFA428" : "#F6B191"} padding={1} fontSize={18}>Top 3 finalists at the end of this league {sessionStudent.league == "Bronze" ? "advance to the Silver" : sessionStudent.league == "Silver" ? "advance to the Gold" : "keep their places in the Gold"} league!</Text>
                        </Box>
                    </Box>

                    <Box
                        display="flex"
                        flexDir={"column"}
                        alignItems={"center"}
                        width="70%"
                        backgroundColor="#E5ECFF"
                        borderRadius={20} 
                        overflowY="auto"
                        padding={4}
                    >
                        <HStack
                            mt={2}
                            display="flex"
                            justifyContent={"space-between"}
                            alignItems="center"
                            width="98%"
                            padding="10px"
                            backgroundColor="#CBD8F7"
                            borderRadius={12}
                            fontWeight="bold"
                        >
                            <Box width="10%" textAlign="center">
                                <Text fontSize="md">Rank</Text>
                            </Box>

                            <Box display="flex" alignItems="center" justifyContent="flex-start" width="30%">
                                <Text fontSize="md">Name</Text>
                            </Box>

                            <Box width="20%" textAlign="center">
                                <Text fontSize="md">Points</Text>
                            </Box>

                            <Box width="20%" textAlign="center">
                                <Text fontSize="md">League</Text>
                            </Box>

                            <Box
                                width="10%"
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Text fontSize="md">Streak</Text>
                            </Box>
                        </HStack>

                        {allStudents.map((student, index) => (
                            <LeaderboardPlaceCard key={index} rank={index + 1} student={student} />
                        ))}
                    </Box>
                </Box>
            </Box>
        </motion.div>
    )
}

export default Leaderboards