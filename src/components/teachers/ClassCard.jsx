import { useState } from 'react';
import { Box, Card, Image, Button, Text, Stack, Field, Input, defineStyle, Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { MdOutlineMoreVert, MdOutlineContentCopy, MdEdit, MdDelete } from 'react-icons/md';
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from '@/components/ui/menu';
import { DialogActionTrigger, DialogBody, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ClipboardIconButton, ClipboardRoot, ClipboardButton } from "@/components/ui/uuid-clipboard"


function ClassCard({ classItem, cardWidth, cardHeight, onCardClick, onDelete, onEdit }) {

    const [editedClass, setEditedClass] = useState({
        className: classItem.className,
        description: classItem.description,
        image: classItem.image,
        bgColor: classItem.bgColor,
    });

    const handleChange = (field, value) => {
        setEditedClass((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSaveEdit = () => {
        onEdit(editedClass);
    };

    const resetEditedClass = () => {
        setEditedClass({ ...classItem });
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
                    bg={classItem.bgColor}
                    borderRadius="3xl"
                    overflow="hidden"
                    onClick={onCardClick}
                >
                    <Card.Body>
                        <Card.Title fontWeight="bold" fontSize="3xl" mb={6}>
                            {classItem.className}
                        </Card.Title>
                        <Card.Description color="black">
                            {classItem.description}
                        </Card.Description>
                    </Card.Body>
                    <Image src={classItem.image} alt={classItem.description} fit="cover" w="100%" h="200px" />
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
                            <ClipboardRoot value={classItem.uuid} >
                                <ClipboardButton />
                            </ClipboardRoot>
                        </Box>
                        <DialogRoot size="lg">
                            <DialogTrigger asChild>
                                <MenuItem value="edit-class" borderRadius="xl" closeOnSelect={false} cursor="pointer" mt={2}>
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
                                            </Box>
                                        </Field.Root>
                                        <Field.Root>
                                            <Box pos="relative" w="full">
                                                <Input
                                                    className="class-description"
                                                    value={editedClass.description}
                                                    onChange={(e) => handleChange("description", e.target.value)}
                                                />
                                                <Field.Label css={floatingStyles}>Class Description</Field.Label>
                                            </Box>
                                        </Field.Root>
                                        <Field.Root >
                                            <Flex direction="row" align="center" gap={4}>
                                                <Box pos="relative" w="50%">
                                                    <Input className="class-uuid" value={classItem.uuid} disabled />
                                                    <Field.Label css={floatingStyles}>Class UUID</Field.Label>
                                                </Box>
                                                <ClipboardRoot value={classItem.uuid}>
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
                                    <DialogActionTrigger asChild>
                                        <Button bg="#2D65FF" color="white" onClick={handleSaveEdit}>
                                            Save
                                        </Button>
                                    </DialogActionTrigger>
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
