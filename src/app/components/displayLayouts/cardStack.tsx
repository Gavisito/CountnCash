import { ChevronRightIcon } from "@heroicons/react/24/outline"; 
export default function CardStack() {
    return (
        <div className="flex flex-col gap-8 mt-6 w-full m-auto">
            <details>
                <summary className="bg-transparent border-3 border-black rounded-lg p-5 font-bold sm:text-xl text-base flex justify-between items-center gap-3 underline">
                    Taco Bamaba Food
                    <button className="rounded-sm text-sm justify-center gap-2 items-center flex flex-row py-2 w-23 bg-indigo-600 text-white">
                        View <ChevronRightIcon className="w-5 h-5"/>
                    </button>
                </summary>
                <ul className="list-inside p-5 text-base">
                    <li className="list-disc">ID: 1</li>
                    <li className="list-disc">Date: March, 22, 2025</li>
                    <li className="list-disc">Category: Food</li>
                    <li className="list-disc">Ammount 100</li>
                </ul>
            </details>
            <details>
                <summary className="bg-transparent border-3 border-black rounded-lg p-5 font-bold sm:text-xl text-base flex justify-between items-center gap-3 underline">
                    Taco Bamaba Food
                    <button className="rounded-sm text-sm justify-center gap-2 items-center flex flex-row py-2 w-23 bg-indigo-600 text-white">
                        View <ChevronRightIcon className="w-5 h-5"/>
                    </button>
                </summary>
                <ul className="list-inside p-5 text-base">
                    <li className="list-disc">ID: 1</li>
                    <li className="list-disc">Date: March, 22, 2025</li>
                    <li className="list-disc">Category: Food</li>
                    <li className="list-disc">Ammount 100</li>
                </ul>
            </details>
            <details>
                <summary className="bg-transparent border-3 border-black rounded-lg p-5 font-bold sm:text-xl text-base flex justify-between items-center gap-3 underline">
                    Taco Bamaba Food
                    <button className="rounded-sm text-sm justify-center gap-2 items-center flex flex-row py-2 w-23 bg-indigo-600 text-white">
                        View <ChevronRightIcon className="w-5 h-5"/>
                    </button>
                </summary>
                <ul className="list-inside p-5 text-base">
                    <li className="list-disc">ID: 1</li>
                    <li className="list-disc">Date: March, 22, 2025</li>
                    <li className="list-disc">Category: Food</li>
                    <li className="list-disc">Ammount 100</li>
                </ul>
            </details>
        </div>
    )
}