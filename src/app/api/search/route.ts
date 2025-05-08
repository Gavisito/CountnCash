import { NextResponse, NextRequest } from "next/server";
import clientPromise from "@/lib/mongodb";
//notes section
//how to get url parameter : https://github.com/vercel/next.js/discussions/47072
// how to find a search term as they write into the searhc bar and case sensitivity removal. 
// This allows allowed my to learn how to to set up an index where it states that it can search thoruhg the documents for specififed data sot of like MYSQL WHERE clause and stuff: https://www.geeksforgeeks.org/search-text-in-mongodb/ 
// learned how to do more with mongodb to remove duplicated data when user search for specified word that has matching when they also click on the checkboxes: https://www.w3schools.com/mongodb/mongodb_query_operators.php 

export async function GET(request: NextRequest) {
	try {
		//allows to get the full url and find the parameter i need to get the name of the expense
		const expenseName = request.nextUrl.searchParams.get('expenseName') || ' '
		const categoryRequest = request.nextUrl.searchParams.getAll('category')

		//sets up mongodb
		const client = await clientPromise;
		const db = client.db("expensesDB");

		//finds all items with the specified word requested into an array for display
		const expenseNames = await db
		.collection("expenses")
		// combining searhc bar and checked boxes queries from the url
		.aggregate([
			{ $match: // only finds what has beeen entered or checked and automatically remove any duplicated data (struggle point manually)

				// ***IMPORTANT NOTE***
				// Need to set up index for name and category so it allows for individual search capabilities to the database;
				// name ->  db.expenses.createIndex({name:"text"})
				// category -> db.expenses.createIndex({category:1});

				// when one or the other is utilized. doesnt require both to be used but can be
				{ $or: [{ $text: { $search: `"${expenseName}"`} }, 
					{ category: { $in: categoryRequest } }
				]}
			}
		]).toArray(); //for standard data passsing to the front end

		if ( !expenseNames ){
			return NextResponse.json({ error: "Failed to retrieve expense." }, { status: 500 });
		}

		return NextResponse.json(expenseNames, { status: 200 });

	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: "Failed to retrieve expense." }, { status: 500 });
	}
}