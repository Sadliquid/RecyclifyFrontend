/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Stack, Table, Heading, Input, HStack, Button, Box, Spinner, Text, VStack, useDisclosure } from "@chakra-ui/react";
import { MdEdit, MdAdd } from "react-icons/md";
import { DialogBody, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ShowToast from "../../Extensions/ShowToast";
import { Field } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox"
import Server from "../../../networking";
import RewardItemImage from "../../components/admin/inventoryManagementImageIcon";
const InventoryManagement = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [rewardItems, setRewardItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [editingItem, setEditingItem] = useState(null); // Track the item being edited
    const { user, loaded, error } = useSelector((state) => state.auth);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [addItem, setAddItem] = useState({isAvailable: false});
    useEffect(() => {
        if (!error && loaded && user && user.userRole == "admin") {
            fetchRewardItems();
        }
    }, [loaded]);
    // Fetch reward items from the backend
    const fetchRewardItems = async () => {
        try {
            const response = await Server.get(`/api/RewardItem`);

            if (response.status === 200) {
                // Access nested data property
                setRewardItems(response.data.data);
                setIsLoading(false);
            } else {
                throw new Error(response.data.error || `Failed to fetch reward items`);
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.error || error.message);
            setIsLoading(false);
        }
    };

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

    const handleAddItem = () => {
        onOpen();
    };

    // Handle save button click (update item)
    const handleSave = async () => {
        try {
            const response = await Server.put(
                `/api/RewardItem/${editingItem.rewardID}`,
                editingItem,
                { headers: { "Content-Type": "application/json" } }
            );
    
            if (response.status >= 200 && response.status < 300) {
                setRewardItems(rewardItems.map(item =>
                    item.rewardID === response.data.data.rewardID ? response.data.data : item
                ));
                setEditingItem(null);
    
                const successMessage = response.data.message?.substring(0, 50) || "Reward item updated successfully!";
                ShowToast("success", "Success", successMessage);
            } else {
                throw new Error(response.data.error || "Failed to update reward item");
            }
        } catch (error) {
            let errorMessage = "Failed to update reward item.";
    
            if (error.response) {
                errorMessage = error.response.data?.error || error.response.data?.message || errorMessage;
            } else if (error.request) {
                errorMessage = "No response from the server. Please check your internet connection.";
            } else {
                errorMessage = `Unexpected error: ${error.message}`;
            }
    
            errorMessage = errorMessage.length > 50 ? `${errorMessage.substring(0, 50)}...` : errorMessage;
            ShowToast("error", "Error", errorMessage);
        }
    };

    const handleToggleAvailability = async (rewardID) => {
        try {
            const response = await Server.put(`/api/RewardItem/${rewardID}/toggle-availability`);
    
            if (response.status === 200) {
                setRewardItems(prevItems =>
                    prevItems.map(item =>
                        item.rewardID === rewardID ? response.data.data : item
                    )
                );
    
                const successMessage = response.data.message?.substring(0, 50) || "Reward availability updated!";
                ShowToast("success", "Success", successMessage);
            } else {
                throw new Error(response.data.error || "Failed to toggle availability");
            }
        } catch (error) {
            let errorMessage = "Failed to toggle reward availability.";
    
            if (error.response) {
                errorMessage = error.response.data?.error || error.response.data?.message || errorMessage;
            } else if (error.request) {
                errorMessage = "No response from the server. Please check your internet connection.";
            } else {
                errorMessage = `Unexpected error: ${error.message}`;
            }
    
            errorMessage = errorMessage.length > 50 ? `${errorMessage.substring(0, 50)}...` : errorMessage;
            ShowToast("error", "Error", errorMessage);
        }
    };


    const submitRewardItem = async (addItem, fetchRewardItems, setAddItem, onClose, ShowToast, setErrorMessage) => {
        const formData = new FormData();
        formData.append("RewardTitle", addItem.title);
        formData.append("RewardDescription", addItem.description);
        formData.append("RequiredPoints", addItem.points);
        formData.append("RewardQuantity", addItem.quantity);
        formData.append("IsAvailable", addItem.isAvailable);
        formData.append("ImageFile", addItem.image);
      
        try {
          const response = await Server.post("/api/RewardItem", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            transformRequest: (formData) => formData,
          });
      
          if (response.status === 200) {
            fetchRewardItems();
            setAddItem(null);
            onClose();
            const successMessage = response.data.message?.substring(0, 50) || "Item added successfully!";
            ShowToast("success", "Success", successMessage);
          }
        } catch (error) {
          let errorMessage = "";
      
          if (error.response) {
            // Server-side error
            if (error.response.status === 400) {
              errorMessage = "Validation error: Please check the data you submitted.";
            } else if (error.response.status === 500) {
              errorMessage = "Server error: Something went wrong on our end.";
            } else {
              errorMessage = error.response.data.message;
            }
          } else {
            // Other errors
            errorMessage = `Unexpected error: ${error.message}`;
          }
      
          // Substring the error message if it's too long
          errorMessage = errorMessage.length > 100 ? `${errorMessage.substring(0, 100)}...` : errorMessage;
          setErrorMessage(errorMessage);
          ShowToast("error", "Error", errorMessage);
        }
      };
      
    if (isLoading) {
        return <Spinner />;
    }

    if (errorMessage) {
        return <div>Error: {errorMessage}</div>;
    }

    return (
        <>
            <Stack gap="10">
                <Box textAlign="center">
                    <Heading fontSize="30px" mt={10} mb={10}>Manage Rewards</Heading>
                    <VStack justifyContent="center" mb="4">
                        <Input
                            placeholder="Search for reward items..."
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
                                bg={"#4DCBA4"}
                                onClick={() => handleAddItem()}
                                mt={5}
                            >
                                Add Reward
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add a new item for redemption</DialogTitle>
                                </DialogHeader>
                                <DialogBody pb="4">
                                    <Stack gap="4">
                                        <Field label ="Reward Title">
                                            <Input value={addItem?.title || ""}
                                            onChange={(e) => setAddItem({
                                                ...addItem,
                                                title: e.target.value
                                            })
                                            }
                                            placeholder="Enter Reward Title"/>
                                        </Field>
                                        <Field label ="Reward Description">
                                            <Input value={addItem?.description || ""}
                                            onChange={(e) => setAddItem({
                                                ...addItem,
                                                description: e.target.value
                                            })
                                            }
                                            placeholder="Enter Reward Description"/>
                                        </Field>
                                        <Field label ="Required Points">
                                            <Input 
                                                type="tel"
                                                inputMode="numeric"
                                                pattern="[0-9]*"
                                                value={addItem?.points || ""}
                                                onChange={(e) => {
                                                    const sanitizedValue = e.target.value.replace(/[^0-9]/g, '');
                                                    setAddItem({...addItem,points: sanitizedValue})
                                                }
                                                }
                                            placeholder="Enter Required Points"/>
                                        </Field>
                                        <Field label ="Quantity">
                                            <Input 
                                                type="tel"
                                                inputMode="numeric"
                                                pattern="[0-9]*"
                                                value={addItem?.quantity || ""}
                                                onChange={(e) => {
                                                    const sanitizedValue = e.target.value.replace(/[^0-9]/g, '');
                                                    setAddItem({...addItem, quantity: sanitizedValue});
                                                }
                                                }
                                            placeholder="Enter Quantity"/>
                                        </Field>
                                        <Field label ="Is Available">
                                        <Checkbox
                                            isChecked={addItem?.isAvailable || false}
                                            onChange={(e) =>
                                                setAddItem({
                                                ...addItem,
                                                isAvailable: e.target.checked,
                                                })
                                            }
                                            >
                                            Is Available
                                            </Checkbox>
                                        </Field>
                                        <Field label="Item Image">
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => setAddItem({
                                                    ...addItem,
                                                    image: e.target.files[0]
                                                })}
                                            />
                                        </Field>
                                    </Stack>
                                </DialogBody>
                                <DialogFooter>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" onClick={onClose}>Cancel</Button>
                                    </DialogTrigger>
                                    <Button
                                        bg={"#4DCBA4"}
										isLoading={isLoading}
										isDisabled={isLoading}
                                        onClick={async () => {
											setIsLoading(true);
                                            submitRewardItem(addItem, fetchRewardItems, setAddItem, onClose, ShowToast, setErrorMessage);
                                            }}
                                    >{isLoading ? "Adding..." : "Submit"} </Button>
                                </DialogFooter>
                            </DialogContent>

                        </DialogRoot>
                    </VStack>
                </Box>
                {filteredItems.length === 0 ? (
                    <Box textAlign="center" py={10}>
                        <Text fontSize="lg" color="gray.500">
                            No reward items found.
                        </Text>
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
                                <Table.Row key={item.rewardID}>
                                    <Table.Cell color={item.isAvailable ? "black" : "gray.500"} opacity={item.isAvailable ? 1 : 0.5}>
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
                                               <RewardItemImage rewardId={item.rewardID} />
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
                                    <Table.Cell color={item.isAvailable ? "black" : "gray.500"} opacity={item.isAvailable ? 1 : 0.5}>
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
                                    <Table.Cell color={item.isAvailable ? "black" : "gray.500"} opacity={item.isAvailable ? 1 : 0.5}>
                                        {editingItem?.rewardID === item.rewardID ? (
                                            <Input
                                                type="tel"
                                                inputMode="numeric"
                                                pattern="[0-9]*"
                                                value={editingItem.requiredPoints}
                                                onChange={(e) => {
                                                    const sanitizedValue = e.target.value.replace(/[^0-9]/g, '');
                                                    setEditingItem({
                                                        ...editingItem,
                                                        requiredPoints: parseInt(sanitizedValue),
                                                    })
                                                    }
                                                }
                                            />
                                        ) : (
                                            item.requiredPoints
                                        )}
                                    </Table.Cell>
                                    <Table.Cell color={item.isAvailable ? "black" : "gray.500"} opacity={item.isAvailable ? 1 : 0.5}>
                                        {editingItem?.rewardID === item.rewardID ? (
                                            <Input
                                                type="tel"
                                                inputMode="numeric"
                                                pattern="[0-9]*"
                                                value={editingItem.rewardQuantity}
                                                onChange={(e) => {
                                                    const sanitizedValue = e.target.value.replace(/[^0-9]/g, '');
                                                    setEditingItem({
                                                        ...editingItem,
                                                        rewardQuantity: parseInt(sanitizedValue),
                                                    })
                                                }
                                                }
                                            />
                                        ) : (
                                            item.rewardQuantity
                                        )}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {editingItem?.rewardID === item.rewardID ? (
                                            <Button bg={"#4DCBA4"} onClick={handleSave}>
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
        </>
    );
};

export default InventoryManagement;
