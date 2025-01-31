import { Box, Grid, Heading } from '@chakra-ui/react';
import BulletinCard from '../../components/parents/BulletinCard';

function ParentsHomepage() {
    const events = [
        {
            title: 'School Play',
            date: '2022-10-10',
            description: 'The school play is a great opportunity for your child to showcase their talents.',
            image: 'https://picsum.photos/id/11/200/300',
        },
        {
            title: 'Science Fair',
            date: '2022-10-15',
            description: 'The science fair is a great opportunity for your child to showcase their talents.',
            image: 'https://picsum.photos/id/11/200/300',
        },
        {
            title: 'Sports Day',
            date: '2022-10-20',
            description: 'The sports day is a great opportunity for your child to showcase their talents.',
            image: 'https://picsum.photos/id/11/200/300',
        },
        {
            title: 'School Trip',
            date: '2022-10-25',
            description: 'The school trip is a great opportunity for your child to showcase their talents.',
            image: 'https://picsum.photos/id/11/200/300',
        },
        {
            title: 'School Assembly',
            date: '2022-10-30',
            description: 'The school assembly is a great opportunity for your child to showcase their talents.',
            image: 'https://picsum.photos/id/11/200/300',
        },
        {
            title: 'School Play',
            date: '2022-10-10',
            description: 'The school play is a great opportunity for your child to showcase their talents.',
            image: 'https://picsum.photos/id/11/200/300',
        }
    ];

    return (
        <Box textAlign="center" fontSize="xl">
            <Heading fontSize="30px" mt={10}>Events Bulletin</Heading>
            <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6} mt={2}>
                {events.map((event, index) => (
                    <BulletinCard
                        key={index}
                        title={event.title}
                        date={new Date(event.date).toLocaleDateString()}
                        description={event.description}
                        image={event.image}
                    />
                ))}
            </Grid>
        </Box>
    );
}

export default ParentsHomepage;