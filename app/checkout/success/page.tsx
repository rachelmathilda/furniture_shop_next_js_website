import Navbar from "@/components/layout/Navbar";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-70px)] text-center px-8">
        <div className="w-24 h-24 bg-[#C1714F] rounded-full flex items-center justify-center mb-8 shadow-lg">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-3">Order Placed!</h1>
        <p className="text-gray-500 text-lg mb-2">Thank you for shopping with Morphara.</p>
        <p className="text-gray-400 text-sm mb-10">Your order #MRP-2026-0527 is confirmed and being processed.</p>

        <div className="flex gap-4">
          <Link href="/account/on-the-way" className="btn-primary px-8 py-4">
            Track My Order
          </Link>
          <Link href="/" className="btn-outline px-8 py-4">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
