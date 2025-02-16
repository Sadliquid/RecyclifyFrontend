/* eslint-disable react/no-unknown-property */
import { useState } from "react";
import Server from "../../../networking";
import { Box, Heading, List, ListItem, CardBody, Input, Button, Stack, Text, Flex, Spacer, Icon, Spinner, CardRoot } from "@chakra-ui/react";
import { FaRobot, FaQuestionCircle } from "react-icons/fa";

const EcoPilot = () => {
    const [inputValue, setInputValue] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!inputValue.trim()) {
            alert("Please enter a valid prompt.");
            return;
        }
        setLoading(true);
        setResponse(""); // Clear previous response while loading

        try {
            const result = await Server.post(`/api/chat-completion/prompt`, {
                userPrompt: inputValue
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            setResponse(result.data);
        } catch (error) {
            console.error("Error fetching response:", error);
            setResponse("Failed to get a response from the server.");
        } finally {
            setLoading(false);
        }
    };

    const suggestedTopics = [
        "Recycling", "Sustainability", "Points", "Leaderboard", "Contact"
    ];

    return (
        <Flex p={8} maxW="1200px" mx="auto" gap={8} alignItems="flex-start" direction={{ base: "column", md: "row" }}>
            <Box w={{ base: "100%", md: "25%" }}>
                <Flex direction="column" alignItems="center" mt={8} mb={5}>
                    <Icon as={FaRobot} boxSize={8} color="teal.500" />
                    <Text fontSize="xl" fontWeight="bold" color="teal.700" mt={2}>EcoPilot</Text>
                </Flex>

                <Heading as="h1" size="lg" mb={6} color="teal.700">Suggested Topics</Heading>
                <List.Root spacing={3} style={{ listStyleType: "none" }}>
                    {suggestedTopics.map((topic, index) => (
                        <ListItem
                            key={index}
                            bg="white"
                            borderRadius="md"
                            p={3}
                            cursor="pointer"
                            _hover={{ bg: "teal.50", transform: "translateX(5px)" }}
                            transition="all 0.2s"
                        >
                            <Flex align="center">
                                <Icon as={FaQuestionCircle} color="teal.500" mr={2} />
                                <Text fontSize="md" color="gray.700">{topic}</Text>
                            </Flex>
                        </ListItem>
                    ))}
                </List.Root>
            </Box>

            <Box w={{ base: "100%", md: "75%" }}>
                <CardRoot borderRadius="lg" boxShadow="lg">
                    <CardBody p={8}>
                        <Flex justify="space-between" alignItems="center" mb={6}>
                            <Heading as="h2" size="lg" color="teal.700">EcoPilot</Heading>
                            <Spacer />
                            <Text color="gray.500" fontSize="sm">Having doubts? EcoPilot is here to help.</Text>
                        </Flex>
                        <form onSubmit={handleSubmit} netlify>
                            <Stack spacing={6}>
                                <Input
                                    type="text"
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    placeholder="Enter a prompt here"
                                    bg="white"
                                    borderRadius="md"
                                    _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px teal.500" }}
                                    isDisabled={loading}
                                />
                                <Flex justify="flex-end">
                                    <Button
                                        type="submit"
                                        backgroundColor="#3DA287"
                                        size="lg"
                                        px={8}
                                        isLoading={loading}
                                        loadingText="Thinking..."
                                        isDisabled={loading || !inputValue.trim()}
                                    >
                                        Submit
                                    </Button>
                                </Flex>
                            </Stack>
                        </form>

                        {/* Show loading spinner while fetching response */}
                        {loading && (
                            <Flex justify="center" align="center" mt={6}>
                                <Spinner size="lg" color="teal.500" />
                            </Flex>
                        )}

                        {/* Show response once available */}
                        {response && !loading && (
                            <Box mt={6} p={4} bg="teal.50" borderRadius="md">
                                <Text fontSize="md" color="teal.700">{response}</Text>
                            </Box>
                        )}
                    </CardBody>
                </CardRoot>
            </Box>
        </Flex>
    );
};

export default EcoPilot;
