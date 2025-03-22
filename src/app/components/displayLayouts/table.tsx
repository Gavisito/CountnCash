export default function Table() {
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
    )
}