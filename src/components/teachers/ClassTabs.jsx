import { Tabs } from '@chakra-ui/react';
import ClassDashboard from './ClassDashboard';
import StudentDashboard from './StudentDashboard';
import { PiStudentFill } from 'react-icons/pi';
import { SiGoogleclassroom } from 'react-icons/si';
import { Text, VStack } from '@chakra-ui/react';
import { LuBox } from "react-icons/lu"
import server from "../../../networking"
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function ClassTabs({ classData }) {

    // Initialize dummy students data state
    const [students, setStudents] = useState([]);
    const { user, loaded, error } = useSelector((state) => state.auth);

    // Fetch students data from the backend
    const fetchStudents = async () => {
        try {
            const response = await server.get(`/api/Teacher/get-students/?classId=${classData.classID}`);
            if (response.status === 200) {
                setStudents(response.data.data);
            } 
        } catch (error) {
            console.error("Error fetching students:", error);
            setStudents([]);
        }
    };

    useEffect(() => {
        if (!error) {
            if (loaded) {
                if (!user || user.userRole != "teacher") {
                    navigate("/auth/login");
                } else {
                    fetchStudents();
                }
            }
        } else {
            console.log("Error", "An error occured while fetching user state");
        }
    }, [loaded && classData.classID]);

    return (
        <>
            {/* Conditionally render tabs based on student count */}
            {students.length === 0 ? (
                <VStack textAlign="center" fontWeight="medium" mt={4}>
                    <LuBox />
                    <Text>No students found in this class.</Text>
                </VStack>
            ) : (
                <Tabs.Root defaultValue="Class" key="plain" variant="plain" align="center" mt={4}>
                    <Tabs.List gap={4} align="center" >
                        <Tabs.Trigger value='Class' bg="#AEC7ED" color="black" align="center"
                            _selected={{
                                bg: "#B9D4FF",
                                color: "black",
                                border: "2px solid #000",
                                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                                fontSize: "1.2rem",
                                padding: "0.8rem 1.0rem",
                                transition: "all 0.5s ease-in"
                            }}>
                            <SiGoogleclassroom />Class Dashboard
                        </Tabs.Trigger>
                        <Tabs.Trigger value='Students' bg="#94E9B8" color="black" align="center"
                            _selected={{
                                bg: "#96E2D6",
                                color: "black",
                                border: "2px solid #000",
                                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                                fontSize: "1.2rem",
                                padding: "0.8rem 1.0rem",
                                transition: "all 0.5s ease-in"
                            }}>
                            <PiStudentFill />Students Dashboard
                        </Tabs.Trigger>
                    </Tabs.List>
                    <ClassDashboard />
                    <StudentDashboard classData={classData} />
                </Tabs.Root>
            )}
        </>

    );
}

export default ClassTabs;
