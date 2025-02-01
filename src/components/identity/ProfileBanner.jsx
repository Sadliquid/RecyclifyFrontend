import React from 'react'
import { Box, Flex, HStack, Button, VStack } from '@chakra-ui/react'
import { Avatar, AvatarGroup } from "@/components/ui/avatar"


function ProfileBanner() {
    const bannerImage = "/defaultAccountBanner.png";
    const profilePicture = "/AvatarStudent.png";

    return (
        <HStack
            mx={"auto"}
            w={"70%"}
            alignItems="center"
        >
            <Box
                borderRadius={15}
                borderWidth={1}
                backgroundImage={`url(${bannerImage})`}
                backgroundSize="cover"
                backgroundPosition="center"
                backgroundRepeat="no-repeat"
                width="70%"
                height="20vh"
                display="flex"
                alignItems="center"
                position="relative"
            >
                <Avatar
                    size="2xl"
                    src={profilePicture}
                    bg="white"
                    border="4px solid white"
                    ml={10}
                />
            </Box>
            <Box
                ml={"5%"}
                w={"25%"}
            >
                <VStack justifyContent="center" gap={6}>
                    <Button 
                        w={"60%"} 
                        borderRadius={30}
                        variant="solid"
                        background="#2D65FF"
                        color={"white"}
                    >
                        Edit Avatar
                    </Button>
                    <Button 
                        w={"60%"} 
                        borderRadius={30}
                        variant="solid"
                        background="#2D65FF"
                        color={"white"}
                    >
                        Edit Banner
                    </Button>
                </VStack>
            </Box>
        </HStack>
        
    );
}

export default ProfileBanner;