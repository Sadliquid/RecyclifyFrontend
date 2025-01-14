import { Box, Heading, Text } from '@chakra-ui/react';

function Redemption() {
    return (
        <Box display="flex" justifyContent={"center"} flexDir="column" mt={10}>
            <Heading fontSize="30px" mb={10}>Redeem my leafs</Heading>

            <Box display="flex" justifyContent={"center"} backgroundColor={"#E5ECFF"} borderRadius={15} width="20%" margin="auto" p={2}>
                <Text>Redeemable leafs: 100</Text>
            </Box>

            <Box display="flex" justifyContent={"center"} flexWrap={"wrap"} mt={10}>
                {[...Array(4)].map((_, index) => (
                    <Box key={index} backgroundColor={"#E5ECFF"} borderRadius={15} width="40%" margin="auto" p={5} m={5}>
                        <Heading fontSize="20px">Reward {index + 1}</Heading>
                        <Text>Free notebook</Text>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}

export default Redemption