/* eslint-disable react/prop-types */
import { Box } from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

const ClassLineChart = ({ classPoints }) => {
    // Process the data to group points by date
    const pointsByDate = classPoints.reduce((acc, record) => {
        acc[record.dateCompleted] = (acc[record.dateCompleted] || 0) + record.pointsAwarded;
        return acc;
    }, {});

    // Sort dates in ascending order
    const sortedDates = Object.keys(pointsByDate).sort();

    // Chart data
    const chartData = {
        labels: sortedDates, // X-axis (Dates)
        datasets: [
            {
                label: 'Total Points Earned',
                data: sortedDates.map(date => pointsByDate[date]), 
                borderColor: '#36A2EB',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderWidth: 2,
                tension: 0.4, 
            },
        ],
    };

    // Chart options
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: (context) => ` ${context.raw} points`,
                },
            },
        },
        scales: {
            x: { title: { display: true, text: 'Date' } },
            y: { title: { display: true, text: 'Points' }, beginAtZero: true },
        },
    };

    return (
        <Box w="100%" h="100%">
            <Line data={chartData} options={chartOptions} />
        </Box>
    );
};

export default ClassLineChart;
