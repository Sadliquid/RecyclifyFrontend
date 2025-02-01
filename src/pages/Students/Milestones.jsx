import { Box, Heading } from '@chakra-ui/react';
import { motion } from 'framer-motion';

function Milestones() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Box display="flex" justifyContent={"center"} flexDir="column" mt={10}>
                <Heading fontSize="30px">Milestones</Heading>
            </Box>
        </motion.div>
    )
}

export default Milestones