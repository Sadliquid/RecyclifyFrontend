/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Box, Button, Input, Field, Stack, defineStyle, Flex, Text} from '@chakra-ui/react';
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

    const validateField = (field, value) => {
        let error = "";
        if (field === "className") {
            if (!value) {
                error = "* Class name is required.";
            } else if (!/^\d+$/.test(value)) {
                error = "* Class name must contain only numbers.";
            } else if (value.length > 8) {
                error = "* Class name cannot be more than 8 characters.";
            }
        } else if (field === "classDescription") {
            if (!value) {
                error = "* Class description is required.";
            } else if (value.length > 60) {
                error = "* Class description cannot be more than 60 characters.";
            }
        }
        return error;
    };

    const handleChange = (field, value) => {
        if (field === "className") {
            validateField("className", value);
        }

        setNewClass((prev) => ({
            ...prev,
            [field]: value,
        }));

        const error = validateField(field, value);
        setErrors((prevErrors) => ({
            ...prevErrors,
            [field]: error,
        }));
    };

    const handleSaveClass = () => {
        const classNameError = validateField("className", newClass.className);
        const classDescriptionError = validateField("classDescription", newClass.classDescription);

        if (classNameError || classDescriptionError) {
            setErrors({
                className: classNameError,
                classDescription: classDescriptionError,
            });
            return;
        }

        onCreate(newClass);

        // Reset form
        setNewClass({
            className: "",
            classDescription: "",
        });
        setErrors({});
        setOpen(false);
    };


    const handleCloseDialog = () => {
        setNewClass({
            className: '',
            classDescription: ''
        });
        setErrors({});
        setOpen(false);
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

    // Check if form is invalid
    const isFormInvalid = !newClass.className || !newClass.classDescription || errors.className || errors.classDescription;

    return (
        <>
            {/* Create Class Dialog */}
            <DialogRoot
                size={"lg"}
                placement={"center"}
                open={open}
                onOpenChange={(isOpen) => setOpen(isOpen.open)}
            >
                <DialogTrigger asChild>
                    <Flex
                        p={2}
                        bg="#92BFFF"
                        position="fixed"
                        aria-label="Add Class"
                        cursor="pointer"
                        borderRadius="full"
                        style={{
                            position: "fixed",
                            bottom: "40px",
                            right: "40px",
                            zIndex: 1000,
                        }}
                    >
                        <IoAddOutline size={28} color="black" />
                        <Text color="black" fontSize="lg" fontWeight="bold" mr={2}>  
                            Create Class
                        </Text>
                    </Flex>
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
                                        onChange={(e) =>
                                            handleChange("className", e.target.value)
                                        }
                                    />
                                    <Field.Label css={floatingStyles}>Class Name</Field.Label>
                                    {errors.className && (
                                        <Box color="red.500" mt={1}>
                                            {errors.className}
                                        </Box>
                                    )}
                                </Box>
                            </Field.Root>
                            <Field.Root>
                                <Box pos="relative" w="full">
                                    <Input
                                        className="class-description"
                                        placeholder="E.g. Year 2 Class 1"
                                        value={newClass.classDescription}
                                        onChange={(e) =>
                                            handleChange("classDescription", e.target.value)
                                        }
                                    />
                                    <Field.Label css={floatingStyles}>
                                        Class Description
                                    </Field.Label>
                                    {errors.classDescription && (
                                        <Box color="red.500" mt={1}>
                                            {errors.classDescription}
                                        </Box>
                                    )}
                                </Box>
                            </Field.Root>
                        </Stack>
                    </DialogBody>
                    <DialogFooter display="flex" gap={10} justifyContent="center">
                        <DialogActionTrigger asChild>
                            <Button
                                variant="outline"
                                bg="#FF8080"
                                color="white"
                                onClick={handleCloseDialog}
                            >
                                Cancel
                            </Button>
                        </DialogActionTrigger>
                        <Button bg="#2D65FF" color="white" onClick={handleSaveClass} disabled={isFormInvalid}>
                            Create
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </DialogRoot>
        </>
    );
}

export default AddClassButton;