/* eslint-disable react/prop-types */
import { DialogActionTrigger, DialogBody, DialogCloseTrigger, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle } from "@/components/ui/dialog";
import { FileUploadDropzone, FileUploadList, FileUploadRoot } from "@/components/ui/file-upload"
import { Box, Text, Button } from '@chakra-ui/react';
import { FaCamera } from 'react-icons/fa';
import { useState } from 'react';
import server from "../../../networking";
import { Toaster } from "@/components/ui/toaster";
import ShowToast from "../../Extensions/ShowToast";

function StudentTaskCard({ TaskID, TaskTitle, TaskDescription, TaskPoints }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (details) => {
        setSelectedFile(details.acceptedFiles[0]);
    }

    const handleSubmitTask = async () => {
        if (!selectedFile) {
            ShowToast("error", "Error", "No file selected for upload");
            setIsOpen(false);
            return;
        } else {
            try {
                const formData = new FormData();
                formData.append("file", selectedFile);
                formData.append("taskID", TaskID);
                formData.append("taskTitle", TaskTitle);
                formData.append("taskDescription", TaskDescription);
                formData.append("taskPoints", TaskPoints);           

                const response = await server.post("/api/Student/submit-task", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    transformRequest: formData => formData
                });

                if (response.status !== 200) {
                    ShowToast("error", "Error", "Upload failed");
                    console.error("Upload failed: " + response);
                    setIsOpen(false);
                    return;
                } else {
                    ShowToast("success", "Success", "Task submitted successfully!");
                    setIsOpen(false);
                }
            } catch (error) {
                ShowToast("error", "Error", "Upload failed");
                setIsOpen(false);
                console.error("Upload failed:", error.response?.data || error.message);
            }
        }
    }

    return (
        <>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
                height="29%"
                borderRadius={20}
                padding={5}
                border="3px solid #4DCBA4"
                backgroundColor="#F1F6FF"
            >
                {/* Score Section */}
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
                >
                    +{TaskPoints}
                </Box>

                {/* Task Text Section */}
                <Box flex="1" textAlign="left" mx="10px">
                    <Text fontSize="18px" fontWeight="bold" color="black">
                        {TaskTitle}
                    </Text>
                </Box>

                {/* Icon Section with Circle */}
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
                    onClick={() => setIsOpen(true)}
                >
                    <Text as={FaCamera} color="white" boxSize={6} />
                </Box>
            </Box>

            <DialogRoot 
                placement={"center"}
                motionPreset="slide-in-bottom"
                open={isOpen}
            >
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
                                <FileUploadList />
                            </FileUploadRoot>
                        </Box>
                    </DialogBody>
                    <DialogFooter>
                        <DialogActionTrigger asChild>
                            <Button onClick={() => setIsOpen(false)} variant="outline">Cancel</Button>
                        </DialogActionTrigger>
                        <Button backgroundColor={"#2D65FF"} onClick={() => handleSubmitTask()}>Submit</Button>
                    </DialogFooter>
                    <DialogCloseTrigger />
                </DialogContent>
            </DialogRoot>

            <Toaster />
        </>
    );
}

export default StudentTaskCard;
