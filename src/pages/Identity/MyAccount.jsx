import { useEffect, useState } from 'react';
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

    useEffect(() => {
        // Fetch the user details when the component mounts
        const fetchUserDetails = async () => {
            try {
                const token = localStorage.getItem('jwt'); // Assuming token is stored in localStorage

                if (!token) {
                    setError('Authorization token is missing.');
                    return;
                }

                const response = await server.get(`/api/Identity/getUserDetails`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setUserDetails(response.data);
                setEditableDetails(response.data); // Initial state for editable fields
            } catch (err) {
                setError('Failed to fetch user details.');
            }
        };

        fetchUserDetails();
    }, []);

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
    
            // Only send the contactNumber if it's different from the original
            const detailsToUpdate = { ...editableDetails };
            if (editableDetails.contactNumber === userDetails.contactNumber) {
                delete detailsToUpdate.contactNumber; // Don't send it if it hasn't changed
            }
    
            // Send updated user details to the backend
            await server.put(`/api/Identity/editDetails`, detailsToUpdate, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            setUserDetails(editableDetails); // Save the updated details
            setIsEditing(false); // Exit editing mode
        } catch (err) {
            setError('Failed to save changes.');
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

            await server.delete(`/api/Identity/deleteAccount`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // After deletion, redirect user to the home page or login page
            localStorage.removeItem('jwt');  // Clear the token
            window.location.href = '/';  // Redirect to home or login page
        } catch (err) {
            setError('Failed to delete account.');
        }
    };

    const handleCancelDelete = () => {
        setIsDeleting(false);  // Close the delete confirmation
    };

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        window.location.href = '/auth/login'; // Redirect to the login page
    }

    if (error) {
        return <Text>{error}</Text>;
    }

    if (!userDetails) {
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

                    <Flex>
                        <Text flex="1"><strong>Role:</strong></Text>
                        {isEditing ? (
                            <Input
                                name="userRole"
                                value={editableDetails.userRole}
                                onChange={handleChange}
                                placeholder="Enter role"
                            />
                        ) : (
                            <Text flex="2">{userDetails.userRole}</Text>
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
