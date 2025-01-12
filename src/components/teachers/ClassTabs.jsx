import { Tabs } from '@chakra-ui/react';
import ClassDashboard from './ClassDashboard';
import StudentDashboard from './StudentDashboard';
import { PiStudentFill } from 'react-icons/pi';
import { SiGoogleclassroom } from 'react-icons/si';

function ClassTabs() {
    // Table cell color list
    const tableCellColorList = ["#EDEEFC", "#E6F1FD"];

    return (
        <Tabs.Root defaultValue="Class" key="plain" variant="plain" align="center" mt={4}>
                <Tabs.List gap={4} align="center" >
                    <Tabs.Trigger value='Class' bg="#AEC7ED" color="black" align="center"
                        _selected={{
                            bg: "#B9D4FF",
                            color: "black",
                            border: "2px solid #000",
                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                            fontSize: "1.2rem", 
                            padding: "0.8rem 1.2rem",
                            transition: "all 0.5s ease-in-out"
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
                            padding: "0.8rem 1.2rem", 
                            transition: "all 0.5s ease-in-out"
                        }}>
                        <PiStudentFill />Students Dashboard
                    </Tabs.Trigger>
                </Tabs.List>
                <ClassDashboard />
                <StudentDashboard />
            </Tabs.Root>
    );
}

export default ClassTabs;
