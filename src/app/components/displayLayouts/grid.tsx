import { Expense } from "@/app/types/expense";
import { ChevronRightIcon } from "@heroicons/react/24/outline"; 
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
                        <article key={expenseItem.id} className="border-black border-3 h-auto p-3 sm:p-5 flex flex-col w-full rounded-lg">
                            <h2 className="text-base font-bold underline sm:text-xl md:text-2xl mb-3">{expenseItem.name}</h2>
                            <section className="flex flex-col gap-2">
                                <p className="text-xs sm:text-sm md:text-sm">ID: {expenseItem.id}</p>
                                <p className="text-xs sm:text-sm md:text-sm">Date: {expenseItem.createdDate}</p>
                                <p className="text-xs sm:text-sm md:text-sm">Category: {expenseItem.category}</p>
                                <p className="text-xs sm:text-sm md:text-sm">Ammount {expenseItem.amount}</p>
                                <button className="rounded-sm text-sm justify-center gap-2 items-center flex flex-row py-2 w-full sm:w-35 mt-2 bg-indigo-600 text-white">
                                    View <ChevronRightIcon className="w-5 h-5"/>
                                </button>
                            </section>
                        </article>
                    )
                })
            }
        </div>
    )
}