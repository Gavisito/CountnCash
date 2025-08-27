import { NextResponse } from "next/server";
//import fs from "fs";
//import path from "path";
import clientPromise from "@/lib/mongodb";
import { Expense } from "@/app/types/expense";
import { auth } from '@clerk/nextjs/server';

//notes section
//assumign context is what getss specific information of a url that it is being requested such as specific id as seen below

//setting up file that will be read and written to
//const filePath = path.join(process.cwd(), "data", "/expenses.json");

// getting an expense from an id 
export async function GET(request: Request, { params }: { params: { id: string } }) {
	try{
		const { id } = await params;
		const expenseId = parseInt(id, 10);

		if (isNaN(expenseId)) {
			return NextResponse.json({ error: "Invalid expense ID." }, { status: 400 });
		}

		// getting the general expense list
		//const jsonData = await fs.promises.readFile(filePath, "utf-8");

		//Expense[] ensures that an array is expected with correct underlying data types
		//const expenses: Expense[] = JSON.parse(jsonData);

		const client = await clientPromise;
		const db = client.db("expensesDB");

		const expense = await db
		.collection("expenses")
		.findOne({id:expenseId}); 

		//only getting the specific expense with the requested if from the URL
		//const expense = expenses.find((expenseItem) => expenseItem.id === expenseId);

		if (!expense) {
			return NextResponse.json({ error: "Expense not found." }, { status: 404 });
		}

		return NextResponse.json(expense, { status: 200 });

	} catch {
		return NextResponse.json({error: "Expense not found or failed to retireve"}, {status: 404})
	}
}

// delete an expense id
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
	try {
		 //additional security measure if they were about by pass UI security and throuhg something like Postman
		const { userId } = await auth();

        if (!userId) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
		//getting the id of the expense card that was clicked from url
		const { id } = params;
		const expenseId = parseInt(id, 10);

		if (isNaN(expenseId)) {
			return NextResponse.json({ error: "Invalid expense ID." }, { status: 400 });
		}
		
		// getting the general expense list
		//const jsonData = await fs.promises.readFile(filePath, "utf-8");

		//Expense[] ensures that an array is expected with correct underlying data types
		//const expenses: Expense[] = JSON.parse(jsonData);

		// confirmation if it deleted
		//const initialLength = expenses.length;

		//only getting the specific expense with the requested id from the URL to delete using !==
		//const expense = expenses.filter((expenseItem) => expenseItem.id !== expenseId);

		//if (expense.length === initialLength) {
		//	return NextResponse.json({ error: "Expense not found." }, { status: 404 });
		//}

		//await fs.promises.writeFile(filePath, JSON.stringify(expense, null, 4), "utf-8")


		const client = await clientPromise;
		const db = client.db("expensesDB");
	
		const deletedExpense = await db.collection("expenses").deleteOne({id: expenseId});
		
		return NextResponse.json({ deletedExpense, message: `Expense with ID ${expenseId} deleted.` }, { status: 200 });

	} catch (error) {
		console.error("Error deleting Expense:", error);
		return NextResponse.json({ error: "Failed to delete Expense." },{ status: 500 });
	}
}

// Updating an expense's information
export async function PUT( request: Request,{ params }: { params: { id: string } }) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const expenseId = parseInt(id, 10);

    if (isNaN(expenseId)) {
      return NextResponse.json({ error: "Invalid expense ID." }, { status: 400 });
    }

    const userRequest: Partial<Expense> = await request.json();
    const client = await clientPromise;
    const db = client.db("expensesDB");

    const expense = await db.collection("expenses").findOne({ id: expenseId });

    if (!expense) {
      return NextResponse.json({ error: "Expense not found." }, { status: 404 });
    }

    const updateInfo: any = { ...expense, ...userRequest };
    delete updateInfo._id; // avoid trying to overwrite MongoDB's _id

    const expenseUpdate = await db
      .collection("expenses")
      .updateOne({ id: expenseId }, { $set: updateInfo });

    return NextResponse.json(expenseUpdate, { status: 200 });
  } catch (error) {
    console.error("Error updating expense:", error);
    return NextResponse.json({ error: "Failed to update Expense." }, { status: 500 });
  }
}