import { Button } from "./ui/button"
import { Flex, Text } from "@chakra-ui/react"
import React from "react"


function Navbar() {
    return (
        <>
            <Flex as={"nav"} alignItems={"center"} bgGradient={"linear(to-br, #ff86d6, #ffa14a)"} rounded={"10px"} mb={"20px"} p={"10px"} overflow="hidden">
                <Text fontSize={"2xl"} fontWeight={"bold"}>Recyclify</Text>
            </Flex>
        </>
    )
}

export default Navbar