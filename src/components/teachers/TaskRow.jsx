import { Box, Text, Badge, Button, Stack, Image, IconButton, Flex } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import { DialogActionTrigger, DialogBody, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import server from "../../../networking";
import { FaStar } from "react-icons/fa";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import { Input } from "@chakra-ui/react"
import { toaster } from "@/components/ui/toaster"
import { Field } from "@/components/ui/field"
import { useSelector } from "react-redux";

const TaskRow = ({ task, fetchTasks }) => {
    console.log("TaskRow -> task", task)
    if (!task) return null; // Prevent errors if task is undefined
    const [open, setOpen] = useState(false);
    // const [verificationNote, setVerificationNote] = useState("");
    const { user, loaded, error } = useSelector((state) => state.auth);
    const [currentImage, setCurrentImage] = useState(0);
    const [rejectDescription, setRejectDescription] = useState("");
    const images = task.imageUrls ? task.imageUrls.split(",") : [];

    const handlePrev = () => {
        setCurrentImage((prev) => (prev > 0 ? prev - 1 : images.length - 1));
    };

    const handleNext = () => {
        setCurrentImage((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    };

    const handleRejectInput = (e) => {
        let value = e.target.value;
        if (value.length > 100) return; // Limit to 100 characters
        setRejectDescription(value);
    };

    const handleVerify = async () => {
        const verifyPromise = new Promise(async (resolve, reject) => {
            try {
                const response = await server.put(
                    `/api/Teacher/verify-student-task?teacherID=${user.id}&studentID=${task.student.studentID}&taskID=${task.taskID}`
                );

                if (response.status === 200) {
                    fetchTasks(); // Refresh tasks after verifying
                    setOpen(false);
                    resolve();
                }
            } catch (error) {
                console.error("Error verifying task:", error);
                fetchTasks();
                if (error.response?.status === 400) {
                    reject(error.response.data.error.split("UERROR: ")[1] || "An error occurred.");
                } else {
                    reject("Please try again.");
                }
            }
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
        const rejectPromise = new Promise(async (resolve, reject) => {
            try {
                const response = await server.put(
                    `/api/Teacher/reject-student-task?teacherID=${user.id}&studentID=${task.student.studentID}&taskID=${task.taskID}&rejectionReason=${rejectionReason}`
                )

                if (response.status === 200) {
                    fetchTasks(); // Refresh tasks after rejecting
                    setOpen(false);
                    resolve();
                }
            } catch (error) {
                console.error("Error rejecting task:", error);
                fetchTasks();
                if (error.response?.status === 400) {
                    reject(error.response.data.error.split("UERROR: ")[1] || "An error occurred.");
                } else {
                    reject("Please try again.");
                }
            }
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

    console.log("TaskRow -> task", task)

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
                    <Flex direction="row" align="center" justify="space-between" w="100%" key={task.taskID} p={4} position="relative"
                        borderRadius="md" mb={2} justifyContent="space-between" alignItems="center" bg={task.taskVerified ? "green.100" : task.taskRejected ? "red.100" : "blue.100"}>
                        {/* Left Section - Unread dot, student avatar, task details */}
                        <Box display="flex" alignItems="center" gap={2} width={"50%"} >
                            {/* Indicator for unverified tasks */}
                            {!task.taskVerified && !task.taskRejected && (
                                <Box position="absolute" left={2} top="50%" transform="translateY(-50%)" w={2} h={2} bg="blue.500" borderRadius="full"/>
                            )}

                            {/* Student Avatar */}
                            <Box w="10%" h="100%" display="flex" justifyContent="center" alignItems="center">
                                <Avatar name={task.student.name} src={"https://bit.ly/dan-abramov"} size="sm" cursor="pointer" />
                            </Box>

                            {/* Task details */}
                            <Text fontWeight="bold" noOfLines={1} isTruncated >
                                {task.student?.name} from Class {task.class?.className} has uploaded {task.imageUrls?.split(",").length || 0} image(s) for verification.
                            </Text>

                            {/* Status Badges */}
                            {task.taskVerified && <Badge bg="teal" variant="solid">Verified</Badge>}
                            {task.taskRejected && <Badge bg="red" variant="solid">Rejected</Badge>}
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
                                    <Text fontSize="md">{task.task.taskPoints} points</Text>
                                </Stack>

                                {/* Uploaded Images Carousel */}
                                <Text fontSize="md" mt={4} fontWeight="bold">
                                    Image(s) Uploaded by {task.student.name} from Class {task.class.className}:
                                </Text>

                                {images.length > 0 && (
                                    <Box position="relative" mt={2} p={3} borderRadius="lg" bg="blue.100">
                                        <Box bg="#96E2D6" borderRadius="full" position="absolute" left={2} top="50%" transform="translateY(-50%)" p={2}>
                                            <IoArrowBack size={30} color="black" cursor="pointer" onClick={handlePrev} />
                                        </Box>
                                        <Image
                                            src={images[currentImage]}
                                            alt={`Uploaded by ${task.student.name}`}
                                            borderRadius="md"
                                            mx="auto"
                                            boxSize="250px"
                                            objectFit="cover"
                                        />
                                        <Box bg="#96E2D6" borderRadius="full" position="absolute" right={2} top="50%" transform="translateY(-50%)" p={2}>
                                            <IoArrowForward size={30} color="black" cursor="pointer" onClick={handlePrev} />
                                        </Box>
                                    </Box>
                                )}

                                {/* Conditionally render the image helper text and task reject description based on task status */}
                                {!task.taskVerified && !task.taskRejected && (
                                    <>
                                        <Text fontSize="sm" color="gray.600" mt={4} textAlign="center">
                                            Please visit the recycling spot to ensure the student recycles the correct items and quantity.
                                        </Text>

                                        <Box mt={4}>
                                            <Field label="Task Reject Description" required>
                                                <Input
                                                    placeholder="Enter reason for rejection..."
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
                            <Button bg="#FF8080" color="white" disabled={rejectDescription.trim().length === 0} onClick={() => handleReject(rejectDescription.trim())}>
                                Reject
                            </Button>
                            <Button bg="#2D65FF" color="white" onClick={handleVerify}>
                                Verify
                            </Button>
                        </DialogFooter>
                    )}
                </DialogContent>
            </DialogRoot>
        </>
    );
};

export default TaskRow;
