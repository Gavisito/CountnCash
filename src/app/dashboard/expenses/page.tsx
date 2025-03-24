"use client";
import Table from "@/app/components/displayLayouts/table";
import Grid from "@/app/components/displayLayouts/grid";
import List from "@/app/components/displayLayouts/list"
import { TableCellsIcon, QueueListIcon, Squares2X2Icon } from "@heroicons/react/24/outline"; 
import { useState } from "react";


export default function ExpensePage() {
    {/*dynmaic choice for user to selecte what layout they want by storing string layouttype*/}
    const [layout, setLayout] = useState("Table");

    {/*This handles user choice when the button is clicked*/}
    function showSelectedLayout() {
        switch (layout) {
            case "Table": 
                return <Table/>
                
            case "List":
                return <List/>
    
            case "Grid":
                return <Grid/>

            default:
                return <Table/>
        }
    }

    return (
        <div className="min-h-screen bg-white flex flex-col p-3 gap-6">
            {/*Expense List Page Title*/}
            <h1 className="mt-6 mb-2 text-4xl font-bold">Expense List</h1>
            <article className="flex flex-col gap-5">
                {/*Layout Choices To Displaying Content*/}
                <section className="flex flex-row gap-5">
                    {/*Display Table Button*/}
                    <div>
                        <button className="w-10 h-10" onClick={() => setLayout("Table")}>
                            <TableCellsIcon/>
                        </button>
                    </div>
                    {/*Display List Button*/}
                    <div>
                        <button className="w-10 h-10" onClick={() => setLayout("List")}>
                            <QueueListIcon/>
                        </button>
                    </div>
                    {/*Display Grid Button*/}
                    <div>
                        <button className="w-10 h-10" onClick={() => setLayout("Grid")}>
                            <Squares2X2Icon/>
                        </button>
                    </div>
                </section>
                <section>
                    {/* Display table, list stack, or grid layout here dynamically based on user choicing upong clicking buttons*/}
                    {showSelectedLayout()}
                </section>
            </article>
        </div>
    );
}