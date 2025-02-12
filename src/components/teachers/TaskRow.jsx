import { Box, Text, Badge } from "@chakra-ui/react";

const TaskRow = ({ task, formatDate }) => {
    console.log("TaskRow received task:", task);
    if (!task) return null; // Prevent errors if task is undefined
    if (!formatDate) formatDate = () => ""; // set format date to empty string if not provided
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

            {/* Task details */}
            <Text fontWeight="bold">
                {task.student?.name} from Class {task.class?.className} has uploaded {task.imageUrls?.split(",").length || 0} images for verification.
            </Text>
            <Text fontSize="sm">{formatDate(task.dateAssigned)}</Text>

            {/* Status Badges */}
            {task.taskVerified && <Badge colorScheme="blue">Verified</Badge>}
            {task.taskRejected && <Badge colorScheme="red">Rejected</Badge>}
        </Box>
    );
};

export default TaskRow;
