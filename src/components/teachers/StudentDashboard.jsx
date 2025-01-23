import { useState } from 'react';
import { Table, Tabs, Box, Flex, Button, Text, Stack, Field, Input, Image, defineStyle } from '@chakra-ui/react';
import { MdDelete, MdEdit, MdOutlineMoreVert, MdOutlineEmail } from 'react-icons/md';
import { LuDiamond } from 'react-icons/lu';
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from '@/components/ui/menu';
import { DialogActionTrigger, DialogBody, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import server from "../../../networking"

function StudentDashboard({ classData, students }) {
    const [studentsList, setStudentsList] = useState(students || []);
    const [editedStudent, setEditedStudent] = useState({
        name: '',
        studentEmail: ''
    })
    const [validationError, setValidationError] = useState({
        name: '',
    });
    const [open, setOpen] = useState(false);

    const validateName = (name) => {
        const nameRegex = /^[a-zA-Z\s]+$/;
        if (!nameRegex.test(name)) {
            return 'Name can only contain letters and spaces.';
        }
        return '';
    };

    // Function to validate email format
    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(email)) {
            return 'Please enter a valid email address.';
        }
        return '';
    };

    // Table cell color list
    const tableCellColorList = ["#EDEEFC", "#E6F1FD"];

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
        setEditedStudent({
            studentID: student.studentID,
            name: student.user.name,
            studentEmail: student.user.email,
        });
        setOpen(true);
    };

    // Function to reset the edited student state
    const resetEditedStudent = () => {
        setEditedStudent({
            name: '',
            studentEmail: '',
        });
        setOpen(false);
    };

    // Function to handle changes in the edit dialog fields
    const handleChange = (field, value) => {
        let error = '';
        if (field === 'name') {
            error = validateName(value);
        } else if (field === 'studentEmail') {
            error = validateEmail(value);
        }

        setValidationError((prev) => ({
            ...prev,
            [field]: error,
        }));

        setEditedStudent((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // Fetch students data from the backend
    const fetchStudents = async () => {
        try {
            const response = await server.get(`/api/Teacher/get-students/?classId=${classData.classID}`);
            if (response.status === 200) {
                setStudentsList(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching students:", error);
            setStudentsList([]);
        }
    };

    // Function to save the edited student details
    const handleSaveEdit = async () => {
        // Ensure no validation errors exist
        if (validationError.name) {
            console.error('Validation error:', validationError.name);
            return;
        }

        try {
            const response = await server.put(`/api/Teacher/update-student`, null, {
                params: {
                    studentID: editedStudent.studentID,
                    studentName: editedStudent.name,
                    studentEmail: editedStudent.studentEmail,
                },
            });

            if (response.status === 200) {
                console.log('Student successfully updated.');
                await fetchStudents(); // Refresh the students list
                setOpen(false);
            }
        } catch (error) {
            console.error('Error updating student.');
            setOpen(true);
        }
    };

    const handleDeleteStudent = async (studentId) => {
        try {
            const response = await server.delete(`/api/Teacher/delete-student/?studentID=${studentId}`);

            if (response.status === 200) {
                console.log("Student successfully deleted.");
                await fetchStudents();
            }
        } catch (error) {
            console.error("Error deleting student.", error.message);
        }
    };

    const isFormInvalid = !!validationError.name || !!validationError.studentEmail || !editedStudent.name.trim() || !editedStudent.studentEmail.trim();

    return (
        <Tabs.Content value='Students'>
            <Box w="100%" h="65dvh" p={4} bg="#9F9FF8" borderRadius="xl" boxShadow="md">
                <Table.ScrollArea rounded="md" height="160px" w="100%" h="100%" overflow="hidden">
                    <Table.Root size="sm" stickyHeader>
                        <Table.Header>
                            <Table.Row bg="bg.subtle">
                                <Table.ColumnHeader>Student Name</Table.ColumnHeader>
                                <Table.ColumnHeader>League</Table.ColumnHeader>
                                <Table.ColumnHeader>Current Points</Table.ColumnHeader>
                                <Table.ColumnHeader>Total Points</Table.ColumnHeader>
                                <Table.ColumnHeader>Redemptions</Table.ColumnHeader>
                                <Table.ColumnHeader>Student Email</Table.ColumnHeader>
                                <Table.ColumnHeader>Parent Email</Table.ColumnHeader>
                                <Table.ColumnHeader textAlign="end"></Table.ColumnHeader>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {/* check students list, if there are no students just go to fallback, or else just render the students details in the dashboard */}
                            {studentsList.length === 0 ? (
                                <Table.Row>
                                    <Table.Cell colSpan={8}>
                                        <Text textAlign="center" color="gray.500">
                                            No students enrolled in this class.
                                        </Text>
                                    </Table.Cell>
                                </Table.Row>
                            ) : (
                                studentsList.map((student, index) => (
                                    <Table.Row key={student.studentID} bg={index % 2 === 0 ? tableCellColorList[0] : tableCellColorList[1]}>
                                        <Table.Cell color="black">
                                            <Flex gap={2} align="center">
                                                <LuDiamond />
                                                {student.user.name}
                                            </Flex>
                                        </Table.Cell>
                                        <Table.Cell color="black">
                                            <Image src={student.league === "Gold" ? "/gold-medal.png" : student.league === "Silver" ? "/silver-medal.png" : "/bronze-medal.png"} alt={student.league} w="30px" h="30px" />
                                        </Table.Cell>
                                        <Table.Cell color="black">{student.currentPoints}</Table.Cell>
                                        <Table.Cell color="black">{student.totalPoints}</Table.Cell>
                                        <Table.Cell color="black">{student.redemptions ? student.redemptions : 0}</Table.Cell>
                                        <Table.Cell color="black">{student.user.email ? student.user.email : "N/A"}</Table.Cell>
                                        <Table.Cell color="black">{student.parentEmail ? student.parentEmail : "N/A"}</Table.Cell>
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
                                                    <DialogRoot size="lg" open={open} onOpenChange={(isOpen) => setOpen(isOpen.open)}>
                                                        <DialogTrigger asChild>
                                                            <MenuItem
                                                                value="edit-class"
                                                                borderRadius="xl"
                                                                closeOnSelect={false}
                                                                cursor="pointer"
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
                                                                                borderColor={validationError.name ? 'red.500' : 'gray.300'}
                                                                            />
                                                                            <Field.Label css={floatingStyles}>Student Name</Field.Label>
                                                                            {validationError.name && (
                                                                                <Text color="red.500" fontSize="sm" mt={1}>
                                                                                    * {validationError.name}
                                                                                </Text>
                                                                            )}
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
                                                                            {validationError.studentEmail && (
                                                                                <Text color="red.500" fontSize="sm" mt={1}>
                                                                                    * {validationError.studentEmail}
                                                                                </Text>
                                                                            )}
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
                                                                <Button bg="#2D65FF" color="white" onClick={handleSaveEdit} disabled={isFormInvalid}>
                                                                    Save
                                                                </Button>
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
                                                                <DialogTitle color="black" textAlign="center">
                                                                    Are you sure you want to remove this student from this class?
                                                                </DialogTitle>
                                                            </DialogHeader>
                                                            <DialogBody color="#FF0000" textAlign="center">
                                                                <Text>
                                                                    The student can enroll back to this class again using the class UUID
                                                                </Text>
                                                            </DialogBody>
                                                            <DialogFooter display="flex" gap={10} justifyContent="center">
                                                                <DialogActionTrigger asChild>
                                                                    <Button variant="outline" bg="#2D65FF" color="white">
                                                                        Cancel
                                                                    </Button>
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
                                ))
                            )}
                        </Table.Body>
                    </Table.Root>
                </Table.ScrollArea>
            </Box>
        </Tabs.Content>
    );
}

export default StudentDashboard;
