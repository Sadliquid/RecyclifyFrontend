import { useEffect, useState } from "react";
import { Box, Image } from "@chakra-ui/react";
import { CgProfile } from "react-icons/cg";
import server from "../../../networking";

const StudentAvatar = ({ student, size}) => {
    const [avatarUrl, setAvatarUrl] = useState(null);

    useEffect(() => {
        const fetchAvatar = async () => {
            if (!student?.studentID || !student.user.avatar) return;
            try {
                    const response = await server.get(`/api/Identity/getAvatar?userId=${student.studentID}`);
                    if (response.data.avatarUrl) {
                        setAvatarUrl(response.data.avatarUrl);
                    }
            } catch (error) {
                console.error("Error fetching avatar:", error);
            }
        };

        fetchAvatar();
    }, [student?.studentID]);

    return (
        <Box display="flex" alignItems="center" justifyContent="center">
            {avatarUrl ? (
                <Image
                    src={avatarUrl}
                    boxSize={size ? size : "35px"}
                    borderRadius="full"
                    alt="User Avatar"
                />
            ) : (
                <Box as={CgProfile} boxSize={size ? size : "35px"} />
            )}
        </Box>
    );
};

export default StudentAvatar;
