import { Expense } from "@/app/types/expense";
import { ChevronRightIcon } from "@heroicons/react/24/outline"; 
import Link from "next/link";
// reference point: https://github.com/rmichak/IT431-NextJS-Sample-Courses/blob/main/components/CourseCard.tsx
interface GridProp {
    expenses: Expense[]
}

export default function Grid ({ expenses }: GridProp) {
    return (
        <div className="grid grid-cols-2 gap-2 mt-6">
            {
                expenses.map(expenseItem => {
                    return (
                        <article key={expenseItem.id} className="border-black border-3 h-fit p-3 sm:p-5 flex flex-col w-full rounded-lg">
                            <h2 className="text-lg font-bold underline sm:text-xl md:text-2xl mb-3"><Link href={`/dashboard/expenses/${expenseItem.id}/`}>{expenseItem.name}</Link></h2>
                            <section className="flex flex-col gap-2">
                                <p className="text-xs sm:text-sm md:text-sm">ID: {expenseItem.id}</p>
                                <p className="text-xs sm:text-sm md:text-sm">Date: {expenseItem.createdDate}</p>
                                <p className="text-xs sm:text-sm md:text-sm">Category: {expenseItem.category}</p>
                                <p className="text-xs sm:text-sm md:text-sm">Amount ${expenseItem.amount}</p>
                                    <button className="rounded-sm text-sm py-1.5 sm:py-2 w-full sm:w-30 mt-3 bg-indigo-600 text-white hover:cursor-pointer hover:bg-white hover:border-3 hover:border-black hover:text-black">
                                        <Link className="justify-center gap-2 items-center flex flex-row" href={`/dashboard/expenses/${expenseItem.id}/`}>
                                            View <ChevronRightIcon className="w-5 h-5"/>
                                        </Link>
                                    </button>
                            </section>
                        </article>
                    )
                })
            }
        </div>
    )
}