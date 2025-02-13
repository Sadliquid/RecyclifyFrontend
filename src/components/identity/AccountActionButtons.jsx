import { useEffect, useRef, useState } from "react";
import { Box, Button, HStack, Input, VStack, Heading, Text, Textarea } from "@chakra-ui/react";
import EditPasswordDialog from "./EditPasswordDialog";
import DeleteAccountDialog from "./DeleteAccountDialog";
import RedemptionHistoryDialog from "./RedemptionHistoryDialog";
import { useNavigate } from "react-router-dom";

function AccountActionButtons({ userDetails }) {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showEditPasswordDialog, setShowEditPasswordDialog] = useState(false);
    const [showRedemptionDialog, setShowRedemptionDialog] = useState(false);
    const navigate = useNavigate()
    const userRole = userDetails.userRole

    return (
        <Box w="70%" mx="auto">
            {/* Security Section */}
            <VStack align="start" spacing={4} mb={6}>
                <Heading size="md">Security and Authentication</Heading>
                <HStack spacing="5%" w="100%" align="center">
                    <Box flex="0.8" w="80%">
                        <VStack align="start" w="100%">
                            <Text>Password</Text>
                            <Input type="password" value="************" disabled />
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
            {userRole !== "admin" && (
                <VStack align="start" spacing={4} mb={6}>
                    <Heading size="md" mb={2}>More Actions</Heading>
                    <HStack gap={8} w="100%">
                        {userRole === "parent" && (
                            <Button borderRadius={30} variant="solid" background="#2D65FF" color="white">
                                Child's Account
                            </Button>
                        )}
                        {userRole === "student" && (
                            <>
                                <Button borderRadius={30} variant="solid" background="#2D65FF" color="white">
                                    Parent's Account
                                </Button>
                                <Button 
                                    borderRadius={30} variant="solid" background="#2D65FF" color="white"
                                    onClick={() => setShowRedemptionDialog(true)}
                                >
                                    Redemption History
                                </Button>
                            </>
                        )}
                        {["parent", "student", "teacher"].includes(userRole) && (
                            <Button borderRadius={30} variant="solid" background="#2D65FF" color="white" onClick={() => navigate(`/identity/publicProfile/${userDetails.id}`)}>
                                View Public Account
                            </Button>
                        )}
                        {["parent", "student"].includes(userRole) && (
                            <Button
                                borderRadius={30}
                                variant="solid"
                                background="red"
                                color="white"
                                onClick={() => setShowDeleteDialog(true)}
                            >
                                Delete Account
                            </Button>
                        )}
                    </HStack>
                </VStack>
            )}

            <DeleteAccountDialog isOpen={showDeleteDialog} onClose={() => setShowDeleteDialog(false)} />
            <EditPasswordDialog isOpen={showEditPasswordDialog} onClose={() => setShowEditPasswordDialog(false)} />
            <RedemptionHistoryDialog isOpen={showRedemptionDialog} onClose={() => setShowRedemptionDialog(false)} />
        </Box>
    );
}

export default AccountActionButtons;