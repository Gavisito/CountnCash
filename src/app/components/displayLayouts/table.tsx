import { Expense } from "@/app/types/expense"
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
                        <th className="border-3 border-black bg-indigo-600 text-white font-bold text-start p-2">Date</th>
                        <th className="border-3 border-black bg-indigo-600 text-white font-bold text-start p-2">Category</th>
                    </tr>
                </thead>
                <tbody className="border-2 border-black">
                    {
                        expenses.map(expenseItem => {
                            return (
                                <tr key={expenseItem.id}>
                                    <td className="border-3 border-black text-start p-1">{expenseItem.id}</td>
                                    <td className="border-3 border-black text-start p-1">{expenseItem.name}</td>
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