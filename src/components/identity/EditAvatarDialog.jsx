import { DialogActionTrigger, DialogBody, DialogCloseTrigger, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogRoot } from "@/components/ui/dialog";
import { Button, Box } from "@chakra-ui/react";
import { FileInput, FileUploadClearTrigger, FileUploadLabel, FileUploadRoot } from "@/components/ui/file-upload";
import { CloseButton } from "@/components/ui/close-button";
import { InputGroup } from "@/components/ui/input-group";
import { Avatar } from "@/components/ui/avatar";
import { LuFileUp } from "react-icons/lu";
import { useEffect, useState } from "react";
import server from "../../../networking"
import { CgProfile } from "react-icons/cg";

function EditAvatarDialog({ userDetails, isOpen, onClose }) {
    const [avatarUrl, setAvatarUrl] = useState(null); // State to hold avatar URL
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        const fetchAvatar = async () => {
            try {
                if (userDetails.avatar) {
                    const response = await server.get(`/api/Identity/getAvatar?userId=${userDetails.id}`);
                    if (response.data.avatarUrl) {
                        setAvatarUrl(response.data.avatarUrl); // Set avatar URL to state
                    }
                } else {
                    setAvatarUrl(null); // No avatar, set to null to fallback to default icon
                }
            } catch (error) {
                console.error('Error fetching avatar:', error);
                setAvatarUrl(null); // In case of error, set to default icon
            }
        };

        fetchAvatar();
    }, [userDetails.id, userDetails.avatar]); // Fetch avatar on userDetails change

    const handleFileChange = (details) => {
        console.log("File change detected:", details);
        const file = details.acceptedFiles[0];
        setSelectedFile(file);
    }

    const onSave = async () => {
        if (!selectedFile) {
            alert("Please select a file before saving."); // Notify the user to select a file
            return;
        }
    
        const formData = new FormData();
        formData.append("file", selectedFile);
    
        try {
            const response = await server.post("/api/Identity/editAvatar", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                transformRequest: (formData) => formData,
            });
    
            if (response.data.avatarUrl) {
                setAvatarUrl(response.data.avatarUrl); // Update avatar URL in state
                onClose(); // Close the dialog after successful update
            } else {
                console.error("Failed to update avatar:", response.data);
            }
        } catch (error) {
            console.error("Error updating avatar:", error);
        }
    };

    return (
        <DialogRoot
            placement="center"
            motionPreset="slide-in-bottom"
            open={isOpen}
            onOpenChange={onClose}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Avatar</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    {/* Render Avatar or Default Icon */}
                    {avatarUrl ? (
                        <Avatar
                            size="2xl"
                            src={avatarUrl}
                            bg="white"
                            border="4px solid white"
                            ml={10}
                        />
                    ) : (
                        <Box ml={10}>
                            <CgProfile size="60" />
                        </Box>
                    )}
                    <FileUploadRoot onFileChange={handleFileChange} gap="1" maxWidth="300px">
                        <FileUploadLabel>Upload Avatar</FileUploadLabel>
                        <InputGroup
                            w="full"
                            startElement={<LuFileUp />}
                            endElement={
                                <FileUploadClearTrigger asChild>
                                    <CloseButton
                                        me="-1"
                                        size="xs"
                                        variant="plain"
                                        focusVisibleRing="inside"
                                        focusRingWidth="2px"
                                        pointerEvents="auto"
                                        color="fg.subtle"
                                    />
                                </FileUploadClearTrigger>
                            }
                        >
                            <FileInput />
                        </InputGroup>
                    </FileUploadRoot>
                </DialogBody>
                <DialogFooter>
                    <DialogActionTrigger asChild>
                        <Button variant="outline" onClick={onClose}>Cancel</Button>
                    </DialogActionTrigger>
                    <Button onClick={onSave} isDisabled={!selectedFile}>Save</Button>
                </DialogFooter>
                <DialogCloseTrigger />
            </DialogContent>
        </DialogRoot>
    );
}

export default EditAvatarDialog;

