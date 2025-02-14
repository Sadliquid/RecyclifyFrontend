import { useState, useRef, useEffect } from "react";
import { Stack, Table, Heading, Input, HStack, Box, Textarea, Spinner, useDisclosure } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { MdReply } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { DialogActionTrigger, DialogBody, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Field } from "@/components/ui/field";
import Server from "../../../networking";
import ShowToast from "../../Extensions/ShowToast";

const ContactFormManagement = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedMessage, setSelectedMessage] = useState(null);
	const [messages, setMessages] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState(null);
	const [isSendingEmail, setIsSendingEmail] = useState(false); // New state for email sending
    const [isDialogOpen, setIsDialogOpen] = useState(false);
	const subjectRef = useRef(null);
	const { user, loaded, error } = useSelector((state) => state.auth);
    const { isOpen, onOpen, onClose } = useDisclosure(); // Chakra UI dialog state
	useEffect(() => {
		if (!error && loaded && user && user.userRole == "admin") {
			fetchMessages();
		}
	}, [loaded]);

	const fetchMessages = async () => {
		try {
			const response = await Server.get("/api/ContactManagement");

			if (response.status === 200) {
				setMessages(response.data.data);
				setIsLoading(false);
			} else {
				throw new Error(response.data.error || `Failed to fetch messages`);
			}
		} catch (error) {
			setErrorMessage(error.response?.data?.error || error.message);
			setIsLoading(false);
		}
	};

	const filteredMessages = messages.filter(
		(message) =>
			(message.senderName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
				message.senderEmail
					?.toLowerCase()
					.includes(searchTerm.toLowerCase())) &&
			message // Ensure message exists
	);

    const handleReply = (message) => {
        setSelectedMessage(message);
        onOpen();
    };

	const handleSendReply = async (subject, body) => {
        setIsSendingEmail(true); // Start loading state
        try {
            const emailResponse = await Server.post(
                `api/ContactManagement/${selectedMessage.id}/send-email`,
                { subject, body },
                { headers: { "Content-Type": "application/json" } }
            );
    
            if (emailResponse.status !== 200) {
                throw new Error(emailResponse.data.error || "Failed to send email");
            }
    
            const markRepliedResponse = await Server.put(
                `/api/ContactManagement/${selectedMessage.id}/mark-replied`
            );
    
            if (markRepliedResponse.status === 200) {
                setMessages(prevMessages =>
                    prevMessages.map(message =>
                        message.id === selectedMessage.id
                            ? { ...message, hasReplied: true }
                            : message
                    )
                );
                ShowToast("success", "Success", "Reply sent and marked as replied.");
                setIsDialogOpen(false); // ✅ Close dialog AFTER sending succeeds
            } else {
                throw new Error(markRepliedResponse.data.error || "Failed to mark as replied");
            }
        } catch (error) {
            ShowToast("error", "Error", error.response?.data?.error || error.message);
        } finally {
            setIsSendingEmail(false); // End loading state
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
						<Table.Row key={message.id} opacity={message.hasReplied ? 0.5 : 1}>
							<Table.Cell color={message.hasReplied ? "gray.500" : "black"}>
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
							<Table.Cell color={message.hasReplied ? "gray.500" : "black"}>
								{message.senderEmail}
							</Table.Cell>
							<Table.Cell color={message.hasReplied ? "gray.500" : "black"}>
								{message.message}
							</Table.Cell>
							<Table.Cell>
								<HStack spacing="2">
									{!message.hasReplied && (
										<DialogRoot isOpen={isOpen} onClose={onClose}>
                                        <DialogTrigger asChild>
                                            <Button variant="link" color="blue.500" onClick={() => handleReply(message)}>
                                                <MdReply size={20} /> Reply
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Reply to {selectedMessage?.senderName}</DialogTitle>
                                            </DialogHeader>
                                            <DialogBody pb="4">
                                                <Stack gap="4">
                                                    <Field label="Subject">
                                                        <Input ref={subjectRef} placeholder="Enter email subject" disabled={isSendingEmail} />
                                                    </Field>
                                                    <Field label="Message">
                                                        <Textarea placeholder="Type your reply here" rows={5} disabled={isSendingEmail} />
                                                    </Field>
                                                </Stack>
                                            </DialogBody>
                                            <DialogFooter>
                                                <Button bg={"#4DCBA4"} onClick={() => {
                                                    const subject = subjectRef.current.value;
                                                    const body = document.querySelector("textarea").value;
                                                    handleSendReply(subject, body);
                                                }} disabled={isSendingEmail}>
                                                    {isSendingEmail ? <Spinner size="sm" /> : "Send Reply"}
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </DialogRoot>
									)}
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