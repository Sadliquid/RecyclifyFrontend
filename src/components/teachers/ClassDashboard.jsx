import { Box, Flex, Tabs } from '@chakra-ui/react';

function ClassInfo() {
    return (
        <Tabs.Content value='Class' >
            <Box w="100%" h="65dvh" p={4} bg="#9F9FF8" borderRadius="xl" boxShadow="md">
                <Flex gap={4} w="100%" h="100%" padding={4} align="center">
                    <Flex w="80%" h="100%" direction="column" gap={4}>
                        <Flex gap={4} w="100%" h="50%">
                            <Box w="70%" h="100%" p={4} bg="white" borderRadius="xl" boxShadow="md" color="black" textAlign="center" display="flex" alignItems="center" justifyContent="center">
                                Students Contribution
                            </Box>
                            <Box w="30%" h="100%" bg="white" borderRadius="xl" boxShadow="md" color="black" textAlign="center" display="flex" alignItems="center" justifyContent="center">
                                Class Top Contributors
                            </Box>
                        </Flex>
                        <Flex gap={4} w="100%" h="50%">
                            <Flex gap={4} w="70%" h="100%" direction="row">
                                <Box w="70%" h="100%" bg="white" borderRadius="xl" boxShadow="md" color="black" textAlign="center" display="flex" alignItems="center" justifyContent="center">
                                    Month Contribution
                                </Box>
                                <Flex w="30%" h="100%" gap={4} direction="column" >
                                    <Box w="100%" h="50%" bg="white" borderRadius="xl" boxShadow="md" color="black" textAlign="center" display="flex" alignItems="center" justifyContent="center">
                                        Total Class Covers
                                    </Box >
                                    <Box w="100%" h="50%" bg="white" borderRadius="xl" boxShadow="md" color="black" textAlign="center" display="flex" alignItems="center" justifyContent="center">
                                        Weekly Class Covers
                                    </Box>
                                </Flex>
                            </Flex>
                            <Box w="30%" h="100%" bg="white" borderRadius="xl" boxShadow="md" color="black" textAlign="center" display="flex" alignItems="center" justifyContent="center">
                                Flagged Student
                            </Box>
                        </Flex>
                    </Flex>
                    <Box w="20%" h="100%" bg="white" borderRadius="xl" boxShadow="md" color="black" textAlign="center" display="flex" alignItems="center" justifyContent="center" >
                        Leaderboards
                    </Box>
                </Flex>
            </Box>
        </Tabs.Content>
    );
}

export default ClassInfo;
