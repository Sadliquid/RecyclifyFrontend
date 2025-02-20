import { Stack, Heading, Box, Text, Button } from "@chakra-ui/react"
import { Switch } from "@/components/ui/switch"
import { useSelector } from "react-redux"
import { useState } from "react"
import ShowToast from "../../Extensions/ShowToast"
import server from "../../../networking"

const EmailNewsletter = () => {
    const [checked, setChecked] = useState(false)
    const { user, loaded, error } = useSelector((state) => state.auth);

    const handleSubmit = async () => {
        if (!error && loaded && user) {
            try {
                const response = await server.get(`/api/Events/send-email-newsletter?userID=${user.id}`);
                if (response.status === 200) {
                    ShowToast("success", "Email newsletter sent successfully.")
                }
            } catch (error) {
                if (error.response && error.response.data && error.response.data.error && typeof error.response.data.error === "string") {
                    if (error.response.data.error.startsWith("UERROR")) {
                        ShowToast("error", error.response.data.error.substring("UERROR: ".length))
                    } else {
                        ShowToast("error", error.response.data.error.substring("ERROR: ".length))
                    }
                } else {
                    ShowToast("error", "An unknown error occurred.")
                }
            }
        }
    }
    
    return (
        <Box display="flex" justifyContent="center" width="100%" height="100%">
            <Stack gap="8" borderRadius="md">
                <Heading fontSize="30px" mt={10} mb={3}>Email Newsletter</Heading>
                <Box display="flex" justifyContent="space-between">
                    <Text textAlign={"left"} mr={3}>Allow Recyclify to send personalised newsletters</Text>

                    <Switch checked={checked} onCheckedChange={(e) => setChecked(e.checked)} />
                </Box>

                <Button disabled={!checked} backgroundColor={"#4DCBA4"} _hover={{ backgroundColor: "#3CA685" }} color="white" px={8} py={4} borderRadius={24} fontWeight="bold" fontSize="md" onClick={() => handleSubmit()}>
                    Re-send newsletter
                </Button>
            </Stack>
        </Box>
    )
}

export default EmailNewsletter