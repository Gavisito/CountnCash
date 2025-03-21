"use client";
export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex h-screen flex-row">
			<div className="p-3">
				{children}
			</div>
		</div>
	);
}