import Link from "next/link"

export default function FAQ() {
    return (
        <article className="flex flex-col gap-6 pb-6">
            <h2 className="text-3xl font-bold md:text-5xl">FAQ</h2>
            <section className="flex flex-col gap-5">
                {/*Section Discussing The Purpose and Some Implementation That Went INto This Project*/}
                <details>
                    <summary className="bg-transparent border-black border-3 p-5 rounded-lg font-bold text-lg">How Does The Bookkeeping Application Work?</summary>
                    <p className="bg-white p-3 text-base sm:text-xl">
                        This application has 4 functionalities: Create, Read, Update, and Delete your expenses. Creating and Deleting rows of expenses can be done in the 
                        <Link className="underline" href="/dashboard/expenses"> Expense List Page</Link>. If you want to update any fields on information of an expense, you will simply click on an
                        expense of your choosing, then, find and click the field you want update, fill out the form and click submit and BOOM! All updated.
                    </p>
                    <p className="bg-white p-3 text-base sm:text-xl">
                        Another neat feature, I think youll love is being able to change the viewing of the expense list page. The table is the default, but if you click on 
                        the icon that looks like a bookshelf, youll get a card stack, clicking on the window icon will display a 2x2 grid view of your expenses.
                    </p>
                    <p className="bg-white p-3 text-base sm:text-xl">
                        Lastly, the <Link href="/dashboard">Overview Dashboard</Link>, I have integrated a Chart.js to provide a Data visualization to help you see
                        what categories you tend to spend your money on, sum of all expenses, number of expenses, a month total expense, popular expense category, and lastly
                        your recent 10 expenses.
                    </p>
                    <p className="bg-white p-3 text-base sm:text-xl">
                        I hope you have enjoyed the hard work I have put into this application.
                    </p>
                </details>
                {/*Mentioning One Minor Feature I Want To Try Out*/}
                <details>
                    <summary className="bg-transparent border-black border-3 p-5 rounded-lg font-bold text-lg">Can I Categorize My Expenses?</summary>
                    <p className="bg-white p-3 text-base sm:text-xl">
                        Yes, you can enter a category label of your choosing when you are interacting with the submission form!
                    </p>
                </details> 
                {/*Mentioning This is Intended For A Class Project, But May Expanded Outside Of Class Just For Fun If I See Anything Worth Creating*/}
                <details>
                    <summary className="bg-transparent border-black border-3 p-5 rounded-lg font-bold text-lg">Is this a commercial product? Do I Have to pay to use it?</summary>
                    <p className="bg-white p-3 text-base sm:text-xl">
                        No! This is a free application made for my IT-431 class project. I would love feedback if you happen to stumble upon this GitHub Repo / Application
                    </p>
                </details>
            </section>
        </article>
    )
}