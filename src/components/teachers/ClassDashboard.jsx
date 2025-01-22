import { Box, Flex, Tabs, Text } from '@chakra-ui/react';
import { FaLeaf } from "react-icons/fa";


function ClassDashboard({ classData, students }) {

    const studentsList = students || [];
    const classDashboardData = classData || {};

    console.log("Class Dashboard Data: ", classDashboardData);
    console.log("Students List: ", studentsList);

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
                                Class Top Contributors
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
                                                <Box w="45%" h="100%" fontSize="3xl" fontWeight="bold" display="flex" justifyContent="left" alignItems="center">
                                                    {classData.classPoints}
                                                </Box>
                                                <Box w="55%" h="100%" size={30} color="#2CD776" display="flex" justifyContent="left" alignItems="center">
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
                                                <Box w="45%" h="100%" fontSize="3xl" fontWeight="bold" display="flex" justifyContent="left" alignItems="center">
                                                    {classData.classPoints}
                                                </Box>
                                                <Box w="55%" h="100%" size={30} color="#2CD776" display="flex" justifyContent="left" alignItems="center">
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
