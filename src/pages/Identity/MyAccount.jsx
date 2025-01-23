/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Text, Box, Heading, Input, Button, Flex, Spinner } from '@chakra-ui/react';
import { DialogActionTrigger, DialogBody, DialogCloseTrigger, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import ShowToast from '../../Extensions/ShowToast';
import server from "../../../networking";

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
            // const userID = user.userID;
            const response = await server.get(`/api/Identity/getUserDetails`);
            // dispatch(reloadAuthToken(authToken))
            setEditableDetails(response.data);
            setUserDetails(response.data);
            setAccountInfo(response.data);
            console.log("Account info fetched and set: ", response.data)
            // setOriginalAccountInfo(response.data);
            // setAccountLoaded(true);
            // setProfilePicture(`${import.meta.env.VITE_BACKEND_URL}/cdn/getProfilePicture?userID=${userID}`);
        } catch (err) {
            console.log("Error fetching account info:", err);
            if (err && err.response && err.response.status && err.response.status == 404) {
                dispatch(logout());
                localStorage.removeItem('jwt');
            }
            // showToast("Unable to retrieve account information", "Please try again", 3000, true, "error");
            // navigate('/');
        }
    };

    useEffect(() => {
        fetchAccountInfo();
    }, [loaded]);

    useEffect(() => {
        if (!localStorage.getItem('jwt')) {
            navigate("/auth/login")
            ShowToast("error", "Error", "Please login first");
        }
    }, [])

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
    }

    useEffect(() => {
        if (loaded && accountInfo && editableDetails, userDetails) {
            setRenderReady(true);
        }
    }, [loaded, user, accountInfo, editableDetails, userDetails]);

    if (!loaded) {
        return (
            <Box display="flex" flexDir={"column"} justifyContent="center" alignItems="center" width="100%" height="100%">
                <Spinner />
            </Box>
        )
    }

    if (renderReady) {
        return (
            <Box>
                <Heading as="h2" size="lg">My Account</Heading>
                <Box mt={4}>
                    <Flex direction="column" gap={4}>
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
                                <Text flex="2">{userDetails.contactNumber}</Text>
                            )}
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
                    </Flex>
                </Box>
            </Box>
        );
    }
}

export default MyAccount;