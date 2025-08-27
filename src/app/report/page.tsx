"use client";

import { useEffect, useState } from "react";
import { pdf } from "@react-pdf/renderer";
import ExpensePDFDocument from "@/app/components/report/report";
import { Expense } from "@/app/types/expense";

export default function TaxReportPage() {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    useEffect(() => {
        fetch("/api/expenses")
        .then((res) => res.json())
        .then((data) => setExpenses(Array.isArray(data) ? data : data.expenses));
        
    }, [expenses.length]);

    // Filter by date range
    const filteredExpenses = expenses.filter((exp) => {
        const expDate = new Date(exp.createdDate);
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;

        if (start && expDate < start) return false;
        if (end && expDate > end) return false;
        
        return true;
    });

    const grandTotal = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);

    const handleDownload = async () => {
        const blob = await pdf(<ExpensePDFDocument expenses={filteredExpenses} startDate={startDate} endDate={endDate} />).toBlob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "expense-report.pdf";
        link.click();
        URL.revokeObjectURL(url);
    };

    const dates = expenses.map(exp => new Date(exp.createdDate));
	const earliestDate = dates.length ? new Date(Math.min(...dates.map(date => date.getTime()))) : null;
	const latestDate = dates.length ? new Date(Math.max(...dates.map(date => date.getTime()))) : null;
	const formatDate = (date: Date | null) => date ? date.toLocaleDateString() : "N/A";

    return (
        <div className="font-sans px-4 py-10 w-full text-gray-800">

            <header className="text-center mb-8">
                <h1 className="text-3xl font-bold">Tax Expense Report</h1>
                <p className="text-gray-500">
                {startDate || formatDate(earliestDate)} – {endDate || formatDate(latestDate)} | Generated on {new Date().toLocaleDateString()}
                </p>
            </header>

            <div className="flex flex-row mb-6 justify-center gap-4">
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Start Date</label>
                    <input
                        type="date"
                        className="border rounded px-3 py-2"
                        value={startDate || formatDate(earliestDate)}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">End Date</label>
                    <input
                        type="date"
                        className="border rounded px-3 py-2"
                        value={endDate || formatDate(latestDate)}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                {filteredExpenses.map((exp, idx) => (
                    <div
                    key={exp.id}
                    className={`bg-white rounded-lg p-6 shadow-md border-l-4 ${
                        idx % 3 === 0
                        ? "border-purple-800"
                        : idx % 3 === 1
                        ? "border-purple-600"
                        : "border-purple-300"
                    }`}
                    >
                    <div className="text-gray-500 text-sm">{exp.createdDate}</div>
                        <div className="font-semibold text-lg my-2">{exp.name}</div>
                        <div className="font-bold text-gray-800">${exp.amount.toFixed(2)}</div>
                    </div>
                ))}
            </div>

            <div className="text-right text-xl font-bold mt-10 border-t pt-4 flex justify-between items-center">
                <button onClick={handleDownload} className="px-2 py-2 bg-purple-400 text-white rounded">
                Download PDF
                </button>
                <span>Grand Total: ${grandTotal.toFixed(2)}</span>
            </div>

        </div>
    );
}