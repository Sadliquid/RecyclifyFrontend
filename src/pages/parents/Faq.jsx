/* eslint-disable react-hooks/exhaustive-deps */
import { AccordionItem, AccordionItemContent, AccordionItemTrigger, AccordionRoot } from "@/components/ui/accordion";
import { Heading, Box, Button, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const Faq = () => {
    const navigate = useNavigate();
    const { user, loaded, error } = useSelector((state) => state.auth);


    const questions = [
        { value: "1", title: "How are points calculated within the application?", text: "The points are calculated based on how students perform in each task. Some tasks are done by the student themselves while others are done by the class in a weekly basis." },
        { value: "2", title: "How do we get notified about our important events within the school?", text: "A newsletter will be sent to inform you about your child's accomplishments. Alternatively see the Events Log." },
        { value: "3", title: "How do I unsubscribe to the email newsletter?", text: "Turn off this feature through “Allow Recyclify to send personalised newsletters.”" },
        { value: "4", title: "How do I look through individual events?", text: "Click on the “More” icon for each event." },
        { value: "5", title: "What is the purpose of Recyclify? How is Recyclify productive?", text: "The purpose of Recyclify is to engage students in recycling sustainably through gamification. It is productive because it engages and encourages the student to contribute to environmental progress while making it fun." },
    ];
   
    useEffect(() => {
        if (!error && loaded && user && user.userRole == "parent") {
            console.log("User logged in as parent with ID:", user.id);
        }
    }, [loaded]);


    return (
        <Box>
            <Heading fontSize="30px" mt={10} mb={3}>Frequently Asked Questions</Heading>
            <AccordionRoot width="100%" p={5} multiple defaultValue={["b"]}>
                {questions.map((questions, index) => (
                    <AccordionItem key={index} mb={4} borderRadius="md" overflow="hidden" width="100%" value={questions.value}>
                        <AccordionItemTrigger>{questions.title}</AccordionItemTrigger>
                        <AccordionItemContent textAlign="left">{questions.text}</AccordionItemContent>
                    </AccordionItem>
                ))}
            </AccordionRoot>
            <VStack mt={8} spacing={4} align="center">
                <Text fontSize="lg" fontWeight="medium">For further assistance, you can reach us here:</Text>
                <Button bg={"#4DCBA4"} onClick={() => navigate("/contact")} width="200px">Go to Contact Page</Button>
                <Text fontSize="lg" fontWeight="medium">Alternative you can ask our own chatbot EcoPilot for any queries!</Text>
                <Button bg={"#4DCBA4"} onClick={() => navigate("/ecoPilot")} width="200px">Go to EcoPilot page</Button>
            </VStack>
        </Box>
    );
}


export default Faq;