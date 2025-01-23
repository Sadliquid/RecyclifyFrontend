import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import {Stack, Table, Heading, Input, HStack, Button, Box, Spinner } from "@chakra-ui/react";

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
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
      ShowToast("error", "Error", "An error occured while fetching user state");
    }
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
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle edit button click
  const handleEdit = (id) => {
    console.log(`Editing user with id: ${id}`);
    // Logic for editing user can be implemented here
  };

  return (
    <Stack gap="10">
      <Box textAlign="center">
        <Heading fontSize={"30px"} m={10}>
          User Management
        </Heading>
        <HStack justifyContent="center" mb="4">
          <Input
            placeholder="Search for user..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            width="400px"
            background={"white"}
            align={"center"}
            color={"black"}
          />
        </HStack>
      </Box>
      <Table.Root size="sm" showColumnBorder>
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
                    {item.name[0]} {/* Placeholder for icon or initial */}
                  </Box>
                  {item.name}
                </Box>
              </Table.Cell>
              <Table.Cell color={"black"}>{item.email}</Table.Cell>
              <Table.Cell color={"black"}>{item.phone}</Table.Cell>
              <Table.Cell color={"black"}>{item.role}</Table.Cell>
              <Table.Cell>
                <Button
                  bg="green.500" // Set background to green
                  color="white" // Set text color to white
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
  {
    id: 1,
    name: "Susie Jones",
    email: "susiejones@gmail.com",
    phone: "12345678",
    role: "Student",
  },
  {
    id: 2,
    name: "Mary Tan",
    email: "marytan@gmail.com",
    phone: "12345678",
    role: "Teacher",
  },
  {
    id: 3,
    name: "Susie Jones",
    email: "susiejones@gmail.com",
    phone: "12345678",
    role: "Parent",
  },
  {
    id: 4,
    name: "John Doe",
    email: "johndoe@gmail.com",
    phone: "12345678",
    role: "Parent",
  },
  {
    id: 5,
    name: "Anna Smith",
    email: "annasmith@gmail.com",
    phone: "12345678",
    role: "Student",
  },
];

export default UserManagement;
