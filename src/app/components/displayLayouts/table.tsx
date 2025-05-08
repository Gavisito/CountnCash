import { Expense } from "@/app/types/expense"
import Link from "next/link"
// reference point: https://github.com/rmichak/IT431-NextJS-Sample-Courses/blob/main/components/CourseCard.tsx
interface TableProp {
    expenses: Expense[]
}

export default function Table({ expenses }: TableProp) {
    return (
        <section className="overflow-x-scroll">
            <table className="w-140 sm:w-full">
                <thead>
                    <tr>
                        <th className="border-3 border-black bg-indigo-600 text-white font-bold text-start p-1">ID</th>
                        <th className="border-3 border-black bg-indigo-600 text-white font-bold text-start p-2">Name</th>
                        <th className="border-3 border-black bg-indigo-600 text-white font-bold text-start p-2">Amount</th>
                        <th className="border-3 border-black bg-indigo-600 text-white font-bold text-start p-2">Date</th>
                        <th className="border-3 border-black bg-indigo-600 text-white font-bold text-start p-2">Category</th>
                    </tr>
                </thead>
                <tbody className="border-2 border-black">
                    {
                        expenses?.map(expenseItem => {
                            return (
                                <tr key={expenseItem.id}>
                                    <td className="border-3 border-black text-start p-1 underline decoration-indigo-500 decoration-2"><Link href={`/dashboard/expenses/${expenseItem.id}/`}>{expenseItem.id}</Link></td>
                                    <td className="border-3 border-black text-start p-1 underline decoration-indigo-500 decoration-2"><Link href={`/dashboard/expenses/${expenseItem.id}/`}>{expenseItem.name}</Link></td>
                                    <td className="border-3 border-black text-start p-1">${expenseItem.amount}</td>
                                    <td className="border-3 border-black text-start p-1">{expenseItem.createdDate}</td>
                                    <td className="border-3 border-black text-start p-1">{expenseItem.category}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </section>
    )
}