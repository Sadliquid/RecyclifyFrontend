import { Box, Flex, Heading } from "@chakra-ui/react";
import { IoArrowBack } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function TaskVerificaiton() {
	const { id } = useParams();
    const navigate = useNavigate();
    const { user, loaded, error } = useSelector((state) => state.auth);

    // useEffect(() => {
    //     if (!error && loaded && user && user.userRole == "teacher") {
    //         if (id) {
    //         }
    //     }
    // }, [loaded && id]);

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
            </Box>
        );
    }
}

export default TaskVerificaiton