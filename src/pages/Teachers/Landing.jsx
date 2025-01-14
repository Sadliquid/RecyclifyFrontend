import { useState } from 'react'
import { Stack, VStack, Text, useBreakpointValue } from '@chakra-ui/react'
import { LuBox } from "react-icons/lu"
import { useNavigate } from 'react-router-dom'
import AddClassButton from "@/components/teachers/AddClassButton"
import ClassCard from "@/components/teachers/ClassCard"

function Landing() {
    const navigate = useNavigate();

    // Dummy class data (stateful)
    const [classes, setClasses] = useState([
        { id: 1, className: '201', description: 'Year 2 Class 1', image: 'class1.jpg', bgColor: '#96E2D6', uuid: "12345678" },
        { id: 2, className: '301', description: 'Year 3 Class 1', image: 'class2.jpg', bgColor: '#AEC7ED', uuid: "23456789" },
        { id: 3, className: '401', description: 'Year 4 Class 1', image: 'class3.jpg', bgColor: '#D9D9D9', uuid: "34567890" },
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

    // Function to edit a class by ID
    const handleEditClass = (classId, updatedClass) => {
        setClasses((prevClasses) =>
            prevClasses.map((classItem) =>
                classItem.id === classId ? { ...classItem, ...updatedClass } : classItem
            )
        );
    };

    // Function to add a new class
    const handleAddClass = (newClass) => {
        setClasses((prevClasses) => [...prevClasses, { ...newClass, id: prevClasses.length + 1 }]);
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
                            onDelete={() => handleDeleteClass(classItem.id)}
                            onEdit={(updatedClass) => handleEditClass(classItem.id, updatedClass)}
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
            <AddClassButton onCreate={handleAddClass} />
        </>
    )
}

export default Landing