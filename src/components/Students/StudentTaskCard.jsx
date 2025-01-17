/* eslint-disable react/prop-types */
import { DialogActionTrigger, DialogBody, DialogCloseTrigger, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FileUploadDropzone, FileUploadRoot } from "@/components/ui/file-upload"
import { CloseButton } from "@/components/ui/close-button";
import { Box, Text, Button } from '@chakra-ui/react';
import { FaCamera } from 'react-icons/fa';
import { useState } from 'react';
import { Toaster, toaster } from "@/components/ui/toaster";
import { motion } from "framer-motion";
import server from "../../../networking";

function StudentTaskCard({ TaskID, TaskTitle, TaskPoints }) {
    const [selectedFile, setSelectedFile] = useState(null);
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
                formData.append("studentID", "3f9056b0-06e1-487a-8901-586bafd1e492");
        
                server.post("/api/Student/submit-task", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    transformRequest: formData => formData
                })
                .then(response => {
                    if (response.status === 200) {
                        resolve();
                    } else {
                        reject("Unexpected response status: " + response.status);
                    }
                })
                .catch(error => {
                    const errorMessage = error.response?.data?.error || "An unknown error occurred";
                    reject(errorMessage);
                    console.error("ERROR: ", error);
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
                transition={{ duration: 0.5 }}
                style={{ 
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    height: "29%",
                    borderRadius: 20,
                    padding: 5,
                    border: "3px solid #4DCBA4",
                    backgroundColor: "#F1F6FF"
                }}
            >
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minWidth="50px"
                    height="50px"
                    borderRadius="full"
                    backgroundColor="#4DCBA4"
                    color="white"
                    fontWeight="bold"
                    fontSize="16px"
                    ml={5}
                >
                    +{TaskPoints}
                </Box>

                <Box flex="1" textAlign="left" mx="10px">
                    <Text fontSize="18px" fontWeight="bold" color="black">
                        {TaskTitle}
                    </Text>
                </Box>

                <DialogRoot placement={"center"} motionPreset="slide-in-bottom">
                    <DialogTrigger asChild>
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            width="50px"
                            height="50px"
                            borderRadius="full"
                            backgroundColor="#4DCBA4"
                            _hover={{ backgroundColor: "#3DAF8B" }}
                            cursor="pointer"
                            transition={"all 0.2s"}
                            mr={5}
                        >
                            <Text as={FaCamera} color="white" boxSize={6} />
                        </Box>
                    </DialogTrigger>

                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Submit task for verification</DialogTitle>
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
                                <Button backgroundColor={"black"} onClick={handleSubmitTask} disabled={!submissionReady}>Save</Button>
                            </Box>
                        </DialogActionTrigger>
                        </DialogFooter>

                        <DialogCloseTrigger />
                    </DialogContent>
                </DialogRoot>
            </motion.div>

            <Toaster />
        </>
    );
}

export default StudentTaskCard;
