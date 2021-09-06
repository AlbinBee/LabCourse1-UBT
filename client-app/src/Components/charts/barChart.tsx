import React from 'react'
import { Bar } from 'react-chartjs-2';
import { ICategory } from '../../app/models/category';

interface IProps {
    categories: ICategory[];
}

const BarChart: React.FC<IProps> = ({ categories }) => {
    const data = {
        labels: ['Total Categories'],
        datasets: [
            {
                data: [] as any,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    data.datasets[0].data.push(categories?.length)
    categories.map((category) => (
        data.labels.push(category.title),
        data.datasets[0].data.push(category.events?.length)
    ))

    return (
        <Bar data={data} width={400} height={400} />
    )
}

export default BarChart
