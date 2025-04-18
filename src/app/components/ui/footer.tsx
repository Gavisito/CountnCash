
import { CurrencyDollarIcon } from "@heroicons/react/24/outline"; 
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="flex flex-col w-full h-auto bg-indigo-950 text-white pt-10 pb-4 px-5 gap-7">
            <section className="flex flex-col sm:flex-row justify-between gap-8">
                {/*App Icon Stuff*/}
                <div className="flex flex-row gap-2 items-center">
                    <CurrencyDollarIcon className="w-8 h-8"/>
                    <h2 className="font-bold text-2xl">BK</h2>
                </div>
                {/*Some Quick link For The Footer*/}
                <ul className="flex flex-col gap-3 sm:flex-row text-lg">
                    <li><Link className="border-t-3 p-1 hover:border-t-6" href="/">Home</Link></li>
                    <li><Link className="border-t-3 p-1 hover:border-t-6" href="/dashboard">Dashboard</Link></li>
                    <li><Link className="border-t-3 p-1 hover:border-t-6" href="/dashboard/expenses">Expenses List</Link></li>
                </ul>
			</section>
            {/*Description of The CRUD App*/}
            <p className="w-full sm:w-1/2">
                Bookkeeping App - Track, View, Manage Your Expenses In A Clean, Easy Way
            </p>
            {/*Signature Stuff*/}
            <section className="flex flex-col text-start text-xs">
                <p>Developed by Anthony Gavidia-Vasquez</p>
                <p>Looking for a deeper look?: 
                    <a className="underline" href="https://github.com/Gavisito/CountnCash">GitHub Repository</a>
                </p>
            </section>
        </footer>      
    )
}