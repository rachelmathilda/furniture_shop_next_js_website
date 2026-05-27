"use client";
import Navbar from "@/components/layout/Navbar";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

function OrderStepper({ step }: { step: number }) {
  const steps = ["Checkout", "Shipping", "Payment"];
  return (
    <div className="flex items-center justify-center gap-0 py-6">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center">
          <div className="flex flex-col items-center gap-1">
            <div className={`w-4 h-4 rounded-full ${i <= step ? "bg-[#C1714F]" : "bg-[#D4B896]"}`} />
            <span className="text-sm text-gray-600">{s}</span>
          </div>
          {i < steps.length - 1 && (
            <div className={`w-40 h-px mb-5 mx-1 ${i < step ? "border-t-2 border-solid border-gray-800" : "border-t-2 border-dashed border-gray-300"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

const SHIPPING_OPTIONS = [
  { id: "standard", name: "Standard Delivery", price: 0, eta: "5-7 business days", icon: "🚚" },
  { id: "express", name: "Express Delivery", price: 25, eta: "2-3 business days", icon: "⚡" },
  { id: "overnight", name: "Overnight Delivery", price: 60, eta: "Next business day", icon: "🌙" },
];

export default function ShippingPage() {
  const [selected, setSelected] = useState("standard");

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="bg-[#F8F6F3] border-b border-gray-100">
        <h1 className="text-center text-2xl font-bold pt-6">Order</h1>
        <OrderStepper step={1} />
      </div>

      <div className="max-w-[1200px] mx-auto px-8 py-8 flex gap-10">
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Select Shipping Method</h2>

          {/* Map placeholder */}
          <div className="w-full h-52 rounded-2xl bg-[#E8D5C0] overflow-hidden relative mb-6">
            <Image
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=300&fit=crop"
              alt="map"
              fill
              className="object-cover opacity-60"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/90 px-4 py-2 rounded-xl text-sm font-medium text-gray-700">
                📍 Jl. Raya Bekasi No. 123, Cikarang, West Java
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {SHIPPING_OPTIONS.map((opt) => (
              <label
                key={opt.id}
                className={`flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                  selected === opt.id ? "border-[#C1714F] bg-[#F5F0EB]" : "border-gray-100 bg-[#F8F6F3] hover:border-gray-200"
                }`}
              >
                <input type="radio" name="shipping" value={opt.id} checked={selected === opt.id} onChange={() => setSelected(opt.id)} className="sr-only" />
                <span className="text-2xl">{opt.icon}</span>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{opt.name}</p>
                  <p className="text-sm text-gray-500">{opt.eta}</p>
                </div>
                <span className="font-bold text-gray-900">{opt.price === 0 ? "Free" : `$${opt.price}`}</span>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selected === opt.id ? "border-[#C1714F]" : "border-gray-300"}`}>
                  {selected === opt.id && <div className="w-2.5 h-2.5 rounded-full bg-[#C1714F]" />}
                </div>
              </label>
            ))}
          </div>

          <Link href="/checkout/payment" className="btn-primary block text-center w-full py-4 mt-8 text-base">
            Continue to Payment
          </Link>
        </div>

        <div className="w-[340px] flex-shrink-0">
          <div className="bg-[#F8F6F3] rounded-2xl p-6 sticky top-8">
            <h3 className="font-bold text-gray-900 mb-4">Delivery Address</h3>
            <p className="text-sm text-gray-600">John Doe</p>
            <p className="text-sm text-gray-600">Jl. Raya Bekasi No. 123</p>
            <p className="text-sm text-gray-600">Cikarang, West Java 17530</p>
            <p className="text-sm text-gray-600">Indonesia</p>
          </div>
        </div>
      </div>
    </div>
  );
}
