import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import server from "../../../networking";
import { Box, Heading, Image, Text } from "@chakra-ui/react";
import { CgProfile } from 'react-icons/cg';

function PublicProfile() {
    const { id } = useParams();
    const [userDetails, setUserDetails] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [bannerUrl, setBannerUrl] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await server.get(`/api/Identity/getUserDetails?userId=${id}`);
                const userData = response.data;
                setUserDetails(userData);

                // Fetch Avatar if it exists
                if (userData.avatar) {
                    const avatarResponse = await server.get(`/api/Identity/getAvatar?userId=${id}`);
                    setAvatarUrl(avatarResponse.data.avatarUrl || null);
                } else {
                    setAvatarUrl(null);
                }

                // Fetch Banner if it exists
                if (userData.banner) {
                    const bannerResponse = await server.get(`/api/Identity/getBanner?userId=${id}`);
                    setBannerUrl(bannerResponse.data.bannerUrl || null);
                } else {
                    setBannerUrl(null);
                }
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };
        fetchUserDetails();
    }, [id]);

    if (!userDetails) {
        return <p>Loading...</p>;
    }

    return (
        <Box
            alignItems="center"
            mt={10}
        >
             <Box
                borderRadius={15}
                mx={"auto"}
                width="60%"
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
                    top="100%" 
                    left="15%"
                    transform="translateY(-45%)"
                >
                    {avatarUrl ? (
                        <Image
                            border="2px solid white"
                            src={avatarUrl}
                            boxSize="130px" 
                            borderRadius="full"  
                            alt="User Avatar"
                        />
                    ) : (
                        <CgProfile size="130" />
                    )}
                </Box>
            </Box>

            <Heading fontSize="40px" mt={6} mb={4}>{userDetails.fName + " " + userDetails.lName}</Heading>

            <Text>{userDetails.userRole.charAt(0).toUpperCase() + userDetails.userRole.slice(1).toLowerCase()}</Text>

            
        </Box>
    );
}

export default PublicProfile;