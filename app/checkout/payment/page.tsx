"use client";
import Navbar from "@/components/layout/Navbar";
import Link from "next/link";
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

export default function PaymentPage() {
  const [method, setMethod] = useState("card");
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvv: "" });

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="bg-[#F8F6F3] border-b border-gray-100">
        <h1 className="text-center text-2xl font-bold pt-6">Order</h1>
        <OrderStepper step={2} />
      </div>

      <div className="max-w-[1200px] mx-auto px-8 py-8 flex gap-10">
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Payment Method</h2>

          {/* Method selector */}
          <div className="flex gap-3 mb-6">
            {[
              { id: "card", label: "Credit Card" },
              { id: "bank", label: "Bank Transfer" },
              { id: "wallet", label: "E-Wallet" },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setMethod(m.id)}
                className={`flex-1 py-3 rounded-xl border-2 text-sm font-medium transition-all ${method === m.id ? "border-[#C1714F] bg-[#F5F0EB] text-[#C1714F]" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}
              >
                {m.label}
              </button>
            ))}
          </div>

          {method === "card" && (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Card Number"
                className="input-field"
                value={card.number}
                onChange={(e) => setCard({ ...card, number: e.target.value })}
                maxLength={19}
              />
              <input
                type="text"
                placeholder="Cardholder Name"
                className="input-field"
                value={card.name}
                onChange={(e) => setCard({ ...card, name: e.target.value })}
              />
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="input-field"
                  value={card.expiry}
                  onChange={(e) => setCard({ ...card, expiry: e.target.value })}
                  maxLength={5}
                />
                <input
                  type="text"
                  placeholder="CVV"
                  className="input-field"
                  value={card.cvv}
                  onChange={(e) => setCard({ ...card, cvv: e.target.value })}
                  maxLength={4}
                />
              </div>
            </div>
          )}

          {method === "bank" && (
            <div className="bg-[#F8F6F3] rounded-2xl p-6 space-y-3">
              <p className="font-semibold text-gray-800">Bank Transfer Details</p>
              <p className="text-sm text-gray-600">Bank: BCA</p>
              <p className="text-sm text-gray-600">Account Number: 1234 5678 9012</p>
              <p className="text-sm text-gray-600">Account Name: PT Morphara Indonesia</p>
            </div>
          )}

          {method === "wallet" && (
            <div className="flex gap-4">
              {["GoPay", "OVO", "DANA", "ShopeePay"].map((w) => (
                <button key={w} className="flex-1 py-4 border-2 border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:border-[#C1714F] hover:bg-[#F5F0EB] transition-all">
                  {w}
                </button>
              ))}
            </div>
          )}

          <Link href="/checkout/success" className="btn-primary block text-center w-full py-4 mt-8 text-base">
            Place Order
          </Link>
        </div>

        <div className="w-[340px] flex-shrink-0">
          <div className="bg-[#F8F6F3] rounded-2xl p-6 sticky top-8">
            <h3 className="font-bold text-gray-900 mb-4">Order Total</h3>
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between"><span className="text-gray-600">Subtotal</span><span>$2,600</span></div>
              <div className="flex justify-between"><span className="text-gray-600">Shipping</span><span>Free</span></div>
              <div className="flex justify-between"><span className="text-gray-600">Tax (11%)</span><span>$286</span></div>
            </div>
            <div className="border-t border-gray-200 pt-4 flex justify-between font-bold text-lg">
              <span>Total</span><span>$2,886</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
