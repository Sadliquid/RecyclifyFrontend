import { Box, Heading, Text, Spinner, Card } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BsCheckCircleFill } from 'react-icons/bs';
import { PiWarningCircleFill } from 'react-icons/pi';
import ShowToast from '../../Extensions/ShowToast';
import server from "../../../networking";

function ClaimReward() {
    const [searchParams] = useSearchParams();
    const studentID = searchParams.get('studentID');
    const redemptionID = searchParams.get('redemptionID');
    const [isLoading, setIsLoading] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const redeemReward = async () => {
            try {
                console.log("studentID: ", studentID);
                console.log("redemptionID: ", redemptionID);
                if (studentID == null || redemptionID ==  null) {
                    ShowToast('error', 'Required parameters are missing.');
                }

                const response = await server.get(`/api/student/claim-reward?studentID=${studentID}&redemptionID=${redemptionID}`);

                if (response.status === 200) {
                    setIsSuccess(true);
                    setMessage(response.data.message || 'Reward redeemed successfully!');
                }
            } catch (error) {
                if (error.response && error.response.data && error.response.data.error && typeof error.response.data.error === "string") {
                    if (error.response.data.error.startsWith("UERROR")) {
                        setError(error.response.data.error.substring("UERROR:".length));
                        setIsSuccess(false);
                        return;
                    } else {
                        setError(error.response.data.error.substring("ERROR:".length));
                        setIsSuccess(false);
                        return;
                    }
                }
            } finally {
                setIsLoading(false);
            }
        };

        if (studentID && redemptionID) {
            redeemReward();
        } else {
            setIsLoading(false);
            setError('Required parameters are missing.');
        }
    }, [studentID, redemptionID]);

    return (
        <>
            <Heading fontSize="30px" mt={10}>Claim Reward</Heading>
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="70vh">
                <Box textAlign="center">
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <Card.Root width="320px">
                            <Card.Body gap="2" border="2px solid #4DCBA4" borderRadius="md" p={5}>
                                {isLoading ? (
                                    <Box display="flex" justifyContent="center" alignItems="center">
                                        <Spinner size="xl" />
                                    </Box>
                                ) : isSuccess ? (
                                    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                                        <Text as={BsCheckCircleFill} boxSize={100} color="green.500" mb={5} />
                                        <Text color="green.500" textAlign={"center"}>{message}</Text>
                                    </Box>
                                ) : (
                                    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                                        <Text as={PiWarningCircleFill} boxSize={100} color="orange.400" mb={5} />
                                        <Text fontFamily={"Lilita One"} color="orange.400" textAlign={"center"}>{error}</Text>
                                    </Box>
                                )}
                            </Card.Body>
                        </Card.Root>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default ClaimReward;