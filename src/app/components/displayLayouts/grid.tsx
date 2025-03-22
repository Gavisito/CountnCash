import { ChevronRightIcon } from "@heroicons/react/24/outline"; 
export default function Grid() {
    return (
        <div className="grid grid-cols-2 gap-2 mt-6">
            <article className="border-black border-2 h-auto p-3 sm:p-5 flex flex-col w-full rounded-lg">
                <h2 className="text-sm font-bold underline sm:text-xl md:text-2xl mb-3">Taco Bamaba Food</h2>
                <section className="flex flex-col gap-2">
                    <p className="text-xs sm:text-sm md:text-sm">ID: 1</p>
                    <p className="text-xs sm:text-sm md:text-sm">Date: March, 22, 2025</p>
                    <p className="text-xs sm:text-sm md:text-sm">Category: Food</p>
                    <p className="text-xs sm:text-sm md:text-sm">Ammount 100</p>
                    <button className="rounded-sm text-sm justify-center items-center flex flex-row py-1 sm:py-2 w-full sm:w-35 mt-2 bg-indigo-600 text-white">
                        View <ChevronRightIcon className="w-5 h-5"/>
                    </button>
                </section>
            </article>
            <article className="border-black border-2 h-auto p-3 sm:p-5 flex flex-col w-full rounded-lg">
                <h2 className="text-sm font-bold underline sm:text-xl md:text-2xl mb-3">Taco Bamaba Food</h2>
                <section className="flex flex-col gap-2">
                    <p className="text-xs sm:text-sm md:text-sm">ID: 1</p>
                    <p className="text-xs sm:text-sm md:text-sm">Date: March, 22, 2025</p>
                    <p className="text-xs sm:text-sm md:text-sm">Category: Food</p>
                    <p className="text-xs sm:text-sm md:text-sm">Ammount 100</p>
                    <button className="rounded-sm text-sm justify-center items-center flex flex-row py-1 sm:py-2 w-full sm:w-35 mt-2 bg-indigo-600 text-white">
                        View <ChevronRightIcon className="w-5 h-5"/>
                    </button>
                </section>
            </article>
            <article className="border-black border-2 h-auto p-3 sm:p-5 flex flex-col w-full rounded-lg">
                <h2 className="text-sm font-bold underline sm:text-xl md:text-2xl mb-3">Taco Bamaba Food</h2>
                <section className="flex flex-col gap-2">
                    <p className="text-xs sm:text-sm md:text-sm">ID: 1</p>
                    <p className="text-xs sm:text-sm md:text-sm">Date: March, 22, 2025</p>
                    <p className="text-xs sm:text-sm md:text-sm">Category: Food</p>
                    <p className="text-xs sm:text-sm md:text-sm">Ammount 100</p>
                    <button className="rounded-sm text-sm justify-center items-center flex flex-row py-1 sm:py-2 w-full sm:w-35 mt-2 bg-indigo-600 text-white">
                        View <ChevronRightIcon className="w-5 h-5"/>
                    </button>
                </section>
            </article>
            <article className="border-black border-2 h-auto p-3 sm:p-5 flex flex-col w-full rounded-lg">
                <h2 className="text-sm font-bold underline sm:text-xl md:text-2xl mb-3">Taco Bamaba Food</h2>
                <section className="flex flex-col gap-2">
                    <p className="text-xs sm:text-sm md:text-sm">ID: 1</p>
                    <p className="text-xs sm:text-sm md:text-sm">Date: March, 22, 2025</p>
                    <p className="text-xs sm:text-sm md:text-sm">Category: Food</p>
                    <p className="text-xs sm:text-sm md:text-sm">Ammount 100</p>
                    <button className="rounded-sm text-sm justify-center items-center flex flex-row py-1 sm:py-2 w-full sm:w-35 mt-2 bg-indigo-600 text-white">
                        View <ChevronRightIcon className="w-5 h-5"/>
                    </button>
                </section>
            </article>
        </div>
    )
}