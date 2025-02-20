import { Box, Flex, Text, Button, Heading } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { FiArrowDownRight } from 'react-icons/fi';
import { TbLeaf2 } from 'react-icons/tb';

const MotionBox = motion(Box);
const MotionButton = motion(Button);

function Homepage() {
    const navigate = useNavigate();

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="80vh"
                    mt={10}
                >
                    <Flex
                        align="center"
                        justify="center"
                        height="85vh"
                        width="100vw"
                        bgImage="url('homepageBg.jpeg')"
                        bgSize="cover"
                        borderRadius={"md"}
                    >
                        <MotionBox
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            minH="80vh"
                            bgGradient="linear(to-br, #6366f1 0%, #a855f7 50%, #ec4899 100%)"
                        >
                            <MotionBox
                                bg="whiteAlpha.900"
                                p={8}
                                borderRadius="2xl"
                                boxShadow="2xl"
                                textAlign="center"
                            >
                                <MotionBox
                                    animate={{ y: [-5, 5, -5] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                    display="inline-block"
                                    mb={6}
                                >
                                    <TbLeaf2 size="48px" color="#3BA684" />
                                </MotionBox>
                                <Heading
                                    backgroundColor="#3BA684"
                                    bgClip="text"
                                    fontSize="4xl"
                                    mb={4}
                                >
                                    Welcome to Recyclify
                                </Heading>
                                <Text color="#2E8066" fontSize="lg" mb={6}>
                                    Recyclify today, for a better tomorrow.
                                </Text>
                                <MotionButton
                                    w="100%"
                                    size="lg"
                                    colorScheme="purple"
                                    backgroundColor="#3BA684"
                                    _hover={{ bgGradient: 'linear(to-r, #6366f1, #a855f7)', transform: 'scale(1.02)' }}
                                    _active={{ transform: 'scale(0.98)' }}
                                    onClick={() => navigate("/auth/login")}
                                    rightIcon={<FiArrowDownRight />}
                                    fontWeight="bold"
                                    borderRadius="xl"
                                    py={6}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Get started
                                </MotionButton>
                            </MotionBox>
                        </MotionBox>
                    </Flex>
                </Box>
            </motion.div>
        </>
    );
}

export default Homepage;