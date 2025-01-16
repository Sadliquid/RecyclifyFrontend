import { useState, useEffect } from 'react';
import { Table, Tabs, Box, Flex, Button, Text, Stack, Field, Input, defineStyle, Badge } from '@chakra-ui/react';
import { MdDelete, MdEdit, MdOutlineMoreVert, MdOutlineEmail } from 'react-icons/md';
import { LuDiamond } from 'react-icons/lu';
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from '@/components/ui/menu';
import { DialogActionTrigger, DialogBody, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import server from "../../../networking"

function ClassTable({ classData }) {
    const [students, setStudents] = useState([]);

    const fetchStudents = async () => {
        try {
            const response = await server.get(`/api/Teacher/get-students/?classID=${classData.classID}`);
            if (response.status === 200) {
                setStudents(Array.isArray(response.data) ? response.data : []);
            } else {
                console.error("Failed to fetch students");
                setStudents([]);
            }
        } catch (error) {
            console.error("Error fetching students:", error);
            setStudents([]);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, [classData]);

    // Table cell color list
    const tableCellColorList = ["#EDEEFC", "#E6F1FD"];

    const handleDeleteStudent = async (studentId) => {
        try {
            const response = await server.delete(`/api/Teacher/delete-student/?studentID=${studentId}`);

            if (response.status === 200) {
                console.log(`Student with ID ${studentId} successfully deleted.`);
                await fetchStudents();
            } else {
                console.error(`Failed to delete student with ID ${studentId}. Response:`, response.data);
            }
        } catch (error) {
            console.error(`Error deleting student with ID ${studentId}:`, error.message);
        }
    };

    const [editedStudent, setEditedStudent] = useState({
        name: '',
        studentEmail: '',
        parentEmail: ''
    })

    const floatingStyles = defineStyle({
        pos: "absolute",
        bg: "bg",
        px: "0.5",
        top: "-3",
        insetStart: "2",
        fontWeight: "normal",
        pointerEvents: "none",
        transition: "position",
        _peerPlaceholderShown: {
            color: "fg.muted",
            top: "2.5",
            insetStart: "3",
        },
        _peerFocusVisible: {
            color: "black",
            top: "-3",
            insetStart: "2",
        },
    })

    // Function to open the edit dialog with the selected student's details
    const handleEditStudent = (student) => {
        setEditedStudent({ ...student }); // Populate the dialog with the selected student's details
    };

    // Function to reset the edited student state
    const resetEditedStudent = () => {
        setEditedStudent({
            name: '',
            studentEmail: '',
            parentEmail: ''
        });
    };

    // Function to save the edited student details
    const handleSaveEdit = async () => {
        try {
            const response = await server.put(`/api/Teacher/update-student`, null, {
                params: {
                    studentID: editedStudent.studentID,
                    studentName: editedStudent.name,
                    studentEmail: editedStudent.studentEmail,
                },
            });
    
            if (response.status === 200) {
                console.log(`Student with ID ${editedStudent.studentID} successfully updated.`);
                await fetchStudents(); 
            } else {
                console.error(`Failed to update student with ID ${editedStudent.studentID}. Response:`, response.data);
            }
        } catch (error) {
            console.error(`Error updating student with ID ${editedStudent.studentID}:`, error.message);
        } finally {
            resetEditedStudent(); 
        }
    };

    // Function to handle changes in the edit dialog fields
    const handleChange = (field, value) => {
        setEditedStudent((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    return (
        <Tabs.Content value='Students'>
            <Box w="100%" h="65dvh" p={4} bg="#9F9FF8" borderRadius="xl" boxShadow="md">
                <Table.ScrollArea rounded="md" height="160px" w="100%" h="100%" overflow="hidden">
                    <Table.Root size="sm" stickyHeader>
                        <Table.Header>
                            <Table.Row bg="bg.subtle">
                                <Table.ColumnHeader>Studnet Name</Table.ColumnHeader>
                                <Table.ColumnHeader>Current Points</Table.ColumnHeader>
                                <Table.ColumnHeader>Total Points</Table.ColumnHeader>
                                <Table.ColumnHeader>Redemptions</Table.ColumnHeader>
                                <Table.ColumnHeader>Student Email</Table.ColumnHeader>
                                <Table.ColumnHeader>Parent Email</Table.ColumnHeader>
                                <Table.ColumnHeader >Flag Status</Table.ColumnHeader>
                                <Table.ColumnHeader textAlign="end"></Table.ColumnHeader>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {students.map((student, index) => (
                                <Table.Row key={student.studentID} bg={index % 2 === 0 ? tableCellColorList[0] : tableCellColorList[1]} >
                                    <Table.Cell color="black"><Flex gap={2} align="center"><LuDiamond />{student.user.name}</Flex></Table.Cell>
                                    <Table.Cell color="black">{student.currentPoints}</Table.Cell>
                                    <Table.Cell color="black">{student.totalPoints}</Table.Cell>
                                    <Table.Cell color="black">{student.redemptions}</Table.Cell>
                                    <Table.Cell color="black">{student.user.email}</Table.Cell>
                                    <Table.Cell color="black">{student.parentEmail}</Table.Cell>
                                    <Table.Cell color="black">{student.flagStatus ? <Badge colorPalette="red">Flagged</Badge> : ""}</Table.Cell>
                                    <Table.Cell>
                                        <MenuRoot positioning={{ placement: 'left-start' }} cursor="pointer">
                                            <MenuTrigger asChild>
                                                <Box
                                                    bg={index % 2 === 0 ? tableCellColorList[0] : tableCellColorList[1]}
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
                                                <DialogRoot size="lg">
                                                    <DialogTrigger asChild>
                                                        <MenuItem
                                                            value="edit-class"
                                                            borderRadius="xl"
                                                            closeOnSelect={false}
                                                            cursor="pointer"
                                                            mt={2}
                                                            onClick={() => handleEditStudent(student)} // Pass the selected student's details
                                                        >
                                                            <MdEdit /> Edit
                                                        </MenuItem>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle color="black" fontWeight="bold" textAlign="left">
                                                                Edit Student Details
                                                            </DialogTitle>
                                                        </DialogHeader>
                                                        <DialogBody>
                                                            <Stack direction="column" gap={8}>
                                                                <Field.Root>
                                                                    <Box pos="relative" w="full">
                                                                        <Input
                                                                            className="student-name"
                                                                            value={editedStudent.name}
                                                                            onChange={(e) => handleChange('name', e.target.value)}
                                                                        />
                                                                        <Field.Label css={floatingStyles}>Student Name</Field.Label>
                                                                    </Box>
                                                                </Field.Root>
                                                                <Field.Root>
                                                                    <Box pos="relative" w="full">
                                                                        <Input
                                                                            className="student-email"
                                                                            value={editedStudent.studentEmail}
                                                                            onChange={(e) => handleChange('studentEmail', e.target.value)}
                                                                        />
                                                                        <Field.Label css={floatingStyles}>Student Email</Field.Label>
                                                                    </Box>
                                                                </Field.Root>
                                                            </Stack>
                                                        </DialogBody>
                                                        <DialogFooter display="flex" gap={10} justifyContent="center">
                                                            <DialogActionTrigger asChild>
                                                                <Button variant="outline" bg="#FF8080" color="white" onClick={resetEditedStudent}>
                                                                    Cancel
                                                                </Button>
                                                            </DialogActionTrigger>
                                                            <DialogActionTrigger asChild>
                                                                <Button bg="#2D65FF" color="white" onClick={handleSaveEdit}>
                                                                    Save
                                                                </Button>
                                                            </DialogActionTrigger>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </DialogRoot>
                                                <MenuItem value="copy-uuid" borderRadius="xl" mt={2}>
                                                    <MdOutlineEmail /> Send Email
                                                </MenuItem>
                                                <DialogRoot size="lg">
                                                    <DialogTrigger asChild>
                                                        <MenuItem value="delete-class" bg="#FF8080" borderRadius="xl" closeOnSelect={false} mt={2}>
                                                            <MdDelete /> Delete
                                                        </MenuItem>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle color="black" textAlign="center">Are you sure you want to remove this student from this class?</DialogTitle>
                                                        </DialogHeader>
                                                        <DialogBody color="#FF0000" textAlign="center">
                                                            <Text>
                                                                The student can enroll back to this class again using the class UUID
                                                            </Text>
                                                        </DialogBody>
                                                        <DialogFooter display="flex" gap={10} justifyContent="center">
                                                            <DialogActionTrigger asChild>
                                                                <Button variant="outline" bg="#2D65FF" color="white">Cancel</Button>
                                                            </DialogActionTrigger>
                                                            <DialogActionTrigger asChild>
                                                                <Button bg="#FF8080" color="white" onClick={() => handleDeleteStudent(student.studentID)}>
                                                                    Delete
                                                                </Button>
                                                            </DialogActionTrigger>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </DialogRoot>
                                            </MenuContent>
                                        </MenuRoot>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Root>
                </Table.ScrollArea>
            </Box>
        </Tabs.Content>
    );
}

export default ClassTable;
