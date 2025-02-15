/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box, VStack, Heading, Button, Link, Text, Input } from '@chakra-ui/react';
import { PasswordInput } from "@/components/ui/password-input"
import { InputGroup } from "@/components/ui/input-group";
import { Field } from "@/components/ui/field";
import { LuUser, LuLock } from "react-icons/lu";
import { useDispatch } from 'react-redux';
import { fetchUser } from '../../slices/AuthState';
import ShowToast from '../../Extensions/ShowToast';
import server from "../../../networking"
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import MsAuthLoginDialog from '../../components/identity/MsAuthLoginDialog';

function Login() {
    const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

    return (
        <GoogleReCaptchaProvider
            reCaptchaKey={siteKey}
            scriptProps={{
                async: true,
                defer: true,
                appendTo: 'head',
            }}
        >
            <InnerLoginForm />
        </GoogleReCaptchaProvider>
    );
}

function InnerLoginForm() {
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [invalidIdentifier, setInvalidIdentifier] = useState(false)
    const [invalidPassword, setInvalidPassword] = useState(false)
    const { user, loaded, error, authToken } = useSelector((state) => state.auth);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [userId, setUserId] = useState('');

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
            if (!executeRecaptcha) {
                ShowToast("error", "reCAPTCHA Error", "reCAPTCHA not loaded. Please refresh the page.");
                return;
            }
        
            const token = await executeRecaptcha('login');

            const response = await server.post(`/api/Identity/login`, {
                Identifier: identifier,
                Password: password,
                RecaptchaResponse: token 
            });

            if (response.status === 200) {
                if (response.data.message.substring("SUCCESS: ".length).trim() === "Account credentials valid.") {
                    setUserId(response.data.userId);
                    setIsDialogOpen(true);
                } else {
                    localStorage.setItem('jwt', response.data.token);
                    await dispatch(fetchUser());
                    ShowToast("success", "Welcome Back!", "Successfully logged in.");
                    if (response.data.user.userRole) {
                        if (response.data.user.userRole === "student") {
                            navigate("/student/home");
                        } else if (response.data.user.userRole === "teacher") {
                            navigate("/teachers");
                        } else if (response.data.user.userRole === "admin") {
                            navigate("/admin/dashboard");
                        } else if (response.data.user.userRole === "parent") {
                            navigate("/parents");
                        } else {
                            navigate("/auth/login");
                        }
                    }           
                }
            }
        } catch (error) {
            setIsLoading(false);
            ShowToast("error", "Invalid Login Credentials", "Please try again.");
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (user && authToken) {     
            if (localStorage.getItem('jwt')) {
                if (!error && loaded) {
                    if (location.pathname === "/auth/login") {
                        if (user.userRole === "student") {
                            navigate("/student/home");
                            ShowToast("success", "You're already logged in!");
                        } else if (user.userRole === "teacher") {
                            navigate("/teachers");
                            ShowToast("success", "You're already logged in!");
                        } else if (user.userRole === "parent") {
                            navigate("/parents");
                            ShowToast("success", "You're already logged in!");
                        } else if (user.userRole === "admin") {
                            navigate("/admin/dashboard");
                            ShowToast("success", "You're already logged in!");
                        }
                    }
                }
            }
        }
    }, [user, error, loaded, authToken]);

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
                            href='/auth/accountRecovery'
                            fontSize='12px'
                            mb={5}
                        >
                            <Text as='u'>
                                Forgot login credentials?
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

                <MsAuthLoginDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} userId={userId} />
            </Box>
        </Box>
    );
}

export default Login;
