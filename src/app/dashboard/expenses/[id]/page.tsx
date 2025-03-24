import Image from "next/image";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline"; 

export default function DetailPage() {
    return (
        <div className="min-h-screen bg-white flex flex-col gap-10">
            <article className="flex flex-col px-3 pt-6 pb-10 space-y-6">
                <section className="flex justify-between items-center md:hidden">
                    <h1 className="text-2xl sm:text-3xl md:text-5xl underline">Expense Name</h1>
                    <section className="flex gap-5 items-center">
                        <button className="w-8 h-8"><PencilSquareIcon/></button>
                        <button className="w-8 h-8"><TrashIcon/></button>
                    </section>
                </section>
                <section className="flex flex-col md:grid md:grid-cols-8 gap-8">
                    <Image
                        src="/wordStockIMG.jpg"
                        width={800}
                        height={90}
                        className="w-full h-full rounded-lg md:col-span-3"
                        alt="Microsoft word stock image of accounting documents"
                    />
                    <section className="col-span-5 space-y-5">
                        <section className="hidden md:flex justify-between items-center">
                            <h1 className="text-2xl sm:text-3xl md:text-5xl underline">Expense Name</h1>
                            <section className="flex gap-5 items-center">
                                <button className="w-8 h-8"><PencilSquareIcon/></button>
                                <button className="w-8 h-8"><TrashIcon/></button>
                            </section>
                        </section>
                        <section className="flex flex-col">
                            <h2 className="text-xl sm:text-3xl underline mb-3">Expense Details:</h2>
                            <section className="grid grid-cols-2 gap-5 text-white font-bold text-sm">
                                <ul className="col-span-1 h-full space-y-5">
                                    <li className="px-3 py-6 bg-indigo-500 rounded-lg">Item 1</li>
                                    <li className="px-3 py-6 bg-indigo-500 rounded-lg">Item 2</li>
                                    <li className="px-3 py-6 bg-indigo-500 rounded-lg">Item 3</li>
                                </ul>
                                <ul className="col-span-1 h-full space-y-5">
                                    <li className="px-3 py-6 bg-indigo-500 rounded-lg">Item 4</li>
                                    <li className="px-3 py-6 bg-indigo-500 rounded-lg">Item 5</li>
                                    <li className="px-3 py-6 bg-indigo-500 rounded-lg">Item 6</li>
                                </ul>
                            </section>
                        </section>
                    </section>
                </section>
                <section>
                    <h2 className="text-xl sm:text-xl underline">Expense Description:</h2>
                    <p className="text-sm">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla, commodi exercitationem! Debitis, porro ad earum, 
                        aut dolores dolore velit labore praesentium eligendi optio quod, rerum deserunt sint voluptatibus saepe iusto.
                    </p>
                </section>
                <section>
                    <h2 className="text-xl sm:text-xl underline">Additional Notes:</h2>
                    <p className="text-sm">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla, commodi exercitationem! Debitis, porro ad earum, 
                        aut dolores dolore velit labore praesentium eligendi optio quod, rerum deserunt sint voluptatibus saepe iusto.
                    </p>
                </section>
            </article>
        </div>
    );
}