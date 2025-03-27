import { Expense } from "@/app/types/expense";
import ExpenseListing from "@/app/components/listings/expenseListing";
import Link from "next/link";
import { TableCellsIcon, QueueListIcon, Squares2X2Icon, PlusCircleIcon } from "@heroicons/react/24/outline"; 
// notes section
// refactored the code so i get a habit of maing server side rendering, especially for api data and so if the data does not loading up there is a fail safe compoennt when it doesnt load properly
// this helped me undertsand when to use client or server side rendering a lot. 

export default async function ExpensePage() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || '';
        // getting geenral expense data
        const response = await fetch(`${baseUrl}/api/expenses`,{ cache: 'no-store'});

        // storing data into one variable for better readability
        const jsondata = await response.json();

        const expensesData: Expense[] = jsondata.expenses;
        
        //setting fecthed data in expense variable for display
        return (
            <div className="h-full bg-white flex flex-col p-3 gap-6">
                {/*Expense List Page Title*/}
                <h1 className="mt-6 mb-2 text-4xl font-bold">Expense List</h1>
                <ExpenseListing expenses={expensesData}/>
            </div>
        );

    } catch {
        return (
            <div className="h-full bg-white flex flex-col p-3 gap-6">
                {/*Expense List Page Title*/}
                <section className="flex flex-row w-full">
                    <h1 className="mt-6 mb-2 text-4xl font-bold">Expense List</h1>
                    <button className="w-full"> 
                        <Link href="/dashboard/expenses/">
                            <PlusCircleIcon className="w-5 h-5 bg-black"/>
                        </Link>
                    </button>
                </section>
                <article className="flex flex-col gap-5">
                    {/*Layout Choices To Displaying Content*/}
                    <section className="flex flex-row gap-5">
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
                            <div>
                                <button className="rounded-sm text-sm mt-3 hover:cursor-pointer">
                                    <Link className="justify-center gap-2 items-center flex flex-row" href="/dashboard/expense/">
                                        <PlusCircleIcon className="w-10 h-10"/> 
                                    </Link>
                                </button>
                            </div>
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