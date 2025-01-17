import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { Box, VStack, Heading, Button, Link, Text, Input } from '@chakra-ui/react';
import { Toaster, toaster } from "@/components/ui/toaster"
import { PasswordInput } from "@/components/ui/password-input"
import { InputGroup } from "@/components/ui/input-group";
import { Field } from "@/components/ui/field";
import { LuUser, LuLock } from "react-icons/lu";
import server from "../../../networking"

function Login() {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [invalidIdentifier, setInvalidIdentifier] = useState(false)
    const [invalidPassword, setInvalidPassword] = useState(false)

    const handleSubmit = async (e) => {
        setInvalidIdentifier(false)
        setInvalidPassword(false)
        e.preventDefault();
        setIsLoading(true);
        if (identifier === '') {
            setInvalidIdentifier(true)
            setIsLoading(false);
            return;
        }
        if (password === '') {
            setInvalidPassword(true)
            setIsLoading(false);
            return;
        }

        try {
            const response = await server.post(`/api/Identity/login`, {
                Identifier: identifier,
                Password: password,
            });
            localStorage.setItem('jwt', response.data.token);
            toaster.create({
                title: "Welcome back!",
                description: "Successfully logged in.",
                type: "success",
                duration: 3000
            })
            navigate("/identity/myAccount");
        } catch (error) {
            setIsLoading(false);
            toaster.create({
                title: "Invalid Login Credentials",
                description: "Please try again",
                type: "error",
                duration: 3000
            })
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
                        invalid={invalidIdentifier}
                        errorText="This field is required"
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
                        invalid={invalidPassword}
                        errorText="This field is required"
                        width="400px" 
                        mb={2}
                    >
                        <InputGroup 
                            flex="1" 
                            startElement={<LuLock />} 
                            width="400px"
                        >
                            <PasswordInput 
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
