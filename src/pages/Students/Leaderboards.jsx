/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Heading, Text, Image, HStack } from '@chakra-ui/react';
import { Avatar } from "@/components/ui/avatar";
import LeaderboardPlaceCard from '../../components/Students/LeaderboardPlaceCard';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import server from "../../../networking";
import { motion } from 'framer-motion';

function Leaderboards() {
    const [allStudents, setAllStudents] = useState([]);
    const [studentsFetched, setStudentsFetched] = useState(false)
    const [sessionStudent, setSessionStudent] = useState(null);
    const [timeLeft, setTimeLeft] = useState("");

    const { user, loaded, error } = useSelector((state) => state.auth);

    const fetchAllStudents = async (studentID) => {
        try {
            const response = await server.get(`/api/student/get-all-students?studentID=${studentID}`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status == 200) {
                console.log(response.data.data)
                setAllStudents(response.data.data);
                setStudentsFetched(true)
                setSessionStudent(response.data.data.find(student => student.studentID == user.id))
            }
        } catch (error) {
            console.error("Failed to fetch student data for leaderboards:", error);
        }
    }

    const calculateTimeLeft = () => {
        const now = new Date();
        const endOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (7 - now.getDay()), 23, 59, 59);
        const difference = endOfWeek - now;
    
        if (difference > 0) {
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / (1000 * 60)) % 60);
            const seconds = Math.floor((difference / 1000) % 60);
            setTimeLeft(`${hours} Hours, ${minutes} Minutes and ${seconds}s`);
        } else {
            setTimeLeft("0 Hours, 0 Minutes and 0s");
        }
    };

    useEffect(() => {
        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, []);
    
    useEffect(() => {
        if (!error && loaded && user && user.userRole == "student") {
            fetchAllStudents(user.id);
        }
    }, [loaded]);

    if (studentsFetched && user != null && sessionStudent != null) return (
        <Box display="flex" justifyContent={"center"} flexDir="column" mt={10} width={"100%"}>
            <Heading fontSize="30px">Leaderboards</Heading>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Box display="flex" justifyContent={"space-between"} width="100%" height={"67vh"} mt={10} boxSizing={"border-box"}>
                    <Box display="flex" flexDir={"column"} justifyContent={"space-between"} width="28%">
                        <Box display="flex" flexDir={"column"} justifyContent={"space-around"} alignItems={"center"} backgroundColor="#E5ECFF" borderRadius={20} height="85%" padding={2}>
                            <Avatar boxSize="150px" src="https://bit.ly/dan-abramov" />
                            <Heading fontSize={"30px"} mt={2}>{user.name}</Heading>
                            <Heading color="#2CD776">{sessionStudent.totalPoints} Leafs</Heading>
                            <Box display="flex" justifyContent={"center"} alignItems={"center"} border="3px solid #4DCBA4" borderRadius={20} height="20%" mt={2} padding={5}>
                                <Box mr={2}>
                                    <Image src={sessionStudent.league === "Bronze" ? "/bronze-medal.png" : sessionStudent.league === "Silver" ? "/silver-medal.png" : "/gold-medal.png"} boxSize={10} mt={2}/>
                                </Box>

                                <Box display="flex" flexDir={"column"} ml={2} >
                                    <Text textAlign={"left"} fontSize={"md"}>{sessionStudent.league} League</Text>
                                    <Text textAlign={"left"} fontSize={"sm"}>{sessionStudent.leagueRank == 1 ? "1st" : sessionStudent.leagueRank == 2 ? "2nd" : sessionStudent.leagueRank == 3 ? "3rd" : sessionStudent.leagueRank + "th"} place</Text>
                                </Box>
                            </Box>

                            <Text fontFamily={"Lilita One"} color={"#BFA428"}>Top 3 finalists {sessionStudent.league == "Bronze" ? "advance to the Silver" : sessionStudent.league == "Silver" ? "advance to the Gold" : "keep their places in the Gold"} league!</Text>
                        </Box>

                        <Box display="flex" justifyContent={"center"} flexDir={"column"} alignItems={"center"} backgroundColor="#4DCBA4" borderRadius={20} height="13%">
                            <Text fontFamily={"Lilita One"} color="white">League ends in</Text>
                            <Heading fontSize={"18px"} color="white" ml={2}>{timeLeft}</Heading>
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
            </motion.div>
        </Box>
    )
}

export default Leaderboards