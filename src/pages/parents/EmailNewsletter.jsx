import { Stack, Heading, Box, Text, Button } from "@chakra-ui/react"
import { Switch } from "@/components/ui/switch"

const EmailNewsletter = () => {
  return (
    <Box display="flex" justifyContent="center" width="100%" height="100%">
        <Stack gap="8" borderRadius="md">
            <Heading fontSize="30px" mt={10} mb={3}>Email Newsletter</Heading>
            <Box display="flex" justifyContent="space-between">
                <Text textAlign={"left"} mr={3}>Allow Recyclify to send personalised newsletters</Text>

                <Switch />
            </Box>

            <Button backgroundColor={"#4DCBA4"} _hover={{ backgroundColor: "#3CA685" }} color="white" px={8} py={4} borderRadius={24} fontWeight="bold" fontSize="md">
                Re-send newsletter
            </Button>
        </Stack>
    </Box>
  )
}

export default EmailNewsletter