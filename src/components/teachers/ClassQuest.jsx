import { Box, Flex, Tabs, Text, Stack, Badge, Button, Progress } from '@chakra-ui/react';
import { FiRefreshCw } from 'react-icons/fi';
import { PiCloverFill } from "react-icons/pi";

function ClassQuest() {
    const quests = [
        {
            title: "Dragon Slayer",
            description: "Defeat the ancient fire dragon in Mount Doom",
            points: 250,
            type: "Combat",
            completed: 0,
            totalAmountToComplete: 1,
        },
        {
            title: "Herbalist's Challenge",
            description: "Collect 15 enchanted mushrooms from the Fae Forest",
            points: 150,
            type: "Gathering",
            completed: 7,
            totalAmountToComplete: 15,
        },
        {
            title: "Artifact Recovery",
            description: "Retrieve the stolen crown from the Bandit King's fortress",
            points: 200,
            type: "Exploration",
            completed: 1,
            totalAmountToComplete: 1,
        },
    ];

    return (
        <Tabs.Content value='Class Quests'>
            <Box w="100%" h="65dvh" p={4} bg="#9F9FF8" borderRadius="xl" boxShadow="lg">
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
                                bg={quest.completed === quest.totalAmountToComplete ? "#C6F6D5" : "#EDEEFC"}
                                borderRadius="xl"
                                transition="all 0.3s ease"
                                opacity={quest.completed === quest.totalAmountToComplete ? 0.7 : 1}
                                _hover={{ transform: 'translateY(-4px)', boxShadow: 'lg' }}
                            >
                                <Stack align="start" gap={2}>
                                    {/* Quest Title and Points */}
                                    <Flex w="100%" justify="space-between" align="center">
                                        <Flex direction="row" align="center" gap={2}>
                                            <Text fontSize="lg" fontWeight="bold" color="black">
                                                {quest.title}
                                            </Text>
                                            <Badge variant="solid" bg="#AEC7ED" color="black" borderRadius="full" px={2} py={1}>
                                                {quest.type}
                                            </Badge>
                                        </Flex>
                                        <Badge variant="solid" bg="white" color="black" borderRadius="full" px={2} py={1}>
                                            {quest.points}
                                            <PiCloverFill boxSize={25} color="#2CD776" />
                                        </Badge>
                                    </Flex>

                                    {/* Quest Description */}
                                    <Text fontSize="sm" color="gray.600">
                                        {quest.description}
                                    </Text>
                                </Stack>

                                {/* Progress Bar */}
                                <Box w="100%" mt={2} textAlign="left">
                                    {quest.completed === quest.totalAmountToComplete ? (
                                        <Text fontSize="sm" color="black" fontWeight="bold">
                                            ✅ Quest Completed!
                                        </Text>
                                    ) : (
                                        <Text fontSize="sm" color="black" fontWeight="bold">
                                            {quest.completed} / {quest.totalAmountToComplete} Completed
                                        </Text>
                                    )}
                                    <Progress.Root w="100%" value={quest.completed} max={quest.totalAmountToComplete} mt={2}>
                                        <Stack direction="row" justify="space-between" align="center">
                                            <Progress.Track  flex="1">
                                                {quest.completed === quest.totalAmountToComplete ? (
                                                    <Progress.Range bg="#2CD776" />
                                                ) : (
                                                    <Progress.Range bg="#6A6AFF" />
                                                )}
                                            </Progress.Track>
                                            <Progress.ValueText>100%</Progress.ValueText>
                                        </Stack>
                                    </Progress.Root>
                                </Box>
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