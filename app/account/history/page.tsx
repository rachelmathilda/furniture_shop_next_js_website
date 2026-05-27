import Navbar from "@/components/layout/Navbar";
import AccountSidebar from "@/components/layout/AccountSidebar";
import Image from "next/image";

const HISTORY = [
  { id: 1, name: "Pebble Chair", date: "Apr 15, 2026", price: 340, img: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=300&h=200&fit=crop" },
  { id: 2, name: "Arc Storage", date: "Mar 22, 2026", price: 360, img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop" },
  { id: 3, name: "Slate Sofa", date: "Feb 10, 2026", price: 780, img: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=300&h=200&fit=crop" },
  { id: 4, name: "Reed Lamp", date: "Jan 8, 2026", price: 180, img: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&h=200&fit=crop" },
  { id: 5, name: "Terra Plant", date: "Dec 20, 2025", price: 95, img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=200&fit=crop" },
  { id: 6, name: "Nova Sideboard", date: "Nov 5, 2025", price: 580, img: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=300&h=200&fit=crop" },
];

export default function HistoryPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="bg-[#F8F6F3] py-8 mb-6">
        <h1 className="text-center text-3xl font-bold">Past Transactions</h1>
      </div>

      <div className="max-w-[1200px] mx-auto px-8 pb-12 flex gap-10">
        <AccountSidebar />

        <div className="flex-1 grid grid-cols-2 gap-5">
          {HISTORY.map((item) => (
            <div key={item.id} className="bg-[#F8F6F3] rounded-2xl overflow-hidden flex gap-4 p-4">
              <div className="relative w-28 h-24 flex-shrink-0 rounded-xl overflow-hidden">
                <Image src={item.img} alt={item.name} fill className="object-cover" />
              </div>
              <div className="flex flex-col justify-between py-1">
                <div>
                  <h3 className="font-bold text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{item.date}</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-900">${item.price.toFixed(2)}</span>
                  <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">Delivered</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
