/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Box, Image } from "@chakra-ui/react";
import { MdCardGiftcard } from "react-icons/md";
import Server from "../../../networking";

const RewardItemImage = ({ rewardId }) => {
    const [imageUrl, setImageUrl] = useState(null);
    const [renderReady, setRenderReady] = useState(false);

    useEffect(() => {
        const fetchRewardImage = async () => {
            try {
                if (rewardId) {
                    const response = await Server.get(`/api/RewardItem/${rewardId}`);

                    // Make sure we access the correct data object
                    if (response.data && response.data.data && response.data.data.imageUrl) {
                        setImageUrl(response.data.data.imageUrl); // Get ImageUrl from response data
                    } else {
                        setImageUrl(null);
                    }
                } else {
                    setImageUrl(null);
                }
            } catch (error) {
                console.error("Error fetching reward image:", error);
                setImageUrl(null);
            }
            setRenderReady(true);
        };

        if (rewardId) fetchRewardImage();
    }, [rewardId]);

    if (!renderReady) return null;

    return (
        <Box display="flex" alignItems="center" justifyContent="center">
            {imageUrl ? (
                <Image
                    src={imageUrl}
                    boxSize="50px"
                    borderRadius="md"
                    alt="Reward Item"
                />
            ) : (
                <Box as={MdCardGiftcard} boxSize="50px" />
            )}
        </Box>
    );
};

export default RewardItemImage;
