/* eslint-disable react/prop-types */
import { Box } from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';
import server from "../../../networking"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function StudentCharts({ studentID }) {
    const [accumulatedLeafs, setAccumulatedLeafs] = useState({});

    const labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    // Prepare data for the chart
    const data = {
        labels,
        datasets: [
            {
                label: 'Accumulated Leafs',
                data: Object.values(accumulatedLeafs),
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
            }
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Progression of Leafs This Week',
            },
        },
    };

    useEffect(() => {
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
                    console.log("Data: ", response.data.data);
                    resolve();
                } else {
                    reject("Unexpected response status: " + response.status);
                }
            })
            .catch(error => {
                const errorMessage = error.response?.data?.error || "An unknown error occurred";
                reject(errorMessage);
                console.error("ERROR: ", error);
            });
        });
    }, [studentID]);

    return (
        <>
            <Box width='100%' height='100%'>
                <Line data={data} options={options} />
            </Box>
        </>
    );
}

export default StudentCharts;
