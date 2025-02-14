/* eslint-disable react/prop-types */
import { Box, Text, Flex } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";

const NotificationRow = ({ message }) => {
    return (
        <>
            <Flex direction="row" align="center" justify="space-between" w="100%" key={message.id} p={4} position="relative"
                borderRadius="md" mb={2} justifyContent="space-between" alignItems="center" bg={"gray.100"}>
                <Box display="flex" alignItems="center" gap={2} width={"50%"} >

                    <Box w="10%" h="100%" display="flex" justifyContent="center" alignItems="center">
                        <Avatar src={"/defaultPfp.jpg"} size="sm" cursor="pointer" />
                    </Box>

                    <Text noOfLines={1} isTruncated>
                        <Text as="span" fontWeight="bold">
                            {message.message}
                        </Text>
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
        </>
    );
};

export default NotificationRow;