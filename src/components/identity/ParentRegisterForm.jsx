import React from "react";
import { VStack, Box, Button, Input, Text, Link, Flex } from "@chakra-ui/react";

function ParentRegistrationForm({ goBack }) {
    return (
        <Flex direction="column" align="center" width="100%" p={4} mt={5}>
            <Flex width="100%" justify="flex-start" mb={4}>
                <Button variant="ghost" onClick={goBack}>
                    ← Back
                </Button>
            </Flex>
            <Box width="100%" maxWidth="350px">
                <VStack spacing={4} align="stretch">
                    <Input placeholder="Name" />
                    <Input placeholder="Email" />
                    <Input placeholder="Child's Student ID" />
                    <Input placeholder="Password" type="password" />
                    <Input placeholder="Confirm Password" type="password" />
                    <Button
                        variant="solid"
                        background="#2D65FF"
                        color={"white"}
                        width="50%"
                        type="submit"
                        borderRadius={30}
                        alignSelf="center"
                    >
                        Get Started!
                    </Button>
                </VStack>
            </Box>
        </Flex>
    );
}

export default ParentRegistrationForm;