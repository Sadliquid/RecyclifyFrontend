import React, { useState } from 'react'
import { Stack, VStack, Text, useBreakpointValue } from '@chakra-ui/react'
import { LuBox } from "react-icons/lu"
import { useNavigate } from 'react-router-dom'
import AddClassButton from "@/components/teachers/AddClassButton"
import ClassCard from "@/components/teachers/ClassCard"

function Landing() {
    const navigate = useNavigate();

    // Dummy class data (stateful)
    const [classes, setClasses] = useState([
        { id: 1, className: '201', year: 'Year 2 Class 1', image: '../../../src/assets/class1.jpg', bgColor: '#96E2D6' },
        { id: 2, className: '301', year: 'Year 3 Class 1', image: '../../../src/assets/class2.jpg', bgColor: '#AEC7ED' },
        { id: 3, className: '401', year: 'Year 4 Class 1', image: '../../../src/assets/class3.jpg', bgColor: '#D9D9D9' },
    ]);


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

    // Function to delete a class by ID
    const handleDeleteClass = (classId) => {
        setClasses((prevClasses) => prevClasses.filter((classItem) => classItem.id !== classId));
    };

    return (
        <>
            <Stack gap="8" direction="row" wrap="wrap" justify="center" mt={8}>
                {classes.length ? (
                    classes.map((classItem, index) => (
                        <ClassCard
                            key={index}
                            classItem={classItem}
                            cardWidth={cardWidth}
                            cardHeight={cardHeight}
                            onCardClick={() => navigate(`/teachers/class/${classItem.id}`)}
                            onDelete={() => handleDeleteClass(classItem.id)} // Pass delete handler
                        />
                    ))
                ) : (
                    <VStack textAlign="center" fontWeight="medium">
                        <LuBox />
                        <Text>No class data available</Text>
                    </VStack>
                )}
            </Stack>

            {/* Add new class button */}
            <AddClassButton />
        </>
    )
}

export default Landing