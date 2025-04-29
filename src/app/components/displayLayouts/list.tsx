import { Expense } from "@/app/types/expense";
import { ChevronRightIcon } from "@heroicons/react/24/outline"; 
import Link from "next/link";
// reference point: https://github.com/rmichak/IT431-NextJS-Sample-Courses/blob/main/components/CourseCard.tsx
// had error with typescript tyty
interface ListProp {
    expenses: Expense[]
}

export default function List({ expenses }: ListProp) {
    return (
        <>
            {
                expenses?.map(expenseItem => {
                    return (
                        <details key={expenseItem.id} className="pb-5">
                            <summary className="bg-transparent border-3 border-black rounded-lg p-5 font-bold sm:text-xl text-base flex justify-between items-center gap-3 underline">
                                {expenseItem.name}
                                    <button className="rounded-sm text-sm py-2 w-25 bg-indigo-600 text-white hover:cursor-pointer hover:bg-white hover:border-3 hover:border-black hover:text-black">
                                        <Link className="justify-center gap-2 items-center flex flex-row" href={`/dashboard/expenses/${expenseItem.id}/`}>
                                            View <ChevronRightIcon className="w-5 h-5"/>
                                        </Link>
                                    </button>
                            </summary>
                            <ul className="list-inside p-5 text-base">
                                <li className="list-disc">ID: {expenseItem.id}</li>
                                <li className="list-disc">Date: {expenseItem.createdDate}</li>
                                <li className="list-disc">Category: {expenseItem.category}</li>
                                <li className="list-disc">Amount: ${expenseItem.amount}</li>
                            </ul>
                        </details>
                    )
                })
            }
        </>
    )
}