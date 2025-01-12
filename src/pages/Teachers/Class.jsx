import { Box, Flex, Tabs, Text, Heading } from '@chakra-ui/react';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IoArrowBackCircle } from "react-icons/io5";
import { SiGoogleclassroom } from "react-icons/si";
import { PiStudentFill } from "react-icons/pi";

function Class() {
    const { id } = useParams(); // Get the class ID from the URL
    const navigate = useNavigate();

    // Dummy class data
    const classes = [
        { id: 1, className: '201', year: 'Year 2 Class 1', image: '../../../src/assets/class1.jpg', bgColor: '#96E2D6' },
        { id: 2, className: '301', year: 'Year 3 Class 1', image: '../../../src/assets/class2.jpg', bgColor: '#AEC7ED' },
        { id: 3, className: '401', year: 'Year 4 Class 1', image: '../../../src/assets/class3.jpg', bgColor: '#D9D9D9' },
    ];

    // Get the class ID from the URL
    const classId = classes.findIndex((classItem) => classItem.id === parseInt(id));

    return (
        <>
            <Box>
                <Flex direction="row" align="center" justify="flex-start" h="12vh">
                    <IoArrowBackCircle size={70} color="#96E2D6" cursor="pointer" onClick={() => navigate(`/teachers`)} />
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
                <Tabs.List>
                    <Tabs.Trigger value='Class'><SiGoogleclassroom />Class Dashboard</Tabs.Trigger>
                    <Tabs.Trigger value='Students'><PiStudentFill />Students Dashboard</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value='Class'>
                    <Text>Class Dashboard</Text>
                </Tabs.Content>
                <Tabs.Content value='Students'>
                    <Text>Students Dashboard</Text>
                </Tabs.Content>
            </Tabs.Root>
        </>
    );
}

export default Class;
