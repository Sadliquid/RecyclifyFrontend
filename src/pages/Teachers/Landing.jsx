import { useState, useEffect } from 'react'
import { Stack, VStack, Text, useBreakpointValue } from '@chakra-ui/react'
import { LuBox } from "react-icons/lu"
import { useNavigate } from 'react-router-dom'
import AddClassButton from "@/components/teachers/AddClassButton"
import ClassCard from "@/components/teachers/ClassCard"
import server from "../../../networking"

function Landing() {
    const navigate = useNavigate();

    // Dummy class data (stateful)
    const [classes, setClasses] = useState([]);

    // Teacher ID
    const teacherID = "c1f76fc4-c99b-4517-9eac-c5ae54bb8808";

    // Reusable function to fetch classes
    const fetchClasses = async () => {
        try {
            const response = await server.get(`/api/Teacher/get-classes/?teacherID=${teacherID}`);
            if (response.status === 200) {
                setClasses(Array.isArray(response.data.data) ? response.data.data : []);
            } 
        } catch (error) {
            console.error("Error fetching classes:", error);
            setClasses([]);
        }
    };

    // Fetch classes on component mount
    useEffect(() => {
        fetchClasses();
    }, []);

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

    // Function to delete a class by ID using the backend API
    const handleDeleteClass = async (classId) => {
        try {
            const response = await server.delete(`/api/Teacher/delete-class`, {
                params: { classId },
            });
            if (response.status === 200) {
                console.log("Class deleted successfully.");
                fetchClasses();
            } 
        } catch (error) {
            console.error("Error deleting class:", error);
        }
    };

    // Function to edit a class by ID using the backend API, add in class image later
    const handleEditClass = async (classId, updatedClass) => {
        try {
            const response = await server.put(`/api/Teacher/update-class`, null, {
                params: {
                    classId,
                    className: updatedClass.className,
                    classDescription: updatedClass.classDescription
                },
            });
            if (response.status === 200) {
                console.log("Class updated successfully.");
                fetchClasses();
            }
        } catch (error) {
            console.error("Error updating class:", error);
        }
    };

    // Add a new class, add class image later
    const handleAddClass = async (newClass) => {
        try {
            const response = await server.post(`/api/Teacher/create-class`, null, {
                params: {
                    className: newClass.className,
                    classDescription: newClass.classDescription,
                    teacherID: teacherID,
                }
            });
            if (response.status === 200) {
                // Reload the class list to include the newly created class
                fetchClasses();
                console.log("Class added successfully.");
            } 
        } catch (error) {
            console.error("Error adding class:", error);
        }
    };

    return (
        <>
            <Stack gap="8" direction="row" wrap="wrap" justify="center" mt={8}>
                {classes.length ? (
                    classes.map((classItem, classIndex) => (
                        <ClassCard
                            key={classItem.classID}
                            classIndex={classIndex}
                            classItem={classItem}
                            cardWidth={cardWidth}
                            cardHeight={cardHeight}
                            onCardClick={() => navigate(`/teachers/class/${classItem.classID}`)}
                            onDelete={() => handleDeleteClass(classItem.classID)}
                            onEdit={(updatedClass) => handleEditClass(classItem.classID, updatedClass)}
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