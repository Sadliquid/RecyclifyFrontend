import { Box, Tabs } from '@chakra-ui/react';

function ClassQuest({ classData }) {

    return (
        <Tabs.Content value='Class Quest' >
            <Box w="100%" h="65dvh" p={4} bg="#9F9FF8" borderRadius="xl" boxShadow="md">
            </Box>
        </Tabs.Content>
    );
}

export default ClassQuest;
