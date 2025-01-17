import React from "react"
import { VStack, Box, Button, Input, Text, Link, Flex } from "@chakra-ui/react"
import { InputGroup } from "@/components/ui/input-group"
import { LuUser, LuLock, LuIdCard, LuPhone, LuMessageCircle, LuMail } from "react-icons/lu"
import { useNavigate } from "react-router-dom";
import { PasswordInput } from "@/components/ui/password-input"

function ParentRegistrationForm({ goBack }) {
    const navigate = useNavigate();

    return (
        <Flex direction="column" align="center" width="100%" p={4} mt={5}>
            <Flex width="100%" justify="flex-start" mb={4}>
                <Button variant="ghost" onClick={goBack}>
                    ← Back
                </Button>
            </Flex>
            <Box width="400px">
                <VStack gap={4} align="stretch">
                    <InputGroup 
                        flex="1" 
                        startElement={<LuUser />} 
                        width="400px"
                    >
                        <Input placeholder="Name"/>
                    </InputGroup>
                    <InputGroup 
                        flex="1" 
                        startElement={<LuMail />} 
                        width="400px"
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
                        startElement={<LuIdCard />} 
                        width="400px"
                    >
                        <Input placeholder="Child ID"/>
                    </InputGroup>
                    <InputGroup 
                        flex="1" 
                        startElement={<LuLock />} 
                        width="400px"
                    >
                        <PasswordInput placeholder="Password" type="password" />
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
                            navigate("/auth/emailVerification");
                        }}
                    >
                        Get Started!
                    </Button>
                </VStack>
            </Box>
        </Flex>
    );
}

export default ParentRegistrationForm;