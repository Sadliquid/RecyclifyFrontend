import React from 'react';
import { Box, Card, Image, Button, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { MdOutlineMoreVert, MdOutlineContentCopy, MdEdit, MdDelete } from 'react-icons/md';
import {
    MenuContent,
    MenuItem,
    MenuRoot,
    MenuTrigger,
} from '@/components/ui/menu';
import {
    DialogActionTrigger,
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

function ClassCard({ classItem, cardWidth, cardHeight, onCardClick }) {
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
                            {classItem.year}
                        </Card.Description>
                    </Card.Body>
                    <Image src={classItem.image} alt={classItem.year} fit="cover" w="100%" h="200px" />
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
                        <MenuItem value="copy-uuid" borderRadius="xl">
                            <MdOutlineContentCopy /> Copy UUID
                        </MenuItem>
                        <MenuItem value="edit-class" borderRadius="xl">
                            <MdEdit /> Edit
                        </MenuItem>
                        <MenuItem value="delete-class" bg="#FF8080" borderRadius="xl">
                            <DialogRoot role="alertdialog">
                                <DialogTrigger asChild>
                                    <>
                                        <MdDelete /> Delete
                                    </>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Are you sure?</DialogTitle>
                                    </DialogHeader>
                                    <DialogBody>
                                        <p>
                                            This action cannot be undone. This will permanently delete your
                                            account and remove your data from our systems.
                                        </p>
                                    </DialogBody>
                                    <DialogFooter>
                                        <DialogActionTrigger asChild>
                                            <Button variant="outline">Cancel</Button>
                                        </DialogActionTrigger>
                                        <Button colorPalette="red">Delete</Button>
                                    </DialogFooter>
                                    <DialogCloseTrigger />
                                </DialogContent>
                            </DialogRoot>
                        </MenuItem>
                    </MenuContent>
                </MenuRoot>
            </Box>
        </motion.div>
    );
}

export default ClassCard;
