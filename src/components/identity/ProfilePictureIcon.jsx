/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { logout } from "../../slices/AuthState";
import { Avatar } from "@/components/ui/avatar";
<<<<<<< Updated upstream
import { Button } from "@chakra-ui/react";
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from "@/components/ui/menu"
=======
<<<<<<< HEAD
import { Button, Box, Menu, Image } from "@chakra-ui/react";
import { CgProfile } from "react-icons/cg";
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from "@/components/ui/menu";
import server from "../../../networking";
=======
import { Button } from "@chakra-ui/react";
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from "@/components/ui/menu"
>>>>>>> 8fb4c971fdeb00c161cbc400425e27ae0458174b
>>>>>>> Stashed changes

const ProfilePictureIcon = ({ onLogout }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, loaded, error } = useSelector((state) => state.auth);
    const [avatarUrl, setAvatarUrl] = useState(null);

    useEffect(() => {
        const fetchAvatar = async () => {
            try {
                if (user?.avatar) {
                    const response = await server.get(`/api/Identity/getAvatar?userId=${user.id}`);
                    if (response.data.avatarUrl) {
                        setAvatarUrl(response.data.avatarUrl);
                    }
                } else {
                    setAvatarUrl(null);
                }
            } catch (error) {
                console.error("Error fetching avatar:", error);
                setAvatarUrl(null);
            }
        };
        if (user) fetchAvatar();
    }, [user?.id, user?.avatar]);
    
    const handleViewProfile = () => {
        if (!error && loaded && user) {
            navigate("/identity/myAccount");
        }
    };

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem("jwt");
        onLogout();
    };

    if (!loaded || !user || !user.avatar) {
        return (
<<<<<<< Updated upstream
=======
<<<<<<< HEAD
            <Box 
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                {/* Added boxSize and padding for better control */}
                <Box 
                    as={CgProfile} 
                    boxSize="35px" 
                    onClick={() => navigate("/auth/login")}
                    _hover={{ cursor: "pointer" }}
                />
            </Box>
=======
>>>>>>> Stashed changes
            <Button variant="unstyled" onClick={() => navigate("/auth/login")} backgroundColor={"transparent"}>
                <Avatar name={"Joshua"} src={"https://bit.ly/dan-abramov"} size="sm" cursor="pointer" />
            </Button>
        );
    } else {
        return (
            <MenuRoot>
                <MenuTrigger asChild>
                    <Button
                        variant="unstyled"
                        aria-label="Profile options"
                        onClick={handleProfilePictureClick}
                        backgroundColor={"transparent"}
                    >
                        <Avatar name={"Joshua"} src={"https://bit.ly/dan-abramov"} size="sm" cursor="pointer" />
                    </Button>
                </MenuTrigger>
                <MenuContent>
                    <MenuItem value="view-profile" onClick={handleViewProfile}>
                        View Profile
                    </MenuItem>
                    <MenuItem value="logout" onClick={handleLogout}>
                        Logout
                    </MenuItem>
                </MenuContent>
            </MenuRoot>
>>>>>>> 8fb4c971fdeb00c161cbc400425e27ae0458174b
        );
    }

    return (
        <MenuRoot>
            <MenuTrigger asChild>
                <Button
                    variant="unstyled"
                    aria-label="Profile options"
                    backgroundColor="transparent"
                >
                    <Box display="flex" alignItems="center" justifyContent="center">
                        {avatarUrl ? (
                            <Image
                                src={avatarUrl}
                                boxSize="35px"
                                borderRadius="full"
                                alt="User Avatar"
                            />
                        ) : (
                            <Box 
                                as={CgProfile} 
                                boxSize="10px" 
                                p={2} 
                            />
                        )}
                    </Box>
                </Button>
            </MenuTrigger>
            <MenuContent>
                <MenuItem value="view-profile" onClick={handleViewProfile}>
                    View Profile
                </MenuItem>
                <MenuItem value="logout" onClick={handleLogout}>
                    Logout
                </MenuItem>
            </MenuContent>
        </MenuRoot>
    );
};

export default ProfilePictureIcon;