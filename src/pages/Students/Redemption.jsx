import { Box, Heading, Text } from '@chakra-ui/react';
import RewardRedemptionCard from '../../components/Students/RewardRedemptionCard';

function Redemption() {
    // dummy data for the rewards
    const rewards = [
        {
            name: "Eco-friendly notebook",
            points: 50
        },
        {
            name: "Sticky notes",
            points: 30
        },
        {
            name: "Eco-friendly water bottle",
            points: 20
        },
        {
            name: "Set of pens",
            points: 20
        }
    ]
    return (
        <Box display="flex" justifyContent={"center"} flexDir="column" mt={10}>
            <Heading fontSize="30px" mb={10}>Redeem my leafs</Heading>

            <Box display="flex" justifyContent={"center"} backgroundColor={"#E5ECFF"} borderRadius={15} width="12%" margin="auto" p={2}>
                <Text>Redeemable leafs: 100</Text>
            </Box>

            <Box display="flex" justifyContent={"center"} flexWrap={"wrap"} mt={10}>
                {rewards.map((reward, index) => (
                    <RewardRedemptionCard key={index} index={index} reward={reward.name} points={reward.points} />
                ))}
            </Box>
        </Box>
    )
}

export default Redemption