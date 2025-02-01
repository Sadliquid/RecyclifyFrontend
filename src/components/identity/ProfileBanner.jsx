import React from 'react'
import { Box, Flex, Heading } from '@chakra-ui/react'
import { Avatar, AvatarGroup } from "@/components/ui/avatar"


function ProfileBanner() {
    const bannerImage = "/defaultAccountBanner.png"
    const profilePicture = "/AvatarStudent.png"

    return (
        <Box
            height="25%"
            position="relative"
            borderRadius={15}
            borderWidth={1}
            backgroundImage={bannerImage}
            backgroundSize="cover"
            backgroundPosition="center"
            
        >
            <Box
                position="absolute"
                left="16%"
                zIndex={1}
                cursor={"pointer"}
                overflow="visible"
            >
                <Avatar
                    size="2xl"
                    src={profilePicture}
                    position="relative"
                    bg="white"
                    border="4px solid white"
                    // onClick={(toggleEditPicture)}
                    icon={<Avatar size='2xl'/>}
                />
            </Box>
        </Box>
    )
}

export default ProfileBanner