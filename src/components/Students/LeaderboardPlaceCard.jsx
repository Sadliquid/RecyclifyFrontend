import { Box, HStack, Text } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";

function LeaderboardPlaceCard() {
    return (
        <HStack
            display="flex"
            justifyContent={"space-between"}
            alignItems="center"
            width="98%"
            padding="10px"
            backgroundColor={"#F4F7FF"}
            borderRadius={12}
        >
            <Box width="10%" textAlign="center">
                <Text fontSize="lg" fontWeight="bold">1</Text>
            </Box>

            <Box display="flex" alignItems="center" justifyContent="center" width="30%">
                <Avatar src={"https://bit.ly/dan-abramov"} boxSize="40px" mr={2} />
                <Text fontSize="md" fontWeight="bold">
                    Prakhar
                </Text>
            </Box>

            <Box width="20%" textAlign="center">
                <Text fontSize="md" fontWeight="bold" color="#2CD776">10</Text>
            </Box>

            <Box width="20%" textAlign="center">
                <Text fontSize="md">Bronze</Text>
            </Box>

            <Box
                width="10%"
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    backgroundColor="#FFCF64"
                    borderRadius="50%"
                    width="30px"
                    height="30px"
                >
                    <Text fontSize="sm" fontWeight="bold" color="white">
                        1
                    </Text>
                </Box>
            </Box>
        </HStack>
    )
}

export default LeaderboardPlaceCard