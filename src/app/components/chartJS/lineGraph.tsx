"use client";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Legend, } from "chart.js";
import { Line } from "react-chartjs-2";
import { Expense } from "@/app/types/expense";

ChartJS.register(CategoryScale, LineElement, LinearScale, PointElement, Title, Legend);

interface ExpenseProp {
	expenses: Expense[]
}

export default function LineGraphComponent({expenses} : ExpenseProp) {
	//list of label and values for dynamic update when user add or removes an expense over time
	const labels: string[] = [];
	const amountList: number[] = [];

	//calculating increments of sum of expense over time and pushing them into the arrays
	let pointAmount = 0;
	expenses.forEach((expenseItem) => {
		labels.push(`ID: ${expenseItem.id}`);
		pointAmount += expenseItem.amount;
		amountList.push(pointAmount); // Add individual amount, not cumulative sum
	});

	  
	const data = {
		labels: labels,
		datasets: [
		  {
			label: 'Sum of Expenses',
			data: amountList,
			borderColor: '#32127A',
			backgroundColor: '#32127A',
		  },
		],
	  };
	  //styling the line graph
	  const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend : {
				display: false,
			},
			title: {
				display: true,
				text: 'Expense Over Time',
				font: {size: 25}
			},
		},
		//placing label tiel for the axis
		scales : {
			x: {
				title: {
					display: true,
					text: 'Expense ID'
				}
			},
			y: {
				title: {
					display: true,
					text: 'Expense Amount'
				}
			}
		},
	};
	// using react chart js component to pass data and setting into the library component to make the line graph 
	return (
		<div className="w-full min-h-125 rounded-lg">
			<Line data={data} options={options} />
		</div>
	)
}