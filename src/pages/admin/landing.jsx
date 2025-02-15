/* eslint-disable react/no-unescaped-entities */
import {
    Box,
    Heading,
    Text,
    Button,
    SimpleGrid,
    Spinner,
  } from "@chakra-ui/react";
  import { useSelector } from "react-redux";
  import { Bar } from "react-chartjs-2";
  import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";
  import { motion } from "framer-motion";
  import { useEffect, useState } from "react";
  import server from "../../../networking";
  
  // Register ChartJS components
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  
  function Dashboard() {
    const { user, loaded, error } = useSelector((state) => state.auth);
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      if (!error && loaded && user && user.userRole === "admin") {
        fetchChartData();
      }
    }, [loaded, error, user]);
  
    const fetchChartData = async () => {
      try {
        setLoading(true);
        const response = await server.get("/api/Recycling");
        const labels = response.data.map((item) => item.classID);
        const points = response.data.map((item) => item.totalPoints);
  
        setChartData({
          labels,
          datasets: [
            {
              label: "Recycling Progress (kg)",
              data: points,
              backgroundColor: "rgba(72, 187, 120, 0.6)",
              borderColor: "rgb(72, 187, 120)",
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
  
    if (!loaded || loading) {
      return (
        <Box
          display="flex"
          flexDir="column"
          justifyContent="center"
          alignItems="center"
          width="100%"
          height="100vh"
        >
          <Spinner />
        </Box>
      );
    }
  
    // Chart options
    const options = {
      responsive: true,
      plugins: {
        legend: { position: "top" },
        title: {
          display: true,
          text: "Weekly Class Recycling Points",
        },
      },
      scales: {
        y: { beginAtZero: true },
      },
    };
  
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box
          p={5}
          minHeight="75vh"
          display="flex"
          flexDirection="column"
          width="100%"
        >
          <Heading mb={5} textAlign="center">
            School's Recycling Progress
          </Heading>
  
          <Box
            flex="1"
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
            maxWidth="1200px" // Ensure the chart doesn’t stretch too much
            margin="0 auto"  // Centers the chart horizontally
          >
            {chartData && (
              <Box width="100%" height="auto">
                <Bar data={chartData} options={options} />
              </Box>
            )}
          </Box>
  
          <SimpleGrid columns={[1, null, 2]} spacing={4} mt={8}>
            <Box borderWidth={1} borderRadius="lg" p={4} m={2}>
              <Heading size="md">User Management</Heading>
              <Text mt={2}>
                View and manage all users in the Recyclify system.
              </Text>
              <Button mt={4} bg={"#4DCBA4"}>
                User Management Screen
              </Button>
            </Box>
            <Box borderWidth={1} borderRadius="lg" p={4} m={2}>
              <Heading size="md">Inventory Management</Heading>
              <Text mt={2}>
                View all rewards offered in the Recyclify program.
              </Text>
              <Button mt={4} bg={"#4DCBA4"}>
                Inventory Management Screen
              </Button>
            </Box>
            <Box borderWidth={1} borderRadius="lg" p={4} m={2}>
              <Heading size="md">System Services</Heading>
              <Text mt={2}>View and manage system services in Recyclify.</Text>
              <Button mt={4} bg={"#4DCBA4"}>
                System Services Screen
              </Button>
            </Box>
            <Box borderWidth={1} borderRadius="lg" p={4} m={2}>
              <Heading size="md">View Contact Questions</Heading>
              <Text mt={2}>Review and respond to user inquiries.</Text>
              <Button mt={4} bg={"#4DCBA4"}>
                Answer Contact Queries
              </Button>
            </Box>
          </SimpleGrid>
        </Box>
      </motion.div>
    );
  }
  
  export default Dashboard;
  