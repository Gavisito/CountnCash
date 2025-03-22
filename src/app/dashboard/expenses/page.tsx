import Table from "@/app/components/displayLayouts/table";
import Grid from "@/app/components/displayLayouts/grid";
import  CardStack from "@/app/components/displayLayouts/cardStack"
import { TableCellsIcon, Square3Stack3DIcon, Squares2X2Icon } from "@heroicons/react/24/outline"; 

export default function ExpensePage() {
    return (
        <div className="min-h-screen bg-white flex flex-col p-3 gap-6">
            <h1 className="mt-6 mb-2 text-4xl font-bold">Expense List</h1>
            <article className="flex flex-col gap-5">
                <section className="flex flex-row gap-5">
                    <div className="col-span-1">
                        <button className="w-10 h-10">
                            <TableCellsIcon/>
                        </button>
                    </div>
                    <div>
                        <button className="w-10 h-10">
                            <Square3Stack3DIcon/> 
                        </button>
                    </div>
                    <div>
                        <button className="w-10 h-10">
                            <Squares2X2Icon/>
                        </button>
                    </div>
                </section>
                <section>
                    {/* Display table, card, or gird layout heree of expense list */}
                    <Table/>
                    <Grid/>
                    <CardStack/>
                </section>
            </article>
        </div>
    );
}