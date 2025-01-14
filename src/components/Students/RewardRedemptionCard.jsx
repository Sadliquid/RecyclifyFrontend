/* eslint-disable react/prop-types */
import { Box, Button, Heading, Text } from "@chakra-ui/react"
import { Toaster } from "@/components/ui/toaster"
import ShowToast from "../../Extensions/ShowToast"

function RewardRedemptionCard({ index, reward, points }) {
    const handleRedeemReward = () => {
        ShowToast("success", "Success", "Reward redeemed successfully!")
    }

    return (
        <>
            <Box key={index} backgroundColor={"#E5ECFF"} borderRadius={15} width="40%" margin="auto" p={5} m={5}>
                <Heading fontSize="20px">{reward}</Heading>
                <Text>Points needed: {points}</Text>
                <Button backgroundColor="#2D65FF" colorScheme="white" _hover={{ bg: "#1752FD" }} borderRadius="30px" mt={5} onClick={handleRedeemReward}>Redeem</Button>
            </Box>

            <Toaster />
        </>
    )
}

export default RewardRedemptionCard