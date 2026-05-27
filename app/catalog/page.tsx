"use client";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Link from "next/link";
import Image from "next/image";
import { Search, SlidersHorizontal } from "lucide-react";

const PRODUCTS = [
  { id: 1, name: "Nova Sideboard", price: 580, rating: 4.5, sold: 12, img: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400&h=400&fit=crop", style: "Classic", category: "Cabinet" },
  { id: 2, name: "Drift Console", price: 420, rating: 4.5, sold: 8, img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop&sat=-20", style: "Minimalist", category: "Cabinet" },
  { id: 3, name: "Lumen Sofa", price: 920, rating: 4.5, sold: 24, img: "https://images.unsplash.com/photo-1493663284031-b7e3aaa4e2b2?w=400&h=400&fit=crop", style: "Classic", category: "Couch" },
  { id: 4, name: "Wave Sofa", price: 1100, rating: 4.5, sold: 6, img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop", style: "Bohemian", category: "Couch" },
  { id: 5, name: "Arc Storage", price: 360, rating: 4.5, sold: 15, img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop", style: "Minimalist", category: "Cabinet" },
  { id: 6, name: "Slate Sofa", price: 780, rating: 4.5, sold: 9, img: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=400&h=400&fit=crop", style: "Vintage", category: "Couch" },
  { id: 7, name: "Pebble Chair", price: 340, rating: 4.5, sold: 18, img: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=400&fit=crop", style: "Minimalist", category: "Chair" },
  { id: 8, name: "Reed Lamp", price: 180, rating: 4.5, sold: 31, img: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop", style: "Bohemian", category: "Lamp" },
  { id: 9, name: "Terra Sofa", price: 860, rating: 4.5, sold: 4, img: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&h=400&fit=crop", style: "Classic", category: "Couch" },
  { id: 10, name: "Moss Sofa", price: 950, rating: 4.5, sold: 11, img: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=400&h=400&fit=crop", style: "Rustic", category: "Couch" },
];

const CATEGORIES = ["All", "Couch", "Chair", "Cabinet", "Lamp", "Vase", "Table", "Shelf", "Rug"];
const STYLES = ["Classic", "Bohemian", "Minimalist", "Vintage", "Industrial", "Japandi", "Rustic"];

export default function CatalogPage() {
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [category, setCategory] = useState("All");
  const [style, setStyle] = useState("");
  const [sort, setSort] = useState<"asc" | "desc" | "">("");

  const filtered = PRODUCTS
    .filter((p) => {
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (category !== "All" && p.category !== category) return false;
      if (style && p.style !== style) return false;
      return true;
    })
    .sort((a, b) => sort === "asc" ? a.price - b.price : sort === "desc" ? b.price - a.price : 0);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-[1200px] mx-auto px-8 py-8">
        {/* Search bar */}
        <div className="relative bg-white border border-gray-200 rounded-full px-6 py-3 flex items-center gap-3 shadow-sm mb-4">
          <input
            type="text"
            placeholder="Search"
            className="flex-1 outline-none text-gray-700 bg-transparent"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="w-5 h-5 text-gray-400" />
          <button onClick={() => setShowFilter(!showFilter)}>
            <SlidersHorizontal className="w-5 h-5 text-gray-400 hover:text-gray-700" />
          </button>
        </div>

        {/* Filter panel */}
        {showFilter && (
          <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-6 shadow-sm">
            <div className="mb-5">
              <p className="font-semibold text-gray-700 mb-3">Category</p>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={`px-4 py-2 rounded-xl text-sm border transition-colors ${
                      category === c ? "border-[#C1714F] bg-[#F5F0EB] text-[#C1714F]" : "border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <p className="font-semibold text-gray-700 mb-3">Style</p>
              <div className="flex flex-wrap gap-2">
                {STYLES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setStyle(style === s ? "" : s)}
                    className={`px-4 py-2 rounded-xl text-sm border transition-colors ${
                      style === s ? "border-[#C1714F] bg-[#F5F0EB] text-[#C1714F]" : "border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setSort("asc")}
                className={`flex-1 py-3 rounded-xl border text-sm font-medium transition-colors ${sort === "asc" ? "border-[#C1714F] bg-[#F5F0EB] text-[#C1714F]" : "border-gray-200 text-gray-700 hover:bg-gray-50"}`}
              >
                Lower to Upper Price
              </button>
              <button
                onClick={() => setSort("desc")}
                className={`flex-1 py-3 rounded-xl border text-sm font-medium transition-colors ${sort === "desc" ? "border-[#C1714F] bg-[#F5F0EB] text-[#C1714F]" : "border-gray-200 text-gray-700 hover:bg-gray-50"}`}
              >
                Upper to Lower Price
              </button>
            </div>
          </div>
        )}

        {/* Product grid */}
        <div className="grid grid-cols-5 gap-5">
          {filtered.map((p) => (
            <Link href={`/catalog/${p.id}`} key={p.id} className="group">
              <div className="aspect-square rounded-2xl bg-[#D4B896] overflow-hidden relative">
                <Image
                  src={p.img}
                  alt={p.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="mt-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-800 font-medium">{p.name}</span>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    {p.rating} <span className="text-[#C1714F]">★</span>
                  </span>
                </div>
                <p className="text-sm font-bold text-gray-900">${p.price.toFixed(2)}</p>
                <p className="text-xs text-gray-400">{p.sold} terjual</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
