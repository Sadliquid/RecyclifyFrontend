/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button, Box, Text } from "@chakra-ui/react";
import { PinInput } from "@/components/ui/pin-input";
import { DialogActionTrigger, DialogBody, DialogCloseTrigger, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogRoot } from "@/components/ui/dialog";
import server from "../../../networking";
import ShowToast from "../../Extensions/ShowToast";
import { Controller, useForm } from "react-hook-form";

const ContactVerificationDialog = ({ isOpen, onClose, toggleContactVerified }) => {
    const [isLoading, setIsLoading] = useState(false);

    const { handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            pin: Array(6).fill(''),
        },
    });

    const verifyContact = async (data) => {
        const isComplete = data.pin.every(digit => digit.length === 1);
        if (!isComplete) {
            ShowToast("error", "Missing Digits", "Please enter all 6 digits of the verification code");
            return;
        }
        setIsLoading(true);
        try {
            const verificationCode = data.pin.join('');
            const response = await server.post('/api/Identity/verifyContact', { code: verificationCode });
            if (response.data.message.startsWith("SUCCESS") && response.status === 200) {
                toggleContactVerified(true);
                ShowToast("success", "Contact Verified!", "Your contact has been successfully verified.");
                onClose();
            }
        } catch (err) {
            const rawErrorMessage = err.response?.data?.error;
            if (rawErrorMessage.startsWith("UERROR")) {
                const errorMessage = rawErrorMessage.substring("UERROR: ".length).trim()
                ShowToast("error", "Verification Failed.", errorMessage)
            } else {
                ShowToast("error", "Something went wrong.", "Please try again later.")
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <DialogRoot
            placement="center"
            motionPreset="slide-in-bottom"
            open={isOpen}
            onOpenChange={onClose}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Verify your Mobile Number</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <Text mb={4}>A verification code has been sent to your phone via SMS.</Text>
                    
                    <Controller
                        control={control}
                        name="pin"
                        rules={{
                            validate: (value) =>
                                value.every(digit => digit.length === 1) || "Please enter all 6 digits"
                        }}
                        render={({ field }) => (
                            <Box>
                                <PinInput
                                    value={field.value}
                                    onValueChange={(values) => field.onChange(values.value)}
                                    otp
                                    size="md"
                                    gap={2}
                                />
                                {errors.pin && (
                                    <Text color="red.500" fontSize="sm" mt={2}>
                                        {errors.pin.message}
                                    </Text>
                                )}
                            </Box>
                        )}
                    />
                </DialogBody>
                <DialogFooter>
                    <DialogActionTrigger asChild>
                        <Button variant="outline" onClick={onClose}>Cancel</Button>
                    </DialogActionTrigger>
                    <Button 
                        onClick={handleSubmit(
                            (data) => verifyContact(data),
                            (errors) => {
                                ShowToast("error", "Invalid Verification Code", "Please enter a complete 6-digit code");
                                console.error(errors);
                            }
                        )}
                        loading={isLoading}
                        bg="#2D65FF"
                    >
                        Verify
                    </Button>
                </DialogFooter>
                <DialogCloseTrigger />
            </DialogContent>
        </DialogRoot>
    );
};

export default ContactVerificationDialog;
