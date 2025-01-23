import { Box, Heading, Span, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import RewardRedemptionCard from '../../components/Students/RewardRedemptionCard';
import ShowToast from '../../Extensions/ShowToast';
import server from "../../../networking";

function Redemption() {
    const [redeemablePoints, setRedeemablePoints] = useState(null);
    const [rewards, setRewards] = useState(null);

    const { user, loaded, error } = useSelector((state) => state.auth);

    const updateLeafs = (newLeafs) => {
        setRedeemablePoints(newLeafs);
    }

    const fetchLeafs = async (studentID) => {
        try {
            const response = await server.get(`/api/student/get-student-leafs?studentID=${studentID}`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status == 200) {
                setRedeemablePoints(response.data.data);
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error && typeof error.response.data.error === "string") {
                if (error.response.data.error.startsWith("UERROR")) {
                    ShowToast(error.response.data.error.substring("UERROR: ".length));
                } else {
                    ShowToast(error.response.data.error);
                }
            }
        }
    }

    const fetchRewards = async () => {
        try {
            const response = await server.get("/api/student/get-all-rewards", {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status == 200) {
                setRewards(response.data.data);
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error && typeof error.response.data.error === "string") {
                if (error.response.data.error.startsWith("UERROR")) {
                    ShowToast(error.response.data.error.substring("UERROR: ".length));
                } else {
                    ShowToast(error.response.data.error);
                }
            }
        }
    }

    useState(() => {
        if (!error && loaded && user && user.userRole == "student") {
            fetchLeafs(user.id);
        }
    }, [loaded]);

    useState(() => {
        fetchRewards();
    }, []);

    if (!error && loaded && user!= null && rewards != null && redeemablePoints != null) return (
        <Box display="flex" justifyContent="center" flexDir="column" alignItems="center" mt={10}>
            <Heading fontSize="30px" mb={10}>Redeem my leafs</Heading>

            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                backgroundColor="#4DCBA4"
                borderRadius={15}
                p={5}
                mx="auto"
            >
                <Text color="white">
                    You have <Span fontFamily="Lilita One">{redeemablePoints}</Span> redeemable leafs
                </Text>
            </Box>

            <Box
                display="grid"
                gridTemplateColumns="repeat(2, 1fr)"
                gap={6}
                maxWidth="1200px"
                width="100%"
                mt={10}
                px={4}
                mx="auto"
            >
                {rewards.map((reward, index) => (
                    <RewardRedemptionCard
                        key={index}
                        studentID={user.id}
                        reward={reward}
                        updateLeafs={updateLeafs}
                    />
                ))}
            </Box>
        </Box>
    )
}

export default Redemption