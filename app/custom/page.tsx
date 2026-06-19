"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import { useState, useRef, useCallback } from "react";

const FurnitureScene = dynamic(
  () => import("@/components/3d/FurnitureScene"),
  { ssr: false }
);

const FABRIC_OPTIONS = [
  { id: "natural-linen", name: "Natural Linen", color: "#F0E8DC", priceAdd: 0 },
  { id: "warm-boucle", name: "Warm Bouclé", color: "#E8D5C0", priceAdd: 80 },
  { id: "slate-velvet", name: "Slate Velvet", color: "#8B8B8B", priceAdd: 120 },
  { id: "forest-green", name: "Forest Green", color: "#5A7A5A", priceAdd: 100 },
  { id: "ocean-blue", name: "Ocean Blue", color: "#4A6A8A", priceAdd: 100 },
  { id: "blush-pink", name: "Blush Pink", color: "#D4A0A0", priceAdd: 80 },
  { id: "terracotta", name: "Terracotta", color: "#C1714F", priceAdd: 90 },
  { id: "charcoal", name: "Charcoal", color: "#3A3A3A", priceAdd: 110 },
];

const LEG_OPTIONS = [
  { id: "natural-oak", name: "Natural Oak", color: "#C8A87A", priceAdd: 0 },
  { id: "dark-walnut", name: "Dark Walnut", color: "#3A2A1A", priceAdd: 60 },
  { id: "matte-black", name: "Matte Black", color: "#1A1A1A", priceAdd: 40 },
  { id: "polished-brass", name: "Polished Brass", color: "#C8960C", priceAdd: 150 },
  { id: "white", name: "White", color: "#F5F5F5", priceAdd: 30 },
];

const FURNITURE_TYPES = [
  { id: "sofa-chair", name: "Sofa + Chair", basePrice: 1800 },
  { id: "sofa", name: "Sofa Only", basePrice: 1200 },
  { id: "chair", name: "Chair Only", basePrice: 600 },
];

const ARM_STYLES = [
  { id: "standard", name: "Standard Arms", priceAdd: 0 },
  { id: "low", name: "Low Arms", priceAdd: -30 },
  { id: "none", name: "No Arms", priceAdd: -80 },
] as const;

const BACK_STYLES = [
  { id: "low", name: "Low Back", priceAdd: -50 },
  { id: "standard", name: "Standard", priceAdd: 0 },
  { id: "high", name: "High Back", priceAdd: 80 },
] as const;

export type FurnitureConfig = {
  fabricColor: string;
  legStyle: string;
  legColor: string;
  furnitureType: string;
  sofaWidth: number;
  sofaDepth: number;
  sofaHeight: number;
  armStyle: "standard" | "low" | "none";
  backStyle: "standard" | "high" | "low";
  cushionCount: number;
  objUrl: string | null;
};

function calculatePrice(config: FurnitureConfig): number {
  const furnitureType = FURNITURE_TYPES.find((f) => f.id === config.furnitureType);
  const fabric = FABRIC_OPTIONS.find((f) => f.color === config.fabricColor);
  const leg = LEG_OPTIONS.find((l) => l.color === config.legColor);
  const arm = ARM_STYLES.find((a) => a.id === config.armStyle);
  const back = BACK_STYLES.find((b) => b.id === config.backStyle);

  const base = furnitureType?.basePrice ?? 1200;
  const fabricAdd = fabric?.priceAdd ?? 0;
  const legAdd = leg?.priceAdd ?? 0;
  const armAdd = arm?.priceAdd ?? 0;
  const backAdd = back?.priceAdd ?? 0;
  const cushionAdd = (config.cushionCount - 2) * 40;

  const sizeMultiplier =
    config.sofaWidth * 0.4 + config.sofaDepth * 0.3 + config.sofaHeight * 0.3;

  const subtotal = (base + fabricAdd + legAdd + armAdd + backAdd + cushionAdd) * sizeMultiplier;

  if (config.objUrl) return Math.round(subtotal * 1.2);
  return Math.round(subtotal);
}

