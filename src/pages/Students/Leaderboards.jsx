import { Box, Heading, Text, Image } from '@chakra-ui/react';
import { Avatar } from "@/components/ui/avatar";
import { LuTimer } from 'react-icons/lu';

function Leaderboards() {
    return (
        <Box display="flex" justifyContent={"center"} flexDir="column" mt={10} width={"100%"}>
            <Heading fontSize="30px">Leaderboards</Heading>

            <Box display="flex" justifyContent={"space-between"} width="100%" height={"70vh"} mt={10} boxSizing={"border-box"}>
                <Box display="flex" flexDir={"column"} justifyContent={"space-between"} width="28%">
                    <Box display="flex" flexDir={"column"} justifyContent={"space-around"} alignItems={"center"} backgroundColor="#E5ECFF" borderRadius={20} height="85%" padding={2}>
                        <Avatar boxSize="150px" src="https://bit.ly/dan-abramov" />
                        <Heading fontSize={"30px"} mt={2}>Liew Jun Han</Heading>
                        <Heading color="#2CD776">500 Leafs</Heading>
                        <Box display="flex" justifyContent={"center"} alignItems={"center"} border="3px solid #4DCBA4" borderRadius={20} width="97%" height="20%" mt={2}>
                            <Box mr={2}>
                                <Image src="/silver-medal.png" boxSize={14}/>
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

                <Box display="flex" width="70%" backgroundColor="#E5ECFF" borderRadius={20}>
                    {/* This is for leaderboard row cards */}
                </Box>
            </Box>
        </Box>
    )
}

export default Leaderboards