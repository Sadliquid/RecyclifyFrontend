import { useState, useEffect } from "react";
import server from "../../../networking";
import { Button, Stack, Input, useDisclosure, Box, Heading, Spinner, Table } from "@chakra-ui/react";
import { DialogBody, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MdAdd } from "react-icons/md";
import { Field } from "@/components/ui/field";
import ShowToast from "../../Extensions/ShowToast";

const EventsManagement = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [eventDateTime, setEventDateTime] = useState(new Date().toISOString().slice(0, 16));
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false); // For fetching state
    const [events, setEvents] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false); // Track the submission state

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        setFetching(true); // Set fetching state to true while loading events
        try {
            const response = await server.get("/api/events");
            setEvents(response.data.events);
        } catch (error) {
			if (error.response && error.response.data && error.response.data.error && typeof error.response.data.error === "string") {
                if (error.response.data.error.startsWith("UERROR")) {
                    ShowToast("error", "Error", error.response.data.error.substring("UERROR: ".length));
                } else {
                    ShowToast("error", "Error", error.response.data.error.substring("ERROR: ".length));
                }
            } else {
                ShowToast("error", "Error", "An unexpected error occurred");
            }
        } finally {
            setFetching(false); // Set fetching state to false after loading
        }
    };

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

	const handleSubmit = async (e) => {
		e.preventDefault();
	
		// Check if fields are filled
		if (!title || !description || !eventDateTime || !imageFile) {
			ShowToast("error", "Error", "All fields are required.");
			return;
		}
	
		const formData = new FormData();
		formData.append("Title", title);
		formData.append("Description", description);
		formData.append("EventDateTime", eventDateTime);
		formData.append("ImageFile", imageFile);
	
		setLoading(true); // Start loading
		setIsSubmitting(true); // Start submission
	
		try {
			const response = await server.post("/api/events", formData, {
				headers: { "Content-Type": "multipart/form-data" },
				transformRequest: (formData) => formData,
			});
	
			if (response.data.message.startsWith("SUCCESS:")) {
				let message = response.data.message.substring("SUCCESS: ".length);
				ShowToast("success", "Success", message);
			}
			fetchEvents(); // Refresh events
	
			// Reset form fields
			setTitle("");
			setDescription("");
			setEventDateTime(new Date().toISOString().slice(0, 16));
			setImageFile(null);
	
			// Close modal after short delay
			setTimeout(() => onClose(), 100);
		} catch (error) {
			if (error.response && error.response.data && error.response.data.error && typeof error.response.data.error === "string") {
                if (error.response.data.error.startsWith("UERROR")) {
                    ShowToast("error", "Error", error.response.data.error.substring("UERROR: ".length));
                } else {
                    ShowToast("error", "Error", error.response.data.error.substring("ERROR: ".length));
                }
            } else {
                ShowToast("error", "Error", "An unexpected error occurred");
            }
		} finally {
			setLoading(false); // Stop loading
			setIsSubmitting(false); // Stop submission
		}
	};
	
    return (
        <Box p={6}>
            <Heading fontSize="30px" mt={10} mb={10}>Manage Events</Heading>

            {/* Show spinner when fetching events */}
            {fetching ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                    <Spinner size="xl" />
                </Box>
            ) : (
                <>
                    <DialogRoot isOpen={isOpen} onClose={onClose}>
                        <DialogTrigger asChild>
                            <Button leftIcon={<MdAdd />} bg="#4DCBA4" onClick={onOpen} mb={6} size="lg" _hover={{ bg: "#3db28a" }}>Create Event</Button>
                        </DialogTrigger>

                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Create New Event</DialogTitle>
                            </DialogHeader>

                            {/* Modal content */}
                            <DialogBody pb="4">
                                {/* Show the spinner on the main screen if loading */}
                                {loading ? (
                                    <Box
                                        position="fixed"
                                        top="0"
                                        left="0"
                                        right="0"
                                        bottom="0"
                                        display="flex"
                                        justifyContent="center"
                                        alignItems="center"
                                        backgroundColor="rgba(255, 255, 255, 0.7)"
                                        zIndex="1000"
                                    >
                                        <Spinner size="xl" />
                                    </Box>
                                ) : (
                                    <Stack spacing={4}>
                                        <div>
                                            <Field>Title:</Field>
                                            <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="Enter Event Title" />
                                        </div>

                                        <div>
                                            <Field>Description:</Field>
                                            <Input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required placeholder="Enter Event Description" />
                                        </div>

                                        <div>
                                            <Field>Event Date and Time:</Field>
                                            <Input type="datetime-local" value={eventDateTime} onChange={(e) => setEventDateTime(e.target.value)} required />
                                        </div>

                                        <div>
                                            <Field>Upload Image:</Field>
                                            <Input type="file" onChange={handleFileChange} required />
                                        </div>
                                    </Stack>
                                )}
                            </DialogBody>

                            <DialogFooter>
                                <DialogTrigger asChild>
                                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                                </DialogTrigger>
                                <Button
                                    bg="#4DCBA4"
                                    disabled={isSubmitting || loading || !title || !description || !eventDateTime || !imageFile} // Disable the button if submitting, loading, or fields are incomplete
                                    loading={loading}
                                    onClick={handleSubmit}
                                >
                                    {loading ? "Creating..." : "Submit"}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </DialogRoot>

                    {/* Table displaying events */}
                    <Table.Root size="sm" showColumnBorder>
						<Table.Header>
                            <Table.Row>
                                <Table.ColumnHeader>Title</Table.ColumnHeader>
                                <Table.ColumnHeader>Description</Table.ColumnHeader>
                                <Table.ColumnHeader>Event Date</Table.ColumnHeader>
                            </Table.Row>
							</Table.Header>
                        <Table.Body>
                            {events.map((event) => (
                                <Table.Row key={event.id}>
                                    <Table.Cell>{event.title}</Table.Cell>
                                    <Table.Cell>{event.description}</Table.Cell>
                                    <Table.Cell>{event.eventDateTime}</Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Root>
                </>
            )}
        </Box>
    );
};

export default EventsManagement;
