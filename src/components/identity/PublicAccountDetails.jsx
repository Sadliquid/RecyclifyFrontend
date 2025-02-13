import { Box, Flex, Heading, Text, VStack, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import server from "../../../networking";

function PublicAccountDetails({ userDetails }) {
    const [publicData, setPublicData] = useState(null);
    const [loading, setLoading] = useState(true);
    const userId = userDetails?.id;

    useEffect(() => {
        const fetchPublicProfile = async () => {
            try {
                const response = await server.get(`/api/Identity/getPublicProfileDetails?userId=${userId}`);
                console.log("Response: ",response.data.responseData)

                setPublicData(response.data.responseData);
                setLoading(false);
            } catch (err) {
                setLoading(false);
            }
        };

        if (userId) {
            fetchPublicProfile();
        }
    }, [userId]);

    if (loading) {
        return (
            <Flex justify="center" mt={8}>
                <Spinner size="xl" />
            </Flex>
        );
    }

    const userRole = userDetails.userRole;

    return (
        <Box align="start" flex={1} w={"55%"} mx={"auto"}>
            <VStack align="start" spacing={4} mb={6}>
                <Heading size="md">About Me</Heading>
                <Box width="100%" textAlign={"left"} mb={6}>
                    <Text>
                        {userDetails.aboutMe.trim() === "" 
                            ? "No about me descriptions yet! This user remains mysterious..." 
                            : userDetails.aboutMe}
                    </Text>
                </Box>

                <Flex gap={8} w="100%" mt={8} flexWrap="wrap">
                    {userRole === 'parent' && (
                        <>
                            <DetailItem 
                                label="Child's Name" 
                                value={publicData?.childFName + " " + publicData?.childLName} 
                            />
                            <DetailItem 
                                label="Email" 
                                value={userDetails?.email}
                            />
                            <DetailItem 
                                label="Contact Number" 
                                value={userDetails?.contactNumber}
                            />
                        </>
                    )}

                    {userRole === 'teacher' && (
                        <>
                            <DetailItem 
                                label="Class" 
                                value={publicData?.classNumbers?.join(', ') || 'No classes'} 
                            />
                            <DetailItem 
                                label="Email"   
                                value={userDetails?.email}
                            />
                            <DetailItem 
                                label="Contact Number" 
                                value={userDetails?.contactNumber}
                            />
                        </>
                    )}

                    {userRole === 'student' && (
                        <>
                            <DetailItem 
                                label="Parent's Name" 
                                value={publicData?.parentName || 'N/A'} 
                            />
                            <DetailItem 
                                label="Class" 
                                value={publicData?.className || 'Not enrolled'} 
                            />
                            <DetailItem 
                                label="Teacher" 
                                value={publicData?.teacherName || 'N/A'} 
                            />
                            <DetailItem 
                                label="Total Points" 
                                value={publicData?.totalPoints?.toString() || '0'} 
                            />
                        </>
                    )}
                </Flex>
            </VStack>
        </Box>
    );
}

const DetailItem = ({ label, value }) => (
    <Box flex="1" mb={4}>
        <Text fontSize="sm" color="gray.500" mb={1}>{label}</Text>
        <Text fontSize="md" fontWeight="500">
            {value || 'N/A'}
        </Text>
    </Box>
);

export default PublicAccountDetails;