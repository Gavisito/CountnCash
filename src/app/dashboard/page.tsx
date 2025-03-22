import Image from "next/image";
import Footer from "@/app/components/ui/home/footer";


export default function Dashboard() {
    return (
        <div className="min-h-screen bg-white flex flex-col p-3 gap-6">
            <h1 className="mt-6 mb-2 text-4xl font-bold">Overview Dashboard</h1>
            <article className="gap-5 flex flex-col-reverse md:flex-col">
                <section className="md:grid md:grid-cols-8 flex flex-col gap-3 text-white">
                    <div className="col-span-2 bg-indigo-600 p-5 rounded-lg">
                        <h2 className="text-xl font-bold">Number of Expenses:</h2>
                        <p className="text-lg">100</p>
                    </div>
                    <div className="col-span-3 bg-indigo-600 p-5 rounded-lg">
                        <h2 className="text-xl font-bold">Sum of Expenses:</h2>
                        <p className="text-lg">100</p>
                    </div>
                    <div className="col-span-3 bg-indigo-600 p-5 rounded-lg">
                        <h2 className="text-xl font-bold">Most Popular Category:</h2>
                        <p className="text-lg">Utilities</p>
                    </div>
                </section>
                <section className="sm:grid sm:grid-cols-8 flex flex-col gap-3">
                    <div className="w-full rounded-lg col-start-1 col-end-4">
                        <Image
                            src="/wordStockIMG.jpg"
                            width={800}
                            height={90}
                            className="w-full h-full rounded-lg"
                            alt="Microsoft word stock image of accounting documents"
                        />
                    </div>
                    <div className="w-full rounded-lg col-start-4 col-end-9">
                        <Image
                            src="/wordStockIMG.jpg"
                            width={800}
                            height={90}
                            className="w-full h-full rounded-lg"
                            alt="Microsoft word stock image of accounting documents"
                        />
                    </div>
                </section>
            </article>
            <article className="flex flex-col pb-6">
                <h2 className="mb-3 text-3xl font-bold">Recent Expenses</h2>
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
                            <tr>
                                <td className="border-3 border-black text-start p-1">1</td>
                                <td className="border-3 border-black text-start p-1">Taco Bamba Food</td>
                                <td className="border-3 border-black text-start p-1">March, 22, 2025</td>
                                <td className="border-3 border-black text-start p-1">Food</td>
                            </tr>
                            <tr>
                                <td className="border-3 border-black text-start p-1">1</td>
                                <td className="border-3 border-black text-start p-1">Taco Bamba Food</td>
                                <td className="border-3 border-black text-start p-1">March, 22, 2025</td>
                                <td className="border-3 border-black text-start p-1">Food</td>
                            </tr>
                            <tr>
                                <td className="border-3 border-black text-start p-1">1</td>
                                <td className="border-3 border-black text-start p-1">Taco Bamba Food</td>
                                <td className="border-3 border-black text-start p-1">March, 22, 2025</td>
                                <td className="border-3 border-black text-start p-1">Food</td>
                            </tr>
                            <tr>
                                <td className="border-3 border-black text-start p-1">1</td>
                                <td className="border-3 border-black text-start p-1">Taco Bamba Food</td>
                                <td className="border-3 border-black text-start p-1">March, 22, 2025</td>
                                <td className="border-3 border-black text-start p-1">Food</td>
                            </tr>
                            <tr>
                                <td className="border-3 border-black text-start p-1">1000</td>
                                <td className="border-3 border-black text-start p-1">Taco Bamba Food</td>
                                <td className="border-3 border-black text-start p-1">March, 22, 2025</td>
                                <td className="border-3 border-black text-start p-1">Food</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </article>
        </div>
    );
}