"use client";
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from 'chart.js';
import { Bar } from 'react-chartjs-2';
  
ChartJS.register( CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BarChartComponent({categories}) {
	const categoryLabels = Object.keys(categories);
	const categoryValues = Object.values(categories);

	const data = {
		labels: categoryLabels,
		datasets: [
			{
				label: "Number of Expenses",
				data: categoryValues,
				borderColor: '#FF0090',
				backgroundColor: [
					'rgb(255, 99, 132, 1)',
					'rgb(54, 162, 235, 1)',
				],
				hoverBorderWidth: 2,
				hoverBorderColor: 'black'
			}
		]
	}

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
		  	legend : {
				display: false
			},
			title: {
				display: true,
				align: 'center',
				text: 'Expense Categories',
				font: { size: 16, weight: "bold" },
				padding: {
					top: 10,
					bottom: 10
				}
			},
		},
		scales : {
			x: {
				title: {
					display: true,
					text: 'Exense Categories',
					font: { size: 16, weight: "bold" },
				}
			},
			y: {
				title: {
					display: true,
					text: 'Number of Expenses',
					font: { size: 16, weight: "bold" },
				}
			}
		}
	};

	return (
		<div className="w-full min-h-100 rounded-lg">
			<Bar data={data} options={options} />
		</div>
	)
}