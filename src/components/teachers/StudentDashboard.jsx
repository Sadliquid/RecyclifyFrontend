import { useState } from 'react';
import { Table, Tabs, Box, Flex, Button, Text } from '@chakra-ui/react';
import { MdDelete, MdEdit, MdOutlineContentCopy, MdOutlineMoreVert, MdOutlineEmail } from 'react-icons/md';
import { LuDiamond } from 'react-icons/lu';
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from '@/components/ui/menu';
import { DialogActionTrigger, DialogBody, DialogCloseTrigger, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

function ClassTable() {

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
                                                <MenuItem value="edit-class" borderRadius="xl" >
                                                    <MdEdit /> Edit
                                                </MenuItem>
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
