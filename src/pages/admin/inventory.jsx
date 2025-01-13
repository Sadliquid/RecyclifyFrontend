import React, { useState } from 'react';
import { Stack, Table, Text, Input, HStack, Button, Box } from "@chakra-ui/react";
// Import specific icons from react-icons
import { MdEdit } from 'react-icons/md';

const InventoryManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter items based on the search term
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle edit button click
  const handleEdit = (id) => {
    console.log(`Editing item with id: ${id}`);
    // Logic for editing item can be implemented here
  };

  return (
    <Stack gap="10">
      <HStack justifyContent="space-between" mb="4">
        <Text textStyle="xl" textAlign={"left"}>Inventory Management</Text>
        <Input
          placeholder="Search for item..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          width="400px"
        />
      </HStack>
      <Table.Root size="sm" variant="simple">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader>Quantity</Table.ColumnHeader>
            <Table.ColumnHeader>Points</Table.ColumnHeader>
            <Table.ColumnHeader>Action</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {filteredItems.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell>
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
                  {item.name}
                </Box>
              </Table.Cell>
              <Table.Cell>{item.quantity}</Table.Cell>
              <Table.Cell>{item.points}</Table.Cell>
              <Table.Cell>
                <Button
                  variant="link" // Use link button style
                  color="blue.500"
                  onClick={() => handleEdit(item.id)}
                >
                  <MdEdit size={20} /> {/* React Icon for edit */}
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Stack>
  );
};

const items = [
  { id: 1, name: "Post-it Notepad", quantity: 100, points: 100, icon: "📝" },
  { id: 2, name: "Recyclable Bag", quantity: 223, points: 250, icon: "🛍️" },
  { id: 3, name: "Water Bottle", quantity: 0, points: 500, icon: "💧" },
  { id: 4, name: "Pens (Pack of 5)", quantity: 54, points: 200, icon: "🖊️" },
  { id: 5, name: "Ruler", quantity: 136, points: 50, icon: "📏" },
  { id: 6, name: "Highlighter", quantity: 500, points: 200, icon: "🖍️" },
];

export default InventoryManagement;