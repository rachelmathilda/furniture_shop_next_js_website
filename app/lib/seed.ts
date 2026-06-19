export type Product = {
  id: string;
  category: string;
  name: string;
  img: string;
  price: number;
  sold: number;
  rating: number;
  style: string;
  description: string;
  materials: string[];
  colors: string[];
  types: string[];
};

const COLORS_PER_CATEGORY: Record<string, string[][]> = {
  Lamp: [
    ["#F5E6C8", "#E8D5A3", "#D4B896", "#C8A882", "#8B7355"],
    ["#E8E0D0", "#D4C8B4", "#C0B49A", "#A89278", "#7A6A58"],
    ["#F0E8DC", "#DDD0C0", "#C8B8A8", "#B4A090", "#8A7868"],
    ["#EAE0D0", "#D8CCC0", "#C4B8A8", "#B0A090", "#8A7868"],
    ["#F2EAE0", "#E0D4C8", "#CCC0B4", "#B8A89A", "#8A7868"],
    ["#EDE4D8", "#DDD4C8", "#CCC0B0", "#B8A8A0", "#908880"],
    ["#F0E8E0", "#E0D8D0", "#D0C8C0", "#C0B8B0", "#A09890"],
    ["#EAE2D8", "#DAD2C8", "#CAC2B8", "#BAB2A8", "#9A9290"],
    ["#EEE6DC", "#DEDAD0", "#CECAC0", "#BEBAB0", "#9E9A90"],
    ["#F0EAE2", "#E0DAD2", "#D0CAC2", "#C0BAB2", "#A09A92"],
    ["#EEE8E2", "#DEDCE6", "#CED2DA", "#BEC8CE", "#9EB8C2"],
  ],
  Cabinet: [
    ["#C8A882", "#B49060", "#A07848", "#8C6030", "#784818"],
    ["#D4C8B4", "#C0B49A", "#A89278", "#907060", "#704840"],
    ["#C4B8A8", "#B0A090", "#9C8C78", "#887060", "#685040"],
    ["#D0C4B0", "#BDB09C", "#AAA088", "#978070", "#776050"],
    ["#CCC0AC", "#B8AC98", "#A49C84", "#908070", "#706050"],
    ["#C8BCA8", "#B4A894", "#A09880", "#8C8470", "#6C6450"],
    ["#C4B8A4", "#B0A490", "#9C907C", "#887C68", "#685848"],
    ["#C0B4A0", "#ACA08C", "#988C78", "#847864", "#645444"],
    ["#BEB2A0", "#AAA08C", "#968C78", "#827864", "#626044"],
    ["#BEB4A4", "#AAA090", "#96907C", "#828068", "#626048"],
  ],
  Chair: [
    ["#F0E8DC", "#E0D0BC", "#C8B49A", "#A89278", "#7A6A58"],
    ["#E8E0D4", "#D8D0C4", "#C8C0B4", "#B8B0A4", "#989088"],
    ["#EAE2D8", "#DAD2C8", "#CAC2B8", "#BAB2A8", "#9A9290"],
    ["#EEE6DC", "#DEDAD0", "#CECAC0", "#BEBAB0", "#9E9A90"],
    ["#2C3E2D", "#3D5E40", "#4A7A50", "#6A9A68", "#8AC088"],
    ["#8B6914", "#A07828", "#B88830", "#D0A840", "#E8C860"],
    ["#2C2C3C", "#3C3C4C", "#4C4C5C", "#6C6C7C", "#8C8C9C"],
  ],
  Sofa: [
    ["#F5F0EB", "#E8D5C0", "#C8A882", "#8B7355", "#5C4A3A"],
    ["#4A6A8A", "#5A7A9A", "#6A8AAA", "#8AAAC8", "#AAC8E0"],
    ["#5A7A5A", "#6A8A6A", "#7A9A7A", "#9AB89A", "#BAD8BA"],
    ["#8B6914", "#A07828", "#B88830", "#D0A840", "#E8C860"],
    ["#F0E8DC", "#E0D4C8", "#D0C0B0", "#C0ACA0", "#A09080"],
    ["#8B4513", "#A05020", "#B86030", "#D08040", "#E8A060"],
  ],
  Vase: [
    ["#8DC5A8", "#6DB890", "#4CAA78", "#2A9A60", "#008A48"],
    ["#C8A882", "#B49060", "#A07848", "#8C6030", "#784818"],
    ["#4A4A5A", "#5A5A6A", "#6A6A7A", "#8A8A9A", "#AAAABC"],
  ],
};

