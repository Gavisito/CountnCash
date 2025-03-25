import { Expense } from "@/app/types/expense";
import { ChevronRightIcon } from "@heroicons/react/24/outline"; 
// reference point: https://github.com/rmichak/IT431-NextJS-Sample-Courses/blob/main/components/CourseCard.tsx
// had error with typescript tyty
interface ListProp {
    expenses: Expense[]
}

export default function List ({ expenses }: ListProp) {
    return (
        <div className="flex flex-col gap-8 mt-6 w-full m-auto">
            {
                expenses.map(expenseItem => {
                    return (
                        <details key={expenseItem.id}>
                            <summary className="bg-transparent border-3 border-black rounded-lg p-5 font-bold sm:text-xl text-base flex justify-between items-center gap-3 underline">
                                {expenseItem.name}
                                <button className="rounded-sm text-sm justify-center gap-2 items-center flex flex-row py-2 w-23 bg-indigo-600 text-white">
                                    View <ChevronRightIcon className="w-5 h-5"/>
                                </button>
                            </summary>
                            <ul className="list-inside p-5 text-base">
                                <li className="list-disc">ID: {expenseItem.id}</li>
                                <li className="list-disc">Date: {expenseItem.createdDate}</li>
                                <li className="list-disc">Category: {expenseItem.category}</li>
                                <li className="list-disc">Ammount {expenseItem.amount}</li>
                            </ul>
                        </details>
                    )
                })
            }
        </div>
    )
}