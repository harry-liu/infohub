import Link from "next/link";
import {
  FaGithub,
  FaChartLine,
  FaCalculator,
  FaNewspaper,
} from "react-icons/fa";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <main className="flex flex-col gap-8 items-center sm:items-start">
          <h1 className="text-4xl font-bold text-gray-800">Tools</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            <Link href="/github" className="w-full">
              <button className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-800 font-semibold py-4 px-6 rounded-lg shadow-sm border border-gray-200 transition-colors">
                <FaGithub className="text-xl" />
                GitHub
              </button>
            </Link>
            <Link href="/trading" className="w-full">
              <button className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-800 font-semibold py-4 px-6 rounded-lg shadow-sm border border-gray-200 transition-colors">
                <FaChartLine className="text-xl" />
                Trading
              </button>
            </Link>
            <Link href="/news" className="w-full">
              <button className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-800 font-semibold py-4 px-6 rounded-lg shadow-sm border border-gray-200 transition-colors">
                <FaNewspaper className="text-xl" />
                News
              </button>
            </Link>
            <button className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-800 font-semibold py-4 px-6 rounded-lg shadow-sm border border-gray-200 transition-colors">
              <FaCalculator className="text-xl" />
              Tax
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