const DESCRIPTIONS_PER_PRODUCT: Record<string, string[]> = {
  Lamp: [
    "A sculptural pendant crafted from hand-woven natural rattan. The open weave casts warm, dappled light across any room, creating an intimate, organic atmosphere.",
    "A sleek arc floor lamp with a hand-spun aluminum shade and a counterweighted marble base. Adjustable arm lets you direct light exactly where you need it.",
    "Inspired by the geometry of traditional basket weaving, this woven lamp shade diffuses light into a soft, even glow that turns any corner into a sanctuary.",
    "A classic dome pendant in powder-coated steel, designed to hang low over dining tables or kitchen islands. Clean lines, enduring quality.",
    "A minimalist cone pendant with a matte finish that complements Scandinavian and Japandi interiors. Simple, refined, and quietly beautiful.",
    "A spherical pendant with a perforated metal shell that casts a constellation of soft light across walls and ceilings.",
    "Stripped of all excess, this pendant is nothing but a slender stem and a clean shade. For spaces that let simplicity speak.",
    "Aged brass finish meets geometric precision in this statement pendant. A warm, glowing anchor for modern-classic interiors.",
    "Hand-thrown from stoneware clay, each shade is unique. The matte glaze absorbs ambient light while diffusing a soft, directional glow below.",
    "Natural rattan hand-woven into a flowing form that recalls traditional Indonesian craft. Each piece is slightly different — a signature of handmade quality.",
    "A softly draped linen shade over a brushed steel frame. The fabric glows warmly when lit, making evenings feel unhurried and calm.",
  ],
  Cabinet: [
    "Solid oak in a warm, natural finish with three wide doors and integrated handles. A timeless piece that brings warmth and order to any living space.",
    "A low, long console with clean lines and a two-tone finish — perfect as a TV unit, entryway table, or hallway accent.",
    "Slim profile, two asymmetric doors, and adjustable interior shelving. Fits neatly into narrower spaces without sacrificing storage.",
    "A wide, generous cabinet with four doors and an open center shelf. Built for families and collectors alike.",
    "Open shelving in solid oak with a natural oil finish. Arrange books, ceramics, and plants — then rearrange again.",
    "Deep walnut grain and brass hardware give this cabinet a rich, warm character that improves with age.",
    "Designed around your media setup — cable ports, adjustable shelves, and a low silhouette that keeps the focus on your screen.",
    "A floor-to-ceiling cabinet with a mix of open and closed storage. A complete organizational solution for living rooms and studies.",
    "A low sideboard with sliding doors and a minimalist profile. Sits beneath windows without blocking light.",
    "Designed to fit snugly into corners, this compact cabinet maximizes storage in underused spaces.",
  ],
  Chair: [
    "A rounded, pebble-shaped lounge chair upholstered in bouclé fabric. Sits low to the ground for maximum relaxation.",
    "A classic lounge chair with a tilted back and generous seat. Upholstered in performance fabric for everyday comfort.",
    "A bold accent chair with curved arms and a high back, designed to anchor a reading nook or living room corner.",
    "A barrel-shaped chair with a fully upholstered wraparound back. Cozy, enclosed, and quietly luxurious.",
    "High winged back, button-tufted upholstery, and tapered wood legs. A traditional form with contemporary proportions.",
    "A slender side chair that works at desks, dining tables, or simply as an elegant surface for throwing a coat.",
    "A swivel base chair upholstered in soft velvet with 360° rotation and a low, modern profile.",
  ],
  Sofa: [
    "Sink into cloud-like comfort with deep cushions, a solid beech frame, and your choice of premium bouclé or performance fabric.",
    "Fluid, wave-like arms and a deep seat make this sofa as sculptural as it is comfortable. A centerpiece for any living room.",
    "Earthy, grounded, and built to last. Terra's solid oak legs and high-density foam cushions strike the perfect balance of style and durability.",
    "A streamlined silhouette in matte slate fabric. Low arms, clean lines, and no wasted space — pure Scandinavian restraint.",
    "A plush, generous sofa with oversized cushions and a wide, welcoming seat. Built for long evenings and slow Sunday mornings.",
    "Soft sandy tones, rounded corners, and a deep, enveloping seat. The Dune feels like sinking into a sun-warmed beach.",
  ],
  Vase: [
    "Hand-thrown from stoneware and woven with natural rattan in a traditional Indonesian technique. No two are identical.",
    "A soft, rounded form in matte clay with an irregular rim that speaks to the hand that made it. Ideal for dried botanicals.",
    "A tall, slender cylinder in reactive glaze — the color shifts from deep teal at the base to pale celadon at the rim.",
  ],
};

