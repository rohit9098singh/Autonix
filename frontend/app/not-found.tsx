import Link from "next/link";
import { CustomButton } from "@/components/customs/CustomButton/CustomButton";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 px-4">
      <div className="bg-white rounded-full shadow-lg p-6 animate-bounce-slow mb-6">
        <AlertTriangle size={56} className="text-yellow-500" />
      </div>
      <h1 className="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2 drop-shadow-lg">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-gray-800">Page Not Found</h2>
      <p className="mb-8 text-gray-500 text-center max-w-md">Sorry, the page you are looking for does not exist or has been moved. Please check the URL or return to the homepage.</p>
      <Link href="/">
        <CustomButton content="Go Home" className="shadow-md px-8 py-3 text-lg" />
      </Link>
    </div>
  );
}
