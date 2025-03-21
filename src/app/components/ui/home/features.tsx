import Link from "next/link";
import Image from "next/image";

export default function Features() {
    return(
        <article className="sm:grid sm:grid-cols-8 flex flex-col gap-4">
            {/*List Three Categories of Feature With Redirect To Pages Accordingly*/}
            <section className="col-start-1 col-end-9 bg-white h-auto mb-4 text-start font-bold place-content-center sm:order-1">
                <h2 className="text-3xl font-bold md:text-5xl">Our Features</h2>
            </section>
            <section className="col-span-3 col-end-9 bg-white h-auto rounded-lg sm:order-3">
                <Image
                    src="/financeVisualizer.jpg"
                    width={800}
                    height={90}
                    className="w-full h-full rounded-lg"
                    alt="Microsoft word stock image of different data vsiualization such as line grah and pie charts"
                />
            </section>
            {/*Dashboard Page Summary*/}
            <section className="col-start-1 col-end-6 h-auto bg-slate-600 rounded-lg p-5 sm:order-2 space-y-3">
                <h2 className="text-2xl font-bold text-white md:text-4xl">A Glance of Your Finances</h2>
                <p className="text-base text-white md:text-xl">
                    In the dashboard, you can see a summary of finances with:
                </p>
                <ul className="md:text-lg text-white list-disc list-inside">
                    <li>Charts</li>
                    <li>Key Points</li>
                    <li>Recently Added Expenses</li>
                </ul>
                <Link href="/dashboard">
                    <button className="mt-3 px-4 py-2 text-white text-base rounded-lg bg-transparent border-white border-2 hover:text-black hover:bg-white">
                        View Dashboard
                    </button>
                </Link>
            </section>
            <section className="col-span-3 col-start-1 bg-white h-auto rounded-lg sm:order-4">
                <Image
                    src="/expenseExpert.jpg"
                    width={800}
                    height={200}
                    className="w-full h-full rounded-lg"
                    alt="Microsoft word stock image of a man looking a computer with a financial dashboard"
                />
            </section>
            {/*Expense List Page Summary*/}
            <section className="col-span-5 col-start-4 bg-slate-500 h-auto rounded-lg p-5 sm:order-5 space-y-3">
                <h2 className="text-2xl font-bold text-white md:text-4xl">Manage Your Expenses</h2>
                <p className="text-base text-white md:text-xl">
                    On the expense list page, you can view, filter and manage all of your expenses in a table and grid user interface.
                    This is also the place where you can add and delete expenses.
                </p>
                <Link href="/dashboard/expenses">
                    <button className="mt-3 px-4 py-2 text-white text-base rounded-lg bg-transparent border-white border-2 hover:text-black hover:bg-white">
                        Manage Expenses
                    </button>
                </Link>
            </section>
            <section className="col-span-3 col-end-9 bg-white h-auto rounded-lg sm:order-7">
                <Image
                    src="/editExpense.jpg"
                    width={800}
                    height={90}
                    className="w-full h-full rounded-lg"
                    alt="Microsoft word stock image of person typing on thier laptop"
                />
            </section>
            {/*Mentioning The U and D of CRUD (Updating and Deleting)*/}
            <section className="col-start-1 col-end-6 h-auto bg-slate-400 rounded-lg p-5 sm:order-6 space-y-3">
                <h2 className="text-2xl font-bold text-white md:text-4xl">View and Refine Your Expenses</h2>
                <p className="text-base text-white md:text-xl">
                    In the expense detail page, you can read and modify (edit and delete) the information fields of a specific expense you previously added to ensure everything is accuracte to
                    your knowledge.
                </p>
                <Link href="/dashboard/expenses">
                    <button className="mt-3 px-4 py-2 text-white text-base rounded-lg bg-transparent border-white border-2 hover:text-black hover:bg-white">
                        Refine Expenses
                    </button>
                </Link>
            </section>
        </article>
    )
}