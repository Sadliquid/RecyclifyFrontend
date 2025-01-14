import { useState } from 'react';
import { Table, Tabs, Box, Flex, Button, Text, Stack, Field, Input, defineStyle } from '@chakra-ui/react';
import { MdDelete, MdEdit, MdOutlineMoreVert, MdOutlineEmail } from 'react-icons/md';
import { LuDiamond } from 'react-icons/lu';
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from '@/components/ui/menu';
import { DialogActionTrigger, DialogBody, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ClipboardIconButton, ClipboardRoot, ClipboardButton } from "@/components/ui/uuid-clipboard"

function ClassTable(onEdit) {

    // Initialize dummy students data state
    const [students, setStudents] = useState([
        { id: 1, name: 'John Doe', currentleafs: 100, totalleafs: 200, redemptions: 2, studentEmail: "joonjunhan@gmail.com", parentEmail: "joonjunhan@gmail.com", flagStatus: false },
        { id: 2, name: 'Jane Smith', currentleafs: 150, totalleafs: 300, redemptions: 3, studentEmail: "janesmith@gmail.com", parentEmail: "parentsmith@gmail.com", flagStatus: false },
        { id: 3, name: 'Alice Johnson', currentleafs: 120, totalleafs: 250, redemptions: 1, studentEmail: "alicejohnson@gmail.com", parentEmail: "parentjohnson@gmail.com", flagStatus: true },
        { id: 4, name: 'Bob Brown', currentleafs: 90, totalleafs: 180, redemptions: 2, studentEmail: "bobbrown@gmail.com", parentEmail: "parentbrown@gmail.com", flagStatus: false },
        { id: 5, name: 'Charlie Davis', currentleafs: 200, totalleafs: 400, redemptions: 4, studentEmail: "charliedavis@gmail.com", parentEmail: "parentdavis@gmail.com", flagStatus: false },
        { id: 6, name: 'Diana Evans', currentleafs: 110, totalleafs: 220, redemptions: 2, studentEmail: "dianaevans@gmail.com", parentEmail: "parentevans@gmail.com", flagStatus: true },
    ]);

    // Table cell color list
    const tableCellColorList = ["#EDEEFC", "#E6F1FD"];

    // Function to delete a student by ID
    const handleDeleteStudent = (studentId) => {
        setStudents((prevStudents) => prevStudents.filter((student) => student.id !== studentId));
    };

    const [editedStudent, setEditedStudent] = useState({
        name: '',
        currentleafs: 0,
        totalleafs: 0,
        redemptions: 0,
        studentEmail: '',
        parentEmail: '',
        flagStatus: false,
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
            currentleafs: 0,
            totalleafs: 0,
            redemptions: 0,
            studentEmail: '',
            parentEmail: '',
            flagStatus: false,
        });
    };

    // Function to save the edited student details
    const handleSaveEdit = () => {
        setStudents((prevStudents) =>
            prevStudents.map((student) =>
                student.id === editedStudent.id ? { ...editedStudent } : student
            )
        );
        resetEditedStudent(); // Reset the edited student state
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
                                <Table.Row key={student.id} bg={index % 2 === 0 ? tableCellColorList[0] : tableCellColorList[1]}>
                                    <Table.Cell color="black"><Flex gap={2} align="center"><LuDiamond />{student.name}</Flex></Table.Cell>
                                    <Table.Cell color="black">{student.currentleafs}</Table.Cell>
                                    <Table.Cell color="black">{student.totalleafs}</Table.Cell>
                                    <Table.Cell color="black">{student.redemptions}</Table.Cell>
                                    <Table.Cell color="black">{student.studentEmail}</Table.Cell>
                                    <Table.Cell color="black">{student.parentEmail}</Table.Cell>
                                    <Table.Cell color="black">{student.flagStatus ? "Flagged" : "Not Flagged"}</Table.Cell>
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
                                                                <Field.Root>
                                                                    <Box pos="relative" w="full">
                                                                        <Input
                                                                            className="parent-email"
                                                                            value={editedStudent.parentEmail}
                                                                            onChange={(e) => handleChange('parentEmail', e.target.value)}
                                                                        />
                                                                        <Field.Label css={floatingStyles}>Parent Email</Field.Label>
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
                                                            <Button bg="#FF8080" color="white" onClick={() => handleDeleteStudent(student.id)}>
                                                                Delete
                                                            </Button>
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
