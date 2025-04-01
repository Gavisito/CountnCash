"use client";
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Legend, Tooltip} from 'chart.js';
import { Bar } from 'react-chartjs-2';
  
ChartJS.register( CategoryScale, LinearScale, BarElement, Title, Legend, Tooltip);

//notes section
// intersted and fun to pass data into the visualization by mkaing arrays

interface CategoriesProp {
	categories: {[key: string]: number}
}

export default function BarChartComponent({categories}: CategoriesProp) {
	//list of label and values for dynamic update when user add or removes an expense over time
	const categoryLabels = Object.keys(categories);
	const categoryValues = Object.values(categories);
	

	const data = {
		labels: categoryLabels,
		datasets: [
			{
				label: "Number of Expenses",
				data: categoryValues,
				borderColor: '#32127A',
				backgroundColor: [
					'#32174D',
					'#CCCCFF',
				],
				hoverBorderWidth: 2,
				hoverBorderColor: 'black'
			}
		]
	}
	// chart styling for bar chart
	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
		  	legend : {
				display: false
			},
			title: {
				display: true,
				text: 'Expense Categories',
				font: {size: 25},
			},
		},
		//these are place text title for the axis
		scales : {
			x: {
				title: {
					display: true,
					text: 'Exense Categories',
				}
			},
			y: {
				title: {
					display: true,
					text: 'Number of Expenses',
				}
			}
		}
	};
	// using react componet to make bar chart
	return (
		<div className="w-full min-h-125 rounded-lg">
			<Bar data={data} options={options} />
		</div>
	)
}