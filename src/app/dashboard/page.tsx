"use client";
import Image from "next/image";
import { useEffect, useState} from "react";
import { Expense } from "@/app/types/expense";
import axios from "axios"
import Link from "next/link";
// notes section
// learning how to assign data type to variables
// useful source for typescript interface setting in useState ensuring right data type: https://codedamn.com/news/reactjs/usestate-hook-typescript
// useful source for axios usage https://www.freecodecamp.org/news/how-to-use-axios-with-react/
// resource for getting keys and values from object: https://www.w3schools.com/jsref/jsref_object_entries.asp

export default function Dashboard() {
    // use state to set expesnse.json into a variable
    const [expenses, setData] = useState<Expense[]>([]);
    // number of expense "rows"
    const [numExpenses, setNumExpenses] = useState<number>(0);
    // adding up all the expense item amounts
    const [sumExpenses, setSumExpenses] = useState<number>(0);
    // getting the popular category
    const [popularCategory, setCategory] = useState<string>("");

    // fetching api data and setting up dynamic dashboard info num expenses, sum of expenses, and popular category
    useEffect(() => {
        async function getExpenses() {
            try {
                // getting geenral expense data
                const response = await axios.get("/api/expenses");

                // storing data into one variable for better readability
                const expensesData: Expense[] = response.data.expenses;

                // setting total number of expense 
                const numExpenses = expensesData.length;
                setNumExpenses(numExpenses); 

                // adding up all the expense item amounts
                let currentSpending = 0;
                expensesData.forEach((expenseItem) => {
                    currentSpending += expenseItem.amount;
                });

                // setting the total spending
                setSumExpenses(currentSpending);

                // counting up category and setting the popular category of spending
                const categoryDict: {[key: string]: number} = {}
                
                expensesData.forEach((expenseItem) => {
                    //sees whether the key exist, if so it add to the key's value count
                    if (categoryDict[expenseItem.category]) {
                        categoryDict[expenseItem.category] += 1;
                    } else { // if its new category then it'll start the count
                        categoryDict[expenseItem.category] = 1;
                    }
                }); 

                let popular = ""; // popular category that will be used to set for display
                let trackMax = 0; // comparision

                //iterate through dict/obj using key and value to set and update new popular category
                Object.entries(categoryDict).forEach(([category, count]) => {
                    if (count > trackMax) { //updates new popular category
                        popular = category;
                        trackMax = count;
                    } 
                });

                //setting the popular category
                setCategory(popular);

                //setting fecthed data in expense variable for display
                setData(expensesData); 

            } catch(error) {
                console.log("Error: " + error);
            }
        }
        
        //starting the process
        getExpenses();
    }, []);
    

    return (
        <div className="min-h-screen bg-white flex flex-col p-3 gap-6">
            {/*page Title*/}
            <h1 className="mt-6 mb-2 text-4xl font-bold">Overview Dashboard</h1>

            {/*Dashboard Content*/}
            <article className="gap-5 flex flex-col-reverse md:flex-col">
                {/*Summary content*/}
                <section className="md:grid md:grid-cols-8 flex flex-col gap-3 text-white">
                    <div className="col-span-2 bg-indigo-600 p-5 rounded-lg">
                        <h2 className="text-xl font-bold">Number of Expenses:</h2>
                        <p className="text-lg">{numExpenses}</p>
                    </div>
                    <div className="col-span-3 bg-indigo-600 p-5 rounded-lg">
                        <h2 className="text-xl font-bold">Sum of Expenses:</h2>
                        <p className="text-lg">${sumExpenses}</p>
                    </div>
                    <div className="col-span-3 bg-indigo-600 p-5 rounded-lg">
                        <h2 className="text-xl font-bold">Most Popular Category:</h2>
                        <p className="text-lg">{popularCategory}</p>
                    </div>
                </section>
                {/*Data Visualization Content*/}
                <section className="sm:grid sm:grid-cols-8 flex flex-col gap-3">
                    {/*Pie Chart*/}
                    <div className="w-full rounded-lg col-start-1 col-end-4">
                        <Image
                            src="/wordStockIMG.jpg"
                            width={800}
                            height={90}
                            priority
                            className="w-full h-full rounded-lg"
                            alt="Microsoft word stock image of accounting documents"
                        />
                    </div>
                    {/*Line Chart*/}
                    <div className="w-full rounded-lg col-start-4 col-end-9">
                        <Image
                            src="/wordStockIMG.jpg"
                            width={800}
                            height={90}
                            priority
                            className="w-full h-full rounded-lg"
                            alt="Microsoft word stock image of accounting documents"
                        />
                    </div>
                </section>
            </article>
            {/*Recemt Expenese Table 10 Items MAXXXX*/}
            <article className="flex flex-col pb-6">
                <h2 className="mb-3 text-3xl font-bold">Recent Expenses</h2>
                <section className="overflow-x-scroll">
                    <table className="w-140 sm:w-full">
                        <thead>
                            <tr>
                                <th className="border-3 border-black bg-indigo-600 text-white font-bold text-start p-2">ID</th>
                                <th className="border-3 border-black bg-indigo-600 text-white font-bold text-start p-2">Name</th>
                                <th className="border-3 border-black bg-indigo-600 text-white font-bold text-start p-2">Amount</th>
                                <th className="border-3 border-black bg-indigo-600 text-white font-bold text-start p-2">Date</th>
                                <th className="border-3 border-black bg-indigo-600 text-white font-bold text-start p-2">Category</th>
                            </tr>
                        </thead>
                        <tbody className="border-2 border-black">
                            {/* Dynamically passing last five expense into the recent expense table */
                                expenses.slice(-5).map(expenseItem => {
                                    return (
                                        <tr key={expenseItem.id}>
                                            <td className="border-3 border-black text-start p-2 underline decoration-indigo-500 decoration-2"><Link href={`/dashboard/expenses/${expenseItem.id}/`}>{expenseItem.id}</Link></td>
                                            <td className="border-3 border-black text-start p-2 underline decoration-indigo-500 decoration-2"><Link href={`/dashboard/expenses/${expenseItem.id}/`}>{expenseItem.name}</Link></td>
                                            <td className="border-3 border-black text-start p-1">${expenseItem.amount}</td>
                                            <td className="border-3 border-black text-start p-2">{expenseItem.createdDate}</td>
                                            <td className="border-3 border-black text-start p-2">{expenseItem.category}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </section>
            </article>
        </div>
    );
}