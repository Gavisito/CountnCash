export const dynamic = "force-dynamic";
import { Expense } from "@/app/types/expense";
import ExpenseListing from "@/app/components/listings/expenseListing";
import Link from "next/link";
import { TableCellsIcon, QueueListIcon, Squares2X2Icon, PlusCircleIcon } from "@heroicons/react/24/outline"; 
import { cookies } from "next/headers";

// notes section
// refactored the code so i get a habit of maing server side rendering, especially for api data and so if the data does not loading up there is a fail safe compoennt when it doesnt load properly
// this helped me undertsand when to use client or server side rendering a lot. 

export default async function ExpensePage() {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore
        .getAll()
        .map(c => `${c.name}=${c.value}`)
        .join(";");
    try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const response = await fetch(`${apiUrl}/api/expenses`, {
                method: "GET",
                cache: "no-store", // no caching = always fresh
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": cookieHeader // forward only to your backend
                },
            });

        if (!response.ok) {
            throw new Error("Failed to fetch expenses");
        }

        const data: { expenses: Expense[] } = await response.json();
        const expensesData = data.expenses;
        
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