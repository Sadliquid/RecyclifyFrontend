import { Box, Text, Heading } from '@chakra-ui/react';
import MiniCalendar from '../../components/Students/MiniCalendar';
import StudentCharts from '../../components/Students/StudentCharts';
import StudentProfileCard from '../../components/Students/StudentProfileCard';
import StudentTaskCard from '../../components/Students/StudentTaskCard';
import StreakCard from '../../components/Students/StreakCard';
import StreakRewardCard from '../../components/Students/StreakRewardCard';

function StudentsHomepage() {
    return (
        <Box display="flex" justifyContent={"space-between"} width="100%" height={"77vh"} mt={10}>
            <Box display="flex" width="69%" height={"100%"} backgroundColor={"#E5ECFF"} borderRadius={20}>
                <Box display={"flex"} flexDir={"column"} justifyContent={"space-between"} width="100%">
                    <Heading fontSize="30px" mt={3}>Dashboard</Heading>

                    <Box display={"flex"} flexDir={"column"} justifyContent={"center"} mt={2} mb={2} width="100%" height="100%">
                        <Box backgroundColor={"white"} borderRadius={20} width={"95%"} height={"50%"} mt={5} display={"flex"} justifyContent={"center"} alignItems={"center"} margin="auto">
                            <StudentCharts />
                        </Box>

                        <Box display={"flex"} justifyContent={"space-between"} margin="auto" width="95%" height={"50%"}>
                            <Box width="49%" backgroundColor={"white"} borderRadius={20} display={"flex"} height={"30vh"} justifyContent={"center"} alignItems={"center"} mt="auto" mb="auto">
                                <MiniCalendar />
                            </Box>

                            <Box width="49%" borderRadius={20} display="flex" flexDirection="column" height="30vh" justifyContent="space-between" alignItems="center" mt="auto" mb="auto">
                                <Box width="100%" height="45%" backgroundColor="white" display="flex" justifyContent="center" alignItems="center" borderRadius={20}>
                                    <StreakCard />
                                </Box>

                                <Box width="100%" height="45%" backgroundColor="white" display="flex" justifyContent="center" alignItems="center" borderRadius={20}>
                                    <StreakRewardCard />
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Box display="flex" flexDir={"column"} justifyContent={"space-between"} width="29%" height={"100%"} borderRadius={20}>
                <Box height="29%" border={"3px solid #4DCBA4"} borderRadius={20} alignItems={"center"} display={"flex"} justifyContent={"center"} backgroundColor={"white"}>
                    <StudentProfileCard />
                </Box>

                <Box display="flex" flexDir={"column"} justifyContent={"center"} height="69%" backgroundColor={"#E5ECFF"} borderRadius={20}>
                    <Text fontSize={24} fontWeight={"bold"} mt={3}>Daily tasks</Text>

                    <Box display="flex" flexDir={"column"} justifyContent={"space-between"} mt={2} mb={2} borderRadius={20} margin="auto" height="80%" width="90%">
                        {[...Array(3)].map((_, index) => (
                            <Box key={index} display="flex" justifyContent={"center"} alignItems={"center"} width="90%" height="29%" borderRadius={20} margin="auto" border={"3px solid #4DCBA4"} backgroundColor={"white"}>
                                <StudentTaskCard />
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
export default StudentsHomepage;