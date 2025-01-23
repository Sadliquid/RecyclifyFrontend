/* eslint-disable react/prop-types */
import { DialogActionTrigger, DialogBody, DialogCloseTrigger, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Box, Button, Text, Card, Image } from "@chakra-ui/react"
import { Toaster, toaster } from "@/components/ui/toaster"
import server from "../../../networking"

function RewardRedemptionCard({ studentID, reward, updateLeafs }) {

    const handleRedeemReward = () => {
        const promise = new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append("studentID", studentID);
            formData.append("rewardID", reward.rewardID);
            server.post("/api/student/redeem-reward", formData, {
                    transformRequest: formData => formData
                }
            )
            .then(response => {
                if (response.status === 200) {
                    const newLeafs = response.data.data;
                    updateLeafs(newLeafs);
                    resolve(newLeafs);
                }
            })
            .catch(error => {
                if (error.response && error.response.data && error.response.data.error && typeof error.response.data.error === "string") {
                    if (error.response.data.error.startsWith("UERROR")) {
                        reject(error.response.data.error.substring("UERROR: ".length));
                    } else {
                        reject("Unknown system error");
                    }
                }
            });
        });
        
        toaster.promise(promise, {
            loading: { title: "Redeeming...", description: "Please wait" },
            success: {
                title: "Success",
                description: "Reward redeemed successfully!",
            },
            error: (err) => ({
                title: "Error",
                description: `${err}`,
            }),
        });
    }

    return (
        <>
            <Card.Root flexDirection="row" overflow="hidden" width={"100%"}>
                <Image
                    objectFit="cover"
                    maxW="200px"
                    src={reward.imageUrl != null ? reward.imageUrl : "https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"}
                    alt="Caffe Latte"
                />
                <Box>
                    <Card.Body maxW={"100%"} overflow={"hidden"}>
                        <Card.Title mb="2" isTruncated>{reward.rewardTitle}</Card.Title>
                        <Card.Description>
                            <Text
                                noOfLines={2}
                                display="-webkit-box"
                                overflow="hidden"
                                textOverflow="ellipsis"
                                style={{
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical'
                                }}
                            >
                                {reward.rewardDescription}
                            </Text>
                            <Text mt={3}>Required leafs: {reward.requiredPoints}</Text>
                        </Card.Description>
                    </Card.Body>
                    <Card.Footer>
                        <DialogRoot
                            placement={"center"}
                            motionPreset="slide-in-bottom"
                        >
                            <DialogTrigger asChild>
                                <Button color="white" variant="outline" backgroundColor="#4DCBA4" _hover={{ bg: "#41B594" }}>
                                    Redeem
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Redeem reward</DialogTitle>
                                </DialogHeader>
                                <DialogBody>
                                    <Text>Are you sure you want to redeem this reward?</Text>
                                </DialogBody>
                                <DialogFooter>
                                    <DialogActionTrigger asChild>
                                        <Box display="flex" gap={4}>
                                            <Button variant="outline">Cancel</Button>
                                            <Button
                                                color="white"
                                                backgroundColor="#2D65FF"
                                                onClick={() => handleRedeemReward(reward.points)}
                                            >
                                                Redeem
                                            </Button>
                                        </Box>
                                    </DialogActionTrigger>
                                </DialogFooter>
                                <DialogCloseTrigger />
                            </DialogContent>
                        </DialogRoot>
                    </Card.Footer>
                </Box>
            </Card.Root>

            <Toaster />
        </>
    )
}

export default RewardRedemptionCard