/* eslint-disable react/prop-types */
import { Box, Text, Flex, Image, Spinner } from '@chakra-ui/react';
import { FaLeaf } from 'react-icons/fa';
import { Avatar } from "@/components/ui/avatar";

function StudentProfileCard({ user, studentProfile }) {
    var validProp = studentProfile && Object.keys(studentProfile).length > 0;

    if (!user || !studentProfile || !validProp) {
        return (
            <Box display="flex" flexDir={"column"} justifyContent={"center"} alignItems="center" width="100%" height="100%">
                <Spinner mb={3} color="#3A9F83" animationDuration="0.5s" css={{ "--spinner-track-color": "colors.gray.200" }} />
            </Box>
        )
    }

    if (validProp) return (
        <>
            <Box
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
                        <Image src={studentProfile.league === "Bronze" ? "/bronze-medal.png" : studentProfile.league === "Silver" ? "/silver-medal.png" : "/gold-medal.png"} boxSize={8}/>
                        <Box>
                            <Text fontSize="sm" fontWeight="medium">{studentProfile.league !== null ? `${studentProfile.league} League` : "League Unregistered"}</Text>
                            <Text textAlign={"left"} fontSize="xs" color="gray.500">{studentProfile.leagueRank == 1 ? "1st" : studentProfile.leagueRank == 2 ? "2nd" : studentProfile.leagueRank == 3 ? "3rd" : studentProfile.leagueRank != null ? studentProfile.leagueRank + "th place" : "No position"}</Text>
                        </Box>
                    </Flex>

                    <Flex align="center" gap={2}>
                        <FaLeaf size={30} color="#2CD776" />
                        <Text fontSize="sm" fontWeight="medium">{studentProfile.currentPoints} leafs</Text>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
}

export default StudentProfileCard;