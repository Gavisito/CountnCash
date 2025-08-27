"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Expense } from "@/app/types/expense";
import { useParams } from "next/navigation";
// notes section
// need to convert values from form to do proper number calculation always

export default function EditExpensePage() {
	const router = useRouter();
	const params = useParams();
	const expenseId = params.id && typeof params.id === "string" ? parseInt(params.id, 10) : NaN;
	const [formData, setFormData] = useState<Partial<Expense>>({
		name: "",
		category: "",
		description: "",
		vendor: "",
		taxable: "",
		additionalNotes: "",
		amount: 0,
		createdDate: "",
	});

  	useEffect(() => {
		const fetchExpense = async () => {
			try {
				//const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
				const response = await fetch(`/api/expenses/${expenseId}`);
				if (!response.ok) {
					throw new Error("Failed to fetch expense");
				}

				const expense: Expense = await response.json();
				setFormData(expense);
			} catch (err) {
				console.error("Error fetching expense:", err);
		}};

		if (expenseId) {
			fetchExpense();
		};
  	}, [expenseId]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			//pass all form field and ensured that the amount is in number data type
			const dataToSubmit = {...formData, id: expenseId, amount: Number(formData.amount)};
			//const baseUrl = process.env.NEXT_PUBLIC_APP_URL;  commented on for phone device testing
			const response = await fetch(`/api/expenses/${expenseId}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(dataToSubmit),
			});

			if (!response.ok) {
				throw new Error("Failed to update expense");
			}

			router.back();
		} catch (error) {
			console.error("Error updating expense:", error);
		}
	};

	return (
		<main className=" flex flex-col px-3 py-10 gap-6 w-full md:grid md:grid-cols-6">
			<section className="col-span-2 md:bg-indigo-600 h-full rounded-xl flex md:justify-center md:p-5">
				<h1 className="text-4xl md:text-6xl font-bold text-black md:text-white mt-10">Edit Expense</h1>
			</section>
			<section className="flex flex-col col-span-4">
				<form onSubmit={handleSubmit} className="space-y-8 bg-white rounded-lg">
					<fieldset className="space-y-5">
						<label className="block text-xl">Expense Name
							<input
								id="name"
								name="name"
								type="text"
								required
								value={formData.name || ""}
								onChange={handleChange}
								className="w-full p-4 border-2 rounded-lg text-base"
								placeholder="Enter expense name"
							/>
						</label>
						<label className="block text-xl">Todays Date
							<input
								id="createdDate"
								name="createdDate"
								type="date"
								required
								value={formData.createdDate || ""}
								onChange={handleChange}
								className="w-full p-4 border-2 rounded-lg text-base"
							/>
						</label>
						<label className="block text-xl">Expense Description
							<textarea
								id="description"
								name="description"
								value={formData.description || "No description..."}
								onChange={handleChange}
								rows={6}
								className="w-full p-4 border-2 rounded-lg text-base"
								placeholder="Enter an expense description"
							/>
						</label>
					</fieldset>
					<hr />
					<fieldset className="space-y-6">
						<label className="block text-xl">Amount
							<input
								id="amount"
								name="amount"
								type="number"
								required
								value={formData.amount}
								onChange={handleChange}
								className="w-full p-4 border-2 rounded-lg text-base"
								placeholder="Enter the expense amount"
							/>
						</label>
						<label className="block text-xl">Taxable
							<input
								id="taxable"
								name="taxable"
								type="text"
								value={formData.taxable || ""}
								onChange={handleChange}
								className="w-full p-4 border-2 rounded-lg text-base"
								placeholder="Yes / No"
							/>
						</label>
					</fieldset>
					<hr />
					<fieldset className="space-y-6">
						<label className="block text-xl">Vendor
							<input
								id="vendor"
								name="vendor"
								type="text"
								required
								value={formData.vendor || ""}
								onChange={handleChange}
								className="w-full p-4 border-2 rounded-lg text-base"
								placeholder="Enter expense store / vendor"
							/>
						</label>
						<label className="block text-xl">Category
							<input
								id="category"
								name="category"
								type="text"
								required
								value={formData.category || ""}
								onChange={handleChange}
								className="w-full p-4 border-2 rounded-lg text-base"
								placeholder="Enter expense category"
							/>
						</label>
					</fieldset>
					<hr />
					<fieldset>
						<label className="block text-xl">Additional Notes
							<textarea
								id="additionalNotes"
								name="additionalNotes"
								value={formData.additionalNotes || "No additional notes..."}
								onChange={handleChange}
								rows={6}
								className="w-full p-4 border-2 rounded-lg text-base"
								placeholder="Enter additional notes"
							/>
						</label>
					</fieldset>
					<fieldset className="flex flex-col-reverse sm:grid sm:grid-cols-2 gap-5">
						<button className="w-full bg-white border-2 border-black text-black p-4 rounded-lg text-center" onClick={() => router.back()}>Cancel</button>
						<button type="submit" className="w-full bg-indigo-800 text-white p-4 rounded-lg">Save Changes</button>
					</fieldset>
				</form>
			</section>
		</main>
	);
}