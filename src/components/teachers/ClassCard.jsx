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

function ClassCard({ classItem, cardWidth, cardHeight, onCardClick, onDelete }) {
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
                        <MenuItem value="copy-uuid" borderRadius="xl" cursor="pointer">
                            <MdOutlineContentCopy /> Copy UUID
                        </MenuItem>
                        <MenuItem value="edit-class" borderRadius="xl" cursor="pointer">
                            <MdEdit /> Edit
                        </MenuItem>
                        <DialogRoot> {/* DialogRoot should be within MenuContent */}
                            <DialogTrigger asChild>
                                <MenuItem value="delete-class" bg="#FF8080" borderRadius="xl" closeOnSelect={false}>
                                    <MdDelete /> Delete
                                </MenuItem>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle color="black" textAlign="center">Are you sure you want to delete this class?</DialogTitle>
                                </DialogHeader>
                                <DialogBody color="#FF0000" textAlign="center">
                                    <p>
                                        Class cannot be restored once it is deleted.
                                    </p>
                                </DialogBody>
                                <DialogFooter display="flex" gap={10} justifyContent="center">
                                    <DialogActionTrigger asChild>
                                        <Button variant="outline" bg="#2D65FF" color="white">Cancel</Button>
                                    </DialogActionTrigger>
                                    <Button bg="#FF8080" color="white" onClick={onDelete}>
                                        Delete
                                    </Button>
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
