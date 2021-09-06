import React from 'react'
import { Line } from 'react-chartjs-2';
import { ICategory } from '../../app/models/category';
import { IEvent } from '../../app/models/event';

interface IProps {
    events: IEvent[];
    categories: ICategory[];
}
//Make these charts dynamically later...
const AreaChart: React.FC<IProps> = ({ categories, events }) => {
    let noEventsFebruary = 0;
    let noEventsMarch = 1;
    let noEventsJune = 2;
    let noEventsJuly = 1;
    let noEventsAugust = 1;
    let noEventsSeptember = 0;

    const options = {
        ticks: {
            beginAtZero: true,
            stepSize: 1
        },
        elements: {
            line: {
                tension: 0.2
            }
        },
        fill: 'start'
    }
    const data = {
        labels: ['February', 'March', 'June', 'July', 'August', 'September'],
        datasets: [
            {
                label: '# of Posts Monthly',
                data: [noEventsFebruary, noEventsMarch, noEventsJune, noEventsJuly, noEventsAugust, noEventsSeptember],
                backgroundColor: [
                    'rgb(16,156,241, 0.15)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(16, 156, 241, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 2,
            },
        ],
    };

    return (
        <Line data={data} width={445} height={344} options={options} />
    )
}

export default AreaChart
