"use client";
import { HomeIcon, ChartBarIcon, CurrencyDollarIcon, TableCellsIcon } from "@heroicons/react/24/outline"; 
import Link from "next/link";

export default function Navigation() {
	return (
		<nav className="bg-indigo-600 text-white p-3 sticky top-0 left-0 w-full">
			<div className="flex justify-between items-center">
				{/* App Icon */}
				<div className="flex flex-row gap-2">
					<CurrencyDollarIcon className="w-8 h-8"/>
					<span className="font-bold text-2xl">BK</span>
				</div>
				{/* Navigation Links */}
				<ul className="flex flex-row gap-3">
					<li className="hover:bg-indigo-400 rounded-lg p-1"><Link href="/"><HomeIcon className="w-6 h-6"/></Link></li>
					<li className="hover:bg-indigo-400 rounded-lg p-1"><Link href="/dashboard"><ChartBarIcon className="w-6 h-6"/></Link></li>
					<li className="hover:bg-indigo-400 rounded-lg p-1"><Link href="/dashboard/expenses"><TableCellsIcon className="w-6 h-6"/></Link></li>
				</ul>
			</div>
		</nav>
	);
}