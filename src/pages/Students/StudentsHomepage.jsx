import { Box, Heading } from '@chakra-ui/react';
import MiniCalendar from '../../components/Students/MiniCalendar';
import StudentCharts from '../../components/Students/StudentCharts';
import StudentProfileCard from '../../components/Students/StudentProfileCard';
import StudentTaskCard from '../../components/Students/StudentTaskCard';
import StreakCard from '../../components/Students/StreakCard';
import StreakRewardCard from '../../components/Students/StreakRewardCard';

function StudentsHomepage() {
    const tasks = [
        { TaskID: "1", TaskTitle: "Recycle 1 plastic bottle", TaskDescription: "Collect and sort plastic bottles for recycling.", TaskPoints: 10 },
        { TaskID: "2", TaskTitle: "Bring reusable food containers", TaskDescription: "Bring your own reusable containers to reduce waste while dining.", TaskPoints: 20 },
        { TaskID: "3", TaskTitle: "Recycle a set of newspapers", TaskDescription: "Collect and recycle old newspapers to reduce paper waste.", TaskPoints: 30 },
        { TaskID: "4", TaskTitle: "Plant a Tree", TaskDescription: "Plant a tree in your community or garden to help the environment.", TaskPoints: 40 },
        { TaskID: "5", TaskTitle: "Bring reusable utensils", TaskDescription: "Bring your own reusable utensils to avoid single-use plastic.", TaskPoints: 50 },
    ];    

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
                    <Heading fontSize={24} fontWeight={"bold"} mt={3}>Daily tasks</Heading>

                    <Box display="flex" flexDir={"column"} justifyContent={"space-between"} mt={2} mb={2} borderRadius={20} margin="auto" height="80%" width="90%">
                        {tasks.sort(() => 0.5 - Math.random()).slice(0, 3).map((task, index) => (
                            <StudentTaskCard
                                key={index}
                                TaskID={task.TaskID}
                                TaskTitle={task.TaskTitle}
                                TaskDescription={task.TaskDescription}
                                TaskPoints={task.TaskPoints}
                            />
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default StudentsHomepage;