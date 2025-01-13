import { Box } from '@chakra-ui/react';
import { IoAddOutline } from 'react-icons/io5';

function AddClassButton({ onClick }) {
    return (
        <Box
            p={1}
            bg="#92BFFF"
            position="fixed"
            aria-label="Add Class"
            cursor="pointer"
            borderRadius="full"
            style={{
                position: 'fixed',
                bottom: '40px',
                right: '40px',
                zIndex: 1000,
            }}
            onClick={onClick}
        >
            <IoAddOutline size={34} color="black" />
        </Box>
    );
}

export default AddClassButton;
