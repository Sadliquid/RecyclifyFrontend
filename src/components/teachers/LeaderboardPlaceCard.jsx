/* eslint-disable react/prop-types */
import { Box, HStack, Text } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import { useSelector } from "react-redux";

function LeaderboardPlaceCard({ rank, schoolClass }) {
    const { user, loaded, error } = useSelector((state) => state.auth);

    // Assuming user has a classID field
    const isUserClass = !error && loaded && schoolClass.classID === user.classID;

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
            border={isUserClass ? "2px solid #4DCBA4" : "none"}
        >
            {/* Rank Column */}
            <Box width="10%" textAlign="center">
                <Text fontSize="lg" fontWeight="bold">{rank}</Text>
            </Box>

            {/* Class Name Column */}
            <Box display="flex" alignItems="center" justifyContent="flex-start" width="40%">
                <Text fontSize="md" fontWeight="bold" textAlign="left">
                    {schoolClass.className}
                </Text>
            </Box>

            {/* Class Points Column */}
            <Box width="20%" textAlign="center">
                <Text fontSize="md" fontWeight="bold" color="#2CD776">{schoolClass.classPoints}</Text>
            </Box>
        </HStack>
    );
}

export default LeaderboardPlaceCard;
