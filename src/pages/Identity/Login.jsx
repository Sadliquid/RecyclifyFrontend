/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Box, VStack, Heading, Button, Link, Text, Input } from '@chakra-ui/react';
import { PasswordInput } from "@/components/ui/password-input"
import { InputGroup } from "@/components/ui/input-group";
import { Field } from "@/components/ui/field";
import { LuUser, LuLock } from "react-icons/lu";
import { useSelector } from 'react-redux';
import ShowToast from '../../Extensions/ShowToast';
import server from "../../../networking"

function Login() {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [invalidIdentifier, setInvalidIdentifier] = useState(false)
    const [invalidPassword, setInvalidPassword] = useState(false)

    const { user, loaded, error, authToken } = useSelector((state) => state.auth);

    useEffect(() => {
        if (user && authToken) {     
            if (!error && loaded) {
                if (user.userRole === "student") {
                    navigate("/student/home");
                } else if (user.userRole === "teacher") {
                    navigate("/teachers");
                } else {
                    navigate("/admin/dashboard");
                }
            }
            ShowToast("success", "Logged In", "You are already logged in!");
        }
    }, [user, error, loaded, authToken]);

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
            ShowToast("success", "Welcome Back!", "Successfully logged in.");
            navigate("/identity/myAccount");
        } catch (error) {
            setIsLoading(false);
            ShowToast("error", "Invalid Login Credentials", "Please try again.");
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
                as={"form"}
                onSubmit={handleSubmit}
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
                        loading={isLoading}
                        loadingText={"Logging in..."}
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
