import { Box, Heading, Text, Image, HStack } from '@chakra-ui/react';
import { Avatar } from "@/components/ui/avatar";
import { LuTimer } from 'react-icons/lu';

function Leaderboards() {
    return (
        <Box display="flex" justifyContent={"center"} flexDir="column" mt={10} width={"100%"}>
            <Heading fontSize="30px">Leaderboards</Heading>

            <Box display="flex" justifyContent={"space-between"} width="100%" height={"67vh"} mt={10} boxSizing={"border-box"}>
                <Box display="flex" flexDir={"column"} justifyContent={"space-between"} width="28%">
                    <Box display="flex" flexDir={"column"} justifyContent={"space-around"} alignItems={"center"} backgroundColor="#E5ECFF" borderRadius={20} height="85%" padding={2}>
                        <Avatar boxSize="150px" src="https://bit.ly/dan-abramov" />
                        <Heading fontSize={"30px"} mt={2}>Liew Jun Han</Heading>
                        <Heading color="#2CD776">500 Leafs</Heading>
                        <Box display="flex" justifyContent={"center"} alignItems={"center"} border="3px solid #4DCBA4" borderRadius={20} width="97%" height="20%" mt={2}>
                            <Box mr={2}>
                                <Image src="/silver-medal.png" boxSize={14} />
                            </Box>

                            <Box display="flex" flexDir={"column"} ml={2} mt={-2} >
                                <Text textAlign={"left"} fontSize={"md"}>Silver League</Text>
                                <Text textAlign={"left"} fontSize={"sm"}>2nd Place</Text>
                            </Box>
                        </Box>

                        <Text fontFamily={"Lilita One"} color={"charcoal"}>Finish in the top 3 weekly to advance to the Gold League!</Text>
                    </Box>

                    <Box display="flex" justifyContent={"center"} alignItems={"center"} backgroundColor="#4DCBA4" borderRadius={20} height="13%">
                        <Text as={LuTimer} fontSize="40px" color={"white"} mr={2} />
                        <Heading fontSize={"20px"} color="white" ml={2}>2 Days, 8 Hours Left</Heading>
                    </Box>
                </Box>

                <Box display="flex" flexDir={"column"} alignItems={"center"} justifyContent={"space-around"} width="70%" backgroundColor="#E5ECFF" borderRadius={20}>
                    {/* Header Row */}
                    <HStack
                        display="flex"
                        justifyContent={"space-between"}
                        alignItems="center"
                        width="98%"
                        padding="10px"
                        backgroundColor="#D9E6FF"
                        borderRadius={12}
                        fontWeight="bold"
                    >
                        <Box width="10%" textAlign="center">
                            <Text fontSize="md">Rank</Text>
                        </Box>
                        <Box display="flex" alignItems="center" justifyContent="center" width="30%">
                            <Text fontSize="md">Name</Text>
                        </Box>
                        <Box width="20%" textAlign="center">
                            <Text fontSize="md">Points</Text>
                        </Box>
                        <Box width="20%" textAlign="center">
                            <Text fontSize="md">Status</Text>
                        </Box>
                        <Box
                            width="10%"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Text fontSize="md">Badge</Text>
                        </Box>
                    </HStack>

                    {/* Leaderboard Rows */}
                    {Array.from({ length: 5 }).map((_, index) => (
                        <HStack
                            key={index}
                            display="flex"
                            justifyContent={"space-between"}
                            alignItems="center"
                            width="98%"
                            padding="10px"
                            backgroundColor={"#F4F7FF"}
                            borderRadius={12}
                        >
                            {/* Rank */}
                            <Box width="10%" textAlign="center">
                                <Text fontSize="lg" fontWeight="bold">{index + 1}</Text>
                            </Box>

                            {/* Avatar and Name */}
                            <Box display="flex" alignItems="center" justifyContent="center" width="30%">
                                <Avatar src={"https://bit.ly/dan-abramov"} boxSize="40px" mr={2} />
                                <Text fontSize="md" fontWeight="bold">
                                    Prakhar
                                </Text>
                            </Box>

                            {/* Points */}
                            <Box width="20%" textAlign="center">
                                <Text fontSize="md" fontWeight="bold" color="#2CD776">10</Text>
                            </Box>

                            {/* Status */}
                            <Box width="20%" textAlign="center">
                                <Text fontSize="md">Unregistered</Text>
                            </Box>

                            {/* Badge */}
                            <Box
                                width="10%"
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Box
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    backgroundColor="#FFCF64"
                                    borderRadius="50%"
                                    width="30px"
                                    height="30px"
                                >
                                    <Text fontSize="sm" fontWeight="bold" color="white">
                                        1
                                    </Text>
                                </Box>
                            </Box>
                        </HStack>
                    ))}
                </Box>
            </Box>
        </Box>
    )
}

export default Leaderboards