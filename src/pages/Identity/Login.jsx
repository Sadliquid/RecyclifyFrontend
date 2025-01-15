import React, { useState } from 'react';
import { Box, VStack, Heading, Button, Link, Text, Input } from '@chakra-ui/react';
import { InputGroup } from "@/components/ui/input-group";
import { Field } from "@/components/ui/field";
import { LuUser, LuLock } from "react-icons/lu";
import server from "../../../networking"

function Login() {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await server.post(`${import.meta.env.VITE_BACKEND_URL}/Identity/login`, {
                Identifier: identifier,
                Password: password,
            });
            localStorage.setItem('jwt', response.data.token);
            console.log(response);
            window.location.href = '/identity/myAccount'; 

        } catch (error) {
            setIsLoading(false);
            console.log(error)
        }
    };

    return (
        <Box
            bgPosition="center"
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            <Box
                p={8}
                borderRadius={15}
            >
                <VStack 
                    spacing={4} 
                    w="full"
                >
                    <Heading
                        fontSize='30px'
                        mb={10} 
                        textAlign="center"
                    >
                        Sign in to Recyclify
                    </Heading>

                    {/* Email or Username Field */}
                    <Field 
                        label="Username or Email" 
                        width="400px" 
                        mb={2}
                    >
                        <InputGroup 
                            flex="1" 
                            startElement={<LuUser />} 
                            width="400px"
                        >
                            <Input 
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)} 
                                placeholder="Enter username or email"
                            />
                        </InputGroup>
                    </Field>

                    {/* Password Field */}
                    <Field 
                        label="Password"
                        width="400px" 
                        mb={2}
                    >
                        <InputGroup 
                            flex="1" 
                            startElement={<LuLock />} 
                            width="400px"
                        >
                            <Input 
                                type='password' 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} 
                                placeholder="Enter your password"
                            />
                        </InputGroup>
                    </Field>

                    {/* Forgot Password Link */}
                    <Box 
                        w="100%" 
                        display="flex" 
                        justifyContent="start"
                    >
                        <Link
                            href='/accountRecovery'
                            fontSize='12px'
                            mb={5}
                        >
                            <Text as='u'>
                                Forgot username or password?
                            </Text>
                        </Link>
                    </Box>

                    {/* Login Button */}
                    <Button
                        variant="solid"
                        background="#2D65FF"
                        color={"white"}
                        width="50%"
                        mb={5}
                        type="submit"
                        borderRadius={30}
                        isLoading={isLoading}
                        onClick={handleSubmit}
                    >
                        Login
                    </Button>

                    {/* Register Link */}
                    <Text 
                        textAlign="center" 
                        fontSize="12px" 
                        mb={5}
                    >
                        Don't have an account?{' '}
                        <Link 
                            href="/auth/createAccount" 
                            color="teal.500"
                        >
                        Sign Up
                        </Link>
                    </Text>
                </VStack>
            </Box>
        </Box>
    );
}

export default Login;
