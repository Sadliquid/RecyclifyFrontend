import { useState } from 'react';
import { Heading, Box, Button, Text } from '@chakra-ui/react';
import { toaster } from "@/components/ui/toaster";
import { CloseButton } from "@/components/ui/close-button";
import { FileUploadDropzone, FileUploadRoot } from "@/components/ui/file-upload"
import { DialogActionTrigger, DialogBody, DialogCloseTrigger, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle } from "@/components/ui/dialog"
import { motion } from "framer-motion";
import ShowToast from '../../Extensions/ShowToast';
import server from "../../../networking";

function ImageRecognition() {
    const [open, setOpen] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null);
    const [itemCategory, setItemCategory] = useState(null);
    const [itemRecyclable, setItemRecyclable] = useState(false);
    const [submissionReady, setSubmissionReady] = useState(false);

    const clearFile = () => {
        setSelectedFile(null);
        setSubmissionReady(false);
    };

    const handleFileChange = (details) => {
        const file = details.acceptedFiles[0];
        setSelectedFile(file);
        setSubmissionReady(!!file);
    }

    const handleUploadItem = () => {
        if (!selectedFile) {
            toaster.promise(Promise.reject(), {
                error: {
                    title: "Error",
                    description: "No file selected for upload",
                },
            });
            return;
        }
    
        const formData = new FormData();
        formData.append("file", selectedFile);
    
        const uploadPromise = new Promise((resolve, reject) => {
            server.post("/api/student/recognise-image", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                transformRequest: (formData) => formData,
            })
                .then((response) => {
                    if (response.status === 200) {
                        setItemCategory(response.data.category);
                        setItemRecyclable(response.data.result === "Yes");
                        clearFile();
                        setOpen(true);
                        resolve("The file was uploaded successfully!");
                    } else {
                        reject(`Unexpected response status: ${response.status}`);
                    }
                })
                .catch((error) => {
                    if (error.response && error.response.data && error.response.data.error && typeof error.response.data.error === "string") {
                        if (error.response.data.error.startsWith("UERROR")) {
                            const errorMessage = error.response.data.error.substring("UERROR:".length);
                            ShowToast("error", errorMessage);
                            reject(errorMessage);
                        } else {
                            const errorMessage = error.response.data.error.substring("ERROR:".length);
                            ShowToast("error", errorMessage);
                            reject("Unknown system error");
                        }
                    } else {
                        reject("An unexpected error occurred");
                    }
                });
        });
    
        toaster.promise(uploadPromise, {
            loading: { title: "Uploading...", description: "Please wait while your file is being processed." },
            success: { title: "Success", description: "Upload successful!" },
            error: { title: "Error", description: (err) => `Upload failed: ${err}` },
        });
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Box display="flex" justifyContent={"center"} flexDir="column" mt={10}>
                    <Heading fontSize="30px">Scan my item</Heading>

                    <Box display="flex" justifyContent={"center"} alignItems={"center"} flexDir={"column"} boxShadow={"0 2px 4px 2px rgba(0.1, 0.1, 0.1, 0.1)"} borderRadius={20} width="40%" margin="auto" p={5} mt={5}>
                        <Heading fontSize="20px" mb={5}>Upload your image</Heading>
                        <FileUploadRoot onFileChange={handleFileChange} maxW="xl" alignItems="stretch" maxFiles={1}>
                            <FileUploadDropzone
                                label="Drag and drop here to upload"
                                description=".png, .jpg up to 5MB"
                            />

                            {selectedFile && (
                                <Box display="flex" alignItems="center" justifyContent="space-between" mt="4">
                                    <Text>{selectedFile.name}</Text>
                                    <CloseButton size="sm" variant="outline" onClick={clearFile} />
                                </Box>
                            )}
                        </FileUploadRoot>

                        <Button
                            display="flex"
                            justifyContent="center"
                            backgroundColor="#2D65FF"
                            mb={2}
                            colorScheme="white"
                            _hover={{ bg: "#1752FD" }}
                            borderRadius="30px"
                            alignItems="center"
                            mt={10}
                            onClick={handleUploadItem}
                            disabled={!submissionReady}
                        >
                            <Text>Scan my item</Text>
                        </Button>
                    </Box>
                </Box>
            </motion.div>

            <DialogRoot
                placement={"center"}
                motionPreset="slide-in-bottom"
                lazyMount
                open={open}
                onOpenChange={(e) => setOpen(e.open)}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Results</DialogTitle>
                    </DialogHeader>
                    <DialogBody>
                        <Box display="flex" justifyContent={"center"} alignItems={"center"} flexDir={"column"}>
                            <Heading mb={3}>Detected item: {itemCategory}</Heading>
                            <Text mb={5} fontSize={15}>Recyclable: {itemRecyclable ? "Yes" : "No"}</Text>
                        </Box>
                    </DialogBody>
                    <DialogFooter>
                        <DialogActionTrigger asChild>
                            <Button variant="solid" backgroundColor="#2D65FF" _hover={{ bg: "#1752FD" }}>Thanks!</Button>
                        </DialogActionTrigger>
                    </DialogFooter>
                    <DialogCloseTrigger />
                </DialogContent>
            </DialogRoot>
        </>
    );
}

export default ImageRecognition;