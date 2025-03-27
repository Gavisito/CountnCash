import { Expense } from "@/app/types/expense";
import axios from "axios"
import ExpenseListing from "@/app/components/expenseListing";
import { TableCellsIcon, QueueListIcon, Squares2X2Icon } from "@heroicons/react/24/outline"; 
// notes section
// refactored the code so i get a habit of maing server side rendering, especially for api data and so if the data does not loading up there is a fail safe compoennt to ti

export default async function ExpensePage() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || '';
        // getting geenral expense data
        const response = await axios.get(`${baseUrl}/api/expenses`);
    
        // storing data into one variable for better readability
        const expensesData: Expense[] = response.data.expenses;
            
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
                <h1 className="mt-6 mb-2 text-4xl font-bold">Expense List</h1>
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