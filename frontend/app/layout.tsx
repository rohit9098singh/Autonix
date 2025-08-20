import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/customs/Header/Header";
import { Toaster } from "sonner";
import { Provider } from "@/common/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "vehiql",
  description: "Find Your Dream Car",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
        </Provider>
        <Toaster richColors position="bottom-right" />
        <footer className="bg-green-100 py-12">
          <div className="container mx-auto px-4 text-center text-gray-600">
            <p className="font-bold">made with lot of love</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
