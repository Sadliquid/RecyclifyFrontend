import { Box, Flex, Heading, Tabs, Badge, Text } from "@chakra-ui/react";
import { IoArrowBack } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import server from "../../../networking";
import ShowToast from "../../Extensions/ShowToast";
import TaskRow from "../../components/teachers/TaskRow";

function TaskVerification() {
    const navigate = useNavigate();
    const { user, loaded, error } = useSelector((state) => state.auth);
    const [tasks, setTasks] = useState({
        all: [],
        unverified: [],
        verified: [],
        rejected: [],
    });

    // Fetch all task data that is assigned to the teacher
    const fetchTasks = async () => {
        try {
            const response = await server.get(`/api/Teacher/get-all-tasks/?teacherID=${user.id}`);
            if (response.status === 200) {
                const data = response.data.data;
                const tasksWaitingVerification = data.tasksWaitingVerification || [];
                const tasksVerified = data.tasksVerified || [];
                const tasksRejected = data.tasksRejected || [];

                setTasks({
                    all: [...tasksWaitingVerification, ...tasksVerified, ...tasksRejected],
                    unverified: tasksWaitingVerification.filter((task) => task.verificationPending),
                    verified: tasksVerified.filter((task) => task.taskVerified),
                    rejected: tasksRejected.filter((task) => task.taskRejected),
                });
            }
        } catch (error) {
            console.error("Error fetching tasks:", error);
            if (error.response.status === 400) {
                ShowToast("error", "Error fetching tasks", error.response.data.message.split("UERROR: "));
                setTasks([]);
            } else {
                ShowToast("error", "Error fetching tasks", "Please try again.");
                setTasks([]);
            }
            setTasks([]);
        }
    };

    useEffect(() => {
        if (!error && loaded && user && user.userRole == "teacher") {
            fetchTasks(user.id);
        }
    }, [loaded]);

    if (!error && loaded && user) {
        return (
            <Box>
                <Flex direction="row" align="center" justify="flex-start" h="12vh">
                    <Box bg="#96E2D6" borderRadius="full" p={2}>
                        <IoArrowBack size={50} color="black" cursor="pointer" onClick={() => navigate(`/teachers`)} />
                    </Box>
                    <Box mt={4} fontSize="2xl" align="left" ml={4}>
                        <Heading fontSize={40} fontWeight="bold" mb={4} textAlign="left">
                            Task Verification
                        </Heading>
                    </Box>
                </Flex>

                <Tabs.Root defaultValue="All">
                    <Tabs.List>
                        <Tabs.Trigger value="All">
                            All {tasks.unverified.length > 0 && <Badge ml={2}>{tasks.unverified.length}</Badge>}
                        </Tabs.Trigger>
                        <Tabs.Trigger value="Unverified">
                            Unverified {tasks.unverified.length > 0 && <Badge ml={2}>{tasks.unverified.length}</Badge>}
                        </Tabs.Trigger>
                        <Tabs.Trigger value="Rejected">Rejected</Tabs.Trigger>
                        <Tabs.Trigger value="Verified">Verified</Tabs.Trigger>
                    </Tabs.List>

                    <Tabs.Content value="All">
                        {tasks.all.map((task) => <TaskRow key={task.taskID} task={task} fetchTasks={fetchTasks} />)}
                    </Tabs.Content>
                    <Tabs.Content value="Unverified">
                        {tasks.unverified.map((task) => <TaskRow key={task.taskID} task={task} fetchTasks={fetchTasks} />)}
                    </Tabs.Content>
                    <Tabs.Content value="Rejected">
                        {tasks.rejected.map((task) => <TaskRow key={task.taskID} task={task} fetchTasks={fetchTasks} />)}
                    </Tabs.Content>
                    <Tabs.Content value="Verified">
                        {tasks.verified.map((task) => <TaskRow key={task.taskID} task={task} fetchTasks={fetchTasks} />)}
                    </Tabs.Content>
                </Tabs.Root>
            </Box>
        );
    }
}

export default TaskVerification