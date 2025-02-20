/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import { Box, Button, Text, Flex, Icon } from '@chakra-ui/react';
import { toaster } from "@/components/ui/toaster";
import { CloseButton } from "@/components/ui/close-button";
import { FileUploadDropzone, FileUploadRoot } from "@/components/ui/file-upload"
import { DialogActionTrigger, DialogBody, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle } from "@/components/ui/dialog"
import { motion } from "framer-motion";
import server from "../../../networking";
import { FiCheckCircle } from 'react-icons/fi';
import { RxRocket } from 'react-icons/rx';

function ImageRecognition() {
    const [open, setOpen] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null);
    const [itemCategory, setItemCategory] = useState(null);
    const [itemRecyclable, setItemRecyclable] = useState(false);
    const [submissionReady, setSubmissionReady] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

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

        setIsAnalyzing(true);
    
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
                .catch(error => {
                    if (error.response && error.response.data && error.response.data.error && typeof error.response.data.error === "string") {
                        if (error.response.data.error.startsWith("UERROR")) {
                            reject(error.response.data.error.substring("UERROR: ".length));
                        } else {
                            reject(error.response.data.error.substring("ERROR: ".length));
                        }
                    } else {
                        reject("An unexpected error occurred");
                    }
                })
                .finally(() => {
                    setIsAnalyzing(false);
                });
        });
    
        toaster.promise(uploadPromise, {
            loading: { title: "Analysing...", description: "Please wait while your image is being analysed." },
            success: { title: "", description: "Analysis successful!" },
            error: (err) => ({
                title: "",
                description: `${err}`,
            }),
        });
    };

    const rocketVariants = {
        initial: { y: 0 },
        analyzing: {
            y: [-7, 7, -7],
            rotate: [0, 5, -5, 0],
            transition: {
                duration: 1.5,
                repeat: Infinity
            }
        }
    };

    return (
        <Box minH="100vh">
            <Box maxW="4xl" mx="auto" px={4} py={12}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <Flex direction="column" align="center" textAlign="center" mb={3}>
                        <motion.div
                            animate={{ y: [-5, 5, -5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <Text
                                backgroundColor={"#3BA684"}
                                bgClip="text"
                                fontSize="4xl"
                                fontWeight="extrabold"
                                mb={4}
                            >
                                Welcome to VisionAI
                            </Text>
                        </motion.div>
                        <Text fontSize="xl" color="gray.600" mb={8}>
                            Not sure if your item is recyclable? Upload a photo and VisionAI will predict it for you!
                        </Text>
                    </Flex>

                    <Box 
                        position="relative"
                        bg="white"
                        borderRadius="3xl"
                        p={8}
                        boxShadow="xl"
                        _hover={{ boxShadow: "2xl" }}
                        transition="all 0.3s ease-in-out"
                    >
                        <Box
                            position="absolute"
                            w="100%"
                            h="100%"
                            top={0}
                            left={0}
                            opacity={0.1}
                            borderRadius="3xl"
                            zIndex={0}
                        />

                        <Box position="relative" zIndex={1}>
                            <Flex direction="column" align="center">
                                <FileUploadRoot onFileChange={handleFileChange} maxW="xl" alignItems="stretch" maxFiles={1} mt={5}>
                                    <motion.div>
                                    <FileUploadDropzone
                                        label="Drag and drop here to upload an image"
                                        description="or click here"
                                    />
                                    </motion.div>

                                    {selectedFile && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            <Flex align="center" justify="space-between" mt="6" p={4}
                                                bg="blue.50" borderRadius="lg" width="full">
                                                <Text fontSize="sm" fontWeight="medium">{selectedFile.name}</Text>
                                                <CloseButton size="sm" onClick={clearFile} />
                                            </Flex>
                                        </motion.div>
                                    )}
                                </FileUploadRoot>

                                <Text color="gray.500" mt={6} fontSize="sm" textAlign="center">
                                    📸 Pro Tip: Take a clear photo against a plain background for best results
                                </Text>

                                <motion.div
                                    whileTap={{ scale: 0.95 }}
                                    style={{ width: '100%', maxWidth: '300px' }}
                                >
                                    <Button
                                        size="lg"
                                        colorScheme="blue"
                                        backgroundColor={isAnalyzing ? "#3BA684" : "#4DCBA4"}
                                        borderRadius="full"
                                        height="60px"
                                        mt={10}
                                        onClick={handleUploadItem}
                                        disabled={!submissionReady || isAnalyzing}
                                        fontSize="lg"
                                        fontWeight="bold"
                                        boxShadow="md"
                                        _disabled={{
                                            opacity: 0.7,
                                            cursor: 'not-allowed',
                                            boxShadow: 'none'
                                        }}
                                        _hover={{
                                            backgroundColor: isAnalyzing ? "#3BA684" : "#4DCBA4",
                                        }}
                                    >
                                        <motion.div
                                            variants={rocketVariants}
                                            animate={isAnalyzing ? "analyzing" : "initial"}
                                        >
                                            <Icon as={RxRocket} w={6} h={6} mr={2} />
                                        </motion.div>
                                        {isAnalyzing ? "Analysing..." : "Analyze My Item"}
                                    </Button>
                                </motion.div>
                            </Flex>
                        </Box>
                    </Box>
                </motion.div>

                <DialogRoot
                    open={open}
                    onOpenChange={(e) => setOpen(e.open)}
                    motionPreset="scale"
                    placement="center"
                >
                    <DialogContent 
                        borderRadius="3xl"
                        borderWidth={0}
                        boxShadow="2xl"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                        >
                            <DialogHeader>
                                <Flex align="center" justify="center" direction="column">
                                    <Icon as={FiCheckCircle} w={12} h={12} color="green.500" mb={4} />
                                    <DialogTitle fontSize="2xl">Scan Results Ready! 🌱</DialogTitle>
                                </Flex>
                            </DialogHeader>
                            
                            <DialogBody>
                                <Flex direction="column" align="center" textAlign="center" py={4}>
                                    <Text fontSize="2xl" fontFamily={"Lilita One"} fontWeight="bold" mb={5} backgroundColor={"#4DCBA4"} bgClip="text">
                                        {itemCategory == "No match" ? "No match found" : itemCategory}
                                    </Text>
                                    <Box
                                        px={4}
                                        py={2}
                                        borderRadius="full"
                                        bg={itemRecyclable ? 'green.100' : 'red.100'}
                                        display="inline-flex"
                                        alignItems="center"
                                    >
                                        {itemCategory == "No match" ? (
                                            <Text fontSize="lg" color={itemRecyclable ? 'green.600' : 'red.600'}>
                                                ❌ We couldn't find a match for this item.
                                            </Text>
                                        ) : (
                                            <Text fontSize="lg" color={itemRecyclable ? 'green.600' : 'red.600'}>
                                                {itemRecyclable ? `♻️ ${itemCategory} is Recyclable!` : `🚫 ${itemCategory} is NOT Recyclable`}
                                            </Text>
                                        )}
                                    </Box>
                                    
                                    <Box mt={8} w="full">
                                        <Text fontWeight="semibold" mb={2}>Eco Tips:</Text>
                                        <Text fontSize="sm" color="gray.600">
                                            {itemRecyclable ? "Remember to clean and dry this item before recycling!" : "Consider repurposing or proper disposal methods for this item."}
                                        </Text>
                                    </Box>
                                </Flex>
                            </DialogBody>

                            <DialogFooter>
                                <Flex justify="center" w="full">
                                    <DialogActionTrigger asChild>
                                        <Button
                                            colorScheme="green"
                                            backgroundColor={"#4DCBA4"}
                                            borderRadius="full"
                                            px={8}
                                            size="lg"
                                        >
                                            Got it!
                                        </Button>
                                    </DialogActionTrigger>
                                </Flex>
                            </DialogFooter>
                        </motion.div>
                    </DialogContent>
                </DialogRoot>
            </Box>
        </Box>
    );
}

export default ImageRecognition;