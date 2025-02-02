import React from "react";
import { Box, Button, HStack, Input, VStack, Heading, Text } from "@chakra-ui/react";

function AccountDetails() {
    return (
        <Box w="70%" mx="auto" p={6}>
            {/* About Me */}
            <HStack spacing={4} mb={6}>
                <VStack align="start" flex={1}>
                    <Heading size="md" mb={4}>
                        About Me
                    </Heading>
                    <Input isReadOnly />
                </VStack>
            </HStack>

            {/* Name Section */}
            <VStack align="start" spacing={4} mb={6}>
                <Heading size="md">Name</Heading>
                <HStack spacing={4} w="100%">
                    <VStack align="start" flex={1}>
                        <Text>First Name</Text>
                        <Input value="" isReadOnly />
                    </VStack>
                    <VStack align="start" flex={1}>
                        <Text>Last Name</Text>
                        <Input value="" isReadOnly />
                    </VStack>
                </HStack>
            </VStack>

            {/* Contact Information */}
            <VStack align="start" spacing={4} mb={6}>
                <Heading size="md">Contact Information</Heading>
                <HStack spacing={4} w="100%">
                    <VStack align="start" flex={1}>
                        <Text>Email</Text>
                        <Input value="" isReadOnly />
                    </VStack>
                    <VStack align="start" flex={1}>
                        <Text>Phone Number</Text>
                        <Input value="" isReadOnly />
                    </VStack>
                </HStack>
            </VStack>

            {/* Security Section */}
            <VStack align="start" spacing={4} mb={6}>
                <Heading size="md">Security and Authentication</Heading>
                <HStack spacing={4} w="100%" align="center">
                    <VStack align="start" flex={1}>
                        <Text>Password</Text>
                        <Box w="100%">
                            <Input type="password" value="" isReadOnly />
                        </Box>
                    </VStack>
                    <Button 
                        alignSelf={"flex-end"}
                        borderRadius={30}
                        variant="solid"
                        background="#2D65FF"
                        color={"white"}
                    >
                        View Public Account
                    </Button>
                </HStack>
            </VStack>


            {/* More Actions */}
            <VStack align="start" spacing={4} mb={6}>
                <Heading size="md">More Actions</Heading>
                <HStack spacing={4} w="100%">
                    <Button 
                        borderRadius={30}
                        variant="solid"
                        background="#2D65FF"
                        color={"white"}
                    >
                        View Parents Account
                    </Button>
                    <Button 
                        borderRadius={30}
                        variant="solid"
                        background="#2D65FF"
                        color={"white"}
                    >
                        View Redemption History
                    </Button>
                    <Button 
                        borderRadius={30}
                        variant="solid"
                        background="#2D65FF"
                        color={"white"}
                    >
                        View Public Account
                    </Button>
                    <Button
                        borderRadius={30}
                        variant="solid"
                        background="red"
                        color={"white"}
                    >
                        Delete Account
                    </Button>
                </HStack>
            </VStack>
        </Box>
    );
}

export default AccountDetails;