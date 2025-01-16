/* eslint-disable react/prop-types */
import { DialogActionTrigger, DialogBody, DialogCloseTrigger, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle } from "@/components/ui/dialog"
import { Box, Button, Heading, Text } from "@chakra-ui/react"
import { Toaster } from "@/components/ui/toaster"
import ShowToast from "../../Extensions/ShowToast"
import { useState } from 'react'

function RewardRedemptionCard({ index, reward, points, redeemablePoints, handleUpdateRedeemablePoints }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleRedeemReward = (costPoints) => {
        if (redeemablePoints < costPoints) {
            ShowToast("error", "Error", "You do not have enough points to redeem this reward");
            setIsOpen(false);
            return;
        } else {
            handleUpdateRedeemablePoints(costPoints);
            setIsOpen(false);
            ShowToast("success", "Success", "Reward redeemed successfully!")
        }
    }

    return (
        <>
            <Box key={index} backgroundColor={"#E5ECFF"} borderRadius={15} width="40%" margin="auto" p={5} m={5}>
                <Heading fontSize="20px">{reward}</Heading>
                <Text>Points needed: {points}</Text>
                <Button backgroundColor="#2D65FF" colorScheme="white" _hover={{ bg: "#1752FD" }} borderRadius="30px" mt={5} onClick={() => setIsOpen(true)}>Redeem</Button>
            </Box>

            <DialogRoot 
                placement={"center"}
                motionPreset="slide-in-bottom"
                open={isOpen}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Redeem reward</DialogTitle>
                    </DialogHeader>
                    <DialogBody>
                        <Text>Are you sure you want to redeem this reward?</Text>
                    </DialogBody>
                    <DialogFooter>
                        <DialogActionTrigger asChild>
                            <Button onClick={() => setIsOpen(false)} variant="outline">Cancel</Button>
                        </DialogActionTrigger>
                        <Button backgroundColor={"#2D65FF"} onClick={() => handleRedeemReward(points)}>Redeem</Button>
                    </DialogFooter>
                    <DialogCloseTrigger />
                </DialogContent>
            </DialogRoot>

            <Toaster />
        </>
    )
}

export default RewardRedemptionCard