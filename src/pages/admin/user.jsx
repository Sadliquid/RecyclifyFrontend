/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Stack, Table, Heading, Input, HStack, Button, Box, Spinner, Text, VStack, useDisclosure } from "@chakra-ui/react";
import { MdEdit, MdAdd } from "react-icons/md";
import { DialogBody, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Field } from "@/components/ui/field";
import ShowToast from "../../Extensions/ShowToast";
import Server from "../../../networking";
import UserManagamentProfilePictureIcon from "../../components/admin/userManagementProfileIcon";

const UserManagement = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [editingUser, setEditingUser] = useState(null); // Track the user being edited
    const [userToDelete, setUserToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const { user, loaded, error } = useSelector((state) => state.auth);
    const { isOpen, onOpen, onClose } = useDisclosure();
    
    useEffect(() => {
        if (!error && loaded && user && user.userRole == "admin") {
            fetchUsers();
        }
    }, [loaded]);
        // Reset the form to its initial state (undo changes)
    // Fetch users from the backend
    const fetchUsers = async () => {
        try {
            const response = await Server.get(`/api/UserManagement`);

            if (response.status === 200) {
                const filteredUsers = response.data.data.filter(user => user.userRole !== 'admin');
                setUsers(filteredUsers);
                setIsLoading(false);
            } else {
                throw new Error(response.data.error || `Failed to fetch users`);
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.error || error.message);
            setIsLoading(false);
        }
    };

    if (!loaded || isLoading) {
        return (
            <Box
                display="flex"
                flexDir={"column"}
                justifyContent="center"
                alignItems="center"
                width="100%"
                height="100%"
            >
                <Spinner />
            </Box>
        );
    }

    if (errorMessage) {
        return <div>Error: {errorMessage}</div>;
    }

    // Filter users based on the search term
    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle edit button click
    const handleEdit = (user) => {
        setEditingUser(user); // Set the user to be edited
    };

    const openAddTeacherAccount = () => {
        onOpen();
    };

    const handleDelete = async (userId) => {
        setUserToDelete(userId);
        onOpen();
    };

    const confirmDelete = async () => {
        setIsDeleting(true);
        try {
            const response = await Server.delete(
                `/api/UserManagement/${userToDelete}`
            );

            if (response.status === 200) {
                setUsers(users.filter((user) => user.id !== userToDelete));
                if (response.data.message.startsWith("SUCCESS:")) {
                    let message = response.data.message.substring("SUCCESS: ".length);
                    ShowToast("success", "Success", message);
                }
            } else {
                throw new Error(response.data.error || "Failed to delete user");
            }
        } catch (error) {
            if (response.data.message.startsWith("ERROR:")) {
                let message = response.data.message.substring("ERROR: ".length);
                ShowToast("error", "Error", message);
            } else if (response.data.message.startsWith("UERROR:")) {
                let message = response.data.message.substring("UERROR: ".length);
                ShowToast("error", "Error", message);
            }
        } finally {
            setIsDeleting(false);
            onClose();
            setUserToDelete(null);
        }
    };

    const addTeacherAccount = async (formData) => {
        setIsLoading(true);
        try {
            const response = await Server.post(
                `/api/UserManagement/CreateTeacherAccount`,
                formData,
                { headers: { "Content-Type": "application/json" } }
            );

            if (response.status === 200) {
                await fetchUsers();
                setEditingUser(null);
                onClose();
                if (response.data.message.startsWith("SUCCESS:")) {
                    let message = response.data.message.substring("SUCCESS: ".length);
                    ShowToast("success", "Success", message);
                }
            }
        } catch (error) {
            if (response.data.message.startsWith("ERROR:")) {
                let message = response.data.message.substring("ERROR: ".length);
                ShowToast("error", "Error", message);
            } else if (response.data.message.startsWith("UERROR:")) {
                let message = response.data.message.substring("UERROR: ".length);
                ShowToast("error", "Error", message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    // Handle save button click (update user)
    const handleSave = async () => {
        try {
            const response = await Server.put(
                `/api/UserManagement/${editingUser.id}`,
                editingUser
            );

            if (response.status === 200) {
                setUsers(
                    users.map((user) =>
                        user.id === response.data.data.id ? response.data.data : user
                    )
                );
                setEditingUser(null);
                if (response.data.message.startsWith("SUCCESS:")) {
                    let message = response.data.message.substring("SUCCESS: ".length);
                    ShowToast("success", "Success", message);
                }
            } else {
                throw new Error(response.data.error || "Failed to update user");
            }
        } catch (error) {
            if (response.data.message.startsWith("ERROR:")) {
                let message = response.data.message.substring("ERROR: ".length);
                ShowToast("error", "Error", message);
            } else if (response.data.message.startsWith("UERROR:")) {
                let message = response.data.message.substring("UERROR: ".length);
                ShowToast("error", "Error", message);
            }
        }
    };
    

    return (
        <>
            <Stack gap="10">
                <Box textAlign="center">
                    <Heading fontSize="30px" mt={10} mb={10}>User Management</Heading>
                    <VStack justifyContent="center" mb="4">
                        <Input
                            placeholder="Search for users..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            width="400px"
                            background={"white"}
                            align={"center"}
                            color={"black"}
                        />
                        <DialogRoot isOpen={isOpen} onClose={onClose}>
                            <DialogTrigger asChild>
                                <Button
                                    leftIcon={<MdAdd />} // Add icon
                                    onClick={() => openAddTeacherAccount()}
                                    bg={"#4DCBA4"}
                                    mt={5}
                                >
                                    Add Teacher Account
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add Teacher Account</DialogTitle>
                                </DialogHeader>
                                <DialogBody pb="4">
                                    <Stack gap="4">
                                        <Field label="Name">
                                            <Input
                                                value={editingUser?.name || ""}
                                                onChange={(e) =>
                                                    setEditingUser({
                                                        ...editingUser,
                                                        name: e.target.value,
                                                    })
                                                }
                                                placeholder="Enter full name"
                                            />
                                        </Field>
                                        <Field label="First Name">
                                            <Input
                                                value={editingUser?.fName || ""}
                                                onChange={(e) =>
                                                    setEditingUser({
                                                        ...editingUser,
                                                        fName: e.target.value,
                                                    })
                                                }
                                                placeholder="Enter first name"
                                            />
                                        </Field>
                                        <Field label="Last Name">
                                            <Input
                                                value={editingUser?.LName || ""}
                                                onChange={(e) =>
                                                    setEditingUser({
                                                        ...editingUser,
                                                        LName: e.target.value,
                                                    })
                                                }
                                                placeholder="Enter last name"
                                            />
                                        </Field>
                                        <Field label="Email">
                                            <Input
                                                type="email"
                                                value={editingUser?.email || ""}
                                                onChange={(e) =>
                                                    setEditingUser({
                                                        ...editingUser,
                                                        email: e.target.value,
                                                    })
                                                }
                                                placeholder="Enter email address"
                                            />
                                        </Field>
                                        <Field label="Password">
                                            <Input
                                                type="password"
                                                value={editingUser?.password || ""}
                                                onChange={(e) =>
                                                    setEditingUser({
                                                        ...editingUser,
                                                        password: e.target.value,
                                                    })
                                                }
                                                placeholder="Enter password"
                                            />
                                        </Field>
                                        <Field label="Contact Number">
                                            <Input
                                                type="tel"
                                                inputMode="numeric"
                                                pattern="[0-9]*"
                                                value={editingUser?.contactNumber || ""}
                                                onChange={(e) => {
                                                    const sanitizedValue = e.target.value.replace(/[^0-9]/g, '');
                                                    setEditingUser({
                                                        ...editingUser,
                                                        contactNumber: sanitizedValue
                                                    });
                                                }}
                                                placeholder="Enter contact number"
                                            />
                                        </Field>
                                        <Field label="Class Number">
                                            <Input
                                                type="tel"
                                                inputMode="numeric"
                                                pattern="[0-9]*"
                                                value={editingUser?.classNumber || ""}
                                                onChange={(e) => {
                                                    const sanitizedValue = e.target.value.replace(/[^0-9]/g, '');
                                                    setEditingUser({
                                                        ...editingUser,
                                                        classNumber: sanitizedValue,
                                                    })
                                                    }
                                                }
                                                placeholder="Enter class number"
                                            />
                                        </Field>
                                        <Field label ="Class Description">
                                            <Input
                                                type="text"
                                                value={editingUser?.classDescription || ""}
                                                onChange={(e) =>
                                                    setEditingUser({
                                                        ...editingUser,
                                                        classDescription: e.target.value,
                                                    })
                                                }
                                                placeholder="Enter class description"
                                            />
                                        </Field>
                                    </Stack>
                                </DialogBody>

                                <DialogFooter>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" onClick={onClose}>
                                            Cancel
                                        </Button>
                                    </DialogTrigger>
                                    <Button
                                    bg={"#4DCBA4"}
                                    disabled={
                                        !editingUser ||
                                        !editingUser.name ||
                                        !editingUser.fName ||
                                        !editingUser.LName ||
                                        !editingUser.email ||
                                        !editingUser.password ||
                                        !editingUser.contactNumber ||
                                        !editingUser.classNumber ||
                                        !editingUser.classDescription ||
                                        editingUser.password.length < 8 || // Optional: add minimum password length check
                                        !/\S+@\S+\.\S+/.test(editingUser.email) // Optional: simple email validation regex
                                    }
                                        onClick={() => {
                                            const formData = {
                                                name: editingUser.name,
                                                fName: editingUser.fName,
                                                lName: editingUser.LName, // Ensure consistent casing
                                                email: editingUser.email,
                                                password: editingUser.password,
                                                contactNumber: editingUser.contactNumber,
                                                userRole: "teacher",
                                                classNumber: editingUser.classNumber,
                                                classDescription: editingUser.classDescription,
                                            };
                                            addTeacherAccount(formData);
                                        }}
                                    >
                                        Submit
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </DialogRoot>
                    </VStack>
                </Box>
                {filteredUsers.length === 0 ? (
                    <Box textAlign="center" py={10}>
                        <Text fontSize="lg" color="gray.500">
                            No users found.
                        </Text>
                    </Box>
                ) : (
                    <Table.Root size="sm" showColumnBorder>
                        <Table.Header>
                            <Table.Row>
                                <Table.ColumnHeader>Name</Table.ColumnHeader>
                                <Table.ColumnHeader>Email</Table.ColumnHeader>
                                <Table.ColumnHeader>Contact Number</Table.ColumnHeader>
                                <Table.ColumnHeader>User Role</Table.ColumnHeader>
                                <Table.ColumnHeader>Action</Table.ColumnHeader>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {filteredUsers.map((user) => (
                                <Table.Row key={user.id}>
                                    <Table.Cell color={"black"}>
                                        <Box display="flex" alignItems="center">
                                            <Box
                                                borderRadius="full"
                                                width="40px"
                                                height="40px"
                                                display="flex"
                                                alignItems="center"
                                                justifyContent="center"
                                                mr="2"
                                            >
                                                <UserManagamentProfilePictureIcon userId={user.id} />
                                            </Box>
                                            {editingUser?.id === user.id ? (
                                                <Input
                                                    value={editingUser.name}
                                                    onChange={(e) =>
                                                        setEditingUser({
                                                            ...editingUser,
                                                            name: e.target.value,
                                                        })
                                                    }
                                                />
                                            ) : (
                                                user.name
                                            )}
                                        </Box>
                                    </Table.Cell>
                                    <Table.Cell color={"black"}>
                                        {editingUser?.id === user.id ? (
                                            <Input
                                                value={editingUser.email}
                                                onChange={(e) =>
                                                    setEditingUser({
                                                        ...editingUser,
                                                        email: e.target.value,
                                                    })
                                                }
                                            />
                                        ) : (
                                            user.email
                                        )}
                                    </Table.Cell>
                                    <Table.Cell color={"black"}>
                                        {editingUser?.id === user.id ? (
                                            <Input
                                                value={editingUser.contactNumber}
                                                onChange={(e) => {
                                                    // Only allow numbers (sanitize input)
                                                    const sanitizedValue = e.target.value.replace(/[^0-9]/g, '');
                                                    setEditingUser({
                                                        ...editingUser,
                                                        contactNumber: sanitizedValue,
                                                    });
                                                }}
                                            />
                                        ) : (
                                            user.contactNumber
                                        )}
                                    </Table.Cell>
                                    <Table.Cell color={"black"}>
                                        {editingUser?.id === user.id ? (
                                            <Input
                                                value={editingUser.userRole}
                                                onChange={(e) =>
                                                    setEditingUser({
                                                        ...editingUser,
                                                        userRole: e.target.value,
                                                    })
                                                }
                                            />
                                        ) : (
                                            user.userRole
                                        )}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {editingUser?.id === user.id ? (
                                            <Button bg={"#4DCBA4"} onClick={handleSave}>
                                                Save
                                            </Button>
                                        ) : (
                                            <HStack spacing={2}>
                                                <Button
                                                    variant="link"
                                                    color="blue.500"
                                                    onClick={() => handleEdit(user)}
                                                >
                                                    <MdEdit size={20} />
                                                </Button>
                                                <DialogRoot
                                                    isOpen={isOpen}
                                                    isClose={onClose}
                                                >
                                                    <DialogTrigger asChild>
                                                        <Button
                                                            variant="link"
                                                            color="red.500"
                                                            onClick={() => handleDelete(user.id)}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>Confirm Deletion</DialogTitle>
                                                        </DialogHeader>
                                                        <DialogBody>
                                                            <Text>
                                                                Are you sure you want to delete this user?
                                                            </Text>
                                                        </DialogBody>
                                                        <DialogFooter>
                                                            <DialogTrigger asChild>
                                                                <Button
                                                                    variant="outline"
                                                                    onClick={onClose}
                                                                >
                                                                    Cancel
                                                                </Button>
                                                            </DialogTrigger> 
                                                            <Button
                                                                backgroundColor={"red"}
                                                                colorScheme="red"
                                                                onClick={confirmDelete}
                                                                isLoading={isDeleting}
                                                            >
                                                                Delete
                                                            </Button>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </DialogRoot>
                                            </HStack>
                                        )}
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Root>
                )}
            </Stack>
        </>
    );
};

export default UserManagement;
