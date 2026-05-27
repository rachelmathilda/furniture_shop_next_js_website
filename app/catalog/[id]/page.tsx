"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";

type Product = {
  name: string;
  price: number;
  desc: string;
  img: string;
  colors: string[];
  types: string[];
};

const PRODUCTS: Record<string, Product> = {
  "1": {
    name: "Nova Sideboard",
    price: 580,
    desc: "Crafted from solid oak with a hand-rubbed oil finish, this sideboard balances form and function with generous storage and a timeless silhouette.",
    img: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&h=500&fit=crop",
    colors: ["#E8D5C0", "#D4B896", "#C9A98C", "#BF9A7A", "#8B7355"],
    types: ["Standard", "Extended", "Compact"],
  },
  "2": {
    name: "Drift Console",
    price: 420,
    desc: "A sleek console table with integrated cable management and soft-close drawers for a clutter-free living space.",
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=500&fit=crop",
    colors: ["#F0E8DC", "#D4C4B0", "#C0AE9A"],
    types: ["Oak", "Walnut", "Ash"],
  },
  "3": {
    name: "Lumen Sofa",
    price: 920,
    desc: "Sink into luxury with our Lumen sofa, upholstered in premium bouclé fabric with feather-filled cushions and solid beech legs.",
    img: "https://images.unsplash.com/photo-1493663284031-b7e3aaa4e2b2?w=600&h=500&fit=crop",
    colors: ["#F5F0EB", "#D4B896", "#8B7355", "#5C4A3A"],
    types: ["2-Seater", "3-Seater", "L-Shape"],
  },
};

type ProductDetailPageProps = Readonly<{
  params: {
    id: string;
  };
}>;

export default function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const product = PRODUCTS[params.id] ?? PRODUCTS["1"];

  const [qty, setQty] = useState(2);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedType, setSelectedType] = useState(0);

  const thumbnails = [
    {
      id: "thumb-1",
      image: product.img,
      color: "#E8D5C0",
    },
    {
      id: "thumb-2",
      image: product.img.replace("w=600", "w=200"),
      color: "#D4B896",
    },
    {
      id: "thumb-3",
      image: product.img.replace("crop", "crop&sat=-30"),
      color: "#C9A98C",
    },
    {
      id: "thumb-4",
      image: product.img.replace("fit=crop", "fit=crop&hue=30"),
      color: "#BF9A7A",
    },
    {
      id: "thumb-5",
      image: product.img.replace("fit=crop", "fit=crop&hue=60"),
      color: "#8B7355",
    },
  ];

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
          <div className="w-[420px] flex-shrink-0">
            <div className="w-full aspect-square rounded-2xl bg-[#E8D5C0] overflow-hidden relative">
              <Image
                src={product.img}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex gap-3 mt-4">
              {thumbnails.map((thumbnail, index) => (
                <button
                  key={thumbnail.id}
                  type="button"
                  onClick={() => setSelectedColor(index)}
                  className={`w-16 h-16 rounded-xl overflow-hidden relative cursor-pointer border-2 transition-colors ${
                    selectedColor === index
                      ? "border-[#C1714F]"
                      : "border-transparent"
                  }`}
                >
                  <div
                    className="w-full h-full rounded-xl"
                    style={{
                      backgroundColor: thumbnail.color,
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1">
            <div className="bg-[#F8F6F3] rounded-2xl p-6 mb-4">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900">
                  {product.name}
                </h1>

                <span className="text-2xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="bg-[#F8F6F3] rounded-2xl p-6 mb-4">
              <h3 className="font-semibold text-gray-900 mb-3">
                Description
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {product.desc}
              </p>
            </div>

            <div className="bg-[#F8F6F3] rounded-2xl p-6 mb-4">
              <h3 className="font-semibold text-gray-900 mb-3">
                Material
              </h3>

              <ul className="space-y-2 text-gray-600">
                <li>• Solid oak frame with joinery construction</li>
                <li>
                  • Premium upholstery — Bouclé or performance fabric
                </li>
                <li>
                  • High-density foam seat cushions (28 lb density)
                </li>
              </ul>
            </div>

            <div className="bg-[#F8F6F3] rounded-2xl p-6 mb-4">
              <h3 className="font-semibold text-gray-900 mb-3">
                Color
              </h3>

              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() =>
                      setSelectedColor(product.colors.indexOf(color))
                    }
                    className={`w-12 h-12 rounded-xl border-2 transition-all ${
                      product.colors[selectedColor] === color
                        ? "border-[#C1714F] scale-110"
                        : "border-transparent"
                    }`}
                    style={{
                      backgroundColor: color,
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="bg-[#F8F6F3] rounded-2xl p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">
                Type
              </h3>

              <div className="flex gap-3">
                {product.types.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() =>
                      setSelectedType(product.types.indexOf(type))
                    }
                    className={`px-5 py-2 rounded-xl text-sm border transition-all ${
                      product.types[selectedType] === type
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

                <span className="w-14 text-center font-medium text-lg">
                  {qty}
                </span>

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
