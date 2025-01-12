import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import { useParams } from 'react-router-dom';

function Class() {
    const { id } = useParams(); // Get the class ID from the URL

    return (
        <Box>
            <Text fontSize="2xl" fontWeight="bold">Class Details</Text>
            <Text fontSize="lg">Class ID: {id}</Text>
        </Box>
    );
}

export default Class;
