/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Box, Card, Image, Button, Text, Stack, Field, Input, defineStyle, Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { MdOutlineMoreVert, MdEdit, MdDelete } from 'react-icons/md';
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from '@/components/ui/menu';
import { DialogActionTrigger, DialogBody, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ClipboardIconButton, ClipboardRoot, ClipboardButton } from "@/components/ui/join-code-clipboard"


function ClassCard({ classIndex, classItem, cardWidth, cardHeight, onCardClick, onDelete, onEdit }) {
    const [editedClass, setEditedClass] = useState({
        className: classItem.className,
        classDescription: classItem.classDescription
    });

    const [errors, setErrors] = useState({
        className: '',
        classDescription: '',
    });
    const [open, setOpen] = useState(false);
    const [randomImage, setRandomImage] = useState("");

    useEffect(() => {
        const images = ["class1.jpg", "class2.jpg", "class3.jpg"];
        const randomIndex = Math.floor(Math.random() * images.length);
        setRandomImage(images[randomIndex]);
    }, []);

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

        setEditedClass((prev) => ({
            ...prev,
            [field]: value,
        }));

        const error = validateField(field, value);
        setErrors((prevErrors) => ({
            ...prevErrors,
            [field]: error,
        }));
    };

    const handleSaveEdit = () => {
        if (errors.className || errors.classDescription) return; 
        onEdit(editedClass);
        setOpen(false);
    };

    const resetEditedClass = () => {
        setEditedClass({ ...classItem });
        setErrors('');
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
            color: "fg.muted",
            top: "2.5",
            insetStart: "3",
        },
        _peerFocusVisible: {
            color: "black",
            top: "-3",
            insetStart: "2",
        },
    })

    // Card color list
    const CardColorList = ["#96E2D6", "#AEC7ED", "#D9D9D9"];

    // Assign a background color based on the card index
    const getCardBackgroundColor = () => {
        return CardColorList[classIndex % CardColorList.length];
    };

    return (
        <motion.div
            initial={{ y: 0, opacity: 1 }}
            whileHover={{ y: -5, opacity: 0.9 }}
            transition={{ duration: 0.2 }}
        >
            <Box position="relative" overflow="hidden">
                {/* Card */}
                <Card.Root
                    w={cardWidth}
                    h={cardHeight}
                    bg={getCardBackgroundColor()}
                    borderRadius="3xl"
                    overflow="hidden"
                    onClick={onCardClick}
                >
                    <Card.Body>
                        <Card.Title fontWeight="bold" fontSize="3xl" mb={6}>
                            {classItem.className}
                        </Card.Title>
                        <Card.Description color="black">
                            {classItem.classDescription}
                        </Card.Description>
                    </Card.Body>
                    <Image src={classItem.classImage || randomImage} alt={classItem.classDescription} fit="cover" w="100%" h="200px" />
                </Card.Root>

                {/* Card Menu */}
                <MenuRoot positioning={{ placement: 'bottom-end' }} cursor="pointer">
                    <MenuTrigger asChild>
                        <Box
                            position="absolute"
                            top="19px"
                            right="10px"
                            bg={classItem.bgColor}
                            p="2"
                            borderRadius="full"
                            cursor="pointer"
                        >
                            <MdOutlineMoreVert size={24} color="black" />
                        </Box>
                    </MenuTrigger>
                    <MenuContent
                        borderRadius="xl"
                        transition="box-shadow 0.3s ease, border-color 0.3s ease"
                        transitionDelay="0.1s"
                        _hover={{
                            boxShadow: 'lg',
                            border: '1px solid',
                            borderColor: 'gray.200',
                        }}
                    >
                        <Box align="center" justifyContent="center" display="flex" gap={4} >
                            <ClipboardRoot value={classItem.joinCode} >
                                <ClipboardButton />
                            </ClipboardRoot>
                        </Box>
                        <DialogRoot size="lg" open={open} onOpenChange={(isOpen) => setOpen(isOpen.open)}>
                            <DialogTrigger asChild>
                                <MenuItem value="edit-class" borderRadius="xl" cursor="pointer" mt={2}>
                                    <MdEdit /> Edit
                                </MenuItem>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle color="black" fontWeight="bold" textAlign="left">Edit Class</DialogTitle>
                                </DialogHeader>
                                <DialogBody>
                                    <Stack direction="column" gap={8}>
                                        <Field.Root>
                                            <Box pos="relative" w="full">
                                                <Input
                                                    className="class-name"
                                                    value={editedClass.className}
                                                    onChange={(e) => handleChange("className", e.target.value)}
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
                                                    value={editedClass.classDescription}
                                                    onChange={(e) => handleChange("classDescription", e.target.value)}
                                                />
                                                <Field.Label css={floatingStyles}>Class Description</Field.Label>
                                                {errors.classDescription && (
                                                    <Box color="red.500" mt={1}>
                                                        {errors.classDescription}
                                                    </Box>
                                                )}
                                            </Box>
                                        </Field.Root>
                                        <Field.Root >
                                            <Flex direction="row" align="center" gap={4}>
                                                <Box pos="relative" w="50%">
                                                    <Input className="class-join-code" value={classItem.joinCode} disabled />
                                                    <Field.Label css={floatingStyles}>Class Join Code</Field.Label>
                                                </Box>
                                                <ClipboardRoot value={classItem.joinCode}>
                                                    <ClipboardIconButton />
                                                </ClipboardRoot>
                                            </Flex>
                                        </Field.Root>

                                    </Stack>
                                </DialogBody>
                                <DialogFooter display="flex" gap={10} justifyContent="center">
                                    <DialogActionTrigger asChild>
                                        <Button variant="outline" bg="#FF8080" color="white" onClick={resetEditedClass}>Cancel</Button>
                                    </DialogActionTrigger>
                                    <Button bg="#2D65FF" color="white" onClick={handleSaveEdit} disabled={errors.className || errors.classDescription || !editedClass.className || !editedClass.classDescription}>
                                        Save
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </DialogRoot>
                        <DialogRoot size="lg">
                            <DialogTrigger asChild>
                                <MenuItem value="delete-class" bg="#FF8080" borderRadius="xl" closeOnSelect={false} cursor="pointer" mt={2}>
                                    <MdDelete /> Delete
                                </MenuItem>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle color="black" fontWeight="bold" textAlign="center">Are you sure you want to delete this class?</DialogTitle>
                                </DialogHeader>
                                <DialogBody color="#FF0000" textAlign="center">
                                    <Text>
                                        Class cannot be restored once it is deleted.
                                    </Text>
                                </DialogBody>
                                <DialogFooter display="flex" gap={10} justifyContent="center">
                                    <DialogActionTrigger asChild>
                                        <Button variant="outline" bg="#2D65FF" color="white">Cancel</Button>
                                    </DialogActionTrigger>
                                    <DialogActionTrigger asChild>
                                        <Button bg="#FF8080" color="white" onClick={onDelete}>Delete</Button>
                                    </DialogActionTrigger>
                                </DialogFooter>
                            </DialogContent>
                        </DialogRoot>
                    </MenuContent>
                </MenuRoot>
            </Box>
        </motion.div>
    );
}

export default ClassCard;
