// components/ExpensePDFDocument.tsx
"use client";

import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { Expense } from "@/app/types/expense";

interface Props {
	expenses: Expense[];
	startDate: string;
	endDate: string;
}

const styles = StyleSheet.create({
	page: {
		padding: 40,
		fontSize: 12,
		fontFamily: "Helvetica",
		backgroundColor: "#f9fafb",
	},
	header: {
		marginBottom: 20,
		textAlign: "center",
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 5,
		color: "#1f2937",
	},
	dateRange: {
		fontSize: 12,
		color: "#6b7280",
	},
	expenseCard: {
		borderLeftWidth: 4,
		borderLeftColor: "#5a3bf6",
		borderStyle: "solid",
		borderRadius: 4,
		padding: 10,
		marginBottom: 8,
		backgroundColor: "#ffffff",
	},
	expenseDate: {
		fontSize: 10,
		color: "#6b7280",
		marginBottom: 4,
	},
	expenseName: {
		fontSize: 12,
		fontWeight: "medium",
		color: "#111827",
		marginBottom: 2,
	},
	expenseAmount: {
		fontSize: 12,
		fontWeight: "bold",
		color: "#16a34a",
	},
	totalSection: {
		marginTop: 20,
		paddingTop: 10,
		borderTop: "1pt solid #d1d5db", 
		flexDirection: "row",
		justifyContent: "space-between",
	},
	totalLabel: {
		fontSize: 14,
		fontWeight: "bold",
		color: "#374151", 
	},
	totalValue: {
		fontSize: 14,
		fontWeight: "bold",
		color: "#111827", 
	},
});

export default function ExpensePDFDocument({ expenses, startDate, endDate }: Props) {
	const grandTotal = expenses.reduce((sum, exp) => sum + exp.amount, 0);
	const dates = expenses.map(exp => new Date(exp.createdDate));
	const earliestDate = dates.length ? new Date(Math.min(...dates.map(date => date.getTime()))) : null;
	const latestDate = dates.length ? new Date(Math.max(...dates.map(date => date.getTime()))) : null;
	const formatDate = (date: Date | null) => date ? date.toLocaleDateString() : "N/A";

	return (
		<Document>
			<Page size="A4" style={styles.page}>
				<View style={styles.header}>
					<Text style={styles.title}>Expense Report</Text>
					<Text style={styles.dateRange}>
						{startDate || formatDate(earliestDate)} – {endDate || formatDate(latestDate)} | Generated on {new Date().toLocaleDateString()}
					</Text>
				</View>
	
				{expenses.map((exp) => (
					<View style={styles.expenseCard} key={exp.id}>
						<Text style={styles.expenseDate}>
							{new Date(exp.createdDate).toLocaleDateString()}
						</Text>
						<Text style={styles.expenseName}>{exp.name}</Text>
						<Text style={styles.expenseAmount}>${exp.amount.toFixed(2)}</Text>
					</View>
				))}

				<View style={styles.totalSection}>
					<Text style={styles.totalLabel}>Grand Total</Text>
					<Text style={styles.totalValue}>${grandTotal.toFixed(2)}</Text>
				</View>
			</Page>
		</Document>
	);
}