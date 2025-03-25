"use client";
import Table from "@/app/components/displayLayouts/table";
import Grid from "@/app/components/displayLayouts/grid";
import List from "@/app/components/displayLayouts/list"
import { TableCellsIcon, QueueListIcon, Squares2X2Icon } from "@heroicons/react/24/outline"; 
import { useEffect, useState} from "react";
import { Expense } from "@/app/types/expense";
import axios from "axios"


export default function ExpensePage() {
    // use state to set expesnse.json into a variable
    const [expenses, setData] = useState<Expense[]>([]);

    // dynmaic choice for user to selecte what layout they want by storing string layouttype
    const [layout, setLayout] = useState("Table");

        // fetching api data to pass props in the layouts
    useEffect(() => {
        async function getExpenses() {
            try {
                // getting geenral expense data
                const response = await axios.get("/api/expenses");

                // storing data into one variable for better readability
                const expensesData: Expense[] = response.data.expenses;
                
                //setting fecthed data in expense variable for display
                setData(expensesData); 

            } catch(error) {
                console.log("Error: " + error);
            }
        }
        
        //starting the process
        getExpenses();
    }, []);

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