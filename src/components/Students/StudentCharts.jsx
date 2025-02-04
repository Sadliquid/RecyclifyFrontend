/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Box, Text, Spinner } from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ShowToast from '../../Extensions/ShowToast';
import server from "../../../networking"

// Register Chart.js components with Filler plugin
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

function StudentCharts({ studentID }) {
    const { user, loaded, error } = useSelector((state) => state.auth);
    const [accumulatedLeafs, setAccumulatedLeafs] = useState({});

    const labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    // Gradient fill function
    const gradientFill = (context) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(54, 162, 235, 0.6)');
        gradient.addColorStop(1, 'rgba(54, 162, 235, 0)');
        return gradient;
    };

    const data = {
        labels,
        datasets: [
            {
                label: 'Accumulated Leafs',
                data: Object.values(accumulatedLeafs),
                borderColor: '#36A2EB',
                backgroundColor: gradientFill,
                borderWidth: 3,
                tension: 0.4,
                pointRadius: 5,
                pointBackgroundColor: '#36A2EB',
                pointBorderColor: '#fff',
                pointHoverRadius: 8,
                fill: true,
            }
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    font: {
                        size: 12,
                        family: 'Sora, sans-serif',
                        weight: 'bold',
                    },
                    color: '#4A5568',
                },
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleFont: { size: 12, family: 'Sora, sans-serif' },
                bodyFont: { size: 12, family: 'Sora, sans-serif' },
                bodyColor: '#fff',
                titleColor: '#fff',
                displayColors: false,
                callbacks: {
                    label: (context) => `${context.raw} Leafs`,
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Day of Week',
                    font: { size: 12, family: 'Sora, sans-serif', weight: 'bold' },
                    color: '#4A5568',
                },
                grid: {
                    display: false,
                },
                ticks: {
                    font: { size: 12, family: 'Sora, sans-serif' },
                    color: '#718096',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Leafs',
                    font: { size: 12, family: 'Sora, sans-serif', weight: 'bold' },
                    color: '#4A5568',
                },
                grid: {
                    color: '#E2E8F0',
                    borderDash: [5],
                },
                ticks: {
                    font: { size: 12, family: 'Sora, sans-serif' },
                    color: '#718096',
                },
                beginAtZero: true,
            },
        },
        animation: {
            duration: 1500,
            easing: 'easeInOutQuart',
        },
    };

    useEffect(() => {
        if (!error && loaded && user && user.userRole == "student") {
            if (!studentID) return;

            new Promise((resolve, reject) => {    
                server.get(`/api/student/get-student-chart-statistics?studentID=${studentID}`, {
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                .then(response => {
                    if (response.status === 200) {
                        setAccumulatedLeafs(response.data.data);
                        resolve();
                    } else {
                        reject("Unexpected response status: " + response.status);
                    }
                })
                .catch(error => {
                    if (error.response?.data?.error) {
                        const errorMessage = error.response.data.error.replace(/^(U?ERROR:?\s*)/i, '');
                        ShowToast("error", errorMessage);
                        reject(errorMessage);
                    }
                });
            });
        }
    }, [studentID]);

    if (!studentID || Object.keys(accumulatedLeafs).length <= 0) {
        return (
            <Box display="flex" flexDir={"column"} justifyContent={"center"} alignItems="center" width="100%" height="100%">
                <Spinner mb={3} color="#3A9F83" animationDuration="0.5s" css={{ "--spinner-track-color": "colors.gray.200" }} />
                <Text>Getting your info...</Text>
            </Box>
        );
    }

    return (
        <Box width='100%' height='100%'>
            <Line data={data} options={options} />
        </Box>
    );
}

export default StudentCharts;