import React from 'react'
import { Box, Card, Image, For, Stack, VStack, Text, Button, Flex, useBreakpointValue } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { LuBox } from "react-icons/lu"
import { IoAddOutline } from "react-icons/io5";
import { MdOutlineContentCopy, MdEdit, MdDelete, MdOutlineMoreVert, MdAddCircle } from "react-icons/md";
import { useNavigate } from 'react-router-dom'
import {
    MenuContent,
    MenuItem,
    MenuRoot,
    MenuTrigger,
} from "@/components/ui/menu"

function Landing() {
    const navigate = useNavigate();

    // Dummy class data
    const classes = [
        { id: 1, className: '201', year: 'Year 2 Class 1', image: '../../../src/assets/class1.jpg', bgColor: '#96E2D6' },
        { id: 2, className: '301', year: 'Year 3 Class 1', image: '../../../src/assets/class2.jpg', bgColor: '#AEC7ED' },
        { id: 3, className: '401', year: 'Year 4 Class 1', image: '../../../src/assets/class3.jpg', bgColor: '#D9D9D9' },
    ];

    // Card height and width based on screen size
    const cardWidth = useBreakpointValue({
        base: '300px', 
        md: '380px',
        lg: '500px',
    });

    const cardHeight = useBreakpointValue({
        base: '200px',
        md: '260px', 
        lg: '300px',   
    });

    return (
        <>
            <Stack gap="8" direction="row" wrap="wrap" justify="center" mt={8} >
                <For
                    each={classes}
                    fallback={
                        <VStack textAlign="center" fontWeight="medium">
                            <LuBox />
                            <Text>No class data available</Text>
                        </VStack>}
                >
                    {(classItem, index) => (
                        <motion.div
                            key={index}
                            initial={{ y: 0, opacity: 1 }}
                            whileHover={{ y: -5, opacity: 0.9 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Box key={index} >
                                <Card.Root w={cardWidth} h={cardHeight} overflow="hidden" bg={classItem.bgColor} borderRadius="3xl" onClick={() => navigate(`/teachers/class/${classItem.id}`)}>
                                    <Card.Body >
                                        <Flex justify={'space-between'} align={'center'} mb={4} wrap={'wrap'} >
                                            <Card.Title fontWeight="bold" fontSize="3xl">{classItem.className}</Card.Title>
                                            <MenuRoot positioning={{ placement: "bottom-end" }}>
                                                <MenuTrigger asChild>
                                                    <MdOutlineMoreVert size={24} color="black" />
                                                </MenuTrigger>
                                                <MenuContent borderRadius="xl">
                                                    <MenuItem value="copy-uuid" borderRadius="xl">
                                                        <MdOutlineContentCopy /> Copy UUID
                                                    </MenuItem>
                                                    <MenuItem value="edit-class" borderRadius="xl">
                                                        <MdEdit /> Edit
                                                    </MenuItem>
                                                    <MenuItem value="delete-class" bg="#FF8080" borderRadius="xl">
                                                        <MdDelete /> Delete
                                                    </MenuItem>
                                                </MenuContent>
                                            </MenuRoot>
                                        </Flex>
                                        <Card.Description color="black">{classItem.year}</Card.Description>
                                    </Card.Body>
                                    <Image src={classItem.image} alt={classItem.year} fit="cover" w="100%" h="200px" />
                                </Card.Root>
                            </Box>
                        </motion.div>
                    )}
                </For>
            </Stack>

            {/* Add new class button */}
            <Box p={1} bg="#92BFFF"  position="fixed" aria-label="Add Class" cursor="pointer" borderRadius={40} style={{
                    position: 'fixed',
                    bottom: '40px',
                    right: '40px',
                    zIndex: 1000,
                }}>
                <IoAddOutline size={50} color="black"/>
            </Box>
            
        </>
    )
}

export default Landing