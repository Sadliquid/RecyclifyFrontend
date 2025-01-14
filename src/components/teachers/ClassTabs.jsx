import { Tabs } from '@chakra-ui/react';
import ClassDashboard from './ClassDashboard';
import StudentDashboard from './StudentDashboard';
import { PiStudentFill } from 'react-icons/pi';
import { SiGoogleclassroom } from 'react-icons/si';
import { Text, VStack } from '@chakra-ui/react';
import { LuBox } from "react-icons/lu"

function ClassTabs() {

    // Initialize dummy students data state
    const students = [
        { id: 1, name: 'John Doe', currentleafs: 100, totalleafs: 200, redemptions: 2, studentEmail: "joonjunhan@gmail.com", parentEmail: "joonjunhan@gmail.com", flagStatus: false },
        { id: 2, name: 'Jane Smith', currentleafs: 150, totalleafs: 300, redemptions: 3, studentEmail: "janesmith@gmail.com", parentEmail: "parentsmith@gmail.com", flagStatus: false },
        { id: 3, name: 'Alice Johnson', currentleafs: 120, totalleafs: 250, redemptions: 1, studentEmail: "alicejohnson@gmail.com", parentEmail: "parentjohnson@gmail.com", flagStatus: true },
        { id: 4, name: 'Bob Brown', currentleafs: 90, totalleafs: 180, redemptions: 2, studentEmail: "bobbrown@gmail.com", parentEmail: "parentbrown@gmail.com", flagStatus: false },
        { id: 5, name: 'Charlie Davis', currentleafs: 200, totalleafs: 400, redemptions: 4, studentEmail: "charliedavis@gmail.com", parentEmail: "parentdavis@gmail.com", flagStatus: false },
        { id: 6, name: 'Diana Evans', currentleafs: 110, totalleafs: 220, redemptions: 2, studentEmail: "dianaevans@gmail.com", parentEmail: "parentevans@gmail.com", flagStatus: true },
    ];

    return (
        <>
            {/* Conditionally render tabs based on student count */}
            {students.length === 0 ? (
                <VStack textAlign="center" fontWeight="medium">
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
                    <StudentDashboard />
                </Tabs.Root>
            )}
        </>

    );
}

export default ClassTabs;
