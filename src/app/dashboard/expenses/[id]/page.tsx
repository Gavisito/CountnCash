import Image from "next/image";
import { PencilSquareIcon, ChevronLeftIcon } from "@heroicons/react/24/outline"; 
import { Expense } from "@/app/types/expense";
import { notFound } from "next/navigation";
import Link from "next/link";
import DeleteButton from "@/app/components/buttons/deleteButton";
import { SignedIn } from "@clerk/nextjs";
import clientPromise from "@/lib/mongodb";
// notes section
// refactor was interesting was typscirpt params
// cool to move return of webpage layout into try block. this helped with being able to use the expense variable without use usestate which i tried to do initially
// refactored to my kinda of styles with some inpsor from prof: https://github.com/rmichak/IT431-NextJS-Sample-Courses/blob/main/app/courses/%5Bid%5D/page.tsx

interface ExpenseDetailsProps {
    params: {
      id: string;
    };
  }

export default async function DetailPage({ params }: ExpenseDetailsProps) {
    const id = (await params).id;
    const expenseId = parseInt(id, 10);
  
    if (isNaN(expenseId)) {
      notFound();
    }

    // if all is good, shows the layout, if not then the not found oage wwill show
    try {
        const client = await clientPromise;
        const db = client.db("expensesDB");
    
        const expenseDoc = await db
          .collection("expenses")
          .findOne({ id: expenseId });

        const expense: Expense | null = expenseDoc
          ? {
              id: expenseDoc.id,
              name: expenseDoc.name,
              category: expenseDoc.category,
              description: expenseDoc.description,
              amount: expenseDoc.amount,
              vendor: expenseDoc.vendor,
              createdDate: expenseDoc.createdDate,
              taxable: expenseDoc.taxable,
              additionalNotes: expenseDoc.additionalNotes,
            }
          : null;
    
        if (!expense) {
          notFound();
        }

        function setCategoryIMG() {
            if (!expense) {
                return null;
            }
            switch (expense.category) {
                case "Shopping": 
                    return <Image src="/shopping.jpg" width={800} height={100} priority className="w-full h-full col-span-3 rounded-lg" alt="Microsoft word stock image ofshopping image"/>
                    
                case "Car":
                    return <Image src="/car.jpg" width={800} height={100} priority className="w-full h-full col-span-3 rounded-lg" alt="Microsoft word stock image of a car"/>
        
                case "Food":
                    return <Image src="/food.jpg" width={800} height={100} priority className="w-full h-full col-span-3 rounded-lg" alt="Microsoft word stock image of food"/>
    
                case "Utility":
                    return <Image src="/utility.jpg" width={800} height={100} priority className="w-full h-full col-span-3 rounded-lg" alt="Microsoft word stock image of utility by doria morgan"/>
                default:
                    return <Image src="/shopping.jpg" width={800} height={100} priority className="w-full h-full col-span-3 rounded-lg" alt="Microsoft word stock image of shopping image"/>
            }
        }

        return (
            <div className="min-h-screen bg-white flex flex-col">
                <button className="rounded-sm text-sm py-2 px-3 w-30 mt-5 text-black hover:cursor-pointer text-black">
                    <Link className="gap-2 flex flex-row" href={`/dashboard/expenses/`}>
                        <ChevronLeftIcon className="w-5 h-5"/> Go Back
                    </Link>
                </button>
                <article className="flex flex-col px-3 py-3 mt-2 space-y-8">
  
                    <section className="flex flex-col md:grid md:grid-cols-8 gap-5">
                        {setCategoryIMG()}
                        <section className="col-span-5 space-y-5">
                            <section className="flex justify-between items-center">
                                <h1 className="text-2xl sm:text-3xl md:text-5xl underline">{expense.name}</h1>
                                <section className="flex gap-5 items-center">
                                    <SignedIn>
                                        <button className="w-8 h-8 hover: cursor-pointer">
                                            <Link href={`/dashboard/expenses/${expense.id}/edit`}>
                                                <PencilSquareIcon/>
                                            </Link>
                                        </button>
                                    </SignedIn>
                                    <SignedIn>
                                        <DeleteButton expenseId={expense.id}/>
                                    </SignedIn>
                                </section>
                            </section>
                            <section className="grid grid-cols-2 gap-5 text-white font-bold text-sm">
                                <ul className="col-span-1 h-full space-y-5">
                                    <li className="px-3 py-6 bg-indigo-500 rounded-lg">ID: {expense.id}</li>
                                    <li className="px-3 py-6 bg-indigo-500 rounded-lg">Amount: {expense.amount}</li>
                                    <li className="px-3 py-6 bg-indigo-500 rounded-lg">Vendor: {expense.vendor}</li>
                                </ul>
                                <ul className="col-span-1 h-full space-y-5">
                                    <li className="px-3 py-6 bg-indigo-500 rounded-lg">Created Date: {expense.createdDate}</li>
                                    <li className="px-3 py-6 bg-indigo-500 rounded-lg">Category: {expense.category}</li>
                                    <li className="px-3 py-6 bg-indigo-500 rounded-lg">Taxable: {expense.taxable}</li>
                                </ul>
                            </section>
                        </section>
                    </section>
                    <section className=" flex flex-col md:grid sm:grid-cols-2 gap-5 pb-10">
                        <section>
                            <h2 className="text-xl sm:text-3xl underline font-bold">Expense Description:</h2>
                            <p className="text-sm sm:text-lg">{expense.description}</p>
                        </section>
                        <section>
                            <h2 className="text-xl sm:text-3xl underline font-bold">Additional Notes:</h2>
                            <p className="text-sm sm:text-lg">{expense.additionalNotes}</p>
                        </section>
                    </section>
                </article>
            </div>
        );

    } catch {
        // when all else fails for finding an expense :(
        notFound()
    }
}