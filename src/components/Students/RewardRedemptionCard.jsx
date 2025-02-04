/* eslint-disable react/prop-types */
import { DialogActionTrigger, DialogBody, DialogCloseTrigger, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Box, Button, Text, Card, Image } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { toaster } from "@/components/ui/toaster"
import server from "../../../networking"

function RewardRedemptionCard({ studentID, reward, updateLeafs }) {
    const [loading, setLoading] = useState(false);

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
                        reject(error.response.data.error.substring("ERROR: ".length));
                    }
                } else {
                    reject("An unexpected error occurred");
                }
            });
        });
        
        toaster.promise(promise, {
            loading: { title: "Redeeming...", description: "Please wait" },
            success: {
                title: "",
                description: "Reward redeemed successfully!",
            },
            error: (err) => ({
                title: "",
                description: `${err}`,
            }),
        });
    }

    useEffect(() => {
        if (reward.imageUrl) {
            setLoading(true);
        }
    }, [reward.imageUrl]);

    return (
        <>
            <Card.Root flexDirection="row" overflow="hidden" width={"100%"}>
                <Box position="relative">
                    <Box 
                        position="absolute" 
                        top="0" left="0" 
                        width="100%" height="100%" 
                        display="flex" 
                        alignItems="center" 
                        justifyContent="center" 
                    >
                        <Skeleton height="100%" width="100%" loading={loading} />
                    </Box>
                    
                    <Image
                        objectFit="fill"
                        width="250px"
                        maxW="250px"
                        height="100%"
                        src={reward.imageUrl || "https://images.unsplash.com/photo-1667489022797-ab608913feeb?auto=format&fit=crop&w=800&q=60"}
                        alt="Reward Image"
                        onLoad={() => setLoading(false)}
                        onError={() => setLoading(false)}
                        visibility={loading ? "hidden" : "visible"}
                    />
                </Box>

                <Box>
                    <Card.Body maxW={"100%"} overflow={"hidden"}>
                        <Card.Title mb="2" isTruncated>{reward.rewardTitle}</Card.Title>
                        <Card.Description as="div">
                            <Box>
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
                            </Box>
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
        </>
    )
}

export default RewardRedemptionCard