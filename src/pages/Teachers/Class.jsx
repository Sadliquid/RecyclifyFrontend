import React from 'react';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { IoArrowBack } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';
import ClassTabs from '../../components/teachers/ClassTabs';

function Class() {
    const { id } = useParams();
    const navigate = useNavigate();

    const classes = [
        { id: 1, className: '201', year: 'Year 2 Class 1', image: '../../../src/assets/class1.jpg', bgColor: '#96E2D6' },
        { id: 2, className: '301', year: 'Year 3 Class 1', image: '../../../src/assets/class2.jpg', bgColor: '#AEC7ED' },
        { id: 3, className: '401', year: 'Year 4 Class 1', image: '../../../src/assets/class3.jpg', bgColor: '#D9D9D9' },
    ];

    const classId = classes.findIndex((classItem) => classItem.id === parseInt(id));

    return (
        <Box>
            <Flex direction="row" align="center" justify="flex-start" h="12vh">
                <Box bg={classes[classId].bgColor} borderRadius="full" p={2}>
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
            <ClassTabs />
        </Box>
    );
}

export default Class;
