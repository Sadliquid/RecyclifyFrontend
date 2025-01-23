import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Stack, Table, Heading, Input, HStack, Button, Box, Spinner, Text } from "@chakra-ui/react";
import { MdEdit, MdAdd } from "react-icons/md";
import Server from "../../../networking";

const InventoryManagement = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [rewardItems, setRewardItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [editingItem, setEditingItem] = useState(null); // Track the item being edited
    const { user, loaded, error, authToken } = useSelector((state) => state.auth);

    const navigate = useNavigate();

    useEffect(() => {
        if (!error) {
            if (loaded) {
                if (!user) {
                    navigate("/auth/login");
                    ShowToast("error", "You are not logged in", "Please log in first");
                } else if (user.userRole != "admin") {
                    navigate("/auth/login");
                    ShowToast("error", "Access denied", "Please log in as a admin");
                }
            }
        } else {
            ShowToast("error", "Error", "An error occurred while fetching user state");
        }
    }, [loaded]);

    // Fetch reward items from the backend
    useEffect(() => {
        const fetchRewardItems = async () => {
            try {
                const response = await Server.get(
                    `${import.meta.env.VITE_BACKEND_URL}/api/RewardItem`
                );
                console.log("Response:", response);

                // Check if the request was successful (status code 2xx)
                if (response.status >= 200 && response.status < 300) {
                    const data = response.data; // Access the data property
                    setRewardItems(data); // Set all items (both available and unavailable)
                    setIsLoading(false);
                } else {
                    throw new Error(
                        `Failed to fetch reward items: ${response.statusText}`
                    );
                }
            } catch (error) {
                setErrorMessage(error.message);
                setIsLoading(false);
            }
        };

        fetchRewardItems();
    }, [loaded]);

    if (!loaded) {
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

    // Filter items based on the search term
    const filteredItems = rewardItems.filter((item) =>
        item.rewardTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle edit button click
    const handleEdit = (item) => {
        setEditingItem(item); // Set the item to be edited
    };

    // Handle save button click (update item)
    const handleSave = async () => {
        try {
            const response = await Server.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/RewardItem/${editingItem.rewardID}`,
                editingItem, // Pass the data as the second argument
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            // Check if the request was successful
            if (response.status >= 200 && response.status < 300) {
                // Update the item in the local state
                setRewardItems(
                    rewardItems.map((item) =>
                        item.rewardID === editingItem.rewardID ? editingItem : item
                    )
                );

                setEditingItem(null); // Clear the editing state
            } else {
                throw new Error("Failed to update reward item");
            }
        } catch (error) {
            console.log("Error:", error);
        }
    };

    const handleToggleAvailability = async (rewardID) => {
        try {
            const response = await Server.put( // Use PUT instead of PATCH
                `/api/RewardItem/${rewardID}/toggle-availability`
            );
    
            if (response.status == 200) {
                // Update the local state to reflect the change
                setRewardItems(prevItems =>
                    prevItems.map(item =>
                        item.rewardID === rewardID
                            ? { ...item, isAvailable: response.data.data.isAvailable }
                            : item
                    )
                );
            } else {
                throw new Error("Failed to toggle availability");
            }
        } catch (error) {
            console.log("Error:", error);
        }
    };

    if (isLoading) {
        return <Spinner />;
    }

    if (errorMessage) {
        return <div>Error: {errorMessage}</div>;
    }

    return (
        <Stack gap="10">
            <Box textAlign="center">
                <Heading fontSize={"30px"} m={10}>
                    Reward Items Management
                </Heading>
                <HStack justifyContent="center" mb="4">
                    <Input
                        placeholder="Search for reward items..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        width="400px"
                        background={"white"}
                        align={"center"}
                        color={"black"}
                    />
                    <Button
                        leftIcon={<MdAdd />} // Add icon
                        colorScheme="teal"
                        onClick={() => console.log("Add Item button clicked")}
                    >
                        Add Item
                    </Button>
                </HStack>
            </Box>
            {filteredItems.length === 0 ? (
                <Box textAlign="center" py={10}>
                    <Text fontSize="lg" color="gray.500">
                        No reward items found.
                    </Text>
                    <Button
                        mt={4}
                        leftIcon={<MdAdd />}
                        colorScheme="teal"
                        onClick={() => console.log("Add Item button clicked")}
                    >
                        Add a New Item
                    </Button>
                </Box>
            ) : (
                <Table.Root size="sm" showColumnBorder>
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeader>Title</Table.ColumnHeader>
                            <Table.ColumnHeader>Description</Table.ColumnHeader>
                            <Table.ColumnHeader>Required Points</Table.ColumnHeader>
                            <Table.ColumnHeader>Quantity</Table.ColumnHeader>
                            <Table.ColumnHeader>Action</Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {filteredItems.map((item) => (
                            <Table.Row key={item.rewardID} opacity={item.isAvailable ? 1 : 0.5}>
                                <Table.Cell color={item.isAvailable ? "black" : "gray.500"}>
                                    <Box display="flex" alignItems="center">
                                        <Box
                                            borderRadius="full"
                                            width="40px"
                                            height="40px"
                                            bg="pink.200"
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                            mr="2"
                                        >
                                            {item.icon}
                                        </Box>
                                        {editingItem?.rewardID === item.rewardID ? (
                                            <Input
                                                value={editingItem.rewardTitle}
                                                onChange={(e) =>
                                                    setEditingItem({
                                                        ...editingItem,
                                                        rewardTitle: e.target.value,
                                                    })
                                                }
                                            />
                                        ) : (
                                            item.rewardTitle
                                        )}
                                    </Box>
                                </Table.Cell>
                                <Table.Cell color={item.isAvailable ? "black" : "gray.500"}>
                                    {editingItem?.rewardID === item.rewardID ? (
                                        <Input
                                            value={editingItem.rewardDescription}
                                            onChange={(e) =>
                                                setEditingItem({
                                                    ...editingItem,
                                                    rewardDescription: e.target.value,
                                                })
                                            }
                                        />
                                    ) : (
                                        item.rewardDescription
                                    )}
                                </Table.Cell>
                                <Table.Cell color={item.isAvailable ? "black" : "gray.500"}>
                                    {editingItem?.rewardID === item.rewardID ? (
                                        <Input
                                            type="number"
                                            value={editingItem.requiredPoints}
                                            onChange={(e) =>
                                                setEditingItem({
                                                    ...editingItem,
                                                    requiredPoints: parseInt(e.target.value),
                                                })
                                            }
                                        />
                                    ) : (
                                        item.requiredPoints
                                    )}
                                </Table.Cell>
                                <Table.Cell color={item.isAvailable ? "black" : "gray.500"}>
                                    {editingItem?.rewardID === item.rewardID ? (
                                        <Input
                                            type="number"
                                            value={editingItem.rewardQuantity}
                                            onChange={(e) =>
                                                setEditingItem({
                                                    ...editingItem,
                                                    rewardQuantity: parseInt(e.target.value),
                                                })
                                            }
                                        />
                                    ) : (
                                        item.rewardQuantity
                                    )}
                                </Table.Cell>
                                <Table.Cell>
                                    {editingItem?.rewardID === item.rewardID ? (
                                        <Button colorScheme="teal" onClick={handleSave}>
                                            Save
                                        </Button>
                                    ) : (
                                        <HStack spacing={2}>
                                            <Button
                                                variant="link"
                                                color="blue.500"
                                                onClick={() => handleEdit(item)}
                                            >
                                                <MdEdit size={20} />
                                            </Button>
                                            <Button
                                                variant="link"
                                                color={item.isAvailable ? "red.500" : "green.500"}
                                                onClick={() => handleToggleAvailability(item.rewardID)}
                                            >
                                                {item.isAvailable ? "Mark Unavailable" : "Mark Available"}
                                            </Button>
                                        </HStack>
                                    )}
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            )}
        </Stack>
    );
};

export default InventoryManagement;
