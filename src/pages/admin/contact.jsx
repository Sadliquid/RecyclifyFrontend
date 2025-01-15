import { useState, useRef, useEffect } from "react";
import {Stack, Table, Heading, Input, HStack, Box, Textarea, Spinner} from "@chakra-ui/react";
import { MdReply, MdEdit } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { DialogActionTrigger, DialogBody, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Field } from "@/components/ui/field";
import Server from "../../../networking";

const ContactFormManagement = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const subjectRef = useRef(null);
    const editMessageRef = useRef(null);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await Server.get("/api/ContactManagement");

            // Check if the request was successful (status code 2xx)
            if (response.status >= 200 && response.status < 300) {
                const data = response.data; // Access the data property
                setMessages(data);
                setIsLoading(false);
            } else {
                throw new Error(`Failed to fetch messages: ${response.statusText}`);
            }
        } catch (error) {
            setError(error.message);
            setIsLoading(false);
        }
    };

    // Filter messages based on the search term
    const filteredMessages = messages.filter(
        (message) =>
            message.senderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            message.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle reply button click
    const handleReply = (message) => {
        setSelectedMessage(message);
    };

    // Handle edit button click
    const handleEdit = (message) => {
        setSelectedMessage(message);
        setIsEditing(true);
    };

    const handleSendReply = async (subject, body) => {

        try {
            const deleteResponse = await Server.delete(
                `${import.meta.env.VITE_BACKEND_URL}/api/ContactManagement/${selectedMessage.id
                }`
            );

            // Check if the request was successful
            if (deleteResponse.status >= 200 && deleteResponse.status < 300) {
                // Remove the message from the local state
                setMessages(
                    messages.filter((message) => message.id !== selectedMessage.id)
                );
                setSelectedMessage(null);
            } else {
                throw new Error("Failed to delete the message");
            }
        } catch (error) {
            console.error("Error deleting the message:", error);
        }
    };

    const handleSaveEdit = async (newMessage) => {
        try {
            const updateResponse = await Server.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/ContactManagement/${selectedMessage.id
                }`,
                {
                    ...selectedMessage,
                    message: newMessage,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            // Check if the request was successful
            if (updateResponse.status >= 200 && updateResponse.status < 300) {
                // Update the message in the local state
                setMessages(
                    messages.map((message) =>
                        message.id === selectedMessage.id
                            ? { ...message, message: newMessage }
                            : message
                    )
                );
                setIsEditing(false);
                setSelectedMessage(null);
            } else {
                throw new Error("Failed to update the message");
            }
        } catch (error) {
            console.error("Error updating the message:", error);
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
                    Contact Form Messages
                </Heading>
                <HStack justifyContent="center" mb="4">
                    <Input
                        placeholder="Search messages..."
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
                        <Table.ColumnHeader>Sender Name</Table.ColumnHeader>
                        <Table.ColumnHeader>Email</Table.ColumnHeader>
                        <Table.ColumnHeader>Message</Table.ColumnHeader>
                        <Table.ColumnHeader>Action</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {filteredMessages.map((message) => (
                        <Table.Row key={message.id}>
                            <Table.Cell color={"black"}>
                                <Box display="flex" alignItems="center">
                                    <Box
                                        borderRadius="full"
                                        width="40px"
                                        height="40px"
                                        bg="blue.200"
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        mr="2"
                                    >
                                        👤
                                    </Box>
                                    {message.senderName}
                                </Box>
                            </Table.Cell>
                            <Table.Cell color={"black"}>{message.senderEmail}</Table.Cell>
                            <Table.Cell color={"black"}>{message.message}</Table.Cell>
                            <Table.Cell>
                                <HStack spacing="2">
                                    <DialogRoot initialFocusEl={() => subjectRef.current}>
                                        <DialogTrigger asChild>
                                            <Button
                                                variant="link"
                                                color="blue.500"
                                                onClick={() => handleReply(message)}
                                            >
                                                <MdReply size={20} /> Reply
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Reply to {message.senderName}</DialogTitle>
                                            </DialogHeader>
                                            <DialogBody pb="4">
                                                <Stack gap="4">
                                                    <Field label="Subject">
                                                        <Input
                                                            ref={subjectRef}
                                                            placeholder="Enter email subject"
                                                        />
                                                    </Field>
                                                    <Field label="Message">
                                                        <Textarea
                                                            placeholder="Type your reply here"
                                                            rows={5}
                                                        />
                                                    </Field>
                                                </Stack>
                                            </DialogBody>
                                            <DialogFooter>
                                                <DialogActionTrigger asChild>
                                                    <Button
                                                        onClick={() => {
                                                            const subject = subjectRef.current.value;
                                                            const body =
                                                                document.querySelector("textarea").value;
                                                            handleSendReply(subject, body);
                                                        }}
                                                    >
                                                        Send Reply
                                                    </Button>
                                                </DialogActionTrigger>
                                            </DialogFooter>
                                        </DialogContent>
                                    </DialogRoot>
                                    <DialogRoot initialFocusEl={() => editMessageRef.current}>
                                        <DialogTrigger asChild>
                                            <Button
                                                variant="link"
                                                color="green.500"
                                                onClick={() => handleEdit(message)}
                                            >
                                                <MdEdit size={20} /> Edit
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Edit Message</DialogTitle>
                                            </DialogHeader>
                                            <DialogBody pb="4">
                                                <Stack gap="4">
                                                    <Field label="Message">
                                                        <Textarea
                                                            ref={editMessageRef}
                                                            defaultValue={message.message}
                                                            placeholder="Edit the message"
                                                            rows={5}
                                                        />
                                                    </Field>
                                                </Stack>
                                            </DialogBody>
                                            <DialogFooter>
                                                <DialogActionTrigger asChild>
                                                    <Button
                                                        onClick={() => {
                                                            const newMessage = editMessageRef.current.value;
                                                            handleSaveEdit(newMessage);
                                                        }}
                                                    >
                                                        Save Changes
                                                    </Button>
                                                </DialogActionTrigger>
                                            </DialogFooter>
                                        </DialogContent>
                                    </DialogRoot>
                                </HStack>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </Stack>
    );
};

export default ContactFormManagement;
