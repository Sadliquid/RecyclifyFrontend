import { Box, Heading, Table, Flex, Image, Spinner, Text, Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LuDiamond } from 'react-icons/lu';
import { motion } from 'framer-motion';
import ShowToast from '../../Extensions/ShowToast';
import server from '../../../networking';

function MyClass() {
    const { user, loaded, error } = useSelector((state) => state.auth);
    const [studentsList, setStudentsList] = useState(null);
    const [available, setAvailable] = useState(false)
    const [checked, setChecked] = useState(false);
    const navigate = useNavigate();

    const fetchStudents = async (studentID) => {
        try {
            const response = await server.get(`/api/student/get-class-students?studentID=${studentID}`);
            if (response.status === 200) {
                console.log("First student: ", response.data.data[0]);
                setStudentsList(response.data.data);
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
    };

    useEffect(() => {
        if (!error && loaded && user && user.userRole == "student") {
            fetchStudents(user.id);
        }
    }, [error, loaded, user]);

    if (checked == true && available == false) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Box 
                    display="flex" 
                    justifyContent="center" 
                    alignItems="center" 
                    flexDir="column" 
                    height="80vh"
                >
                    <Spinner 
                        color="#3A9F83" 
                        animationDuration="0.5s" 
                        css={{ "--spinner-track-color": "colors.gray.200" }} 
                    />
                    <Text mt={4}>Class details not available. Please try again later.</Text>
                    <Button backgroundColor={"#4DCBA4"} borderRadius={10} mt={5} onClick={() => navigate("/student/joinClass")}>Join a Class</Button>
                </Box>
            </motion.div>
        )
    }

    if (available && !error && loaded && user && studentsList != null) return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Box display="flex" justifyContent={"center"} flexDir="column" mt={10}>
                <Heading fontSize="30px">My Class</Heading>
                <Box h="70dvh" p={4} bg="#E5ECFF" borderRadius="xl" boxShadow="md" overflowX="auto" mt={10}>
                    <Table.Root size="sm">
                        <Table.Header>
                            <Table.Row bg="bg.subtle">
                                <Table.ColumnHeader>Student Name</Table.ColumnHeader>
                                <Table.ColumnHeader>League</Table.ColumnHeader>
                                <Table.ColumnHeader>Current Points</Table.ColumnHeader>
                                <Table.ColumnHeader>Total Points</Table.ColumnHeader>
                                <Table.ColumnHeader>Redemptions</Table.ColumnHeader>
                                <Table.ColumnHeader>Student Email</Table.ColumnHeader>
                                <Table.ColumnHeader>Parent Email</Table.ColumnHeader>
                                
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {studentsList.map((student, index) => (
                                <Table.Row key={index}>
                                    <Table.Cell color="black">
                                        <Flex gap={2} align="center">
                                            <LuDiamond />
                                            {student.name}
                                        </Flex>
                                    </Table.Cell>
                                    <Table.Cell color="black">
                                        <Image
                                            src={
                                                student.league === "Gold"
                                                    ? "/gold-medal.png"
                                                    : student.league === "Silver"
                                                    ? "/silver-medal.png"
                                                    : "/bronze-medal.png"
                                            }
                                            alt={student.league}
                                            w="30px"
                                            h="30px"
                                        />
                                    </Table.Cell>
                                    <Table.Cell color="black">{student.currentPoints}</Table.Cell>
                                    <Table.Cell color="black">{student.totalPoints}</Table.Cell>
                                    <Table.Cell color="black">{student.redemptions ? student.redemptions : 0}</Table.Cell>
                                    <Table.Cell color="black">{student.email ? student.email : "N/A"}</Table.Cell>
                                    <Table.Cell color="black">{student.parentEmail ? student.parentEmail : "N/A"}</Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Root>
                </Box>
            </Box>
        </motion.div>
    );
}

export default MyClass; 