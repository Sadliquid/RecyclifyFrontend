import { useState } from "react";
import { Box, Heading, List, ListItem, Card, CardBody, Input, Button, Stack, Text, Flex, Spacer, Icon, CardRoot } from "@chakra-ui/react";
import { FaRobot, FaQuestionCircle } from "react-icons/fa";

const EcoPilot = () => {
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!inputValue.trim()) {
            alert("Please enter a valid prompt.");
            return;
        }
        console.log("User input:", inputValue);
    };

    const suggestedTopics = [
        "Reservations", "Payments", "Cancellations", "Host's reviews", "Hosting a meal"
    ];

    return (
        <Flex p={8} maxW="1200px" mx="auto" gap={8} alignItems="flex-start" direction={{ base: "column", md: "row" }}>
            <Box w={{ base: "100%", md: "25%" }}>
                <Heading as="h1" size="lg" mb={6} color="teal.700">Suggested Topics</Heading>
                <List.Root spacing={3}>
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
                <Flex direction="column" alignItems="center" mt={8}>
                    <Icon as={FaRobot} boxSize={8} color="teal.500" />
                    <Text fontSize="xl" fontWeight="bold" color="teal.700" mt={2}>MakanBot</Text>
                </Flex>
            </Box>

            <Box w={{ base: "100%", md: "75%" }}>
                <CardRoot borderRadius="lg" boxShadow="lg">
                    <CardBody p={8}>
                        <Flex justify="space-between" alignItems="center" mb={6}>
                            <Heading as="h2" size="lg" color="teal.700">MakanBot</Heading>
                            <Spacer />
                            <Text color="gray.500" fontSize="sm">Having doubts? MakanBot is here to help.</Text>
                        </Flex>
                        <form onSubmit={handleSubmit}>
                            <Stack spacing={6}>
                                <Input
                                    type="text"
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    placeholder="Enter a prompt here"
                                    bg="white"
                                    borderRadius="md"
                                    _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px teal.500" }}
                                />
                                <Flex justify="flex-end">
                                    <Button type="submit" colorScheme="teal" size="lg" px={8}>
                                        Submit
                                    </Button>
                                </Flex>
                            </Stack>
                        </form>
                    </CardBody>
                </CardRoot>
            </Box>
        </Flex>
    );
};

export default EcoPilot;