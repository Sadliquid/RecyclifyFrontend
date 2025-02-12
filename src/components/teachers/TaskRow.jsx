import { Box, Text, Badge } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";

const TaskRow = ({ task }) => {
    if (!task) return null; // Prevent errors if task is undefined
    return (
        <Box
            key={task.taskID}
            p={4}
            borderRadius="md"
            mb={2}
            bg={task.taskVerified ? "blue.100" : task.taskRejected ? "red.100" : "green.100"}
            position="relative"
        >
            {/* Indicator for unverified tasks */}
            {!task.taskVerified && !task.taskRejected && (
                <Box
                    position="absolute"
                    left={2}
                    top="50%"
                    transform="translateY(-50%)"
                    w={2}
                    h={2}
                    bg="blue.500"
                    borderRadius="full"
                />
            )}

            {/* Student Avatar */}
            <Box w="10%" h="100%" display="flex" justifyContent="center" alignItems="center">
                <Avatar name={task.student.name} src={"https://bit.ly/dan-abramov"} size="sm" cursor="pointer" />
            </Box>

            {/* Task details */}
            <Text fontWeight="bold">
                {task.student?.name} from Class {task.class?.className} has uploaded {task.imageUrls?.split(",").length || 0} images for verification.
            </Text>
            {task.dateAssigned && (
                <Text fontSize="sm">{task.dateAssigned}</Text>
            )}

            {/* Status Badges */}
            {task.taskVerified && <Badge colorScheme="blue">Verified</Badge>}
            {task.taskRejected && <Badge colorScheme="red">Rejected</Badge>}
        </Box>
    );
};

export default TaskRow;
