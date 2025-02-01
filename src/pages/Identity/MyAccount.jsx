/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Text, Box, Heading, Input, Button, Image, Spinner, HStack, VStack, Textarea } from '@chakra-ui/react';
import { Avatar, AvatarGroup } from "@/components/ui/avatar"
import { DialogActionTrigger, DialogBody, DialogCloseTrigger, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import ShowToast from '../../Extensions/ShowToast';
import server from "../../../networking";
import ProfileBanner from '../../components/identity/ProfileBanner';
import AccountDetails from '../../components/identity/AccountDetails';

function MyAccount() {
    const [userDetails, setUserDetails] = useState(null);
    const [editableDetails, setEditableDetails] = useState(null);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);  // To handle delete confirmation state
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const navigate = useNavigate();
    const { user, loaded, authToken } = useSelector((state) => state.auth);
    const [accountInfo,  setAccountInfo] = useState(null);
    const dispatch = useDispatch()
    const [renderReady, setRenderReady] = useState(false);

    const fetchAccountInfo = async () => {
        console.log("Fetching Account Info...")
        try {
            const token = localStorage.getItem('jwt'); 

            if (!token) {
                setError('Authorization token is missing.');
                return;
            }
            const response = await server.get(`/api/Identity/getUserDetails`);
            setEditableDetails(response.data);
            setUserDetails(response.data);
            setAccountInfo(response.data);
        } catch (err) {
            console.log("Error fetching account info:", err);
            if (err && err.response && err.response.status && err.response.status == 404) {
                dispatch(logout()); 
                localStorage.removeItem('jwt');
            };
        }
    };

    useEffect(() => {
        if (localStorage.getItem('jwt')) {
            fetchAccountInfo();
        }
    }, [loaded])

    const handleChange = (e) => {
        setEditableDetails({
            ...editableDetails,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('jwt');
            if (!token) {
                setError('Authorization token is missing.');
                return;
            }
    
            const detailsToUpdate = { ...editableDetails };
    
            await server.put(`/api/Identity/editDetails`, detailsToUpdate);
    
            setUserDetails(editableDetails); // Save the updated details
            setIsEditing(false); // Exit editing mode
        } catch (err) {
            setError('Failed to save changes.' + err);
        }
    };

    const handleCancel = () => {
        setEditableDetails(userDetails); // Revert to the original details
        setIsEditing(false); // Exit editing mode
    };

    const handleDeleteAccount = async () => {
        try {
            const token = localStorage.getItem('jwt');
            if (!token) {
                setError('Authorization token is missing.');
                return;
            }

            await server.delete(`/api/Identity/deleteAccount`);

            // After deletion, redirect user to the home page or login page
            localStorage.removeItem('jwt');  // Clear the token
            navigate("/")
        } catch (err) {
            setError('Failed to delete account: ' + err);
        }
    };

    const handleCancelDelete = () => {
        setIsDeleting(false);  // Close the delete confirmation
    };

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        navigate("/auth/login")
        ShowToast("success", "Logged out successfully");
    }

    useEffect(() => {
        if (loaded && accountInfo && editableDetails, userDetails) {
            setRenderReady(true);
        }
    }, [loaded, user, accountInfo, editableDetails, userDetails]);

    if (!loaded) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" width="100vw" height="80vh">
                <Spinner />
            </Box>
        )
    }

    if (renderReady) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Box>
                    <Heading fontSize="30px" mt={10} mb={6}>My Account</Heading>
                    <ProfileBanner />
                        
                        {/* <AccountDetails /> */}
                        {/* <Flex direction="column" gap={4}>
                            <Flex>
                                <Text flex="1"><strong>Name:</strong></Text>
                                {isEditing ? (
                                    <Input
                                        name="name"
                                        value={editableDetails.name}
                                        onChange={handleChange}
                                        placeholder="Enter name"
                                    />
                                ) : (
                                    <Text flex="2">{userDetails.name}</Text>
                                )}
                            </Flex>

                            <Flex>
                                <Text flex="1"><strong>Email:</strong></Text>
                                {isEditing ? (
                                    <Input
                                        name="email"
                                        value={editableDetails.email}
                                        onChange={handleChange}
                                        placeholder="Enter email"
                                    />
                                ) : (
                                    <Text flex="2">{userDetails.email}</Text>
                                )}
                            </Flex>

                            <Flex>
                                <Text flex="1"><strong>Contact Number:</strong></Text>
                                {isEditing ? (
                                    <Input
                                        name="contactNumber"
                                        value={editableDetails.contactNumber}
                                        onChange={handleChange}
                                        placeholder="Enter contact number"
                                    />
                                ) : (
                                    <Text flex="2">{userDetails.contactNumber || "Not set"}</Text>
                                )}
                            </Flex>

                            <Flex>
                                <Text flex="1"><strong>Role:</strong></Text>
                                <Text flex="2">{user.userRole === "student" ? "Student" : user.userRole === "teacher" ? "Teacher" : user.userRole === "parent" ? "Parent" : "Admin"}</Text>
                            </Flex>

                            {isEditing && (
                                <Flex gap={4} mt={4}>
                                    <Button onClick={handleSave} colorScheme="blue" backgroundColor={"#4DCBA4"}>Save Changes</Button>
                                    <Button onClick={handleCancel} colorScheme="red" backgroundColor={"#4DCBA4"}>Cancel</Button>
                                </Flex>
                            )}

                            {!isEditing && (
                                <Button onClick={() => setIsEditing(true)} colorScheme="teal" mt={4} backgroundColor={"#4DCBA4"}>
                                    Edit
                                </Button>
                            )}

                            <DialogRoot open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button colorScheme="red" mt={4} backgroundColor={"#4DCBA4"}>Delete Account</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Confirm Account Deletion</DialogTitle>
                                    </DialogHeader>
                                    <DialogBody>
                                        <Text>Are you sure you want to delete your account? This action is irreversible.</Text>
                                    </DialogBody>
                                    <DialogFooter>
                                        <DialogActionTrigger asChild>
                                            <Button variant="outline" backgroundColor={"red"} color="white" onClick={handleCancelDelete}>Cancel</Button>
                                        </DialogActionTrigger>
                                        <Button onClick={handleDeleteAccount} backgroundColor={"#4DCBA4"}>Delete</Button>
                                    </DialogFooter>
                                    <DialogCloseTrigger />
                                </DialogContent>
                            </DialogRoot>

                            <Button onClick={handleLogout} colorScheme="gray" mt={4} backgroundColor={"#4DCBA4"}>
                                Logout
                            </Button>
                        </Flex> */}
                </Box>
            </motion.div>
        );
    }
}

export default MyAccount;