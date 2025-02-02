import { useEffect, useRef, useState } from "react";
import { Box, Button, HStack, Input, VStack, Heading, Text, Textarea } from "@chakra-ui/react";
import EditPasswordDialog from "./EditPasswordDialog";
import DeleteAccountDialog from "./DeleteAccountDialog";
import RedemptionHistoryDialog from "./RedemptionHistoryDialog";

function AccountDetails({ userDetails }) {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showEditPasswordDialog, setShowEditPasswordDialog] = useState(false);
    const [showRedemptionDialog, setShowRedemptionDialog] = useState(false);
    const [height, setHeight] = useState('auto');
    const hiddenDivRef = useRef(null);
    const textareaRef = useRef(null);
  
    const value = userDetails.aboutMe || "Let others know what you are passionate about!";
  
    useEffect(() => {
      if (hiddenDivRef.current && textareaRef.current) {
        // Set the hidden div's content to the same value as the textarea
        hiddenDivRef.current.innerText = value;
  
        // Get the height of the hidden div
        const newHeight = hiddenDivRef.current.offsetHeight;
  
        // Update the textarea height
        setHeight(`${newHeight}px`);
      }
    }, [value]);

    return (
        <Box w="70%" mx="auto">
            <HStack spacing={4} mb={6} mt={6}>
                <VStack align="start" flex={1}>
                    <Heading size="md" mb={4}>
                    About Me
                    </Heading>
                    <Box position="relative" width="100%">
                    {/* Hidden div to measure the height of the content */}
                    <Box
                        ref={hiddenDivRef}
                        position="absolute"
                        top={0}
                        left={0}
                        visibility="hidden"
                        whiteSpace="pre-wrap"
                        wordBreak="break-word"
                        width="100%"
                        fontSize="md"
                        lineHeight="base"
                        padding="2"
                    />
                        {/* Textarea with dynamic height */}
                        <Textarea
                            ref={textareaRef}
                            value={value}
                            isReadOnly
                            resize="none"
                            w="100%"
                            height={height}
                            minHeight="80px"
                            whiteSpace="pre-wrap"
                            wordBreak="break-word"
                            overflow="hidden"
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
                        <Input value={userDetails.name} isReadOnly />
                    </VStack>
                    <VStack align="start" flex={1}>
                        <Text>First Name</Text>
                        <Input value={userDetails.fName} isReadOnly />
                    </VStack>
                    <VStack align="start" flex={1}>
                        <Text>Last Name</Text>
                        <Input value={userDetails.lName} isReadOnly />
                    </VStack>
                </HStack>
            </VStack>

            {/* Contact Information */}
            <VStack align="start" spacing={4} mb={6}>
                <Heading size="md">Contact Information</Heading>
                <HStack spacing={4} w="100%">
                    <VStack align="start" flex={1}>
                        <Text>Email</Text>
                        <Input value={userDetails.email} isReadOnly />
                    </VStack>
                    <VStack align="start" flex={1}>
                        <Text>Phone Number</Text>
                        <Input value={userDetails.contactNumber} isReadOnly />
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
                            <Input type="password" value="************" isReadOnly />
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
                    <Button 
                        borderRadius={30}
                        variant="solid"
                        background="#2D65FF"
                        color={"white"}
                        // onClick={}
                    >
                        Parents Account
                    </Button>
                    <Button 
                        borderRadius={30}
                        variant="solid"
                        background="#2D65FF"
                        color={"white"}
                        onClick={() => setShowRedemptionDialog(true)}
                    >
                        Redemption History
                    </Button>
                    <Button 
                        borderRadius={30}
                        variant="solid"
                        background="#2D65FF"
                        color={"white"}
                        // onClick={}
                    >
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