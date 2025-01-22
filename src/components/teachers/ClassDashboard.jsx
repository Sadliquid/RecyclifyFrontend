import { Box, Flex, Image, Tabs} from '@chakra-ui/react';
import { FaLeaf } from "react-icons/fa";
import { Avatar } from "@/components/ui/avatar";

function ClassDashboard({ classData, students }) {

    const studentsList = students || [];
    const classDashboardData = classData || {};

    console.log("Class Dashboard Data: ", classDashboardData);
    console.log("Students List: ", studentsList);

    // Sort the students by totalPoints in descending order and get the top 3
    const top3Students = studentsList
        .sort((a, b) => b.totalPoints - a.totalPoints)
        .slice(0, 3);

    return (
        <Tabs.Content value='Class' >
            <Box w="100%" h="65dvh" p={4} bg="#9F9FF8" borderRadius="xl" boxShadow="md">
                <Flex gap={4} w="100%" h="100%" padding={4} align="center">
                    <Flex w="80%" h="100%" direction="column" gap={4}>
                        <Flex gap={4} w="100%" h="50%">
                            {/* Student Contribution */}
                            <Box w="70%" h="100%" p={4} bg="white" borderRadius="xl" boxShadow="md" color="black" textAlign="center" display="flex" alignItems="center" justifyContent="center">
                                Students Contribution
                            </Box>
                            {/* Class Top Contributors */}
                            <Box w="30%" h="100%" bg="white" borderRadius="xl" boxShadow="md" color="black" textAlign="center" display="flex" alignItems="center" justifyContent="center">
                                <Flex direction="column" textAlign="left" gap={2} w="90%" h="90%" p={2}>
                                    <Box w="100%" h="20%" fontWeight="bold" fontSize="sm">
                                        Class Top Contributors
                                    </Box>

                                    {/* Top 3 Students Contributor based on their totalPoints */}
                                    <Flex direction="column" w="100%" h="70%" alignItems="center" justifyContent="center" gap={4}>
                                        {top3Students.map((student, index) => (
                                            <Flex key={index} direction="row" w="100%" h="30%" gap={2} alignItems="center" justifyContent="center" borderBottom={index < 2 ? '1px solid #e0e0e0' : 'none'} p={3}>
                                                {/* Rank Icon or Badge */}
                                                <Box w="10%" h="100%" display="flex" justifyContent="center" alignItems="center">
                                                    <Image src={index === 0 ? "/gold-medal.png" : index === 1 ? "/silver-medal.png" : "/bronze-medal.png"}
                                                        alt={`Rank ${index + 1}`} w="100%" h="auto"/>
                                                </Box>
                                                {/* Student Avatar */}
                                                <Box w="10%" h="100%" display="flex" justifyContent="center" alignItems="center">
                                                    <Avatar name={student.user.name} src={"https://bit.ly/dan-abramov"} size="sm" cursor="pointer" />
                                                </Box>
                                                {/* Student's Info */}
                                                <Box w="80%" h="100%" display="flex" justifyContent="space-between" alignItems="center">
                                                    <Box w="60%" fontSize="sm" fontWeight="bold" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{student.user.name}</Box>
                                                    <Box w="30%" fontSize="2xl" fontWeight="bold" display="flex" justifyContent="flex-end">
                                                        {student.totalPoints}
                                                    </Box>
                                                    <Box w="10%" h="100%" size={30} color="#2CD776" display="flex" justifyContent="center" alignItems="center" ml={1}>
                                                        <FaLeaf />
                                                    </Box>
                                                </Box>
                                            </Flex>
                                        ))}
                                    </Flex>
                                </Flex>
                            </Box>

                        </Flex>
                        <Flex gap={4} w="100%" h="50%">
                            <Flex gap={4} w="70%" h="100%" direction="row">
                                {/* Month Contribution */}
                                <Box w="70%" h="100%" bg="white" borderRadius="xl" boxShadow="md" color="black" textAlign="center" display="flex" alignItems="center" justifyContent="center">
                                    Month Contribution
                                </Box>
                                <Flex w="30%" h="100%" gap={4} direction="column" >
                                    {/* Total Class Clovers */}
                                    <Box w="100%" h="50%" bg="white" borderRadius="xl" boxShadow="md" color="black" textAlign="center" display="flex" alignItems="center" justifyContent="center">
                                        <Flex direction="column" textAlign="left" gap={5} w="90%" h="90%" p={2} >
                                            <Box w="100%" h="20%" fontWeight="bold" fontSize="sm">Total Class Clovers</Box>
                                            <Flex direction="row" w="100%" h="70%" alignItems="center" justifyContent="center">
                                                <Box w="35%" h="100%" fontSize="3xl" fontWeight="bold" display="flex" justifyContent="left" alignItems="center">
                                                    {classData.classPoints}
                                                </Box>
                                                <Box w="65%" h="100%" size={30} color="#2CD776" display="flex" justifyContent="left" alignItems="center">
                                                    <FaLeaf />
                                                </Box>
                                            </Flex>
                                        </Flex>
                                    </Box >
                                    {/* Weekly Class Clovers */}
                                    <Box w="100%" h="50%" bg="white" borderRadius="xl" boxShadow="md" color="black" textAlign="center" display="flex" alignItems="center" justifyContent="center">
                                        <Flex direction="column" textAlign="left" gap={5} w="90%" h="90%" p={2} >
                                            <Box w="100%" h="20%" fontWeight="bold" fontSize="sm">Weekly Class Clovers</Box>
                                            <Flex direction="row" w="100%" h="70%" alignItems="center" justifyContent="center">
                                                <Box w="35%" h="100%" fontSize="3xl" fontWeight="bold" display="flex" justifyContent="left" alignItems="center">
                                                    {classData.classPoints}
                                                </Box>
                                                <Box w="65%" h="100%" size={30} color="#2CD776" display="flex" justifyContent="left" alignItems="center">
                                                    <FaLeaf />
                                                </Box>
                                            </Flex>
                                        </Flex>
                                    </Box>
                                </Flex>
                            </Flex>
                            {/* Flagged Student */}
                            <Box w="30%" h="100%" bg="white" borderRadius="xl" boxShadow="md" color="black" textAlign="center" display="flex" alignItems="center" justifyContent="center">
                                Flagged Student
                            </Box>
                        </Flex>
                    </Flex>
                    {/* Leaderboards */}
                    <Box w="20%" h="100%" bg="white" borderRadius="xl" boxShadow="md" color="black" textAlign="center" display="flex" alignItems="center" justifyContent="center" >
                        Leaderboards
                    </Box>
                </Flex>
            </Box>
        </Tabs.Content>
    );
}

export default ClassDashboard;
