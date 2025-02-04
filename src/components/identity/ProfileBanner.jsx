import { useState, useEffect } from 'react';
import { Box, HStack, Button, VStack, Text } from '@chakra-ui/react';
import { Avatar } from "@/components/ui/avatar";
import EditAvatarDialog from './EditAvatarDialog';
import EditBannerDialog from './EditBannerDialog';
import { CgProfile } from 'react-icons/cg';
import server from '../../../networking';

function ProfileBanner({ userDetails }) {
    const [isAvatarDialogOpen, setIsAvatarDialogOpen] = useState(false);
    const [isBannerDialogOpen, setIsBannerDialogOpen] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState(null); // State to hold avatar URL

    useEffect(() => {
        const fetchAvatar = async () => {
            try {
                if (userDetails.avatar) {
                    const response = await server.get(`/api/Identity/getAvatar?userId=${userDetails.id}`);
                    if (response.data.avatarUrl) {
                        setAvatarUrl(response.data.avatarUrl); // Set avatar URL to state
                    }
                    console.log(response)
                } else {
                    setAvatarUrl(null); // No avatar, set to null to fallback to default icon
                }
            } catch (error) {
                console.error('Error fetching avatar:', error);
                setAvatarUrl(null); // In case of error, set to default icon
            }
        };
        fetchAvatar();
    }, [userDetails.id, userDetails.avatar]); // Fetch avatar on userDetails change

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
                {/* Render Avatar or Default Icon */}
                {avatarUrl ? (
                    <Avatar
                        size="2xl"
                        src={avatarUrl}
                        bg="white"
                        border="4px solid white"
                        ml={10}
                    />
                ) : (
                    <Box ml={10}>
                        <CgProfile size="60" />
                    </Box>
                )}

                <Text
                    position={"absolute"}
                    right={10}
                    fontWeight={"bold"}
                    fontSize={20}
                >
                    {userDetails.userRole}
                </Text>
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

            <EditAvatarDialog userDetails={userDetails} isOpen={isAvatarDialogOpen} onClose={() => setIsAvatarDialogOpen(false)} />
            <EditBannerDialog userDetails={userDetails} isOpen={isBannerDialogOpen} onClose={() => setIsBannerDialogOpen(false)} />
        </HStack>
    );
}

export default ProfileBanner;
