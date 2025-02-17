/* eslint-disable react/prop-types */
import { Box, Text, Flex } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";

const NotificationRow = ({ message }) => {
    return (
        <Flex direction="row" align="center" justify="space-between" w="100%" key={message.id} p={4} position="relative"
            borderRadius="md" mb={2} bg={"gray.100"}>
            <Box display="flex" alignItems="center" gap={2} flex={1}>
                <Box w="40px" h="40px" display="flex" justifyContent="center" alignItems="center">
                    <Avatar src={"/defaultPfp.jpg"} size="sm" cursor="pointer" />
                </Box>
                <Text fontWeight="bold" whiteSpace="normal" wordBreak="break-word">
                    {message.message}
                </Text>
            </Box>
            <Box display="flex" flexDirection="column" alignItems="flex-end">
                {message.date && (
                    <Text fontSize="sm" fontWeight="bold" color="gray.800">
                        {message.date}
                    </Text>
                )}
            </Box>
        </Flex>
    );
};

export default NotificationRow;