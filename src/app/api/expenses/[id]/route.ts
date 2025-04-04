import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { Expense } from "@/app/types/expense";

//notes section
//assumign context is what getss specific information of a url that it is being requested such as specific id as seen below

//setting up file that will be read and written to
const filePath = path.join(process.cwd(), "data", "/expenses.json");

// getting an expense from an id 
export async function GET(request: Request, context: { params: Promise<{id: string}> }) {
	try{
		//getting the id of the expense card that was clicked from url
		const {id} = await context.params;
		//turning it into a number
		const expenseId = parseInt(id, 10);

		if (isNaN(expenseId)) {
			return NextResponse.json({ error: "Invalid expense ID." }, { status: 400 });
		}

		// getting the general expense list
		const jsonData = await fs.promises.readFile(filePath, "utf-8");

		//Expense[] ensures that an array is expected with correct underlying data types
		const expenses: Expense[] = JSON.parse(jsonData);

		//only getting the specific expense with the requested if from the URL
		const expense = expenses.find((expenseItem) => expenseItem.id === expenseId);

		if (!expense) {
			return NextResponse.json({ error: "Expense not found." }, { status: 404 });
		  }

		return NextResponse.json(expense, { status: 200 });

	} catch {
		NextResponse.json({error: "Expense not found or failed to retireve"}, {status: 404})
	}
}

// delete an expense id
export async function DELETE(request: Request, context: { params: Promise<{id: string}> }) {
	try {
		//getting the id of the expense card that was clicked from url
		const {id} = await context.params;
		//turning it into a number
		const expenseId = parseInt(id, 10);

		if (isNaN(expenseId)) {
			return NextResponse.json({ error: "Invalid expense ID." }, { status: 400 });
		}
		
		// getting the general expense list
		const jsonData = await fs.promises.readFile(filePath, "utf-8");

		//Expense[] ensures that an array is expected with correct underlying data types
		const expenses: Expense[] = JSON.parse(jsonData);

		// confirmation if it deleted
		const initialLength = expenses.length;

		//only getting the specific expense with the requested id from the URL to delete using !==
		const expense = expenses.filter((expenseItem) => expenseItem.id !== expenseId);

		if (expense.length === initialLength) {
			return NextResponse.json({ error: "Expense not found." }, { status: 404 });
		}

		await fs.promises.writeFile(filePath, JSON.stringify(expense, null, 4), "utf-8")
		
		return NextResponse.json({ message: `Expense with ID ${expenseId} deleted.` }, { status: 200 });

	} catch (error) {
		console.error("Error deleting Expense:", error);
		return NextResponse.json({ error: "Failed to delete Expense." },{ status: 500 });
	}
}

// updating a expense id information
export async function PUT(request: Request, context: { params: Promise<{id: string}> }) {
	try {
		//getting the id of the expense card that was clicked from url
		const {id} = await context.params;
		//turning it into a number
		const expenseId = parseInt(id, 10);

		if (isNaN(expenseId)) {
			return NextResponse.json({ error: "Invalid expense ID." }, { status: 400 });
		}
		
		const updatedExpense: Partial<Expense> = await request.json();
				
		// getting the general expense list
		const jsonData = await fs.promises.readFile(filePath, "utf-8");

		//Expense[] ensures that an array is expected with correct underlying data types
		const expenses: Expense[] = JSON.parse(jsonData);

		const index = expenses.findIndex((expenseItem) => expenseItem.id === expenseId);
	
		if (index === -1) {
		  return NextResponse.json({ error: "Expense not found." }, { status: 404 });
		}
	
		expenses[index] = { ...expenses[index], ...updatedExpense, id: expenseId };
	
		await fs.promises.writeFile(filePath, JSON.stringify(expenses, null, 4), "utf-8")

		return NextResponse.json(expenses[index], { status: 200 });
	} catch (error) {
		console.error("Error updating expense:", error);
		return NextResponse.json({ error: "Failed to update Expense." }, { status: 500 });
	}

}