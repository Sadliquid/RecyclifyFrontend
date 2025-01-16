import { useState, useEffect } from "react";
import { Stack, Table, Heading, Input, HStack, Button, Box, Spinner, Text } from "@chakra-ui/react";
import { MdEdit, MdAdd, MdDelete } from "react-icons/md";
import Server from "../../../networking";

const InventoryManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [rewardItems, setRewardItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingItem, setEditingItem] = useState(null); // Track the item being edited

  // Fetch reward items from the backend
  useEffect(() => {
    const fetchRewardItems = async () => {
      try {
        const response = await Server.get(`${import.meta.env.VITE_BACKEND_URL}/api/RewardItem`);
        console.log("Response:", response);

        // Check if the request was successful (status code 2xx)
        if (response.status >= 200 && response.status < 300) {
          const data = response.data; // Access the data property
          setRewardItems(data);
          setIsLoading(false);
        } else {
          throw new Error(`Failed to fetch reward items: ${response.statusText}`);
        }
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchRewardItems();
  }, []);

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

  // Handle delete button click
  const handleDelete = async (rewardID) => {
    // Show a confirmation dialog
    const isConfirmed = window.confirm("Are you sure you want to delete this reward item? This action cannot be undone.");

    if (!isConfirmed) {
      return; // Exit if the user cancels
    }

    try {
      const response = await Server.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/RewardItem/${rewardID}`
      );

      // Check if the request was successful
      if (response.status >= 200 && response.status < 300) {
        // Remove the item from the local state
        setRewardItems(rewardItems.filter((item) => item.rewardID !== rewardID));
      } else {
        throw new Error("Failed to delete reward item");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error: {error}</div>;
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
              <Table.Row key={item.rewardID}>
                <Table.Cell color={"black"}>
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
                      {item.icon} {/* Replace this with relevant icons if needed */}
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
                <Table.Cell color={"black"}>
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
                <Table.Cell color={"black"}>
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
                <Table.Cell color={"black"}>
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
                        color="red.500"
                        onClick={() => handleDelete(item.rewardID)}
                      >
                        <MdDelete size={20} />
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