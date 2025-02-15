/* eslint-disable react/prop-types */
import { Box, Text, Badge, Button, Stack, Image, Flex } from "@chakra-ui/react";
import { DialogActionTrigger, DialogBody, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import server from "../../../networking";
import { FaLeaf, FaStar } from "react-icons/fa";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { Input } from "@chakra-ui/react"
import { toaster } from "@/components/ui/toaster"
import { Field } from "@/components/ui/field"
import { useSelector } from "react-redux";
import StudentAvatar from "./StudentAvatar";

const TaskRow = ({ task, fetchTasks }) => {
    const [open, setOpen] = useState(false);
    const { user } = useSelector((state) => state.auth);
    const [rejectDescription, setRejectDescription] = useState("");
    const image = task.imageUrls ? task.imageUrls.split(",") : [];

    const handleRejectInput = (e) => {
        let value = e.target.value;
        if (value.length > 80) return;
        setRejectDescription(value);
    };

    const handleVerify = async () => {
        const verifyPromise = new Promise((resolve, reject) => {
            server.put(
                `/api/Teacher/verify-student-task?teacherID=${user.id}&studentID=${task.student.studentID}&taskID=${task.taskID}`
            )
                .then((response) => {
                    if (response.status === 200) {
                        fetchTasks();
                        setOpen(false);
                        resolve();
                    } else {
                        reject("An unexpected error occurred.");
                    }
                })
                .catch((error) => {
                    console.error("Error verifying task:", error);
                    fetchTasks();

                    if (error.response && error.response.data && error.response.data.error && typeof error.response.data.error === "string") {
                        if (error.response.data.error.startsWith("UERROR")) {
                            reject(error.response.data.error.substring("UERROR: ".length));
                        } else {
                            reject(error.response.data.error.substring("ERROR: ".length));
                        }
                    } else {
                        reject("An unexpected error occurred.");
                    }
                });
        });

        // Show toast with promise-based status
        toaster.promise(verifyPromise, {
            loading: { title: "Verifying task...", description: "Please wait while the task is being verified." },
            success: { title: "Task Verified Successfully!", description: "The task has been verified." },
            error: (errorMessage) => ({
                title: "Error Verifying Task",
                description: errorMessage,
            }),
        });
    };

    const handleReject = async (rejectionReason) => {
        const rejectPromise = new Promise((resolve, reject) => {
            server.put(
                `/api/Teacher/reject-student-task`,
                null,
                {
                    params: {
                        teacherID: user.id,
                        studentID: task.student.studentID,
                        taskID: task.taskID,
                        rejectionReason: rejectionReason,
                    },
                }
            )
                .then((response) => {
                    if (response.status === 200) {
                        fetchTasks();
                        setOpen(false);
                        resolve();
                    } else {
                        reject("Unexpected response status");
                    }
                })
                .catch((error) => {
                    console.error("Error rejecting task:", error);
                    fetchTasks();

                    if (error.response?.status === 400 && error.response.data?.error) {
                        reject(error.response.data.error.split("UERROR: ")[1] || "An error occurred.");
                    } else {
                        reject("Please try again.");
                    }
                });
        });

        // Show toast with promise-based status
        toaster.promise(rejectPromise, {
            loading: { title: "Rejecting task...", description: "Please wait while the task is being rejected." },
            success: { title: "Task Rejected Successfully!", description: "The task has been rejected." },
            error: (errorMessage) => ({
                title: "Error Rejecting Task",
                description: errorMessage,
            }),
        });
    };

    if (!task) return null;

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
                    <Flex direction="row" align="center" justify="space-between" w="100%" key={task.taskID} p={4} position="relative" cursor={task.taskVerified || task.taskRejected ? "default" : "pointer"}
                        borderRadius="md" mb={2} justifyContent="space-between" alignItems="center" bg={task.taskVerified ? "green.100" : task.taskRejected ? "red.100" : "blue.100"}>
                        {/* Left Section - Unread dot, student avatar, task details */}
                        <Box display="flex" alignItems="center" gap={2} width={"50%"} >
                            {/* Indicator for unverified tasks */}
                            {!task.taskVerified && !task.taskRejected && (
                                <Box position="absolute" left={4} top="50%" transform="translateY(-50%)" w={2} h={2} bg="blue.500" borderRadius="full" />
                            )}

                            {/* Student Avatar */}
                            <Box w="10%" h="100%" display="flex" justifyContent="center" alignItems="center">
                                <StudentAvatar student={task.student} />
                            </Box>

                            {/* Task details */}
                            <Text noOfLines={1} isTruncated>
                                <Text as="span" fontWeight="bold">
                                    {task.student?.name}
                                </Text>
                                {" from "}
                                <Text as="span" fontWeight="bold">
                                    Class {task.class?.className}
                                </Text>
                                {" has uploaded "}
                                <Text as="span" fontWeight="bold">
                                    {task.imageUrls?.split(",").length || 0}
                                </Text>
                                {" image(s) for verification."}
                            </Text>

                            {/* Status Badges */}
                            {task.taskVerified && <Badge bg="teal" variant="solid" ml={2}>Verified</Badge>}
                            {task.taskRejected && <Badge bg="red" variant="solid" ml={2}>Rejected</Badge>}
                        </Box>

                        {/* Right Section - Date and Status Badges */}
                        <Box display="flex" flexDirection="column" alignItems="flex-end">
                            {task.dateAssigned && (
                                <Text fontSize="sm" fontWeight="bold" color="gray.800">
                                    {task.dateAssigned}
                                </Text>
                            )}
                        </Box>
                    </Flex>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle color="black" fontWeight="bold" textAlign="left">
                            {/* Conditional Render the dialog title */}
                            {task.taskVerified ? "Task Verified" : task.taskRejected ? "Task Rejected" : "Task Verification"}
                        </DialogTitle>
                    </DialogHeader>
                    <DialogBody>
                        <Stack direction="column" gap={4}>
                            <Box borderRadius="md" bg="white">
                                {/* Task Details */}
                                <Stack direction="row" align="center">
                                    <BsFillInfoSquareFill color="#9F9FF8" />
                                    <Box>
                                        <Text fontSize="md" fontWeight="bold">{task.task.taskDescription}</Text>
                                        <Text fontSize="sm" color="gray.500">{task.task.taskInstructions}</Text>
                                    </Box>
                                </Stack>

                                {/* Task Points */}
                                <Stack direction="row" align="center" mt={2}>
                                    <FaStar color="#FFD54B" />
                                    <Flex align="center">
                                        <Text fontSize="md">{task.task.taskPoints}</Text>
                                        <Box w="100%" h="100%" size={30} color="#2CD776" display="flex" justifyContent="center" alignItems="center" ml={1}>
                                            <FaLeaf />
                                        </Box>
                                    </Flex>
                                </Stack>

                                {/* Uploaded Images Carousel */}
                                <Text fontSize="md" mt={4} fontWeight="bold">
                                    Image(s) Uploaded by {task.student.name} from Class {task.class.className}:
                                </Text>

                                {image && (
                                    <Box position="relative" mt={2} p={3} borderRadius="lg" bg="blue.100">
                                        <Image
                                            src={image}
                                            alt={`Uploaded by ${task.student.name}`}
                                            borderRadius="md"
                                            mx="auto"
                                            boxSize="320px"
                                            objectFit="cover"
                                        />
                                    </Box>
                                )}

                                {/* Conditionally render the image helper text and task reject description based on task status */}
                                {!task.taskVerified && !task.taskRejected && (
                                    <>
                                        <Text fontSize="sm" color="gray.600" mt={4} textAlign="center">
                                            Please visit the recycling location to verify recycling items and the quantity is correct, if the task pertains to recycling.
                                        </Text>

                                        <Box mt={4}>
                                            <Field label="Task Reject Description" required>
                                                <Input
                                                    placeholder="Enter rejection reason..."
                                                    value={rejectDescription}
                                                    onChange={handleRejectInput}
                                                    maxLength={80}
                                                />
                                                <Text fontSize="xs" color={rejectDescription.length >= 80 ? "red.500" : "gray.500"}>
                                                    {rejectDescription.length}/80 characters
                                                </Text>
                                            </Field>
                                        </Box>
                                    </>
                                )}

                            </Box>
                        </Stack>
                    </DialogBody>
                    {/* Conditionally render the DialogFooter based on task status */}
                    {!task.taskVerified && !task.taskRejected && (
                        <DialogFooter display="flex" gap={10} justifyContent="center">
                            <DialogActionTrigger asChild>
                                <Button bg="#FF0000" color="white" disabled={rejectDescription.trim().length === 0} onClick={() => handleReject(rejectDescription.trim())}>
                                    Reject
                                </Button>
                            </DialogActionTrigger>
                            {/* disable to verify button if the task is rejecting */}
                            <DialogActionTrigger asChild>
                                <Button bg="#2D65FF" color="white" onClick={handleVerify} disabled={rejectDescription.trim().length > 0}>
                                    Verify
                                </Button>
                            </DialogActionTrigger>
                        </DialogFooter>
                    )}
                </DialogContent>
            </DialogRoot>
        </>
    );
};

export default TaskRow;