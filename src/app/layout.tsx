import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/app/components/ui/navigation"
import Footer from "@/app/components/ui/footer";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bookkeeping App",
  description: "This is an application that help tracks expenses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
          {/*Global Navigation UI*/}
          <Navigation/>
          <main className="flex-grow">
            {children}
          </main>
          {/*Global Footer UI*/}
          <Footer/>
        </body>
      </html>
    </ClerkProvider>
  );
}
