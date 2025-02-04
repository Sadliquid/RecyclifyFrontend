import { useState, useEffect } from 'react';
import { Box, HStack, Button, VStack, Text, Image } from '@chakra-ui/react';
import EditAvatarDialog from './EditAvatarDialog';
import EditBannerDialog from './EditBannerDialog';
import { CgProfile } from 'react-icons/cg';
import server from '../../../networking';

function ProfileBanner({ userDetails }) {
    const [isAvatarDialogOpen, setIsAvatarDialogOpen] = useState(false);
    const [isBannerDialogOpen, setIsBannerDialogOpen] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState(null); // State to hold avatar URL
    const [bannerUrl, setBannerUrl] = useState(null); // State to hold banner URL

    // Fetch Avatar
    useEffect(() => {
        const fetchAvatar = async () => {
            try {
                if (userDetails.avatar) {
                    const response = await server.get(`/api/Identity/getAvatar?userId=${userDetails.id}`);
                    if (response.data.avatarUrl) {
                        setAvatarUrl(response.data.avatarUrl); // Set avatar URL to state
                    }
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

    // Fetch Banner
    useEffect(() => {
        const fetchBanner = async () => {
            try {
                if (userDetails.banner) {
                    const response = await server.get(`/api/Identity/getBanner?userId=${userDetails.id}`);
                    if (response.data.bannerUrl) {
                        setBannerUrl(response.data.bannerUrl); // Set banner URL to state
                    }
                } else {
                    setBannerUrl(null); // No banner, set to null to fallback to default banner
                }
            } catch (error) {
                console.error("Error fetching banner:", error);
                setBannerUrl(null); // In case of error, set to default banner
            }
        };
        fetchBanner();
    }, [userDetails.id, userDetails.banner]); // Fetch banner on userDetails change

    console.log(bannerUrl)

    return (
        <HStack
            mx={"auto"}
            w={"70%"}
            alignItems="center"
        >
            <Box
                borderRadius={15}
                width="70%"
                height="20vh"
                display="flex"
                alignItems="center"
                position="relative"
            >
                {/* Render Banner Image if available */}
                {bannerUrl ? (
                    <Image
                        src={bannerUrl}
                        alt="User Banner"
                        objectFit="cover"
                        borderRadius={15}
                        w="100%"
                        h="100%"
                        position="absolute"
                    />
                ) : (
                    <Box
                        backgroundImage={`url('/defaultAccountBanner.png')`}
                        backgroundSize="cover"
                        backgroundPosition="center"
                        backgroundRepeat="no-repeat"
                        w="100%"
                        h="100%"
                        position="absolute"
                        borderRadius={15}
                    />
                )}

                {/* Render Avatar or Default Icon */}
                <Box 
                    position="absolute" 
                    top="50%" 
                    left="10%"
                    transform="translateY(-50%)"
                >
                    {avatarUrl ? (
                        <Image
                            border="2px solid white"
                            src={avatarUrl}
                            boxSize="90px" 
                            borderRadius="full"  
                            alt="User Avatar"
                        />
                    ) : (
                        <CgProfile size="90" />
                    )}
                </Box>
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
