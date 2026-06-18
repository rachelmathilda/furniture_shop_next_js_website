"use client";

import Navbar from "@/components/layout/Navbar";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { PRODUCTS, CATEGORIES, STYLES, type Product } from "../lib/seed";

const hotItems = CATEGORIES.map(
  (cat: string) => PRODUCTS.find((p: Product) => p.category === cat)
).filter((item): item is Product => item !== undefined);

const roomProducts = [
  PRODUCTS.find((p: Product) => p.category === "Vase"),
  PRODUCTS.find((p: Product) => p.category === "Lamp"),
  PRODUCTS.find((p: Product) => p.category === "Sofa"),
  PRODUCTS.find((p: Product) => p.category === "Chair"),
  PRODUCTS.find((p: Product) => p.category === "Cabinet"),
].filter((item): item is Product => item !== undefined);

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const displayedProducts: Product[] = activeCategory
    ? PRODUCTS.filter((p: Product) => p.category === activeCategory)
    : PRODUCTS.slice(0, 5);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="px-8 pt-8 max-w-[1200px] mx-auto">
        <div className="relative w-full h-[220px]">
          <Image
            src="/assets/ad.png"
            alt="Hero banner"
            fill
            className="object-contain object-left"
            priority
          />
        </div>
      </section>

      <section className="px-8 py-8 max-w-[1200px] mx-auto">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold">Hot Items!!</h2>
          <div className="flex items-center gap-1">
            {["00", "00", "00"].map((t, i) => (
              <span key={`timer-${i}`} className="flex items-center gap-1">
                <span className="bg-black text-white text-sm font-bold px-2 py-1 rounded">
                  {t}
                </span>
                {i < 2 && <span className="text-black font-bold">:</span>}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-3 mb-6">
          {hotItems.map((item: Product) => (
            <button
              key={item.id}
              onClick={() =>
                setActiveCategory(
                  activeCategory === item.category ? null : item.category
                )
              }
              className="flex flex-col items-center gap-2 flex-shrink-0"
            >
              <div
                className={`w-20 h-20 rounded-xl overflow-hidden relative border-2 transition-all ${
                  activeCategory === item.category
                    ? "border-[#C1714F] scale-105"
                    : "border-transparent bg-[#E8D5C0]"
                }`}
              >
                <Image
                  src={item.img}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <span
                className={`text-xs font-medium ${
                  activeCategory === item.category
                    ? "text-[#C1714F]"
                    : "text-gray-700"
                }`}
              >
                {item.category}
              </span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-5 gap-4">
          {displayedProducts.map((p: Product) => (
            <Link href={`/catalog/${p.id}`} key={p.id} className="group">
              <div className="aspect-square rounded-2xl bg-[#C9A98C] overflow-hidden relative">
                <Image
                  src={p.img}
                  alt={p.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="mt-2 flex justify-between text-sm px-1">
                <span className="font-bold text-gray-900">
                  ${p.price.toFixed(2)}
                </span>
                <span className="text-gray-500">{p.sold} terjual</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-8 py-8 max-w-[1200px] mx-auto">
        <h2 className="text-lg font-bold mb-5">
          We&apos;ll Find The Suitable Furniture for Your Room
        </h2>

        <div className="flex flex-wrap gap-2 mb-5">
          {STYLES.map((s: string) => (
            <button
              key={s}
              className="px-5 py-2 border border-[#D4B896] rounded-full text-sm text-gray-700 hover:bg-[#F5F0EB] transition-colors"
            >
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

        <div className="grid grid-cols-5 gap-4">
          {roomProducts.map((p: Product, i: number) => (
            <Link href={`/catalog/${p.id}`} key={p.id} className="relative group">
              <div className="aspect-square rounded-2xl bg-[#C9A98C] overflow-hidden relative">
                <Image
                  src={p.img}
                  alt={p.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {i === 0 && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/40 px-3 py-2">
                    <p className="text-white text-xs">{p.name}</p>
                    <p className="text-white text-xs font-bold">
                      ${p.price.toFixed(2)}
                    </p>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-8 py-6 max-w-[1200px] mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">
            You Can Build Your Dream Rooms!
          </h2>

          <Link href="/custom" className="btn-primary">
            Custom your Furniture
          </Link>
        </div>

        <div className="w-full h-48 rounded-2xl overflow-hidden relative">
          <Image
            src="/assets/display.jpg"
            alt="dream room"
            fill
            className="object-cover"
          />
        </div>
      </section>

      <footer className="bg-[#C1714F] mt-10 py-6">
        <p className="text-center text-white text-sm">
          © {new Date().getFullYear()} Morphara. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
