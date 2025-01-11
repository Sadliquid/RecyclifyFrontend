import React from 'react'
import { Box, Card, Image, For, Stack, VStack, Text} from '@chakra-ui/react'
import { LuBox } from "react-icons/lu"

function Landing() {

    // Dummy class data
    const classes = [
        // { id: 1, className: '201', year: 'Year 2 Class 1', image: 'https://via.placeholder.com/150', bgColor: '#96E2D6' },
        // { id: 2, className: '301', year: 'Year 3 Class 1', image: 'https://via.placeholder.com/150', bgColor: '#AEC7ED' },
        // { id: 3, className: '401', year: 'Year 4 Class 1', image: 'https://via.placeholder.com/150', bgColor: '#D9D9D9' },
    ];

    return (
        <Stack gap="8" direction="row" wrap="wrap" justify="center" mt={8}>
            <For
                each={classes}
                fallback={
                    <VStack textAlign="center" fontWeight="medium">
                        <LuBox />
                        <Text>No class data available</Text>
                    </VStack>}
            >
                {(classItem, index) => (
                    <Box key={index}>
                        <Card.Root minW="lg" overflow="hidden" bg={classItem.bgColor} p="4">
                            <Card.Body >
                                <Card.Title >{classItem.className}</Card.Title>
                                <Card.Description>{classItem.year}</Card.Description>
                            </Card.Body>
                            <Image src={classItem.image} alt={classItem.year} />
                        </Card.Root>
                    </Box>
                )}
            </For>
        </Stack>
    )
}

export default Landing