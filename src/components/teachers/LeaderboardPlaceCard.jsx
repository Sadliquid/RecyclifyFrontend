/* eslint-disable react/prop-types */
import { Box, HStack, Text, Flex, Image } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { PiCloverFill } from "react-icons/pi";

function LeaderboardPlaceCard({ rank, schoolClass, topContributor }) {
    const { user, loaded, error } = useSelector((state) => state.auth);

    // Assuming user has a classID field
    const isTeacherClass = !error && loaded && schoolClass.teacherID === user.id;

    return (
        <HStack
            mt={3}
            display="flex"
            justifyContent={"space-between"}
            alignItems="center"
            width="98%"
            padding="10px"
            backgroundColor={"#F4F7FF"}
            borderRadius={12}
            border={isTeacherClass ? "2px solid #4DCBA4" : "none"}
        >
            {/* Rank Column */}
            <Box w="10%" h="100%" display="flex" justifyContent="center" alignItems="center">
                {/* Conditionally show the medal image only for ranks 1, 2, or 3 */}
                {(rank === 1 || rank === 2 || rank === 3) && (
                    <Image
                        src={rank === 1 ? "/gold-medal.png" : rank === 2 ? "/silver-medal.png" : "/bronze-medal.png"}
                        alt={`Rank ${rank}`} w="20%" h="auto"
                    />
                )}  
                <Text fontSize="lg" fontWeight="bold">{rank > 3 ? rank : ""}</Text>
            </Box>

            {/* Class Name Column */}
            <Box display="flex" alignItems="center" justifyContent="center" width="20%">
                <Text fontSize="md" fontWeight="bold" textAlign="left">
                    {schoolClass.className}
                </Text>
            </Box>

            {/* Display Top Contributor */}
            <Box width="50%" textAlign="center">
                {topContributor ? (
                    <Flex alignItems="center" justifyContent="center">
                        <Text fontSize="md" fontWeight="bold" >{topContributor.user?.name}</Text>
                    </Flex>
                ) : (
                    <Text fontSize="sm" color="gray.500">No Top Contributor</Text>
                )}
            </Box>

            {/* Class Points Column */}
            <Box width="20%" textAlign="center">
                <Flex alignItems="center" justifyContent="center" gap={2}>
                    <Text fontSize="md" fontWeight="bold">{schoolClass.classPoints}</Text>
                    <Text as={PiCloverFill} boxSize={25} color="#2CD776" mt={1}></Text>
                </Flex>
            </Box>
        </HStack>
    );
}

export default LeaderboardPlaceCard;
