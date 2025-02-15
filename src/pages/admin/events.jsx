import { useState } from "react";
import server from "../../../networking";
import { Button, Stack, Input, Textarea, useDisclosure, Box, Heading } from "@chakra-ui/react";
import { DialogBody, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MdAdd } from "react-icons/md"; // Add icon
import { Field } from "@/components/ui/field";

const EventsManagement = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [eventDateTime, setEventDateTime] = useState("");
	const [imageFile, setImageFile] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [successMessage, setSuccessMessage] = useState("");

	const handleFileChange = (e) => {
		setImageFile(e.target.files[0]);
	};

	const handleAdd = async () => {
		onOpen();
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Validate input fields
		if (!title || !description || !eventDateTime || !imageFile) {
			setError("All fields are required.");
			return;
		}

		const formData = new FormData();
		formData.append("Title", title);
		formData.append("Description", description);
		formData.append("EventDateTime", eventDateTime);
		formData.append("ImageFile", imageFile);

		setLoading(true);
		setError("");
		setSuccessMessage("");

		try {
			const response = await server.post("/api/events", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
				transformRequest: (formData) => formData,
			});

			setSuccessMessage(response.data.message);
			setTitle("");
			setDescription("");
			setEventDateTime("");
			setImageFile(null);
		} catch {
			setError("Failed to create event. Please try again.");
		} finally {
			setLoading(false);
			onClose(); // Close dialog after submission
		}
	};

	return (
		<Box p={6}>
			{/* Page Title */}
			<Heading fontSize="30px" mt={10} mb={10}>Manage Events</Heading>

			{/* Open Dialog Button */}
			<DialogRoot isOpen={isOpen} onClose={onClose}>
				<DialogTrigger asChild>
					<Button
						leftIcon={<MdAdd />}
						bg="#4DCBA4"
						onClick={() => handleAdd()}
						mb={6} // Adding margin for spacing
						size="lg"
						_hover={{ bg: "#3db28a" }} // Hover effect
					>
						Create Event
					</Button>
				</DialogTrigger>

				{/* Dialog Content */}
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Create New Event</DialogTitle>
					</DialogHeader>
					<DialogBody pb="4">
						<Stack spacing={4}>
							{/* Title Input */}
							<div>
								<Field>Title:</Field>
								<Input
									type="text"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									required
									placeholder="Enter Event Title"
								/>
							</div>

							{/* Description Input */}
							<div>
								<Field>Description:</Field>
								<Textarea
									value={description}
									onChange={(e) => setDescription(e.target.value)}
									required
									placeholder="Enter Event Description"
								/>
							</div>

							{/* Event Date and Time Input */}
							<div>
								<Field>Event Date and Time:</Field>
								<Input
									type="datetime-local"
									value={eventDateTime}
									onChange={(e) => setEventDateTime(e.target.value)}
									required
								/>
							</div>

							{/* Image Upload */}
							<div>
								<Field>Upload Image:</Field>
								<Input type="file" onChange={handleFileChange} required />
							</div>

							{/* Error and Success Message */}
							{error && <p style={{ color: "red" }}>{error}</p>}
							{successMessage && (
								<p style={{ color: "green" }}>{successMessage}</p>
							)}
						</Stack>
					</DialogBody>

					{/* Dialog Footer */}
					<DialogFooter>
						<DialogTrigger asChild>
							<Button
								variant="outline"
								onClick={onClose}
							>
								Cancel
							</Button>
						</DialogTrigger>
						<Button
							bg="#4DCBA4"
							isLoading={loading}
							isDisabled={loading}
							onClick={handleSubmit}
						>
							{loading ? "Creating..." : "Submit"}
						</Button>
					</DialogFooter>
				</DialogContent>
			</DialogRoot>
		</Box>
	);
};

export default EventsManagement;
