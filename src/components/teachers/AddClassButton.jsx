import { useState } from 'react';
import { Box, Button, Input, Field, Stack, defineStyle } from '@chakra-ui/react';
import { IoAddOutline } from 'react-icons/io5';
import { DialogActionTrigger, DialogBody, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

function AddClassButton({ onCreate }) {
    const [open, setOpen] = useState(false)
    const [newClass, setNewClass] = useState({
        className: '',
        classDescription: ''
    });

    const [errors, setErrors] = useState({
        className: '',
        classDescription: '',
    });

    const handleChange = (field, value) => {
        setNewClass((prev) => ({
            ...prev,
            [field]: value,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [field]: '', // Clear error when user changes the input
        }));
    };

    const handleSaveClass = () => {
        // Reset errors before validation
        setErrors({
            className: '',
            classDescription: '',
        });

        // Validate fields
        let hasError = false;

        if (!newClass.className) {
            setErrors((prevErrors) => ({ ...prevErrors, className: 'Class name is required' }));
            hasError = true;
        }

        if (!newClass.classDescription) {
            setErrors((prevErrors) => ({ ...prevErrors, classDescription: 'Class classDescription is required' }));
            hasError = true;
        }

        if (hasError) {
            setOpen(true);
            return;
        }

        // Proceed with saving the class
        onCreate(newClass);

        // Reset form and close the dialog after successful save
        setNewClass({
            className: '',
            classDescription: ''
        });
        setErrors({}); // Clear any previous errors
        setOpen(false); // Close the dialog
    };

    const handleCloseDialog = () => {
        setNewClass({
            className: '',
            classDescription: ''
        });
        setErrors({});
        setOpen(false); // Close the dialog
    };

    const floatingStyles = defineStyle({
        pos: "absolute",
        bg: "bg",
        px: "0.5",
        top: "-3",
        insetStart: "2",
        fontWeight: "normal",
        pointerEvents: "none",
        transition: "position",
        _peerPlaceholderShown: {
            color: "black",
            top: "2.5",
            insetStart: "3",
        },
        _peerFocusVisible: {
            color: "black",
            top: "-3",
            insetStart: "2",
        },
    })


    return (
        <>
            {/* Create Class Dialog */}
            <DialogRoot size={"lg"} placement={"center"} open={open} onOpenChange={(isOpen) => setOpen(isOpen.open)}>
                <DialogTrigger asChild>
                    <Box
                        p={1}
                        bg="#92BFFF"
                        position="fixed"
                        aria-label="Add Class"
                        cursor="pointer"
                        borderRadius="full"
                        style={{
                            position: 'fixed',
                            bottom: '40px',
                            right: '40px',
                            zIndex: 1000,
                        }}
                    >
                        <IoAddOutline size={34} color="black" />
                    </Box>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle color="black" fontWeight="bold" textAlign="left">
                            Create New Class
                        </DialogTitle>
                    </DialogHeader>
                    <DialogBody>
                        <Stack direction="column" gap={8}>
                            <Field.Root>
                                <Box pos="relative" w="full">
                                    <Input
                                        className="class-name"
                                        placeholder="E.g. 201"
                                        value={newClass.className}
                                        onChange={(e) => handleChange("className", e.target.value)}
                                    />
                                    <Field.Label css={floatingStyles}>Class Name</Field.Label>
                                    {errors.className && (
                                        <Box color="red.500" mt={1}>{errors.className}</Box>
                                    )}
                                </Box>
                            </Field.Root>
                            <Field.Root>
                                <Box pos="relative" w="full">
                                    <Input
                                        className="class-description"
                                        placeholder="E.g. Year 2 Class 1"
                                        value={newClass.classDescription}
                                        onChange={(e) => handleChange("classDescription", e.target.value)}
                                    />
                                    <Field.Label css={floatingStyles}>Class Description</Field.Label>
                                    {errors.classDescription && (
                                        <Box color="red.500" mt={1}>{errors.classDescription}</Box>
                                    )}
                                </Box>
                            </Field.Root>
                        </Stack>
                    </DialogBody>
                    <DialogFooter display="flex" gap={10} justifyContent="center">
                        <DialogActionTrigger asChild>
                            <Button variant="outline" bg="#FF8080" color="white" onClick={handleCloseDialog}>
                                Cancel
                            </Button>
                        </DialogActionTrigger>
                        <Button bg="#2D65FF" color="white" onClick={handleSaveClass} >
                            Create
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </DialogRoot>
        </>
    );
}

export default AddClassButton;