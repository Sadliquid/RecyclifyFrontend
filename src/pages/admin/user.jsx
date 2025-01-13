import React, { useState } from 'react';
import { Stack, Table, Text, Input, HStack, Button, Box } from "@chakra-ui/react";

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter items based on the search term
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle edit button click
  const handleEdit = (id) => {
    console.log(`Editing user with id: ${id}`);
    // Logic for editing user can be implemented here
  };

  return (
    <Stack gap="10">
      <Text textStyle="xl" textAlign={"left"}>User Management</Text>
      <HStack justifyContent="space-between" mb="4">
        <Input
          placeholder="Search for user..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          width="400px"
        />
      </HStack>
      <Table.Root size="sm" variant="simple">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader>Email</Table.ColumnHeader>
            <Table.ColumnHeader>Phone Number</Table.ColumnHeader>
            <Table.ColumnHeader>Role</Table.ColumnHeader>
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
                    {item.name[0]} {/* Placeholder for icon or initial */}
                  </Box>
                  {item.name}
                </Box>
              </Table.Cell>
              <Table.Cell>{item.email}</Table.Cell>
              <Table.Cell>{item.phone}</Table.Cell>
              <Table.Cell>{item.role}</Table.Cell>
              <Table.Cell>
                <Button
                  bg="green.500" // Set background to green
                  color="white"   // Set text color to white
                  _hover={{ bg: "green.600" }} // Darken background on hover
                  onClick={() => handleEdit(item.id)}
                >
                  Edit
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
  { id: 1, name: "Susie Jones", email: "susiejones@gmail.com", phone: "12345678", role: "Student" },
  { id: 2, name: "Mary Tan", email: "marytan@gmail.com", phone: "12345678", role: "Teacher" },
  { id: 3, name: "Susie Jones", email: "susiejones@gmail.com", phone: "12345678", role: "Parent" },
  { id: 4, name: "John Doe", email: "johndoe@gmail.com", phone: "12345678", role: "Parent" },
  { id: 5, name: "Anna Smith", email: "annasmith@gmail.com", phone: "12345678", role: "Student" },
];

export default UserManagement;