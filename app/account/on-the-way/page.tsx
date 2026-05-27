import Navbar from "@/components/layout/Navbar";
import AccountSidebar from "@/components/layout/AccountSidebar";
import Image from "next/image";

const ON_THE_WAY = [
  { id: 1, name: "Nova Sideboard", status: "In Transit", eta: "May 30, 2026", tracking: "MRP-7821-A", img: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400&h=200&fit=crop" },
  { id: 2, name: "Lumen Sofa", status: "Out for Delivery", eta: "May 28, 2026", tracking: "MRP-4412-B", img: "https://images.unsplash.com/photo-1493663284031-b7e3aaa4e2b2?w=400&h=200&fit=crop" },
  { id: 3, name: "Reed Lamp", status: "Processing", eta: "Jun 3, 2026", tracking: "MRP-9903-C", img: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=200&fit=crop" },
];

const STATUS_COLORS: Record<string, string> = {
  "In Transit": "bg-blue-100 text-blue-700",
  "Out for Delivery": "bg-green-100 text-green-700",
  "Processing": "bg-yellow-100 text-yellow-700",
};

export default function OnTheWayPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="bg-[#F8F6F3] py-8 mb-6">
        <h1 className="text-center text-3xl font-bold">On The Way</h1>
      </div>

      <div className="max-w-[1200px] mx-auto px-8 pb-12 flex gap-10">
        <AccountSidebar />

        <div className="flex-1 space-y-5">
          {ON_THE_WAY.map((order) => (
            <div key={order.id} className="bg-[#F8F6F3] rounded-2xl overflow-hidden flex">
              <div className="relative w-48 h-36 flex-shrink-0">
                <Image src={order.img} alt={order.name} fill className="object-cover" />
              </div>
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{order.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">Tracking: {order.tracking}</p>
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${STATUS_COLORS[order.status]}`}>
                    {order.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#C1714F] rounded-full transition-all"
                      style={{ width: order.status === "Processing" ? "20%" : order.status === "In Transit" ? "60%" : "90%" }}
                    />
                  </div>
                  <span className="text-xs text-gray-500">ETA: {order.eta}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
