import { Box, Heading } from '@chakra-ui/react';

function SubmittedTasks() {
    return (
        <Box display="flex" justifyContent={"center"} flexDir="column" mt={10}>
            <Heading fontSize="30px">My submitted tasks</Heading>
        </Box>
    )
}

export default SubmittedTasks