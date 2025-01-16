import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Text, Box, Heading, Input, Button, Flex, Alert } from '@chakra-ui/react';
import server from "../../../networking";
import { DialogActionTrigger, DialogBody, DialogCloseTrigger, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";

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

    useEffect(() => {
        console.log(user)
        if (loaded == true) {
            const fetchAccountInfo = async () => {
                try {
                    const token = localStorage.getItem('jwt'); 

                    if (!token) {
                        setError('Authorization token is missing.');
                        return;
                    }
                    // const userID = user.userID;
                    const response = await server.get(`/api/Identity/getUserDetails`);
                    console.log(response.data)
                    // dispatch(reloadAuthToken(authToken))
                    setEditableDetails(response.data); 
                    setAccountInfo(response.data);
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

            if (user && user.id) {
                fetchAccountInfo();
            }
        };

        console.log(accountInfo)

    }, [loaded, user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditableDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
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
            setError('Failed to delete account.');
        }
    };

    const handleCancelDelete = () => {
        setIsDeleting(false);  // Close the delete confirmation
    };

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        navigate("/auth/login")
    }

    if (error) {
        console.log(error)
        return <Text>{error}</Text>;
    }

    if (!accountInfo) {
        return <Text>Loading...</Text>;
    }

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
                            <Text flex="2">{user.name}</Text>
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
                            <Text flex="2">{user.email}</Text>
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
                            <Text flex="2">{user.contactNumber}</Text>
                        )}
                    </Flex>

                    {isEditing && (
                        <Flex gap={4} mt={4}>
                            <Button onClick={handleSave} colorScheme="blue">Save Changes</Button>
                            <Button onClick={handleCancel} colorScheme="red">Cancel</Button>
                        </Flex>
                    )}

                    {!isEditing && (
                        <Button onClick={() => setIsEditing(true)} colorScheme="teal" mt={4}>
                            Edit
                        </Button>
                    )}

                    <DialogRoot open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button colorScheme="red" mt={4}>Delete Account</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Confirm Account Deletion</DialogTitle>
                            </DialogHeader>
                            <DialogBody>
                                <p>Are you sure you want to delete your account? This action is irreversible.</p>
                            </DialogBody>
                            <DialogFooter>
                                <DialogActionTrigger asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogActionTrigger>
                                <Button onClick={handleDeleteAccount}>Delete</Button>
                            </DialogFooter>
                            <DialogCloseTrigger />
                        </DialogContent>
                    </DialogRoot>

                    <Button onClick={handleLogout} colorScheme="gray" mt={4}>
                        Logout
                    </Button>
                </Flex>
            </Box>
        </Box>
    );
}

export default MyAccount;
