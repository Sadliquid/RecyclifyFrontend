import React from "react"
import { VStack, Box, Button, Input, Text, Link, Flex, Group, InputAddon, } from "@chakra-ui/react"
import { InputGroup } from "@/components/ui/input-group"
import { LuUser, LuMail, LuLock, LuPhone } from "react-icons/lu"

function ParentRegistrationForm({ goBack }) {
    return (
        <Flex direction="column" align="center" width="100%" p={4} mt={5}>
            <Flex width="100%" justify="flex-start" mb={4}>
                <Button variant="ghost" onClick={goBack}>
                    ← Back
                </Button>
            </Flex>
            <Box width="100%" maxWidth="400px">
                <VStack gap={4} align="stretch">
                    <InputGroup 
                        flex="1" 
                        startElement={<LuUser />} 
                    >
                        <Input placeholder="Name"/>
                    </InputGroup>                    
                    <InputGroup
                        flex="1"
                        startElement={<LuMail />}
                        endElement={"@mymail.nyp.edu.sg"}
                    >
                        <Input placeholder="Email" type="email"/>
                    </InputGroup>
                    <InputGroup 
                        flex="1" 
                        startElement={<LuPhone />} 
                        width="400px"
                    >
                        <Input placeholder="Contact" type="tel"/>
                    </InputGroup>
                    <InputGroup 
                        flex="1" 
                        startElement={<LuLock />} 
                        width="400px"
                    >
                        <Input placeholder="Password" type="password" />
                    </InputGroup>
                    <InputGroup 
                        flex="1" 
                        startElement={<LuLock />} 
                        width="400px"
                    >
                        <Input placeholder="Confirm Password" type="password" />
                    </InputGroup>

                    <Button
                        variant="solid"
                        background="#2D65FF"
                        color={"white"}
                        width="50%"
                        type="submit"
                        borderRadius={30}
                        mt={5}
                        alignSelf="center"
                        onClick={() => {
                            window.location.href = "/auth/emailVerification";
                        }}
                    >
                        Get Started!
                    </Button>
                </VStack>
            </Box>
        </Flex>
    );
}

export default ParentRegistrationForm