const MATERIALS_PER_CATEGORY: Record<string, string[]> = {
  Lamp: "Natural rattan or linen shade | Powder-coated steel frame | E27 bulb socket (bulb not included) | Max 40W LED compatible | Canopy and cable included",
  Cabinet: "Solid oak or walnut frame | Soft-close hinges and drawer slides | Hand-rubbed oil finish | Adjustable interior shelving | Anti-tip wall anchor included",
  Chair: "Kiln-dried beech wood frame | High-resilience foam padding (32 lb density) | Removable, washable upholstery cover | Non-slip floor protectors | Available in fabric or leather",
  Sofa: "Solid pine and plywood frame | 8-way hand-tied spring system | Premium bouclé or performance fabric | Feather-blend back cushions | Solid beech or oak legs",
  Vase: "Stoneware clay body | Food-safe reactive glaze | Kiln-fired at 1280°C | Waterproof interior | Suitable for fresh or dried flowers",
} as unknown as Record<string, string[]>;

const TYPES: Record<string, string[]> = {
  Lamp: ["Pendant", "Floor", "Table"],
  Cabinet: ["2-Door", "3-Door", "Open Shelf"],
  Chair: ["Standard", "With Ottoman", "Rocking"],
  Sofa: ["2-Seater", "3-Seater", "L-Shape"],
  Vase: ["Small", "Medium", "Large"],
};

const STYLE_LIST = ["Classic", "Vintage", "Minimalist", "Bohemian", "Japandi", "Rustic", "Industrial"];
const SOLD = [12, 8, 24, 5, 17, 9, 31, 3, 14, 7, 11];
const RATINGS = [4.5, 4.3, 4.8, 4.1, 4.6, 4.4, 4.7, 4.2, 4.9, 4, 4.5];

const generate = (
  category: string,
  base: string,
  count: number,
  prices: number[],
  names: string[]
): Product[] =>
  Array.from({ length: count }, (_, i) => ({
    id: `${base}-${i}`,
    category,
    name: names[i],
    img: i === 0 ? `/assets/${base}.jpg` : `/assets/${base} ${i + 1}.jpg`,
    price: prices[i],
    sold: SOLD[i % SOLD.length],
    rating: RATINGS[i % RATINGS.length],
    style: STYLE_LIST[i % STYLE_LIST.length],
    description: DESCRIPTIONS_PER_PRODUCT[category][i] ?? DESCRIPTIONS_PER_PRODUCT[category][0],
    materials: (MATERIALS_PER_CATEGORY[category] as unknown as string).split(" | "),
    colors: COLORS_PER_CATEGORY[category][i] ?? COLORS_PER_CATEGORY[category][0],
    types: TYPES[category],
  }));

export const PRODUCTS: Product[] = [
  ...generate(
    "Lamp", "lamp", 11,
    [320, 180, 240, 290, 150, 210, 175, 260, 195, 310, 220],
    ["Pendant Lamp", "Arc Lamp", "Woven Lamp", "Dome Lamp", "Cone Lamp",
      "Globe Lamp", "Minimal Lamp", "Brass Lamp", "Clay Lamp", "Rattan Lamp", "Linen Lamp"]
  ),
  ...generate(
    "Cabinet", "cabinet", 10,
    [580, 420, 490, 640, 380, 520, 460, 710, 390, 430],
    ["Oak Sideboard", "Drift Console", "Slim Cabinet", "Wide Cabinet", "Open Shelf",
      "Walnut Cabinet", "Media Console", "Tall Cabinet", "Low Board", "Corner Cabinet"]
  ),
  ...generate(
    "Chair", "chair", 7,
    [340, 280, 310, 260, 390, 220, 450],
    ["Pebble Chair", "Lounge Chair", "Accent Chair", "Barrel Chair",
      "Wing Chair", "Side Chair", "Swivel Chair"]
  ),
  ...generate(
    "Sofa", "sofa", 6,
    [920, 1100, 860, 780, 950, 1050],
    ["Lumen Sofa", "Wave Sofa", "Terra Sofa", "Slate Sofa", "Moss Sofa", "Dune Sofa"]
  ),
  ...generate(
    "Vase", "vase", 3,
    [120, 95, 140],
    ["Webbing Vase", "Clay Vase", "Tall Vase"]
  ),
];

export const CATEGORIES = ["Lamp", "Cabinet", "Chair", "Sofa", "Vase"];

export const STYLES = [
  "Classic", "Vintage", "Minimalist", "Industrial", "Japandi", "Rustic", "Bohemian",
];
