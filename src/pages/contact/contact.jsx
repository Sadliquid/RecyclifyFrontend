import { useState } from 'react';
import { Box, VStack, Input, Button } from '@chakra-ui/react';
import Server from '../../../networking';
import { Toaster } from "@/components/ui/toaster"
import ShowToast  from '../../Extensions/ShowToast';

const ContactForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await Server.post(`${import.meta.env.VITE_BACKEND_URL}/api/ContactForm`, {
                Id: 1, // Static ID for the form
                senderName: name,
                senderEmail: email,
                message,
                hasReplied: false,
            });

            if (response.status === 200) {
                ShowToast('success', 'Success', 'Form submitted successfully!');
                setName('');
                setEmail('');
                setMessage('');
            } else {
                console.log(response)
                ShowToast('error', 'Error', 'Failed to submit form');
            }
        } catch (error) {
            ShowToast('error', 'Error', `Error: ${error.message}`);
        }
    };

    return (
        <Box as="form" onSubmit={handleSubmit} mt={10}>
            <VStack spacing={4} align="stretch">
                <Box>
                    <Box as="label" htmlFor="name" mb={2} display="block" textAlign={"left"}>
                        Name:
                    </Box>
                    <Input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        background={"white"}
                        color={"black"}
                    />
                </Box>
                <Box>
                    <Box as="label" htmlFor="email" mb={2} display="block" textAlign={"left"}>
                        Email:
                    </Box>
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        background={"white"}
                        color={"black"}
                    />
                </Box>
                <Box>
                    <Box as="label" htmlFor="message" mb={2} display="block" textAlign={"left"}>
                        Message:
                    </Box>
                    <Input
                        id="message"
                        name="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        background={"white"}
                        color={"black"}
                    />
                </Box>
                <Button type="submit" background={'teal'} mt={3}>Send</Button>
            </VStack>
            <Toaster />
        </Box>
        
    );
};

export default ContactForm;