/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Box, Text, Flex } from '@chakra-ui/react';
import { FaLeaf, FaMedal } from 'react-icons/fa';
import { Avatar } from "@/components/ui/avatar";
import { useEffect } from 'react';

function StudentProfileCard({ user, studentProfile }) {
    var validProp = studentProfile && Object.keys(studentProfile).length > 0;
    
    useEffect(() => {
        if (validProp) {
            console.log(studentProfile);
        }
    }, [studentProfile]);

    if (validProp) return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent={"space-between"}
            borderRadius="lg"
            p={4}
            width="100%"
            border="1px"
            borderColor="gray.200"
        >
            {/* Top Section - Avatar and Name */}
            <Flex gap={3} align="center">
                <Avatar
                    name={user.name}
                    bg="teal.100"
                    color="teal.500"
                    size="md"
                />
                <Box>
                    <Text fontWeight="bold" fontSize="md">{user.name}</Text>
                    <Text color="gray.500" fontSize="sm" textAlign={"left"}>{user.userRole}</Text>
                </Box>
            </Flex>

            {/* Bottom Section - League and Leafs */}
            <Flex align="center" justify="space-around">
                {/* League Info */}
                <Flex align="center" gap={2}>
                    <FaMedal size={30} color="gray.400" />
                    <Box>
                        <Text fontSize="sm" fontWeight="medium">league</Text>
                        <Text textAlign={"left"} fontSize="xs" color="gray.500">4th place</Text>
                    </Box>
                </Flex>

                {/* Leafs Count */}
                <Flex align="center" gap={2}>
                    <FaLeaf size={30} color="teal.500" />
                    <Text fontSize="sm" fontWeight="medium">{studentProfile.currentPoints} leafs</Text>
                </Flex>
            </Flex>
        </Box>
    );
}

export default StudentProfileCard;