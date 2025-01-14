import { useState, useRef } from "react";
import { Stack, Table, Heading, Input, HStack, Box, Textarea } from "@chakra-ui/react";
import { MdReply } from 'react-icons/md';
import { Button } from "@/components/ui/button"
import {
    DialogActionTrigger,
    DialogBody,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Field } from "@/components/ui/field"

const ContactFormManagement = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const subjectRef = useRef(null);

    // Filter messages based on the search term
    const filteredMessages = messages.filter(message =>
        message.senderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle reply button click
    const handleReply = (message) => {
        setSelectedMessage(message);
    };

    // Handle send reply
    const handleSendReply = (subject, body) => {
        console.log(`Replying to: ${selectedMessage.email}`);
        console.log(`Subject: ${subject}`);
        console.log(`Body: ${body}`);
        // Implement your email sending logic here
        setSelectedMessage(null);
        setIsDialogOpen(false);
    };

    return (
        <Stack gap="10">
            <Box textAlign="center">
                <Heading fontSize={"30px"} m={10}>Contact Form Messages</Heading>
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
                            <Table.Cell color={'black'}>
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
                            <Table.Cell color={'black'}>{message.email}</Table.Cell>
                            <Table.Cell color={'black'}>{message.message}</Table.Cell>
                            <Table.Cell>
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
                                                    <Input ref={subjectRef} placeholder="Enter email subject" />
                                                </Field>
                                                <Field label="Message">
                                                    <Textarea placeholder="Type your reply here" rows={5} />
                                                </Field>
                                            </Stack>
                                        </DialogBody>
                                        <DialogFooter>
                                            <DialogActionTrigger asChild>
                                                <Button variant="outline">Cancel</Button>
                                            </DialogActionTrigger>
                                            <DialogActionTrigger asChild>
                                            <Button onClick={() => {
                                                const subject = subjectRef.current.value;
                                                const body = document.querySelector('textarea').value;
                                                handleSendReply(subject, body);
                                            }}>
                                                Send Reply
                                            </Button>
                                            </DialogActionTrigger>
                                        </DialogFooter>
                                    </DialogContent>
                                </DialogRoot>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </Stack>
    );
};

const messages = [
    { id: 1, senderName: "John Doe", email: "john@example.com", message: "Hello, I have a question about your services." },
    { id: 2, senderName: "Jane Smith", email: "jane@example.com", message: "I'd like to schedule a consultation." },
    { id: 3, senderName: "Bob Johnson", email: "bob@example.com", message: "Can you provide more information about your pricing?" },
    { id: 4, senderName: "Alice Brown", email: "alice@example.com", message: "I'm interested in your product. How can I order?" },
    { id: 5, senderName: "Charlie Wilson", email: "charlie@example.com", message: "Is there a way to track my order?" },
];

export default ContactFormManagement;