/* eslint-disable react/prop-types */
import { DialogActionTrigger, DialogBody, DialogCloseTrigger, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { HoverCardArrow, HoverCardContent, HoverCardRoot, HoverCardTrigger } from "@/components/ui/hover-card"
import { FileUploadDropzone, FileUploadRoot } from "@/components/ui/file-upload"
import { CloseButton } from "@/components/ui/close-button";
import { Box, Text, Button, Badge, Stack } from '@chakra-ui/react';
import { FaCamera, FaExclamationTriangle } from 'react-icons/fa';
import { useState } from 'react';
import { toaster } from "@/components/ui/toaster";
import { motion } from "framer-motion";
import ShowToast from '../../Extensions/ShowToast';
import server from "../../../networking";

function StudentTaskCard({ studentID, TaskID, TaskTitle, TaskDescription, TaskPoints, VerificationPending, TaskVerified }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isVerificationPending, setIsVerificationPending] = useState(VerificationPending);
    const [submissionReady, setSubmissionReady] = useState(false);

    const handleFileChange = (details) => {
        const file = details.acceptedFiles[0];
        setSelectedFile(file);
        setSubmissionReady(!!file);
    }

    const clearFile = () => {
        setSelectedFile(null);
        setSubmissionReady(false);
    };

    const handleSubmitTask = async () => {
        if (!selectedFile) {
            toaster.promise(Promise.reject(), {
                error: {
                    title: "Error",
                    description: "No file selected for upload",
                }
            });
            return;
        } else {
            const promise = new Promise((resolve, reject) => {
                const formData = new FormData();
                formData.append("file", selectedFile);
                formData.append("taskID", TaskID);
                formData.append("studentID", studentID);

                server.post("/api/student/submit-task", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    transformRequest: formData => formData
                })
                    .then(response => {
                        if (response.status === 200) {
                            setIsVerificationPending(true);
                            resolve();
                        } else {
                            reject("Unexpected response status: " + response.status);
                        }
                    })
                    .catch(error => {
                        if (error.response && error.response.data && error.response.data.error && typeof error.response.data.error === "string") {
                            if (error.response.data.error.startsWith("UERROR")) {
                                ShowToast("error", error.response.data.error.substring("UERROR:".length));
                                reject(error.response.data.error.substring("UERROR: ".length));
                            } else {
                                ShowToast("error", error.response.data.error.substring("ERROR:".length));
                                reject("Unknown system error");
                            }
                        }
                    });
            });

            toaster.promise(promise, {
                loading: { title: "Uploading...", description: "Please wait" },
                success: {
                    title: "Success",
                    description: "Verification request sent successfully!",
                },
                error: {
                    title: "Error",
                    description: err => `Upload failed: ${err}`,
                },
            });
        }
    }

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    position: "relative",
                    width: "100%",
                    height: "29%",
                    borderRadius: 20,
                    padding: 3,
                    border: "3px solid #4DCBA4",
                    backgroundColor: "#F1F6FF"
                }}
            >
                <Box flex="1" textAlign="left" mx="10px" maxWidth="100%" mb={1}>
                    <Text fontSize="18px" fontWeight="bold" color="black">
                        {TaskTitle}
                    </Text>

                    <Text
                        fontSize="14px"
                        color="gray.600"
                        ml={0.5}
                        whiteSpace="nowrap"
                        overflow="hidden"
                        textOverflow="ellipsis"
                        maxWidth="90%"
                        display="block"
                        mb={1}
                    >
                        {TaskDescription}
                    </Text>

                    <Badge colorPalette="green" mt={3} ml={-1}>
                        +{TaskPoints} leafs
                    </Badge>
                </Box>

                <DialogRoot placement={"center"} motionPreset="slide-in-bottom">
                    {TaskVerified ? (
                        <Text
                            position="absolute"
                            bottom="5px"
                            right="5px"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            color="#4DCBA4"
                            fontSize="12px"
                            fontStyle={"italic"}
                            fontWeight="bold"
                            px={3}
                        >
                            Verified
                        </Text>
                    ) : (
                        !isVerificationPending ? (
                            <DialogTrigger asChild>
                                <Badge
                                    position="absolute"
                                    bottom="5px"
                                    right="5px"
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    cursor="pointer"
                                    color="white"
                                    backgroundColor="#4DCBA4"
                                    _hover={{ backgroundColor: "#3DAF8B" }}
                                    fontSize="12px"
                                    fontWeight="bold"
                                    px={3}
                                    py={2}
                                    borderRadius="full"
                                >
                                    <FaCamera style={{ marginRight: "5px" }} />
                                    Verify
                                </Badge>
                            </DialogTrigger>
                        ) : (
                            <Text
                                position="absolute"
                                bottom="5px"
                                right="5px"
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                color="#4DCBA4"
                                fontSize="12px"
                                fontStyle={"italic"}
                                fontWeight="bold"
                                px={3}
                            >
                                Verification Pending...
                            </Text>
                        )
                    )}

                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Verify task completion</DialogTitle>
                            <Text mt={2} ml={0.5} fontStyle={"italic"}>{TaskDescription}</Text>
                        </DialogHeader>

                        <DialogBody>
                            <Box display="flex" justifyContent="center" alignItems="center" flexDir="column">
                                <FileUploadRoot maxW="xl" alignItems="stretch" maxFiles={1} onFileChange={handleFileChange}>
                                    <FileUploadDropzone
                                        label="Drag and drop here to upload"
                                        description=".png, .jpg up to 5MB"
                                    />

                                    {selectedFile && (
                                        <Box display="flex" alignItems="center" justifyContent="space-between" mt="4">
                                            <Text>{selectedFile.name}</Text>
                                            <CloseButton
                                                size="sm"
                                                variant="outline"
                                                onClick={clearFile}
                                            />
                                        </Box>
                                    )}
                                </FileUploadRoot>
                            </Box>
                        </DialogBody>

                        <DialogFooter>
                            <DialogActionTrigger asChild>
                                <Box display="flex" gap="10px">
                                    <Button variant="outline">Cancel</Button>
                                    {submissionReady ? (
                                        <Button backgroundColor={"black"} onClick={handleSubmitTask}>
                                            Save
                                        </Button>
                                    ) : (
                                        <HoverCardRoot size="sm">
                                            <HoverCardTrigger asChild>
                                            <Button backgroundColor={"black"} onClick={handleSubmitTask} disabled>
                                                Save
                                            </Button>
                                            </HoverCardTrigger>
                                            <HoverCardContent>
                                                <HoverCardArrow />
                                                <Stack gap="4" direction="row">
                                                <Text
                                                    as={FaExclamationTriangle}
                                                    size="40px"
                                                    color={"orange"}
                                                />
                                                <Stack gap="3">
                                                    <Stack gap="1">
                                                    <Text textStyle="sm" fontWeight="semibold">
                                                        You are not ready to submit!
                                                    </Text>
                                                    <Text textStyle="sm" color="fg.muted" ml={0.5}>
                                                        Please upload an image file first.
                                                    </Text>
                                                    </Stack>
                                                </Stack>
                                                </Stack>
                                            </HoverCardContent>
                                        </HoverCardRoot>
                                    )}
                                </Box>
                            </DialogActionTrigger>
                        </DialogFooter>

                        <DialogCloseTrigger />
                    </DialogContent>
                </DialogRoot>
            </motion.div>
        </>
    );
}

export default StudentTaskCard;
