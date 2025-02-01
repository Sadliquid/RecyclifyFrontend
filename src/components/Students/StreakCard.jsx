/* eslint-disable react/prop-types */
import { DialogActionTrigger, DialogBody, DialogCloseTrigger, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Text, Box, Button, Spinner } from '@chakra-ui/react';
import { BsFire } from 'react-icons/bs';
import MiniCalendar from "./MiniCalendar";

function StreakCard({ streak }) {
    if (streak == null) {
        return (
            <Box display="flex" flexDir={"column"} justifyContent={"center"} alignItems="center" width="100%" height="100%">
                <Spinner mb={3} color="#3A9F83" animationDuration="0.5s" css={{ "--spinner-track-color": "colors.gray.200" }} />
            </Box>
        )
    } else {
        if (streak >= 0) return (
            <>
                
                    <Box display="flex" justifyContent={"space-between"} width="100%" divideX={"2px"}>
                        <Box display="flex" justifyContent={"space-around"} alignItems={"center"} width="50%">
                            <Text as={BsFire} fontSize="40px" color={"#CCAC00"} />

                            <Box>
                                <Text textAlign={"left"} fontFamily={"Lilita One"}>{streak} Days</Text>
                                <Text textAlign={"left"}>Current Streak</Text>
                            </Box>
                        </Box>
                        
                        <Box display="flex" flexDir={"column"} justifyContent={"space-around"} alignItems={"center"} width="50%" >
                            <Text fontFamily={"Lilita One"} color="#39B58A">{streak > 0 ? "Great job! Your streak looks amazing!" : "Build your streak to earn gifts!"}</Text>
                            <DialogRoot placement={"center"} motionPreset="slide-in-bottom">
                                <DialogTrigger asChild>
                                    <Button backgroundColor={"#4DCBA4"} color={"white"} _hover={{ backgroundColor: "#3DAF8B" }} borderRadius={20}>
                                    View more
                                </Button>
                                </DialogTrigger>

                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>View your Daily Streak</DialogTitle>
                                    </DialogHeader>

                                    <DialogBody>
                                        <Box display="flex" justifyContent="center" alignItems="center" flexDir="column">
                                            <MiniCalendar streak={streak} />
                                        </Box>
                                    </DialogBody>

                                    <DialogFooter>
                                    <DialogActionTrigger asChild>
                                        <Box display="flex" gap="10px">
                                            <Button color="white" variant="outline" backgroundColor={"#4DCBA4"} _hover={{ backgroundColor: "#3DAF8B" }} borderRadius={10}>Done</Button>
                                        </Box>
                                    </DialogActionTrigger>
                                    </DialogFooter>

                                    <DialogCloseTrigger />
                                </DialogContent>
                            </DialogRoot>
                        </Box>
                    </Box>
            </>
        )
    }
}

export default StreakCard