export const dynamic = "force-dynamic";
import { Expense } from "@/app/types/expense";
import ExpenseListing from "@/app/components/listings/expenseListing";
import Link from "next/link";
import { TableCellsIcon, QueueListIcon, Squares2X2Icon, PlusCircleIcon } from "@heroicons/react/24/outline"; 
import clientPromise from "@/lib/mongodb";
// notes section
// refactored the code so i get a habit of maing server side rendering, especially for api data and so if the data does not loading up there is a fail safe compoennt when it doesnt load properly
// this helped me undertsand when to use client or server side rendering a lot. 

export default async function ExpensePage() {
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
        
        //setting fecthed data in expense variable for display
        return (
            <div className="h-full bg-white flex flex-col p-3 gap-6">
                {/*Expense List Page Title*/}
                <h1 className="mt-6 mb-2 text-4xl font-bold text-indigo-950">Expense List</h1>
                <ExpenseListing expenses={expensesData}/>
            </div>
        );

    } catch (error) {
        console.log(error);
        return (
            <div className="h-full flex flex-col p-3 gap-6 mt-10">
                {/*Expense List Page Title*/}
                <section className="flex flex-row w-full">
                    <h1 className="mt-6 mb-2 text-4xl font-bold text-indigo-950">Expense List</h1>
                </section>
                <article className="flex flex-col gap-5">
                    {/*Layout Choices To Displaying Content*/}
                    <section className="flex flex-col gap-5">
                        {/*Layout Choices To Displaying Content*/}
                        <section className="flex flex-row gap-5">
                            {/*Display Table Button*/}
                            <div>
                                <button className="w-10 h-10">
                                    <TableCellsIcon/>
                                </button>
                            </div>
                            {/*Display List Button*/}
                            <div>
                                <button className="w-10 h-10">
                                    <QueueListIcon/>
                                </button>
                            </div>
                            {/*Display Grid Button*/}
                            <div>
                                <button className="w-10 h-10">
                                    <Squares2X2Icon/>
                                </button>
                            </div>
                            <button className="rounded-sm text-sm hover:cursor-pointer">
                                <Link className="" href="/dashboard/expenses/add">
                                    <PlusCircleIcon className="w-10 h-10"/> 
                                </Link>
                            </button>
                        </section>
                        <section>
                            <p>There was an error loading up the your expenses...</p>
                        </section>
                    </section>
                </article>
            </div>
        );
    }
}