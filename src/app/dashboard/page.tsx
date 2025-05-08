export const dynamic = "force-dynamic";
import Image from "next/image";
import { Expense } from "@/app/types/expense";
import ExpenseListing from "@/app/components/listings/expenseListing";
import BarChartComponent from "@/app/components/chartJS/barChart";
import LineGraphComponent from "@/app/components/chartJS/lineGraph";
import clientPromise from "@/lib/mongodb";
// notes section
// learning how to assign data type to variables
// useful source for typescript interface setting in useState ensuring right data type: https://codedamn.com/news/reactjs/usestate-hook-typescript
// resource for getting keys and values from object: https://www.w3schools.com/jsref/jsref_object_entries.asp
// refactor to make it habit of making api call in the server and error handling when it does not load
// also notice on client side, it called the api twice on previous and this solution did it once which is interesting

export default async function Dashboard() {
    // fetching api data and setting up dynamic dashboard info num expenses, sum of expenses, and popular category
    try {
        const client = await clientPromise;
        const db = client.db("expensesDB");
        const expensesData: Expense[] = (await db.collection("expenses").find({}).toArray()).map((doc) => ({
            id: parseInt(doc.id.toString(), 10),
            name: doc.name,
            category: doc.category,
            description: doc.description,
            amount: doc.amount,
            date: doc.date,
            vendor: doc.vendor || "",
            taxable: doc.taxable || false,
            additionalNotes: doc.additionalNotes || "",
            createdDate: doc.createdDate || new Date(),
        }));

        const allExpenses = [...expensesData]
        
        // setting total number of expense 
        const numExpenses = expensesData.length;

        // adding up all the expense item amounts
        let currentSpending = 0;
        expensesData.forEach((expenseItem) => {
            currentSpending += expenseItem.amount;
        });

        // counting up category and setting the popular category of spending
        const categoryDict: {[key: string]: number} = {}
        
        expensesData.forEach((expenseItem) => {
            //sees whether the key exist, if so it add to the key's value count
            if (categoryDict[expenseItem.category as string]) {
                categoryDict[expenseItem.category as string] += 1;
            } else { // if its new category then it'll start the count
                categoryDict[expenseItem.category as string] = 1;
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

        const recentExpenses = expensesData.splice(-5)

        return (
            <div className="h-full flex flex-col p-3 gap-6">
                {/*page Title*/}
                <h1 className="mt-6 mb-2 text-4xl font-bold text-indigo-950">Overview Dashboard</h1>

                {/*Dashboard Content*/}
                <article className="gap-10 flex flex-col">
                    {/*Summary content*/}
                    <section className="md:grid md:grid-cols-8 flex flex-col gap-3 text-white">
                        <div className="col-span-2 bg-indigo-900 p-5 rounded-lg">
                            <h2 className="text-xl font-bold">Number of Expenses:</h2>
                            <p className="text-lg">{numExpenses}</p>
                        </div>
                        <div className="col-span-3 bg-indigo-900 p-5 rounded-lg">
                            <h2 className="text-xl font-bold">Sum of Expenses:</h2>
                            <p className="text-lg">${currentSpending}</p>
                        </div>
                        <div className="col-span-3 bg-indigo-900 p-5 rounded-lg">
                            <h2 className="text-xl font-bold">Most Popular Category:</h2>
                            <p className="text-lg">{popular}</p>
                        </div>
                    </section>
                    {/*Data Visualization Content*/}
                    <section className="md:grid md:grid-cols-8 flex flex-col gap-5">
                        <div className="w-full rounded-lg md:col-start-1 md:col-end-5 border-3 border-black rounded-lg p-3">
                            <LineGraphComponent expenses={allExpenses}/>
                        </div>
                        <div className="w-full rounded-lg md:col-start-5 md:col-end-9  border-3 border-black rounded-lg p-3">
                            <BarChartComponent categories={categoryDict}/>
                        </div>
                    </section>
                </article>
                {/*Recemt Expenese Table 10 Items MAXXXX*/}
                <article className="flex flex-col pb-6 h-full">
                    <h2 className="mb-3 text-3xl font-bold">Recent Expenses</h2>
                    <ExpenseListing expenses={recentExpenses}/>
                </article>
            </div>
        );

    } catch(error) {
        console.log("Error: " + error);
        return (
            <div className="h-full bg-white flex flex-col p-3 gap-6">
                {/*page Title*/}
                <h1 className="mt-6 mb-2 text-4xl font-bold">Overview Dashboard</h1>

                {/*Dashboard Content*/}
                <article className="gap-5 flex flex-col-reverse md:flex-col">
                    {/*Summary content*/}
                    <section className="md:grid md:grid-cols-8 flex flex-col gap-3 text-white">
                        <div className="col-span-2 bg-indigo-600 p-5 rounded-lg">
                            <h2 className="text-xl font-bold">Number of Expenses:</h2>
                            <p className="text-lg">Error Loading...</p>
                        </div>
                        <div className="col-span-3 bg-indigo-600 p-5 rounded-lg">
                            <h2 className="text-xl font-bold">Sum of Expenses:</h2>
                            <p className="text-lg">Error Loading...</p>
                        </div>
                        <div className="col-span-3 bg-indigo-600 p-5 rounded-lg">
                            <h2 className="text-xl font-bold">Most Popular Category:</h2>
                            <p className="text-lg">Error Loading...</p>
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
                    <h2 className="mb-3 text-3xl font-bold text-indigo-950">Recent Expenses</h2>
                    <section><p>Error loading recent expenses</p></section>
                </article>
            </div>
        )
    }
}