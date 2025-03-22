import Features from "@/app/components/ui/home/features";
import FAQ from "@/app/components/ui/home/faq";
import Image from "next/image";
import Footer from "@/app/components/ui/home/footer";

export default function Home() {
	return (
		<div className="min-h-screen bg-white flex flex-col gap-10">
			{/* Hero Section */}
			<header className="flex flex-col justify-between m-3">
				<section className="flex flex-col mt-5 mb-9 gap-3 text-start">
					<h1 className="text-2xl sm:text-3xl md:text-5xl font-bold">
						Welcome to the Bookkeeping App
					</h1>
					<p className="text-lg italic">
						A place to manage all of your expenses!
					</p>
				</section>
				<Image
					src="/wordStockIMG.jpg"
					width={800}
					height={90}
					className="w-full max-h-135 rounded-lg"
					alt="Microsoft word stock image of accounting documents"
				/>
			</header>
			{/* Main Content */}
			<main className="m-3 flex flex-col gap-10">
				{/* feature Section */}
				<Features/>
				<FAQ/>
			</main>
		</div>
	);
}
