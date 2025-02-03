import { useState } from "react";
import { Box, Heading, List, ListItem, Card, CardBody, Input, Button, Stack, Text, Flex, Image, Spacer } from "@chakra-ui/react";

const EcoPilot = () => {
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("User input:", inputValue);
    };

	const suggestedTopics = [
        "Reservations", "Payments", "Cancellations", "Host's reviews", "Hosting a meal"
    ];

    return (
        <Flex p={4} maxW="900px" mx="auto" gap={6} alignItems="flex-start">
            <Box w="25%"> {/* Reduced width for suggested topics */}
                <Heading as="h1" size="lg" mb={4} color="#333">Suggested topics:</Heading>
                <List.Root spacing={3}>
                    {suggestedTopics.map((topic, index) => (
                        <ListItem
                            key={index}
                            bg="white"
                            borderRadius="md"
                            p={2}
                            cursor="pointer"
                            _hover={{ bg: "#E9ECEF" }}
                        >
                            {topic}
                        </ListItem>
                    ))}
                </List.Root>
                <Flex direction="column" alignItems="center" mt={6}>
                    <Text fontSize="lg" fontWeight="bold" color="#333">MakanBot</Text>
                </Flex>
            </Box>

            <Box w="75%"> {/* Increased width for Cyclobot section */}
                <Card.Root>
                    <Card.Body p={6}>
                        <Flex justify="space-between" alignItems="center" mb={4}>
                            <Heading as="h2" size="md" color="#333">MakanBot</Heading>
                            <Spacer />
                            <Text color="gray.500">Having doubts? MakanBot is here to help.</Text>
                        </Flex>
                        <form onSubmit={handleSubmit}>
                            <Stack spacing={4}>
                                <Input
                                    type="text"
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    placeholder="Enter a prompt here"
                                    bg="white"
                                />
                                <Flex justify="flex-end">
                                    <Button type="submit" colorScheme="blue">
                                        <Text as="span" mr={2}>Submit</Text>
                                    </Button>
                                </Flex>
                            </Stack>
                        </form>
                    </Card.Body>
                </Card.Root>
            </Box>
        </Flex>
    );
};

export default EcoPilot;