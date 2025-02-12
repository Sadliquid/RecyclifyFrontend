import { Box, Text, Badge, Field, Input, Button, Stack} from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import { DialogActionTrigger, DialogBody, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import server from "../../../networking";
import ShowToast from "../../Extensions/ShowToast";
import { useSelector } from "react-redux";

const TaskRow = ({ task, fetchTasks }) => {
    console.log("TaskRow -> task", task)
    if (!task) return null; // Prevent errors if task is undefined
    const [open, setOpen] = useState(false);
    // const [verificationNote, setVerificationNote] = useState("");
    const { user, loaded, error } = useSelector((state) => state.auth);

    const handleVerify = async () => {
        try {
            const response = await server.put(`/api/Teacher/verify-student-task?teacherID=${user.id}&studentID=${task.student.studentID}&taskID=${task.taskID}`);
    
            if (response.status === 200) {
                ShowToast("success", "Task Verified Successfully!", "The task has been verified.");
                fetchTasks(); // Refresh tasks after verifying
                setOpen(false);
            }
        } catch (error) {
            console.error("Error verifying task:", error);
            if (error.response.status === 400) {
                ShowToast("error", "Error Verifying Task", error.response.data.error.split("UERROR: "));
                fetchTasks();
            } else {
                ShowToast("error", "Error Verifying Task", "Please try again.");
                fetchTasks();
            }
        }
    };

    const handleReject = async (rejectionReason) => {
        try {
            const response = await server.put(`/api/Teacher/reject-student-task`, {
                teacherID: user.id,  
                studentID: task.student.studentID,  // Use task.studentID directly
                taskID: task.taskID,  // Use task.taskID directly
                rejectionReason,
            });
    
            if (response.status === 200) {
                ShowToast("success", "Task Rejected Successfully!", "The task has been rejected.");
                fetchTasks(); // Refresh tasks after rejecting
                setOpen(false);
            }
        } catch (error) {
            console.error("Error rejecting task:", error);
            if (error.response.status === 400) {
                ShowToast("error", "Error Verifying Task", error.response.data.error.split("UERROR: "));
                fetchTasks();
            } else {
                ShowToast("error", "Error Rejecting Task", "Please try again.");
                fetchTasks();
            }
        }
    };
    
    return (
        <>
            {/* Task Verification Dialog */}
            <DialogRoot
                size="lg"
                placement="center"
                open={open}
                onOpenChange={(isOpen) => setOpen(isOpen.open)}
            >
                <DialogTrigger asChild>
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
                </DialogTrigger>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Verify Task</DialogTitle>
                    </DialogHeader>
                    <DialogBody>
                        <Stack direction="column" gap={4}>
                            <Text>Do you want to verify or reject this task?</Text>

                            {/* Task details */}
                            <Text>{task.student.name} submitted {task.imageUrls?.split(",").length || 0} images for verification.</Text>
                            <Text>Date Assigned: {task.dateAssigned}</Text>
                        </Stack>
                    </DialogBody>
                    <DialogFooter display="flex" gap={10} justifyContent="center">
                        <DialogActionTrigger asChild>
                            <Button
                                variant="outline"
                                bg="#FF8080"
                                color="white"
                                onClick={() => setOpen(false)}
                            >
                                Cancel
                            </Button>
                        </DialogActionTrigger>
                        <Button bg="#2D65FF" color="white" onClick={handleVerify}>
                            Verify
                        </Button>
                        <Button bg="#FF0000" color="white" onClick={() => handleReject("Image not clear.")}>
                            Reject
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </DialogRoot>
        </>
    );
};

export default TaskRow;
