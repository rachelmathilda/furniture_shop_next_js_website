import Navbar from "@/components/layout/Navbar";
import AccountSidebar from "@/components/layout/AccountSidebar";
import Link from "next/link";
import Image from "next/image";

const CART_ITEMS = [
  { id: 1, name: "Nova Sideboard", qty: 2, img: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400&h=400&fit=crop" },
  { id: 2, name: "Drift Console", qty: 2, img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop" },
  { id: 3, name: "Lumen Sofa", qty: 2, img: "https://images.unsplash.com/photo-1493663284031-b7e3aaa4e2b2?w=400&h=400&fit=crop" },
  { id: 4, name: "Wave Sofa", qty: 2, img: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=400&fit=crop" },
  { id: 5, name: "Pebble Chair", qty: 2, img: "https://images.unsplash.com/photo-1612196808214-b7e239e5f6b2?w=400&h=400&fit=crop" },
  { id: 6, name: "Reed Lamp", qty: 2, img: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=400&fit=crop" },
  { id: 7, name: "Terra Plant", qty: 2, img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop" },
  { id: 8, name: "Slate Sofa", qty: 2, img: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=400&h=400&fit=crop" },
];

export default function CartPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="bg-[#F8F6F3] py-8 mb-6">
        <h1 className="text-center text-3xl font-bold">Cart</h1>
      </div>

      <div className="max-w-[1200px] mx-auto px-8 pb-12 flex gap-10">
        <AccountSidebar />

        <div className="flex-1">
          <div className="grid grid-cols-4 gap-5">
            {CART_ITEMS.map((item) => (
              <div key={item.id} className="group">
                <div className="aspect-square rounded-2xl bg-[#E8D5C0] overflow-hidden relative">
                  <Image src={item.img} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-sm text-gray-800">{item.name}</span>
                  <span className="text-sm font-bold text-gray-700">{item.qty} items</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <Link href="/checkout" className="btn-primary px-10 py-4 text-base">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
