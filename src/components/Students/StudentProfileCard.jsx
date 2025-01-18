/* eslint-disable react/prop-types */
import { Box, Text, Flex, Image } from '@chakra-ui/react';
import { FaLeaf } from 'react-icons/fa';
import { Avatar } from "@/components/ui/avatar";
import { motion } from "framer-motion";

function StudentProfileCard({ user, studentProfile }) {
    var validProp = studentProfile && Object.keys(studentProfile).length > 0;

    if (validProp) return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    borderRadius: "lg",
                    padding: 8,
                    width: "100%",
                    border: "1px",
                    borderColor: "gray.200"
                }}
            >
                <Flex gap={3} align="center">
                    <Avatar
                        name={user.name}
                        bg="teal.100"
                        color="teal.500"
                        size="md"
                    />
                    <Box>
                        <Text fontWeight="bold" fontSize="md">{user.name}</Text>
                        <Text color="gray.500" fontSize="sm" textAlign={"left"}>{user.userRole == "student" ? "Student" : "Recyclify User"}</Text>
                    </Box>
                </Flex>

                <Flex align="center" justify="space-around">
                    <Flex align="center" gap={2}>
                        <Image src="/silver-medal.png" boxSize={8}/>
                        <Box>
                            <Text fontSize="sm" fontWeight="medium">{studentProfile.league + " League" || "League Unregistered"}</Text>
                            <Text textAlign={"left"} fontSize="xs" color="gray.500">{studentProfile.leagueRank == 1 ? "1st" : studentProfile.leagueRank == 2 ? "2nd" : studentProfile.leagueRank == 3 ? "3rd" : studentProfile.leagueRank + "th"} place</Text>
                        </Box>
                    </Flex>

                    <Flex align="center" gap={2}>
                        <FaLeaf size={30} color="#2CD776" />
                        <Text fontSize="sm" fontWeight="medium">{studentProfile.currentPoints} leafs</Text>
                    </Flex>
                </Flex>
            </motion.div>
        </>
    );
}

export default StudentProfileCard;