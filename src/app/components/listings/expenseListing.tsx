"use client";
import { Expense } from "@/app/types/expense";
import { useState } from "react";
import Table from "@/app/components/displayLayouts/table";
import Grid from "@/app/components/displayLayouts/grid";
import List from "@/app/components/displayLayouts/list"
import Link from "next/link";
import { TableCellsIcon, QueueListIcon, Squares2X2Icon, PlusCircleIcon } from "@heroicons/react/24/outline"; 
import { SignedIn, SignedOut } from "@clerk/nextjs";

// notes section:
// componentize becuase i was thinking of placing this into the dash board page and habits of separating api and interactivity compoenents

interface expenseProps {
    expenses: Expense[]
}
export default function ExpenseListing({expenses}: expenseProps) {

    // dynmaic choice for user to selecte what layout they want by storing string layouttype
    const [layout, setLayout] = useState("");

    // This handles user choice when the button is clicked
    function showSelectedLayout() {
        switch (layout) {
            case "Table": 
                return <Table expenses={expenses}/>
                
            case "List":
                return <List expenses={expenses}/>
    
            case "Grid":
                return <Grid expenses={expenses}/>

            default:
                return <Table expenses={expenses}/>
        }
    }

    return (
        <div className="h-full flex flex-col gap-6 mb-15">
            <article className="flex flex-col gap-3">
                {/*Layout Choices To Displaying Content*/}
                <section className="flex flex-row gap-5">
                    {/*Display Table Button*/}
                    <div>
                        <button className="w-10 h-10 hover:cursor-pointer" onClick={() => setLayout("Table")}>
                            <TableCellsIcon/>
                        </button>
                    </div>
                    {/*Display List Button*/}
                    <div>
                        <button className="w-10 h-10 hover:cursor-pointer" onClick={() => setLayout("List")}>
                            <QueueListIcon/>
                        </button>
                    </div>
                    {/*Display Grid Button*/}
                    <div>
                        <button className="w-10 h-10 hover:cursor-pointer" onClick={() => setLayout("Grid")}>
                            <Squares2X2Icon/>
                        </button>
                    </div>
                    {/*Only will pop up if they are logged into an account*/}
                    <SignedIn>
                        <button className="w-10 h-10 hover:cursor-pointer">
                            <Link href="/dashboard/expenses/add">
                                <PlusCircleIcon/> 
                            </Link>
                        </button>
                    </SignedIn>
                </section>
                <section>
                    {/* Display table, list stack, or grid layout here dynamically based on user choicing upong clicking buttons*/}
                    {showSelectedLayout()}
                </section>
            </article>
        </div>
    );
}