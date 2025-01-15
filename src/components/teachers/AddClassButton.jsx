import { useState } from 'react';
import { Box, Button, Input, Field, Stack, defineStyle, parseColor, HStack } from '@chakra-ui/react';
import { IoAddOutline } from 'react-icons/io5';
import { DialogActionTrigger, DialogBody, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

function AddClassButton({ onCreate }) {
    const [open, setOpen] = useState(false)
    const [newClass, setNewClass] = useState({
        className: '',
        description: '',
        image: 'class1.jpg',
        bgColor: '',
        uuid: '00000000',
    });

    const [errors, setErrors] = useState({
        className: '',
        description: '',
    });

    // Function to generate a random number between 1 and 3
    const getRandomColor = () => {
        const colors = ['#96E2D6', '#AEC7ED', '#D9D9D9'];
        const randomIndex = Math.floor(Math.random() * colors.length); // Generate a random index
        return colors[randomIndex]; // Return a random color from the array
    };

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
            description: '',
        });

        // Validate fields
        let hasError = false;

        if (!newClass.className) {
            setErrors((prevErrors) => ({ ...prevErrors, className: 'Class name is required' }));
            hasError = true;
        }

        if (!newClass.description) {
            setErrors((prevErrors) => ({ ...prevErrors, description: 'Class description is required' }));
            hasError = true;
        }

        if (hasError) {
            setOpen(true);
            return;
        }

        // Set the random background color before saving the class
        const randomBgColor = getRandomColor();
        const updatedClass = {
            ...newClass,
            bgColor: randomBgColor, // Set the random background color
        };

        // Proceed with saving the class
        onCreate(updatedClass);

        // Reset form and close the dialog after successful save
        setNewClass({
            className: '',
            description: '',
            image: 'class1.jpg',
            bgColor: '',
            uuid: '00000000',
        });
        setErrors({}); // Clear any previous errors
        setOpen(false); // Close the dialog
    };

    const handleCloseDialog = () => {
        setNewClass({
            className: '',
            description: '',
            image: 'class1.jpg',
            bgColor: '',
            uuid: '00000000',
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
                                        value={newClass.description}
                                        onChange={(e) => handleChange("description", e.target.value)}
                                    />
                                    <Field.Label css={floatingStyles}>Class Description</Field.Label>
                                    {errors.description && (
                                        <Box color="red.500" mt={1}>{errors.description}</Box>
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