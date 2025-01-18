import { DialogActionTrigger, DialogBody, DialogCloseTrigger, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Text, Box, Button } from '@chakra-ui/react';
import { BsFire } from 'react-icons/bs';
import MiniCalendar from "./MiniCalendar";

function StreakCard() {
    return (
        <Box display="flex" justifyContent={"space-between"} width="100%" divideX={"2px"}>
            <Box display="flex" justifyContent={"space-around"} alignItems={"center"} width="50%">
                <Text as={BsFire} fontSize="40px" color={"#CCAC00"} />

                <Box>
                    <Text textAlign={"left"} fontFamily={"Lilita One"}>14 Days</Text>
                    <Text textAlign={"left"}>Current Streak</Text>
                </Box>
            </Box>
            
            <Box display="flex" flexDir={"column"} justifyContent={"space-around"} alignItems={"center"} width="50%" >
                <Text fontFamily={"Lilita One"} color="#39B58A">Great job! Your streak looks amazing!</Text>
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
                                <MiniCalendar />
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
    )
}

export default StreakCard