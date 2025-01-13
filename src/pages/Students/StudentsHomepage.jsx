import { Box, Text, Heading } from '@chakra-ui/react';

function StudentsHomepage() {
    return (
        <Box display="flex" justifyContent={"space-between"} width="100%" height={"77vh"} mt={10}>
            <Box display="flex" width="69%" height={"100%"} backgroundColor={"#E5ECFF"} borderRadius={20}>
                <Box display={"flex"} flexDir={"column"} justifyContent={"space-between"} width="100%">
                    <Heading fontSize="30px" mt={3}>Dashboard</Heading>

                    <Box display={"flex"} flexDir={"column"} justifyContent={"center"} mt={2} mb={2} width="100%" height="100%">
                        <Box backgroundColor={"white"} borderRadius={20} width={"95%"} height={"50%"} mt={5} display={"flex"} justifyContent={"center"} alignItems={"center"} margin="auto">
                            <Text fontSize={20} fontWeight={"bold"}>Charts</Text>
                        </Box>

                        <Box display={"flex"} justifyContent={"space-between"} margin="auto" width="95%" height={"50%"}>
                            <Box width="49%" backgroundColor={"white"} borderRadius={20} display={"flex"} height={"30vh"} justifyContent={"center"} alignItems={"center"} margin="auto">
                                <Text fontSize={20} fontWeight={"bold"}>Calendar</Text>
                            </Box>

                            <Box width="49%" backgroundColor={"white"} borderRadius={20} display={"flex"} height={"30vh"} justifyContent={"center"} alignItems={"center"} margin="auto">
                                <Text fontSize={20} fontWeight={"bold"}>Stuff</Text>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Box display="flex" flexDir={"column"} justifyContent={"space-between"} width="29%" height={"100%"} borderRadius={20}>
                <Box height="29%" border={"3px solid #4DCBA4"} borderRadius={20} alignItems={"center"} display={"flex"} justifyContent={"center"} backgroundColor={"white"}>
                    <Text fontSize={24} fontWeight={"bold"}>Profile card</Text>
                </Box>

                <Box display="flex" flexDir={"column"} justifyContent={"center"} height="69%" backgroundColor={"#E5ECFF"} borderRadius={20}>
                    <Text fontSize={24} fontWeight={"bold"} mt={3}>Daily tasks</Text>

                    <Box display="flex" flexDir={"column"} justifyContent={"space-between"} mt={2} mb={2} borderRadius={20} margin="auto" height="80%" width="90%">
                        <Box display="flex" justifyContent={"center"} alignItems={"center"} width="90%" height="29%" borderRadius={20} margin="auto" border={"3px solid #4DCBA4"} backgroundColor={"white"}>
                            <Text fontSize={20} fontWeight={"bold"}>Task 1</Text>
                        </Box>

                        <Box display="flex" justifyContent={"center"} alignItems={"center"} width="90%" height="29%" borderRadius={20} margin="auto" border={"3px solid #4DCBA4"} backgroundColor={"white"}>
                            <Text fontSize={20} fontWeight={"bold"}>Task 2</Text>
                        </Box>

                        <Box display="flex" justifyContent={"center"} alignItems={"center"} width="90%" height="29%" borderRadius={20} margin="auto" border={"3px solid #4DCBA4"} backgroundColor={"white"}>
                            <Text fontSize={20} fontWeight={"bold"}>Task 3</Text>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
export default StudentsHomepage;