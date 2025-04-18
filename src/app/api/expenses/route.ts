import { NextResponse } from "next/server";
import fs from 'fs'
import path from "path"
import { Expense } from "@/app/types/expense";
import { auth } from '@clerk/nextjs/server';

// my notes section:
// attempting to refactor and explore my style
// using fs.promise for async functionality to place read and writing file in the background.
// learning how to assign typescript interface for types handling and consistency
// Useful Source on fs docs: https://nodejs.org/dist/latest-v10.x/docs/api/fs.html

//setting up file that will be read and written to
const filePath = path.join(process.cwd(), "data", "/expenses.json");

//fetching expenses.json data
export async function GET() {
    try {
        //background reading
        const jsonData = await fs.promises.readFile(filePath, "utf-8");

        //Expense[] ensures that an array is expected with correct underlying data types
        const expenses: Expense[] = JSON.parse(jsonData);

        //send success json
        return NextResponse.json({expenses, message: "fectched expenses.json data successful"}, { status: 200 });
    } catch (error) {
        //if json has bad type and other issues
        return NextResponse.json({ error: 'Failed to read expense data' }, {status: 500 });
    }
}

//adding new expenses information into the expense.json
export async function POST(request: Request) {
    try {
        //additional security measure if they were about by pass UI security and throuhg something like Postman
        const { userId }= await auth();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        //incoming expenses postman/form submission expecting a new expense obj to add to json array and enuring field are correct types of data
        const newExpense: Expense = await request.json()

        //fecthing current expense.json array
        const jsonData = await fs.promises.readFile(filePath, "utf-8");
        //Expense[] ensures that an array is expected with correct underlying data types
        const expenses: Expense[] = JSON.parse(jsonData);
        
        //ensuring the id is sequential () previous method didnt consider when record deleted - expense.id + 1
        newExpense.id = expenses.length ? expenses[expenses.length - 1].id + 1 : 1;

        //adding new expense submission into original array
        expenses.push(newExpense);

        //updating the expense.json file by adding new expense information at the end
        //4 spaces is nicer in my opinion. prettier
        await fs.promises.writeFile(filePath, JSON.stringify(expenses, null, 4), "utf-8")

        return NextResponse.json({expenses, message: "expense successfully added"}, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: 'Failed to update expense data' }, {status: 500 });
    }
}

