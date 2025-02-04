/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../slices/AuthState";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@chakra-ui/react";
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from "@/components/ui/menu"

const ProfilePictureIcon = ({ onLogout }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, loaded, error } = useSelector((state) => state.auth);

    const handleViewProfile = () => {
        if (!error && loaded && user) {
            navigate("/identity/myAccount");
        }
    };
    
    async function handleProfilePictureClick() {
        if (error || !loaded || !user) {
            navigate("/auth/login");
        }
    }

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('jwt');
        onLogout();
    };


    if (!loaded || !user) {
        return (
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
        );
    }
};

export default ProfilePictureIcon;
