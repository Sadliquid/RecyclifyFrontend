/* eslint-disable react/prop-types */
import { Box, Text, Button } from '@chakra-ui/react';
import { BsGift } from 'react-icons/bs';
import { motion } from "framer-motion";
import { Toaster, toaster } from "@/components/ui/toaster";
import { useState } from "react";
import server from "../../../networking";

function StreakRewardCard({ studentID, streak, lastClaimedStreak }) {
    const [giftClaimed, setGiftClaimed] = useState(false);

    if (!studentID) return null;
    if (streak === null || streak === undefined) return null;

    const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Singapore' });;

    var lastClaimedStreakDate = null;
    if (lastClaimedStreak !== null && lastClaimedStreak !== undefined) {
        lastClaimedStreakDate = new Date(lastClaimedStreak).toISOString().split('T')[0];
    }

    const remainingStreaks = streak % 7;
    const isClaimable = (remainingStreaks === 0) && (lastClaimedStreakDate !== today);

    const handleAwardGift = () => {
        const promise = new Promise((resolve, reject) => {
            server.post("/api/student/award-gift", studentID, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then(response => {
                if (response.status === 200) {
                    const pointsAwarded = response.data.data.pointsAwarded;
                    setGiftClaimed(true);
                    resolve(pointsAwarded);
                } else {
                    reject("Unexpected response status: " + response.status);
                }
            })
            .catch(error => {
                const errorMessage = error.response?.data?.error || "An unknown error occurred";
                reject(errorMessage);
                console.error("ERROR: ", error);
            });
        });
    
        toaster.promise(promise, {
            loading: { title: "Processing...", description: "Please wait" },
            success: (points) => ({
                title: "Success",
                description: `${points} leafs awarded successfully!`,
            }),
            error: {
                title: "Error",
                description: err => `Failed to award gift: ${err}`,
            },
        });
    };    

    if ((remainingStreaks >= 0) && (isClaimable == true || isClaimable == false)) return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                    padding: 6,
                    boxSizing: "border-box",
                    backgroundColor: "#4DCBA4",
                    borderRadius: 24
                }}
            >
                <Box display="flex" justifyContent={"center"} flexDir={"column"} alignItems="center">
                    <Box display="flex" justifyContent={"center"} alignItems="center">
                        {(!isClaimable || giftClaimed) && remainingStreaks === 0 && (
                            <Box ml={2} mr={2}>
                                <Text
                                    as={BsGift}
                                    fontSize="48px"
                                    color="white"
                                />
                            </Box>
                        )}

                        <Box
                            color="white"
                            fontSize="lg"
                            fontWeight="semibold"
                        >
                            {(isClaimable && !giftClaimed) ? (
                                <Button
                                    color="#4DCBA4"
                                    border={"2px solid white"}
                                    backgroundColor={"white"}
                                    _hover={{ backgroundColor: "#4DCBA4", color: "white" }}
                                    px={8}
                                    py={4}
                                    borderRadius={24}
                                    fontWeight="bold"
                                    fontSize="md"
                                    transition={"ease-in-out 0.2s"}
                                    disabled={!isClaimable || giftClaimed}
                                    onClick={handleAwardGift}
                                >
                                    Claim my Daily Streak Gift
                                </Button>
                            ) : (
                                remainingStreaks === 0 ? (
                                    <Text>Successfully claimed Gift!</Text>
                                ) : (
                                    <Text>You are {remainingStreaks} streaks away from unlocking your mystery gift!</Text>
                                )
                            )}
                        </Box>
                    </Box>
                </Box>
            </motion.div>

            <Toaster />
        </>
    );
}

export default StreakRewardCard;