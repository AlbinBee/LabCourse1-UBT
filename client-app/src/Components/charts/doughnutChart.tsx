import React from 'react'
import { Doughnut } from 'react-chartjs-2';

interface IProps {
    rejected: number;
    pending: number;
    verified: number;
}

const DoughnutChart: React.FC<IProps> = ({ rejected, pending, verified }) => {

    const data = {
        labels: ['Rejected', 'Pending', 'Verified'],
        datasets: [
            {
                label: 'Status of Events',
                data: [rejected, pending, verified],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <Doughnut data={data} width={350} height={300} />
    )
}

export default DoughnutChart
