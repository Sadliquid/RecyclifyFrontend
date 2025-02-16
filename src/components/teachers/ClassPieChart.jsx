/* eslint-disable react/prop-types */
import { Box, Flex, Text } from '@chakra-ui/react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useState } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

const ClassPieChart = ({ students }) => {
    // Sort students by total points in descending order
    const sortedStudents = [...students].sort((a, b) => b.totalPoints - a.totalPoints);

    // Extract the top 5 contributors
    const top5Students = sortedStudents.slice(0, 5);

    // Calculate the total points of the remaining students
    const othersTotalPoints = sortedStudents.slice(5).reduce((total, student) => total + student.totalPoints, 0);

    // Initial dataset visibility state
    const [visibility, setVisibility] = useState(Array(top5Students.length + 1).fill(true));

    // Check if all students have zero points and for percentage calculation
    const totalPoints = students.reduce((total, student) => total + student.totalPoints, 0);
    if (totalPoints === 0) {
        return (
            <Flex w="100%" h="100%" align="center" justify="center">
                <Text fontSize="lg" fontWeight="bold" color="gray.500" fontFamily="Sora, sans-serif" mb={10}>
                    There are no contributions yet...
                </Text>
            </Flex>
        );
    }

    // Data for the pie chart
    const chartData = {
        labels: [...top5Students.map((student) => student.user.fName + " "+ student.user.lName), 'Others'],
        datasets: [
            {
                label: 'Contribution Percentage',
                data: visibility.map((visible, index) =>
                    visible
                        ? index < top5Students.length
                            ? ((top5Students[index].totalPoints / totalPoints) * 100).toFixed(2)
                            : ((othersTotalPoints / totalPoints) * 100).toFixed(2)
                        : 0
                ),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
                hoverOffset: 10,
            },
        ],
    };

    const toggleVisibility = (index) => {
        setVisibility((prev) => {
            const newVisibility = [...prev];
            newVisibility[index] = !newVisibility[index];
            return newVisibility;
        });
    };

    const chartOptions = {
        plugins: {
            legend: { display: false }, // Disable default chart legend
            tooltip: {
                titleFont: { size: 10, family: 'Sora, sans-serif' },
                bodyFont: { size: 10, family: 'Sora, sans-serif' },
                callbacks: {
                    label: (context) => `${context.raw}%`,
                },
            },
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <Flex w="100%" h="100%" align="center" justify="flex-start" gap="4" flexDirection="row">
            {/* Pie Chart */}
            <Box w="35%" h="100%">
                <Pie type="pie" data={chartData} options={chartOptions} />
            </Box>

            {/* Custom Legends with Percentage Labels */}
            <Box w="65%">
                <Flex direction="column" gap="2">
                    {chartData.labels.map((label, index) => (
                        <Flex
                            key={index}
                            align="center"
                            gap="2"
                            cursor="pointer"
                            onClick={() => toggleVisibility(index)}
                            justifyContent="space-between"
                        >
                            <Flex direction="row" align="center" gap="2">
                                <Box
                                    w="10px"
                                    h="10px"
                                    bg={visibility[index] ? chartData.datasets[0].backgroundColor[index] : 'gray.300'}
                                    borderRadius="full"
                                    boxShadow="sm"
                                />
                                <Box
                                    fontSize="sm"
                                    fontWeight="bold"
                                    color={visibility[index] ? 'inherit' : 'gray.500'}
                                    fontFamily="Sora, sans-serif"
                                >
                                    {label}
                                </Box>
                            </Flex>
                            {/* Percentage Label */}
                            <Box
                                fontSize="sm"
                                color={visibility[index] ? 'inherit' : 'gray.500'}
                                fontFamily="Sora, sans-serif"
                            >
                                {visibility[index]
                                    ? `${chartData.datasets[0].data[index]}%`
                                    : '0%'}
                            </Box>
                        </Flex>
                    ))}
                </Flex>
            </Box>
        </Flex>

    );
};

export default ClassPieChart;
