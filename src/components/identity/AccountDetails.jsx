import { useEffect, useRef, useState } from "react";
import { Box, Button, HStack, Input, VStack, Heading, Text, Textarea } from "@chakra-ui/react";
import EditPasswordDialog from "./EditPasswordDialog";
import DeleteAccountDialog from "./DeleteAccountDialog";
import RedemptionHistoryDialog from "./RedemptionHistoryDialog";
import { Editable, IconButton } from "@chakra-ui/react"
import { LuCheck, LuPencilLine, LuX } from "react-icons/lu"
import { ActionBarContent, ActionBarRoot, ActionBarSelectionTrigger, ActionBarSeparator,
} from "@/components/ui/action-bar";
import { EditRoadTwoTone } from "@mui/icons-material";

function AccountDetails({ userDetails }) {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showEditPasswordDialog, setShowEditPasswordDialog] = useState(false);
    const [showRedemptionDialog, setShowRedemptionDialog] = useState(false);
    const [height, setHeight] = useState('auto');
    const hiddenDivRef = useRef(null);
    const textareaRef = useRef(null);
    const [editedDetails, setEditedDetails] = useState(userDetails);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (hiddenDivRef.current && textareaRef.current) {
            hiddenDivRef.current.innerText = editedDetails.aboutMe;
            setHeight(`${hiddenDivRef.current.offsetHeight}px`);
        }
    }, [editedDetails.aboutMe]);

    useEffect(() => {
        const isReverted = JSON.stringify(editedDetails) === JSON.stringify(userDetails);
        if (isReverted) {
            setIsEditing(false);
        }
    }, [editedDetails, userDetails]);

    const handleSave = () => {
        console.log("Saving changes", editedDetails);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedDetails(userDetails);
        setIsEditing(false);
    };

    return (
        <Box w="70%" mx="auto">
            <ActionBarRoot open={isEditing}>
                <ActionBarContent>
                    <ActionBarSelectionTrigger>Unsaved Changes</ActionBarSelectionTrigger>
                    <ActionBarSeparator />
                    <Button variant="outline" size="sm" onClick={handleCancel}>
                        <LuX /> Cancel
                    </Button>
                    <Button variant="solid" size="sm" onClick={handleSave}>
                        <LuCheck /> Save Changes
                    </Button>
                </ActionBarContent>
            </ActionBarRoot>

            {/* About Me */}
            <HStack spacing={4} mb={6} mt={6}>
                <VStack align="start" flex={1}>
                    <Heading size="md">About Me</Heading>
                    <Box position="relative" width="100%">
                        <Box
                            ref={hiddenDivRef}
                            position="absolute"
                            visibility="hidden"
                            whiteSpace="pre-wrap"
                            wordBreak="break-word"
                            width="100%"
                            fontSize="md"
                        />
                        <Textarea
                            ref={textareaRef}
                            value={editedDetails.aboutMe}
                            placeholder="Share something interesting about yourself!"
                            resize="none"
                            w="100%"
                            height={height}
                            minHeight="80px"
                            whiteSpace="pre-wrap"
                            wordBreak="break-word"
                            overflow="hidden"
                            onChange={(e) => {
                                setEditedDetails({ ...editedDetails, aboutMe: e.target.value });
                                setIsEditing(true);
                            }}
                        />
                    </Box>
                </VStack>
            </HStack>

            {/* Name Section */}
            <VStack align="start" spacing={4} mb={6}>
                <Heading size="md">Name</Heading>
                <HStack spacing={4} w="100%">
                    <VStack align="start" flex={1}>
                        <Text>Username (Display Name)</Text>
                        <Input 
                            value={editedDetails.name} 
                            onChange={(e) => {
                                setEditedDetails({ ...editedDetails, name: e.target.value });
                                setIsEditing(true);
                            }}
                        />
                    </VStack>
                    <VStack align="start" flex={1}>
                        <Text>First Name</Text>
                        <Input 
                            value={editedDetails.fName} 
                            onChange={(e) => {
                                setEditedDetails({ ...editedDetails, fName: e.target.value });
                                setIsEditing(true);
                            }}
                        />
                    </VStack>
                    <VStack align="start" flex={1}>
                        <Text>Last Name</Text>
                        <Input 
                            value={editedDetails.lName} 
                            onChange={(e) => {
                                setEditedDetails({ ...editedDetails, lName: e.target.value });
                                setIsEditing(true);
                            }}
                        />
                    </VStack>
                </HStack>
            </VStack>

            {/* Contact Information */}
            <VStack align="start" spacing={4} mb={6}>
                <Heading size="md">Contact Information</Heading>
                <HStack spacing={4} w="100%">
                    <VStack align="start" flex={1}>
                        <Text>Email</Text>
                        <Input 
                            value={editedDetails.email} 
                            onChange={(e) => {
                                setEditedDetails({ ...editedDetails, email: e.target.value });
                                setIsEditing(true);
                            }}
                        />
                    </VStack>
                    <VStack align="start" flex={1}>
                        <Text>Phone Number</Text>
                        <Input 
                            value={editedDetails.contactNumber} 
                            onChange={(e) => {
                                setEditedDetails({ ...editedDetails, contactNumber: e.target.value });
                                setIsEditing(true);
                            }}
                        />
                    </VStack>
                </HStack>
            </VStack>

            {/* Security Section */}
            <VStack align="start" spacing={4} mb={6}>
                <Heading size="md">Security and Authentication</Heading>
                <HStack spacing="5%" w="100%" align="center">
                    <Box flex="0.8" w="80%">
                        <VStack align="start" w="100%">
                            <Text>Password</Text>
                            <Input type="password" value="************" isReadOnly="true" />
                        </VStack>
                    </Box>

                    <Box flex="0.25" w="25%" alignSelf={"flex-end"}>
                        <Button
                            w="60%"
                            borderRadius={30}
                            variant="solid"
                            background="#2D65FF"
                            color="white"
                            onClick={() => setShowEditPasswordDialog(true)}
                        >
                            Edit Password
                        </Button>
                    </Box>
                </HStack>
            </VStack>

            {/* More Actions */}
            <VStack align="start" spacing={4} mb={6}>
                <Heading size="md" mb={2}>More Actions</Heading>
                <HStack gap={8} w="100%">
                    <Button borderRadius={30} variant="solid" background="#2D65FF" color={"white"}>
                        Parents Account
                    </Button>
                    <Button 
                        borderRadius={30} variant="solid" background="#2D65FF" color={"white"} 
                        onClick={() => setShowRedemptionDialog(true)}
                    >
                        Redemption History
                    </Button>
                    <Button borderRadius={30} variant="solid" background="#2D65FF" color={"white"}>
                        Public Account
                    </Button>
                    <Button
                        borderRadius={30}
                        variant="solid"
                        background="red"
                        color={"white"}
                        onClick={() => setShowDeleteDialog(true)}
                    >
                        Delete Account
                    </Button>
                </HStack>
            </VStack>

            <DeleteAccountDialog isOpen={showDeleteDialog} onClose={() => setShowDeleteDialog(false)} />
            <EditPasswordDialog isOpen={showEditPasswordDialog} onClose={() => setShowEditPasswordDialog(false)} />
            <RedemptionHistoryDialog isOpen={showRedemptionDialog} onClose={() => setShowRedemptionDialog(false)} />
        </Box>
    );
}

export default AccountDetails;