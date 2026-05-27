"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import { useState } from "react";

const FurnitureScene = dynamic(
  () => import("@/components/3d/FurnitureScene"),
  { ssr: false }
);

const FABRIC_OPTIONS = [
  { id: "natural-linen", name: "Natural Linen", color: "#F0E8DC" },
  { id: "warm-boucle", name: "Warm Bouclé", color: "#E8D5C0" },
  { id: "slate-velvet", name: "Slate Velvet", color: "#8B8B8B" },
  { id: "forest-green", name: "Forest Green", color: "#5A7A5A" },
  { id: "ocean-blue", name: "Ocean Blue", color: "#4A6A8A" },
  { id: "blush-pink", name: "Blush Pink", color: "#D4A0A0" },
];

const LEG_OPTIONS = [
  { id: "natural-oak", name: "Natural Oak" },
  { id: "dark-walnut", name: "Dark Walnut" },
  { id: "matte-black", name: "Matte Black" },
  { id: "polished-brass", name: "Polished Brass" },
];

export default function CustomPage() {
  const [fabric, setFabric] = useState(0);
  const [legs, setLegs] = useState(0);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAIPrompt = async () => {
    if (!prompt.trim()) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F8F6F3]">
      <Navbar />

      <div className="flex flex-col h-[calc(100vh-70px)]">
        <div className="flex-1 relative bg-[#F5F0EB]">
          <FurnitureScene
            fabricColor={FABRIC_OPTIONS[fabric].color}
            legStyle={LEG_OPTIONS[legs].name}
          />

          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-gray-600">
            Drag to rotate · Scroll to zoom
          </div>
        </div>

        <div className="bg-white border-t border-gray-100 px-8 py-5">
          <div className="max-w-[1200px] mx-auto flex gap-10">
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-700 mb-3">
                Fabric / Material
              </p>

              <div className="flex gap-3">
                {FABRIC_OPTIONS.map((f, i) => (
                  <button
                    key={f.id}
                    onClick={() => setFabric(i)}
                    title={f.name}
                    className={`w-10 h-10 rounded-lg transition-all border-2 ${
                      fabric === i
                        ? "border-[#C1714F] scale-110"
                        : "border-transparent hover:border-gray-300"
                    }`}
                    style={{ backgroundColor: f.color }}
                  />
                ))}
              </div>
            </div>

            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-700 mb-3">
                Leg Style
              </p>

              <div className="flex gap-2 flex-wrap">
                {LEG_OPTIONS.map((l, i) => (
                  <button
                    key={l.id}
                    onClick={() => setLegs(i)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium border transition-colors ${
                      legs === i
                        ? "border-[#C1714F] bg-[#F5F0EB] text-[#C1714F]"
                        : "border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {l.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-700 mb-3">
                AI Design Prompt
              </p>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. minimalist japandi sofa with brass legs..."
                  className="flex-1 border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-[#C1714F] transition-colors"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />

                <button
                  onClick={handleAIPrompt}
                  disabled={loading}
                  className="btn-primary text-sm px-4 py-2 disabled:opacity-60"
                >
                  {loading ? "..." : "Apply"}
                </button>
              </div>
            </div>

            <div className="flex items-end">
              <button className="btn-primary whitespace-nowrap">
                Add Custom to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
