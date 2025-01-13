import { Heading, Box, Button, Text } from '@chakra-ui/react';
import { FileUploadDropzone, FileUploadList, FileUploadRoot } from "@/components/ui/file-upload"
import { DialogActionTrigger, DialogBody, DialogCloseTrigger, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle } from "@/components/ui/dialog"
import { useState } from 'react';
import server from "../../../networking";

function ImageRecognition() {
    const [open, setOpen] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null);
    const [itemCategory, setItemCategory] = useState(null);
    const [itemRecyclable, setItemRecyclable] = useState(false);

    const handleFileChange = (details) => {
        setSelectedFile(details.acceptedFiles[0]);
    }

    const handleUploadItem = async () => {
        if (!selectedFile) {
            console.error("No file selected for upload");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const response = await server.post("/api/SampleVision/upload-image", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status !== 200) {
                throw new Error("Upload failed with status " + response.status);
            } else {
                setItemCategory(response.data.category);
                setItemRecyclable(response.data.result === "Yes");
                setOpen(true);
            }
        } catch (error) {
            console.error("Upload failed:", error.response?.data || error.message);
        }
    };

    return (
        <>
            <Box display="flex" justifyContent={"center"} flexDir="column" mt={10}>
                <Heading fontSize="30px">Scan my item</Heading>

                <Box display="flex" justifyContent={"center"} alignItems={"center"} flexDir={"column"} boxShadow={"0 2px 4px 2px rgba(0.1, 0.1, 0.1, 0.1)"} borderRadius={20} width="40%" margin="auto" p={5} mt={5}>
                    <Heading fontSize="20px" mb={5}>Upload your image</Heading>
                    <FileUploadRoot onFileChange={handleFileChange} maxW="xl" alignItems="stretch" maxFiles={1}>
                        <FileUploadDropzone
                            label="Drag and drop here to upload"
                            description=".png, .jpg up to 5MB"
                        />
                        <FileUploadList />
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
                        onClick={() => handleUploadItem()}
                    >
                        <Text>Scan my item</Text>
                    </Button>
                </Box>
            </Box>

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
                        <Text>Detected items: {itemCategory}</Text>
                        <Text>Your item is {itemRecyclable ? "recyclable" : "not recyclable"}</Text>
                    </DialogBody>
                    <DialogFooter>
                        <DialogActionTrigger asChild>
                            <Button variant="solid" backgroundColor="#2D65FF" _hover={{ bg: "#1752FD" }}>Done</Button>
                        </DialogActionTrigger>
                    </DialogFooter>
                    <DialogCloseTrigger />
                </DialogContent>
            </DialogRoot>
        </>
    )
}

export default ImageRecognition