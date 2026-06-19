"use client";

import { use, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import { PRODUCTS, type Product } from "../../lib/seed";

type Props = Readonly<{ params: Promise<{ id: string }> }>;

export default function ProductDetailPage({ params }: Props) {
  const { id } = use(params);
  const product: Product | undefined = PRODUCTS.find((p) => p.id === id);

  const [qty, setQty] = useState(1);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedType, setSelectedType] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center h-[80vh]">
          <div className="text-center">
            <p className="text-xl font-bold text-gray-700 mb-4">Product not found</p>
            <Link href="/catalog" className="btn-primary">Back to Catalog</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-[1400px] mx-auto px-8 py-8">
        <Link
          href="/catalog"
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Catalog
        </Link>

        <div className="flex gap-10">
          {/* Left: image */}
          <div className="w-[420px] flex-shrink-0">
            <div className="w-full aspect-square rounded-2xl bg-[#E8D5C0] overflow-hidden relative">
              <Image
                src={product.img}
                alt={product.name}
                fill
                sizes="420px"
                className="object-cover"
              />
            </div>

            <div className="flex gap-3 mt-4">
              {product.colors.map((color, i) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(i)}
                  className={`w-16 h-16 rounded-xl border-2 transition-all ${
                    selectedColor === i ? "border-[#C1714F] scale-110" : "border-transparent"
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Right: details */}
          <div className="flex-1">
            <div className="bg-[#F8F6F3] rounded-2xl p-6 mb-4">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
              </div>
            </div>

            <div className="bg-[#F8F6F3] rounded-2xl p-6 mb-4">
              <h3 className="font-semibold text-gray-900 mb-3">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            <div className="bg-[#F8F6F3] rounded-2xl p-6 mb-4">
              <h3 className="font-semibold text-gray-900 mb-3">Material</h3>
              <ul className="space-y-2 text-gray-600">
                {product.materials.map((m) => (
                  <li key={m}>• {m}</li>
                ))}
              </ul>
            </div>

            <div className="bg-[#F8F6F3] rounded-2xl p-6 mb-4">
              <h3 className="font-semibold text-gray-900 mb-3">Color</h3>
              <div className="flex gap-3">
                {product.colors.map((color, i) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(i)}
                    className={`w-12 h-12 rounded-xl border-2 transition-all ${
                      selectedColor === i ? "border-[#C1714F] scale-110" : "border-transparent"
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            <div className="bg-[#F8F6F3] rounded-2xl p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Type</h3>
              <div className="flex gap-3">
                {product.types.map((type, i) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSelectedType(i)}
                    className={`px-5 py-2 rounded-xl text-sm border transition-all ${
                      selectedType === i
                        ? "border-[#C1714F] bg-[#F5F0EB] text-[#C1714F]"
                        : "border-gray-200 text-gray-600 hover:bg-white"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-12 h-14 bg-[#C1714F] text-white text-xl flex items-center justify-center hover:bg-[#A85F3F] transition-colors"
                >
                  −
                </button>
                <span className="w-14 text-center font-medium text-lg">{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty(qty + 1)}
                  className="w-12 h-14 bg-[#C1714F] text-white text-xl flex items-center justify-center hover:bg-[#A85F3F] transition-colors"
                >
                  +
                </button>
              </div>
              <Link
                href="/account/cart"
                className="flex-1 btn-primary flex items-center justify-center text-lg"
              >
                Add to Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
