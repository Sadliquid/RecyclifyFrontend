/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import { Box, Heading, Text, Button, SimpleGrid, Spinner } from '@chakra-ui/react';
import { Toaster } from '@/components/ui/toaster';	
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import ShowToast from '../../Extensions/ShowToast';	
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Dashboard() {
	const { user, loaded, error } = useSelector((state) => state.auth);
	const navigate = useNavigate();
	useEffect(() => {
		if (!error) {
			if (loaded) {
				if (!user) {
					navigate("/auth/login");
					ShowToast("error", "You are not logged in", "Please log in first");
				} else if (user.userRole != "admin") {
					navigate("/auth/login");
					ShowToast("error", "Access denied", "Please log in as a admin");
				}
			}
		} else {
			ShowToast("error", "Error", "An error occured while fetching user state");
		}
	}, [loaded]);
	if (!loaded) {
		return (
			<Box display="flex" flexDir={"column"} justifyContent="center" alignItems="center" width="100%" height="100%">
				<Spinner />
			</Box>
		)
	}
	// Chart data
	const data = {
		labels: ['101', '102', '103', '104', '201', '202', '203', '204', '205', '301', '302'],
		datasets: [
			{
				label: 'Recycling Progress (kg)',
				data: [18, 14, 29, 18, 20, 25, 31, 19, 12, 22, 25],
				backgroundColor: [
					'rgba(159, 122, 234, 0.6)', 'rgba(255, 213, 86, 0.6)', 'rgba(72, 187, 120, 0.6)',
					'rgba(237, 100, 166, 0.6)', 'rgba(0, 0, 0, 0.6)', 'rgba(237, 137, 54, 0.6)',
					'rgba(49, 151, 149, 0.6)', 'rgba(237, 100, 166, 0.6)', 'rgba(113, 128, 150, 0.6)',
					'rgba(49, 151, 149, 0.6)', 'rgba(72, 187, 120, 0.6)'
				],
				borderColor: [
					'rgb(159, 122, 234)', 'rgb(255, 213, 86)', 'rgb(72, 187, 120)',
					'rgb(237, 100, 166)', 'rgb(0, 0, 0)', 'rgb(237, 137, 54)',
					'rgb(49, 151, 149)', 'rgb(237, 100, 166)', 'rgb(113, 128, 150)',
					'rgb(49, 151, 149)', 'rgb(72, 187, 120)'
				],
				borderWidth: 1,
			},
		],
	};

	// Chart options
	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: 'top',
			},
			title: {
				display: true,
				text: 'School\'s Recycling Progress',
				font: {
					size: 16
				}
			},
		},
		scales: {
			y: {
				beginAtZero: true,
				title: {
					display: true,
					text: 'Kilograms (kg)'
				}
			},
			x: {
				title: {
					display: true,
					text: 'Room Number'
				}
			}
		}
	};

	return (
		<>
			<Box p={5}>
				<Heading mb={5}>School's Recycling Progress</Heading>

				{/* Chart */}
				<Box mb={10} h="400px">
					<Bar data={data} options={options} />
				</Box>

				<SimpleGrid columns={[1, null, 2]} spacing={4} mt={8}>
					<Box borderWidth={1} borderRadius="lg" p={4} m={2}>
						<Heading size="md">User Management</Heading>
						<Text mt={2}>View all users on the Recyclifly system and be able to carry out functions to manage users</Text>
						<Button mt={4} colorScheme="teal" background={"white"}>User Management Screen</Button>
					</Box>
					<Box borderWidth={1} borderRadius="lg" p={4} m={2}>
						<Heading size="md">Inventory Management</Heading>
						<Text mt={2}>View all rewards offered in the Recyclifly program.</Text>
						<Button mt={4} colorScheme="teal" background={"white"}>Inventory Management Screen</Button>
					</Box>

					<Box borderWidth={1} borderRadius="lg" p={4} m={2}>
						<Heading size="md">System Services</Heading>
						<Text mt={2}>View all services Recyclifly uses and toggle on and off the service.</Text>
						<Button mt={4} colorScheme="teal" background={"white"}>System Services Screen</Button>
					</Box>

					<Box borderWidth={1} borderRadius="lg" p={4} m={2}>
						<Heading size="md">View Contact Questions</Heading>
						<Text mt={2}>View the questions sent in via the contact form and reply to them</Text>
						<Button mt={4} colorScheme="teal" background={"white"}>Answer Contact Queries</Button>
					</Box>
				</SimpleGrid>
			</Box>

			<Toaster />
		</>
	);
}

export default Dashboard;