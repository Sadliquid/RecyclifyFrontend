import React, { useState } from 'react';
import { Stack, Table, Text, Input, HStack } from "@chakra-ui/react";

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter items based on the search term
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Stack gap="10">
      <HStack justifyContent="space-between">
        <Text textStyle="xl" textAlign={"left"}>User Management</Text>
        <Input
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          width="200px" // Adjust width as needed
        />
      </HStack>
      <Table.Root size="sm" variant="outline">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Profile Photo</Table.ColumnHeader>
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader>Email</Table.ColumnHeader>
            <Table.ColumnHeader>Phone Number</Table.ColumnHeader>
            <Table.ColumnHeader>Role</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {filteredItems.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell>{item.profilePhoto}</Table.Cell>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.email}</Table.Cell>
              <Table.Cell>{item.phone}</Table.Cell>
              <Table.Cell>{item.role}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Stack>
  );
};

const items = [
  { id: 1, profilePhoto: "hehe", name: "Nicholas Chew", email: "Electronics", phone: "12345678", role: "Student" },
  { id: 2, profilePhoto: "hehe", name: "Coffee Maker", email: "Home Appliances", phone: "12345678", role: "Student" },
  { id: 3, profilePhoto: "hehe", name: "Desk Chair", email: "Furniture", phone: "12345678", role: "Student" },
  { id: 4, profilePhoto: "hehe", name: "Smartphone", email: "Electronics", phone: "12345678", role: "Student" },
  { id: 5, profilePhoto: "hehe", name: "Headphones", email: "Accessories", phone: "12345678", role: "Student" },
];

export default UserManagement;