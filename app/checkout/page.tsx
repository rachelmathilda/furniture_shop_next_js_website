"use client";
import Navbar from "@/components/layout/Navbar";
import Link from "next/link";

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

const CART_SUMMARY = [
  { name: "Nova Sideboard", price: 580, qty: 1 },
  { name: "Lumen Sofa", price: 920, qty: 2 },
  { name: "Reed Lamp", price: 180, qty: 1 },
];

export default function CheckoutPage() {
  const subtotal = CART_SUMMARY.reduce((a, b) => a + b.price * b.qty, 0);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="bg-[#F8F6F3] border-b border-gray-100">
        <h1 className="text-center text-2xl font-bold pt-6">Order</h1>
        <OrderStepper step={0} />
      </div>

      <div className="max-w-[1200px] mx-auto px-8 py-8 flex gap-10">
        {/* Left: form */}
        <div className="flex-1 space-y-5">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Shipping Address</h2>
          {["Full Name", "Email Address", "Phone Number", "Street Address", "City, State", "ZIP Code"].map((ph) => (
            <input key={ph} type="text" placeholder={ph} className="input-field" />
          ))}
          <Link href="/checkout/shipping" className="btn-primary block text-center w-full py-4 mt-4 text-base">
            Continue to Shipping
          </Link>
        </div>

        {/* Right: order summary */}
        <div className="w-[340px] flex-shrink-0">
          <div className="bg-[#F8F6F3] rounded-2xl p-6 sticky top-8">
            <h3 className="font-bold text-gray-900 mb-5">Order Summary</h3>
            <div className="space-y-4 mb-6">
              {CART_SUMMARY.map((item) => (
                <div key={item.name} className="flex justify-between text-sm">
                  <span className="text-gray-700">{item.name} × {item.qty}</span>
                  <span className="font-medium">${(item.price * item.qty).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-4 flex justify-between font-bold">
              <span>Subtotal</span>
              <span>${subtotal.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { OrderStepper };
