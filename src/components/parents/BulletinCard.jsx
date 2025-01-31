/* eslint-disable react/prop-types */
import { Box, Image, Text, Heading } from '@chakra-ui/react';
import { Button } from '@/components/ui/button';
import { DialogBody, DialogCloseTrigger, DialogContent, DialogHeader, DialogTitle, DialogRoot, DialogTrigger } from '@/components/ui/dialog';

function BulletinCard({ title, date, description, image }) {
    return (
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} position="relative">
            <Image
                src={image}
                alt={title}
                boxSize="150px"
                objectFit="cover"
                borderRadius="md"
                mb={4}
                mx="auto"
            />
            <Heading as="h3" size="md" mb={2}>
                {title}
            </Heading>
            <Text fontSize="sm" mb={2}>
                {date}
            </Text>
            <Text fontSize="xs" mb={4}>{description}</Text>

            <DialogRoot>
                <DialogTrigger asChild>
                    <Button bgColor="#4DCBA4" color="white" fontSize="sm" variant="outline">
                        View
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogCloseTrigger />
                    </DialogHeader>
                    <DialogBody>
                        <Box mb={4}>
                            <Image src={image} alt={title} borderRadius="8px" width="100%" />
                        </Box>
                        <Text fontWeight="bold" textstyle="xl">Date:</Text>
                        <Text>{date}</Text>
                        <Text fontWeight="bold" textstyle="xl">Description:</Text>
                        <Text>{description}</Text>
                    </DialogBody>
                </DialogContent>
            </DialogRoot>
        </Box>
    );
}

export default BulletinCard;