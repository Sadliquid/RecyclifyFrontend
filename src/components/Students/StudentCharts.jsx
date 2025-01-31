/* eslint-disable react/prop-types */
import { Box, Text, Spinner } from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';
import ShowToast from '../../Extensions/ShowToast';
import server from "../../../networking"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function StudentCharts({ studentID }) {
    const [accumulatedLeafs, setAccumulatedLeafs] = useState({});

    const labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

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
                    resolve();
                } else {
                    reject("Unexpected response status: " + response.status);
                }
            })
            .catch(error => {
                if (error.response && error.response.data && error.response.data.error && typeof error.response.data.error === "string") {
                    if (error.response.data.error.startsWith("UERROR")) {
                        ShowToast("error", error.response.data.error.substring("UERROR:".length));
                        reject(error.response.data.error.substring("UERROR: ".length));
                    } else {
                        ShowToast("error", error.response.data.error.substring("ERROR:".length));
                        reject("Unknown system error");
                    }
                }
            });
        });
    }, [studentID]);

    if (!studentID || Object.keys(accumulatedLeafs) <= 0) {
        return (
            <Box display="flex" flexDir={"column"} justifyContent={"center"} alignItems="center" width="100%" height="100%">
                <Spinner mb={3} color="#3A9F83" animationDuration="0.5s" css={{ "--spinner-track-color": "colors.gray.200" }} />
                <Text>Getting your info...</Text>
            </Box>
        );
    } else {
        return (
            <>
                <Box width='100%' height='100%'>
                    <Line data={data} options={options} />
                </Box>
            </>
        );
    }
}

export default StudentCharts;
