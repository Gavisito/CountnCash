import Image from "next/image";

export default function DetailPage() {
    return (
        <div className="min-h-screen bg-white flex flex-col gap-10">
            <article>
                <section>
                    <Image
                        src="/wordStockIMG.jpg"
                        width={800}
                        height={90}
                        className="w-full max-h-135 rounded-lg"
                        alt="Microsoft word stock image of accounting documents"
                    />
                    <section>
                        <section>
                            <h1>Expense Name</h1>
                            <button>Edit</button>
                            <button>Delete</button>
                        </section>
                        <section>
                            <h2>Expense Details:</h2>
                            <section>
                                <ul>
                                    <li>Item 1</li>
                                    <li>Item 2</li>
                                    <li>Item 3</li>
                                </ul>
                                <ul>
                                    <li>Item 4</li>
                                    <li>Item 5</li>
                                    <li>Item 6</li>
                                </ul>
                            </section>
                        </section>
                    </section>
                </section>
                <section>
                    <h2>Expense Description:</h2>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla, commodi exercitationem! Debitis, porro ad earum, 
                        aut dolores dolore velit labore praesentium eligendi optio quod, rerum deserunt sint voluptatibus saepe iusto.
                    </p>
                </section>
                <section>
                    <h2>Additional Notes:</h2>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla, commodi exercitationem! Debitis, porro ad earum, 
                        aut dolores dolore velit labore praesentium eligendi optio quod, rerum deserunt sint voluptatibus saepe iusto.
                    </p>
                </section>
            </article>
        </div>
    );
}