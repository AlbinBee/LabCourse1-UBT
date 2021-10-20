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
    let noEventsMay = 0;
    let noEventsJune = 0;
    let noEventsJuly = 0;
    let noEventsAugust = 0;
    let noEventsSeptember = 0;
    let noEventsOctober = 0;
    for (let i = 0; i < events.length; i++) {
        const correctDate = events[i].dateCreated.split('-');
        if (correctDate[0] == '2021') {
            if (correctDate[1] == '05') {
                noEventsMay++;
            }
            if (correctDate[1] == '06') {
                noEventsJune++;
            }
            if (correctDate[1] == '07') {
                noEventsJuly++;
            }
            if (correctDate[1] == '08') {
                noEventsAugust++;
            }
            if (correctDate[1] == '09') {
                noEventsSeptember++;
            }
            if (correctDate[1] == '10') {
                noEventsOctober++;
            }
        }
    }

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
        labels: ['May', 'June', 'July', 'August', 'September', 'October'],
        datasets: [
            {
                label: '# of Posts Monthly',
                data: [noEventsMay, noEventsJune, noEventsJuly, noEventsAugust, noEventsSeptember, noEventsOctober],
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
