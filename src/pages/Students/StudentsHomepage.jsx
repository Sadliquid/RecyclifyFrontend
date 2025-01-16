/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Heading, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MiniCalendar from '../../components/Students/MiniCalendar';
import StudentCharts from '../../components/Students/StudentCharts';
import StudentProfileCard from '../../components/Students/StudentProfileCard';
import StudentTaskCard from '../../components/Students/StudentTaskCard';
import StreakCard from '../../components/Students/StreakCard';
import StreakRewardCard from '../../components/Students/StreakRewardCard';
import server from "../../../networking";
import ShowToast from '../../Extensions/ShowToast';
import { Toaster } from "@/components/ui/toaster";

function StudentsHomepage() {
    const [studentTasks, setStudentTasks] = useState([]);
    const [studentProfile, setStudentProfile] = useState({});

    const { user, loaded, error, authToken } = useSelector((state) => state.auth);

    const navigate = useNavigate();

    const fetchStudentTasks = async (studentID) => {
        try {
            const response = await server.get(`/api/student/get-student-tasks?studentID=${studentID}`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status == 200) {
                setStudentTasks(response.data);
            } else {
                console.error("Failed to fetch tasks:", response.data);
            }
        } catch (error) {
            console.error("Failed to fetch tasks:", error);
        }
    }

    const fetchStudentProfile = async (studentID) => {
        try {
            const response = await server.get(`/api/student/get-student?studentID=${studentID}`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status == 200) {
                setStudentProfile(response.data);
            }
        } catch (error) {
            console.error("Failed to fetch student data:", error);
            ShowToast("error", "Error", "Failed to fetch student data");
        }
    }

    useEffect(() => {
        if (!error) {
            if (loaded) {
                if (!user) {
                    navigate("/auth/login");
                    ShowToast("error", "You are not logged in", "Please log in first");
                } else if (user.userRole != "student") {
                    navigate("/auth/login");
                    ShowToast("error", "Access denied", "Please log in as a student");
                }
            }
        } else {
            ShowToast("error", "Error", "An error occured while fetching user state");
        }
    }, [loaded]);

    useEffect(() => {
        if (!error && loaded && user && user.userRole == "student") {
            fetchStudentTasks(user.id);
            fetchStudentProfile(user.id);
        }
    }, [loaded]);

    if (!loaded) {
        return (
            <Box display="flex" flexDir={"column"} justifyContent="center" alignItems="center" width="100%" height="100%">
                <Spinner />
            </Box>
        )
    }

    return (
        <>
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
                    <Box height="29%" border={"3px solid #4DCBA4"} borderRadius={20} display={"flex"} backgroundColor={"white"}>
                        <StudentProfileCard user={user} studentProfile={studentProfile} />
                    </Box>

                    <Box display="flex" flexDir={"column"} justifyContent={"center"} height="69%" backgroundColor={"#E5ECFF"} borderRadius={20}>
                        <Heading fontSize={24} fontWeight={"bold"} mt={3}>Daily tasks</Heading>

                        <Box display="flex" flexDir={"column"} justifyContent={"space-between"} mt={2} mb={2} borderRadius={20} margin="auto" height="80%" width="90%">
                            {studentTasks.length != 0 ? (
                                studentTasks.map((task, index) => (
                                    <StudentTaskCard
                                        key={index}
                                        TaskID={task.taskID}
                                        TaskTitle={task.taskTitle}
                                        TaskDescription={task.taskDescription}
                                        TaskPoints={task.taskPoints}
                                    />
                                ))
                            ) : (
                                <Box display="flex" justifyContent="center" alignItems="center" width="100%" height="100%">
                                    <Spinner />
                                </Box>
                            )}
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Toaster />
        </>
    )
}

export default StudentsHomepage;