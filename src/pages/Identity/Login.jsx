import React from 'react'
import { Box, VStack, Heading, Button, Link, Text, Input, 
} from '@chakra-ui/react'
import { InputGroup } from "@/components/ui/input-group"
import { Field } from "@/components/ui/field"
import { LuUser, LuLock } from "react-icons/lu"

function Login() {
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
                            <Input />
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
                            <Input type='password'/>
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
                            href="/createAccount" 
                            color="teal.500"
                        >
                        Sign Up
                        </Link>
                    </Text>
                </VStack>
            </Box>
        </Box>
    )
}

export default Login