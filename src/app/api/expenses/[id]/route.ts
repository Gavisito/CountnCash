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