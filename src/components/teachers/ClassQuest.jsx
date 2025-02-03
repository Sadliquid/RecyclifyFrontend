import { Box, Flex, Tabs, Text, Stack, Badge, Button } from '@chakra-ui/react';
import { FiRefreshCw } from 'react-icons/fi';
import { PiCloverFill } from "react-icons/pi";

function ClassQuest() {
    const quests = [
        {
            title: "Dragon Slayer",
            description: "Defeat the ancient fire dragon in Mount Doom",
            points: 250,
            type: "Combat",
            totalAmountToComplete: 1,
        },
        {
            title: "Herbalist's Challenge",
            description: "Collect 15 enchanted mushrooms from the Fae Forest",
            points: 150,
            type: "Gathering",
            totalAmountToComplete: 15,
        },
        {
            title: "Artifact Recovery",
            description: "Retrieve the stolen crown from the Bandit King's fortress",
            points: 200,
            type: "Exploration",
            totalAmountToComplete: 1,
        },
    ];

    return (
        <Tabs.Content value='Class Quest'>
            <Box w="100%" h="65dvh" p={4} bg="linear-gradient(135deg, #9F9FF8, #6A6AFF)" borderRadius="xl" boxShadow="lg">
                <Box w="100%" maxW="600px" h="100%" p={6} bg="white" borderRadius="xl" boxShadow="2xl" mx="auto">
                    {/* Header with Refresh Button */}
                    <Text fontSize="2xl" fontWeight="extrabold" color="black" flex={1} mb={6}>
                        Class Quests
                    </Text>

                    {/* Quest Cards */}
                    <Stack gap={4} overflowY="auto" h="calc(100% - 60px)" pt={1}>
                        {quests.map((quest, index) => (
                            <Box
                                key={index}
                                w="100%"
                                p={4}
                                bg="#EDEEFC"
                                borderRadius="xl"
                                boxShadow="sm"
                                transition="all 0.3s ease"
                                _hover={{ transform: 'translateY(-4px)', boxShadow: 'lg' }}
                            >
                                <Stack align="start" gap={2}>
                                    {/* Quest Title and Points */}
                                    <Flex w="100%" justify="space-between" align="center">
                                        <Text fontSize="lg" fontWeight="bold" color="black">
                                            {quest.title}
                                        </Text>
                                        <Badge variant="solid" bg="white" color="black" borderRadius="full" px={2} py={1}>
                                        {quest.points} 
                                            <PiCloverFill boxSize={25} color="#2CD776" />
                                        </Badge>
                                    </Flex>

                                    {/* Quest Description */}
                                    <Text fontSize="sm" color="gray.600" lineHeight="tall">
                                        {quest.description}
                                    </Text>
                                </Stack>
                            </Box>
                        ))}

                        {/* Refresh Button */}
                        <Button color="black" bg="#9F9FF8" borderRadius="xl" boxShadow="md" _hover={{ bg: '#6A6AFF' }}>
                            <Stack direction="row" align="center" justify="center">
                                <FiRefreshCw />
                                <Text>Refresh Quests</Text>
                            </Stack>
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </Tabs.Content>
    );
}

export default ClassQuest;