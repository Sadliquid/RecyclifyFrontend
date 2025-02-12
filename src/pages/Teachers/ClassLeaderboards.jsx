import { Box, Flex, Heading } from "@chakra-ui/react";
import { IoArrowBack } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Leaderboards() {
    const navigate = useNavigate();
    const { user, loaded, error } = useSelector((state) => state.auth);

	if (!error && loaded && user) {
			return (
				<Box>
					<Flex direction="row" align="center" justify="space-between" h="12vh">
						<Box bg="#96E2D6" borderRadius="full" p={2}>
							<IoArrowBack size={50} color="black" cursor="pointer" onClick={() => navigate(`/teachers`)} />
						</Box>
						<Box mt={4} fontSize="2xl" textAlign="center" flex="1" mr={20}>
							<Heading fontSize={40} fontWeight="bold" mb={4}>
								Leaderboards
							</Heading>
						</Box>
					</Flex>
				</Box>
			);
		}
}

export default Leaderboards