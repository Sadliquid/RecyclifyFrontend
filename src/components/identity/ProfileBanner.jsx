import React, { useState } from 'react';
import { Box, HStack, Button, VStack } from '@chakra-ui/react';
import { Avatar } from "@/components/ui/avatar";
import EditAvatarDialog from './EditAvatarDialog';
import EditBannerDialog from './EditBannerDialog';

function ProfileBanner() {
    const [isAvatarDialogOpen, setIsAvatarDialogOpen] = useState(false);
    const [isBannerDialogOpen, setIsBannerDialogOpen] = useState(false);

    return (
        <HStack
            mx={"auto"}
            w={"70%"}
            alignItems="center"
        >
            <Box
                borderRadius={15}
                borderWidth={1}
                backgroundImage={`url(/defaultAccountBanner.png)`}
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
                src="/AvatarStudent.png"
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
                        onClick={() => setIsAvatarDialogOpen(true)}
                    >
                        Edit Avatar
                    </Button>

                    <Button 
                        w={"60%"} 
                        borderRadius={30}
                        variant="solid"
                        background="#2D65FF"
                        color={"white"}
                        onClick={() => setIsBannerDialogOpen(true)}
                    >
                        Edit Banner
                    </Button>
                </VStack>
            </Box>

            <EditAvatarDialog isOpen={isAvatarDialogOpen} onClose={() => setIsAvatarDialogOpen(false)} />
            <EditBannerDialog isOpen={isBannerDialogOpen} onClose={() => setIsBannerDialogOpen(false)} />
        </HStack>
    );
}

export default ProfileBanner;