export default function CustomPage() {
  const [config, setConfig] = useState<FurnitureConfig>({
    fabricColor: "#F0E8DC",
    legStyle: "Natural Oak",
    legColor: "#C8A87A",
    furnitureType: "sofa-chair",
    sofaWidth: 1.0,
    sofaDepth: 1.0,
    sofaHeight: 1.0,
    armStyle: "standard",
    backStyle: "standard",
    cushionCount: 2,
    objUrl: null,
  });

  const [activeTab, setActiveTab] = useState<"material" | "shape" | "details" | "import">("material");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const update = useCallback(<K extends keyof FurnitureConfig>(key: K, value: FurnitureConfig[K]) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleFile = useCallback((file: File) => {
    if (!file.name.endsWith(".obj")) return;
    const url = URL.createObjectURL(file);
    update("objUrl", url);
  }, [update]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const estimatedPrice = calculatePrice(config);

  return (
    <div className="h-screen bg-[#F5F0EB] flex flex-col overflow-hidden">
      <Navbar />

      <div className="flex flex-1 min-h-0">
        <div className="flex-1 relative min-h-0">
          <FurnitureScene config={config} />

          <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-white/70 backdrop-blur-md px-5 py-2 rounded-full text-xs text-gray-500 tracking-wide shadow-sm pointer-events-none">
            Drag to rotate · Scroll to zoom · Right-click to pan
          </div>

          <div className="absolute bottom-5 left-5 bg-white/80 backdrop-blur-md px-4 py-2 rounded-xl shadow-sm">
            <p className="text-xs text-gray-400 mb-0.5">Material</p>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full border border-gray-200" style={{ backgroundColor: config.fabricColor }} />
              <p className="text-sm font-semibold text-gray-800">
                {FABRIC_OPTIONS.find((f) => f.color === config.fabricColor)?.name ?? "Custom"}
              </p>
            </div>
          </div>

          <div className="absolute bottom-5 right-5 bg-white/80 backdrop-blur-md px-4 py-2 rounded-xl shadow-sm">
            <p className="text-xs text-gray-400 mb-0.5">Legs</p>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full border border-gray-200" style={{ backgroundColor: config.legColor }} />
              <p className="text-sm font-semibold text-gray-800">{config.legStyle}</p>
            </div>
          </div>

          {config.objUrl && (
            <div className="absolute top-5 right-5 bg-[#C1714F] text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm flex items-center gap-2">
              <span>●</span> Custom OBJ loaded
              <button
                onClick={() => update("objUrl", null)}
                className="ml-1 hover:opacity-70 transition-opacity"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        <div className="w-[340px] bg-white flex flex-col shadow-xl min-h-0">
          <div className="p-5 border-b border-gray-100 flex-shrink-0">
            <h2 className="text-lg font-bold text-gray-900">3D Editor</h2>
            <p className="text-xs text-gray-400 mt-0.5">Customize your furniture</p>
          </div>

          <div className="flex border-b border-gray-100 flex-shrink-0">
            {(["material", "shape", "details", "import"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2.5 text-[10px] font-semibold uppercase tracking-wider transition-colors ${
                  activeTab === tab
                    ? "text-[#C1714F] border-b-2 border-[#C1714F]"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto min-h-0">
            {activeTab === "material" && (
              <div className="p-5 space-y-6">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
                    Fabric Color
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    {FABRIC_OPTIONS.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => update("fabricColor", f.color)}
                        title={f.name}
                        className={`flex flex-col items-center gap-1.5 p-2 rounded-xl border-2 transition-all ${
                          config.fabricColor === f.color
                            ? "border-[#C1714F] bg-[#FDF5F0]"
                            : "border-transparent hover:border-gray-200 bg-gray-50"
                        }`}
                      >
                        <div className="w-9 h-9 rounded-lg shadow-sm" style={{ backgroundColor: f.color }} />
                        <span className="text-[9px] text-gray-500 text-center leading-tight">{f.name}</span>
                        {f.priceAdd > 0 && (
                          <span className="text-[8px] text-[#C1714F] font-semibold">+${f.priceAdd}</span>
                        )}
                      </button>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <input
                      type="color"
                      value={config.fabricColor}
                      onChange={(e) => update("fabricColor", e.target.value)}
                      className="w-10 h-10 rounded-lg cursor-pointer border-0 bg-transparent"
                    />
                    <div>
                      <p className="text-xs font-medium text-gray-700">Custom Color</p>
                      <p className="text-xs text-gray-400">{config.fabricColor.toUpperCase()}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
                    Leg Finish
                  </p>
                  <div className="space-y-2">
                    {LEG_OPTIONS.map((l) => (
                      <button
                        key={l.id}
                        onClick={() => { update("legStyle", l.name); update("legColor", l.color); }}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-all text-sm ${
                          config.legStyle === l.name
                            ? "border-[#C1714F] bg-[#FDF5F0] text-[#C1714F] font-semibold"
                            : "border-gray-100 bg-gray-50 text-gray-700 hover:border-gray-200"
                        }`}
                      >
                        <div className="w-6 h-6 rounded-md shadow-sm flex-shrink-0 border border-gray-200" style={{ backgroundColor: l.color }} />
                        <span className="flex-1 text-left">{l.name}</span>
                        {l.priceAdd > 0 && (
                          <span className="text-[10px] text-[#C1714F] font-semibold">+${l.priceAdd}</span>
                        )}
                      </button>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <input
                      type="color"
                      value={config.legColor}
                      onChange={(e) => { update("legColor", e.target.value); update("legStyle", "Custom"); }}
                      className="w-10 h-10 rounded-lg cursor-pointer border-0 bg-transparent"
                    />
                    <div>
                      <p className="text-xs font-medium text-gray-700">Custom Leg Color</p>
                      <p className="text-xs text-gray-400">{config.legColor.toUpperCase()}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "shape" && (
              <div className="p-5 space-y-6">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
                    Furniture Type
                  </p>
                  <div className="space-y-2">
                    {FURNITURE_TYPES.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => update("furnitureType", t.id)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                          config.furnitureType === t.id
                            ? "border-[#C1714F] bg-[#FDF5F0] text-[#C1714F]"
                            : "border-gray-100 bg-gray-50 text-gray-700 hover:border-gray-200"
                        }`}
                      >
                        <span>{t.name}</span>
                        <span className="text-xs font-bold">${t.basePrice}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {[
                  { key: "sofaWidth" as const, label: "Width", low: "Compact", mid: "Standard", high: "Wide" },
                  { key: "sofaDepth" as const, label: "Depth", low: "Shallow", mid: "Standard", high: "Deep" },
                  { key: "sofaHeight" as const, label: "Height", low: "Low", mid: "Standard", high: "Tall" },
                ].map(({ key, label, low, mid, high }) => (
                  <div key={key}>
                    <div className="flex justify-between mb-2">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">{label}</p>
                      <span className="text-xs font-bold text-[#C1714F]">
                        {config[key] < 0.7 ? low : config[key] < 1.1 ? mid : high}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0.5}
                      max={1.5}
                      step={0.05}
                      value={config[key]}
                      onChange={(e) => update(key, parseFloat(e.target.value))}
                      className="w-full accent-[#C1714F]"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                      <span>{low}</span>
                      <span>{mid}</span>
                      <span>{high}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "details" && (
              <div className="p-5 space-y-6">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
                    Arm Style
                  </p>
                  <div className="space-y-2">
                    {ARM_STYLES.map((style) => (
                      <button
                        key={style.id}
                        onClick={() => update("armStyle", style.id)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                          config.armStyle === style.id
                            ? "border-[#C1714F] bg-[#FDF5F0] text-[#C1714F]"
                            : "border-gray-100 bg-gray-50 text-gray-600 hover:border-gray-200"
                        }`}
                      >
                        <span>{style.name}</span>
                        <span className="text-xs font-semibold">
                          {style.priceAdd === 0 ? "Included" : style.priceAdd > 0 ? `+$${style.priceAdd}` : `-$${Math.abs(style.priceAdd)}`}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
                    Back Style
                  </p>
                  <div className="space-y-2">
                    {BACK_STYLES.map((style) => (
                      <button
                        key={style.id}
                        onClick={() => update("backStyle", style.id)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                          config.backStyle === style.id
                            ? "border-[#C1714F] bg-[#FDF5F0] text-[#C1714F]"
                            : "border-gray-100 bg-gray-50 text-gray-600 hover:border-gray-200"
                        }`}
                      >
                        <span>{style.name}</span>
                        <span className="text-xs font-semibold">
                          {style.priceAdd === 0 ? "Included" : style.priceAdd > 0 ? `+$${style.priceAdd}` : `-$${Math.abs(style.priceAdd)}`}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-3">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Cushions</p>
                    <span className="text-xs font-bold text-[#C1714F]">
                      {config.cushionCount} {config.cushionCount === 1 ? "cushion" : "cushions"}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4].map((n) => (
                      <button
                        key={n}
                        onClick={() => update("cushionCount", n)}
                        className={`flex-1 py-3 rounded-xl border text-sm font-bold transition-all ${
                          config.cushionCount === n
                            ? "border-[#C1714F] bg-[#FDF5F0] text-[#C1714F]"
                            : "border-gray-100 bg-gray-50 text-gray-600 hover:border-gray-200"
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] text-gray-400 mt-2 text-center">
                    Extra cushions +$40 each (base: 2)
                  </p>
                </div>
              </div>
            )}

            {activeTab === "import" && (
              <div className="p-5 space-y-5">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">
                    Import OBJ File
                  </p>
                  <p className="text-xs text-gray-400 mb-4">
                    Upload your own 3D model in .obj format. Material and color settings will still apply.
                  </p>

                  <div
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all ${
                      isDragging
                        ? "border-[#C1714F] bg-[#FDF5F0]"
                        : config.objUrl
                        ? "border-green-400 bg-green-50"
                        : "border-gray-200 hover:border-[#C1714F] hover:bg-[#FDF5F0]"
                    }`}
                  >
                    <div className="text-3xl">
                      {config.objUrl ? "✓" : "⬆"}
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-semibold text-gray-700">
                        {config.objUrl ? "OBJ file loaded!" : "Drop .obj file here"}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {config.objUrl ? "Click to replace" : "or click to browse"}
                      </p>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".obj"
                      className="hidden"
                      onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
                    />
                  </div>

                  {config.objUrl && (
                    <button
                      onClick={() => update("objUrl", null)}
                      className="w-full mt-3 py-2.5 rounded-xl border border-red-200 text-red-500 text-sm font-medium hover:bg-red-50 transition-colors"
                    >
                      Remove OBJ
                    </button>
                  )}
                </div>

                <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                  <p className="text-xs font-semibold text-gray-600">Tips</p>
                  <p className="text-xs text-gray-400">• Use Blender or Spline to export .obj</p>
                  <p className="text-xs text-gray-400">• Keep polygon count under 50k for best performance</p>
                  <p className="text-xs text-gray-400">• Fabric color and leg style will still apply</p>
                  <p className="text-xs text-gray-400">• Custom models add 20% to base price</p>
                </div>
              </div>
            )}
          </div>

          <div className="p-5 border-t border-gray-100 flex-shrink-0">
            <div className="bg-gray-50 rounded-xl p-3 mb-3 space-y-1.5">
              <div className="flex justify-between text-xs text-gray-500">
                <span>Base ({FURNITURE_TYPES.find((f) => f.id === config.furnitureType)?.name})</span>
                <span>${FURNITURE_TYPES.find((f) => f.id === config.furnitureType)?.basePrice}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Fabric</span>
                <span>+${FABRIC_OPTIONS.find((f) => f.color === config.fabricColor)?.priceAdd ?? 0}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Legs</span>
                <span>+${LEG_OPTIONS.find((l) => l.color === config.legColor)?.priceAdd ?? 0}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Size multiplier</span>
                <span>×{(config.sofaWidth * 0.4 + config.sofaDepth * 0.3 + config.sofaHeight * 0.3).toFixed(2)}</span>
              </div>
              {config.objUrl && (
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Custom model</span>
                  <span>+20%</span>
                </div>
              )}
              <div className="border-t border-gray-200 pt-1.5 flex justify-between text-sm font-bold text-gray-900">
                <span>Total</span>
                <span>${estimatedPrice.toLocaleString()}</span>
              </div>
            </div>
            <button className="w-full btn-primary py-3.5 text-sm font-semibold">
              Add Custom to Cart
            </button>
            <p className="text-center text-xs text-gray-400 mt-2">
              Free consultation · 30-day returns
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
