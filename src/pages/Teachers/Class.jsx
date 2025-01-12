import { Box, Flex, Tabs, Text, Heading, Table, Spacer } from '@chakra-ui/react';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IoArrowBack } from "react-icons/io5";
import { SiGoogleclassroom } from "react-icons/si";
import { PiStudentFill } from "react-icons/pi";
import { LuDiamond } from "react-icons/lu";
import { MdOutlineMoreVert, MdOutlineContentCopy, MdEdit, MdDelete } from "react-icons/md";
import {
    MenuContent,
    MenuItem,
    MenuRoot,
    MenuTrigger,
} from '@/components/ui/menu';

function Class() {
    const { id } = useParams(); // Get the class ID from the URL
    const navigate = useNavigate();

    // Dummy class data
    const classes = [
        { id: 1, className: '201', year: 'Year 2 Class 1', image: '../../../src/assets/class1.jpg', bgColor: '#96E2D6' },
        { id: 2, className: '301', year: 'Year 3 Class 1', image: '../../../src/assets/class2.jpg', bgColor: '#AEC7ED' },
        { id: 3, className: '401', year: 'Year 4 Class 1', image: '../../../src/assets/class3.jpg', bgColor: '#D9D9D9' },
    ];

    //Dummy student data
    const students = [
        { id: 1, name: 'John Doe', currentleafs: 100, totalleafs: 200, redemptions: 2, studentEmail: "joonjunhan@gmail.com", parentEmail: "joonjunhan@gmail.com", flagStatus: false },
        { id: 2, name: 'Jane Smith', currentleafs: 150, totalleafs: 300, redemptions: 3, studentEmail: "janesmith@gmail.com", parentEmail: "parentsmith@gmail.com", flagStatus: false },
        { id: 3, name: 'Alice Johnson', currentleafs: 120, totalleafs: 250, redemptions: 1, studentEmail: "alicejohnson@gmail.com", parentEmail: "parentjohnson@gmail.com", flagStatus: true },
        { id: 4, name: 'Bob Brown', currentleafs: 90, totalleafs: 180, redemptions: 2, studentEmail: "bobbrown@gmail.com", parentEmail: "parentbrown@gmail.com", flagStatus: false },
        { id: 5, name: 'Charlie Davis', currentleafs: 200, totalleafs: 400, redemptions: 4, studentEmail: "charliedavis@gmail.com", parentEmail: "parentdavis@gmail.com", flagStatus: false },
        { id: 6, name: 'Diana Evans', currentleafs: 110, totalleafs: 220, redemptions: 2, studentEmail: "dianaevans@gmail.com", parentEmail: "parentevans@gmail.com", flagStatus: true },
    ];

    // Table cell color list
    const tableCellColorList = ["#EDEEFC", "#E6F1FD"];

    // Get the class ID from the URL
    const classId = classes.findIndex((classItem) => classItem.id === parseInt(id));

    return (
        <>
            <Box>
                <Flex direction="row" align="center" justify="flex-start" h="12vh">
                    <Box bg="#96E2D6" borderRadius="full" p={2}>
                        <IoArrowBack size={50} color="black" cursor="pointer" onClick={() => navigate(`/teachers`)} />
                    </Box>
                    <Box mt={4} fontSize="2xl" align="left" ml={4}>
                        <Heading fontSize={40} fontWeight="bold" mt={8} mb={4} textAlign="left">
                            {classes[classId].className}
                        </Heading>
                        <Text textAlign="left" fontSize="xl" fontWeight="medium">
                            {classes[classId].year}
                        </Text>
                    </Box>
                </Flex>
            </Box>
            <Tabs.Root defaultValue="Class" key="plain" variant="plain" align="center" mt={4}>
                <Tabs.List gap={4} align="center" >
                    <Tabs.Trigger value='Class' bg="#AEC7ED" color="black"
                        _selected={{
                            bg: "#B9D4FF",
                            color: "black",
                            border: "2px solid #000",
                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                            fontSize: "1.2rem", 
                            padding: "0.8rem 1.2rem",
                            transition: "all 0.5s ease-in-out"
                        }}>
                        <SiGoogleclassroom />Class Dashboard
                    </Tabs.Trigger>
                    <Tabs.Trigger value='Students' bg="#94E9B8" color="black"
                        _selected={{
                            bg: "#96E2D6",
                            color: "black",
                            border: "2px solid #000",
                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                            fontSize: "1.2rem", 
                            padding: "0.8rem 1.2rem", 
                            transition: "all 0.5s ease-in-out"
                        }}>
                        <PiStudentFill />Students Dashboard
                    </Tabs.Trigger>
                </Tabs.List>
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
                <Tabs.Content value='Students'>
                    <Box w="100%" h="65dvh" p={4} bg="#9F9FF8" borderRadius="xl" boxShadow="md">
                        <Table.ScrollArea rounded="md" height="160px" w="100%" h="100%" overflow="hidden">
                            <Table.Root size="sm" stickyHeader>
                                <Table.Header>
                                    <Table.Row bg="bg.subtle">
                                        <Table.ColumnHeader>Studnet Name</Table.ColumnHeader>
                                        <Table.ColumnHeader>Current Points</Table.ColumnHeader>
                                        <Table.ColumnHeader>Total Points</Table.ColumnHeader>
                                        <Table.ColumnHeader>Redemptions</Table.ColumnHeader>
                                        <Table.ColumnHeader>Student Email</Table.ColumnHeader>
                                        <Table.ColumnHeader>Parent Email</Table.ColumnHeader>
                                        <Table.ColumnHeader >Flag Status</Table.ColumnHeader>
                                        <Table.ColumnHeader textAlign="end"></Table.ColumnHeader>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    {students.map((student, index) => (
                                        <Table.Row key={student.id} bg={index % 2 === 0 ? tableCellColorList[0] : tableCellColorList[1]}>
                                            <Table.Cell color="black"><Flex gap={2} align="center"><LuDiamond />{student.name}</Flex></Table.Cell>
                                            <Table.Cell color="black">{student.currentleafs}</Table.Cell>
                                            <Table.Cell color="black">{student.totalleafs}</Table.Cell>
                                            <Table.Cell color="black">{student.redemptions}</Table.Cell>
                                            <Table.Cell color="black">{student.studentEmail}</Table.Cell>
                                            <Table.Cell color="black">{student.parentEmail}</Table.Cell>
                                            <Table.Cell color="black">{student.flagStatus ? "Flagged" : "Not Flagged"}</Table.Cell>
                                            <Table.Cell>
                                                <MenuRoot positioning={{ placement: 'left-start' }} cursor="pointer">
                                                    <MenuTrigger asChild>
                                                        <Box
                                                            bg={index % 2 === 0 ? tableCellColorList[0] : tableCellColorList[1]}
                                                            p="2"
                                                            borderRadius="full"
                                                            cursor="pointer"
                                                        >
                                                            <MdOutlineMoreVert size={24} color="black" />
                                                        </Box>
                                                    </MenuTrigger>
                                                    <MenuContent
                                                        borderRadius="xl"
                                                        transition="box-shadow 0.3s ease, border-color 0.3s ease"
                                                        transitionDelay="0.1s"
                                                        _hover={{
                                                            boxShadow: 'lg',
                                                            border: '1px solid',
                                                            borderColor: 'gray.200',
                                                        }}
                                                    >
                                                        <MenuItem value="copy-uuid" borderRadius="xl">
                                                            <MdOutlineContentCopy /> Copy UUID
                                                        </MenuItem>
                                                        <MenuItem value="edit-class" borderRadius="xl">
                                                            <MdEdit /> Edit
                                                        </MenuItem>
                                                        <MenuItem value="delete-class" bg="#FF8080" borderRadius="xl">
                                                            <MdDelete /> Delete
                                                        </MenuItem>
                                                    </MenuContent>
                                                </MenuRoot>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table.Root>
                        </Table.ScrollArea>
                    </Box>
                </Tabs.Content>
            </Tabs.Root>
        </>
    );
}

export default Class;
