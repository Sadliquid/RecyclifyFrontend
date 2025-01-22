import { Box, Flex, Tabs } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import server from "../../../networking";

function ClassDashboard({ classData, students }) {

    const studentsList = students || [];
    const classDashboardData = classData || {};

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
                                        <Box w="100%" h="20%" fontWeight="bold">Total Class Clovers</Box>
                                        <Box w="100%" h="70%" fontSize="3xl" fontWeight="bold">{classData.classPoints}</Box>
                                        </Flex>
                                    </Box >
                                    {/* Weekly Class Clovers */}
                                    <Box w="100%" h="50%" bg="white" borderRadius="xl" boxShadow="md" color="black" textAlign="center" display="flex" alignItems="center" justifyContent="center">
                                        Weekly Class Clovers
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
