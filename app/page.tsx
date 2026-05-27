import Navbar from "@/components/layout/Navbar";
import Link from "next/link";
import Image from "next/image";

const hotItems = [
  { label: "Lamp", img: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=80&h=80&fit=crop" },
  { label: "Vase", img: "https://images.unsplash.com/photo-1612196808214-b7e239e5f6b2?w=80&h=80&fit=crop" },
  { label: "Couch", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=80&h=80&fit=crop" },
  { label: "Chair", img: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=80&h=80&fit=crop" },
  { label: "Cabinet", img: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=80&h=80&fit=crop" },
  { label: "Couch", img: "https://images.unsplash.com/photo-1493663284031-b7e3aaa4e2b2?w=80&h=80&fit=crop" },
  { label: "Couch", img: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=80&h=80&fit=crop" },
  { label: "Couch", img: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=80&h=80&fit=crop" },
  { label: "Couch", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=80&h=80&fit=crop" },
  { label: "Couch", img: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=80&h=80&fit=crop" },
];

const featuredProducts = [
  { img: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=200&h=200&fit=crop", price: "$320.00", sold: "12 terjual" },
  { img: "https://images.unsplash.com/photo-1556912173-3bb406ef7e97?w=200&h=200&fit=crop", price: "$180.00", sold: "8 terjual" },
  { img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&h=200&fit=crop", price: "$650.00", sold: "24 terjual" },
  { img: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=200&h=200&fit=crop", price: "$290.00", sold: "5 terjual" },
  { img: "https://images.unsplash.com/photo-1493663284031-b7e3aaa4e2b2?w=200&h=200&fit=crop", price: "$430.00", sold: "17 terjual" },
];

const styles = ["Classic", "Vintage", "Minimalist", "Industrial", "Japandi", "Rustic", "Bohemian"];

const roomProducts = [
  { img: "https://images.unsplash.com/photo-1612196808214-b7e239e5f6b2?w=200&h=200&fit=crop", name: "Webbing vase", price: "$0.00" },
  { img: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=200&h=200&fit=crop", name: "", price: "" },
  { img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&h=200&fit=crop&sat=-100", name: "", price: "" },
  { img: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=200&h=200&fit=crop", name: "", price: "" },
  { img: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=200&h=200&fit=crop", name: "", price: "" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative w-full h-[calc(100vh-70px)] overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-3">
          <div className="bg-[#E8D5C0] opacity-60" />
          <div className="relative overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1493663284031-b7e3aaa4e2b2?w=600&h=800&fit=crop"
              alt="Hero sofa"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 flex flex-col items-center justify-start pt-24">
              <h1 className="font-display text-7xl font-bold text-[#C1714F] drop-shadow-sm tracking-tight">
                Morphara
              </h1>
            </div>
          </div>
          <div className="bg-[#F0EAE2] opacity-60" />
        </div>
      </section>

      {/* Hot Items */}
      <section className="px-8 py-10 max-w-[1200px] mx-auto">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold">Hot Items!!</h2>
          <div className="flex gap-1">
            {["00", "00", "00"].map((t, i) => (
              <span key={i} className="flex items-center gap-1">
                <span className="bg-black text-white text-sm font-bold px-2 py-1 rounded">{t}</span>
                {i < 2 && <span className="text-black font-bold">:</span>}
              </span>
            ))}
          </div>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {hotItems.map((item, i) => (
            <Link href="/catalog" key={i} className="flex flex-col items-center gap-2 flex-shrink-0">
              <div className="w-20 h-20 rounded-xl bg-[#E8D5C0] overflow-hidden relative">
                <Image src={item.img} alt={item.label} fill className="object-cover" />
              </div>
              <span className="text-xs text-gray-700 font-medium">{item.label}</span>
            </Link>
          ))}
        </div>

        {/* Featured grid */}
        <div className="flex gap-4 mt-6 overflow-x-auto pb-2">
          {featuredProducts.map((p, i) => (
            <Link href="/catalog" key={i} className="flex-shrink-0 w-[180px]">
              <div className="w-[180px] h-[180px] rounded-2xl bg-[#D4B896] overflow-hidden relative">
                <Image src={p.img} alt="product" fill className="object-cover" />
              </div>
              <div className="mt-2 flex justify-between text-sm">
                <span className="font-bold">{p.price}</span>
                <span className="text-gray-500">{p.sold}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Find Suitable Section */}
      <section className="px-8 py-10 max-w-[1200px] mx-auto">
        <h2 className="text-lg font-bold mb-6">We'll Find The Suitable Furniture for Your Room</h2>
        <div className="flex flex-wrap gap-2 mb-5">
          {styles.map((s) => (
            <button key={s} className="px-4 py-2 border border-[#D4B896] rounded-full text-sm text-gray-700 hover:bg-[#F5F0EB] transition-colors">
              {s}
            </button>
          ))}
        </div>
        <div className="flex gap-4 mb-6">
          <select className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-gray-700 bg-white outline-none">
            <option>Room</option>
            <option>Living Room</option>
            <option>Bedroom</option>
            <option>Office</option>
            <option>Dining Room</option>
          </select>
          <select className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-gray-700 bg-white outline-none">
            <option>Wall Color</option>
            <option>White</option>
            <option>Beige</option>
            <option>Gray</option>
            <option>Dark</option>
          </select>
          <button className="flex items-center gap-2 border border-gray-200 rounded-xl px-5 py-3 text-gray-700 hover:bg-gray-50 transition-colors font-medium">
            Shuffle ✕
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {roomProducts.map((p, i) => (
            <div key={i} className="flex-shrink-0 w-[180px] relative">
              <div className="w-[180px] h-[180px] rounded-2xl bg-[#C9A98C] overflow-hidden relative">
                <Image src={p.img} alt="room product" fill className="object-cover" />
                {p.name && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/40 px-3 py-2">
                    <p className="text-white text-xs">{p.name}</p>
                    <p className="text-white text-xs font-bold">{p.price}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Custom CTA */}
      <section className="px-8 py-6 max-w-[1200px] mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">You Can Build Your Dream Rooms!</h2>
          <Link href="/custom" className="btn-primary">
            Custom your Furniture
          </Link>
        </div>
        <div className="w-full h-48 rounded-2xl overflow-hidden relative">
          <Image
            src="https://images.unsplash.com/photo-1616137466211-f939a420be84?w=1200&h=300&fit=crop"
            alt="dream room"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#C1714F] h-24 mt-10" />
    </div>
  );
}
