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

const STYLE_LIST = ["Classic", "Vintage", "Minimalist", "Bohemian", "Japandi", "Rustic", "Industrial"];

const DESCRIPTIONS: Record<string, string> = {
  Lamp: "Handcrafted with natural materials, this lamp brings warm ambient light and organic texture to any corner of your home. Designed to complement both minimalist and eclectic interiors.",
  Cabinet: "Built from solid hardwood with precision joinery, this piece offers generous storage while maintaining a clean, refined silhouette that elevates any living space.",
  Chair: "Ergonomically sculpted with premium upholstery and solid wood legs. Equally at home as a statement accent piece or a functional everyday seat.",
  Sofa: "Sink into cloud-like comfort with high-density foam cushions and a durable frame built to last decades. Available in a curated selection of fabric finishes.",
  Vase: "Wheel-thrown and hand-glazed by artisan potters, each piece carries subtle variations that make it truly one of a kind. A quiet centerpiece for any shelf or table.",
};

const MATERIALS: Record<string, string[]> = {
  Lamp: [
    "Natural rattan or linen shade",
    "Powder-coated steel frame",
    "E27 bulb socket (bulb not included)",
  ],
  Cabinet: [
    "Solid oak or walnut frame",
    "Soft-close hinges and drawer slides",
    "Hand-rubbed oil finish",
  ],
  Chair: [
    "Kiln-dried beech wood frame",
    "High-resilience foam padding",
    "Removable, washable upholstery cover",
  ],
  Sofa: [
    "Solid pine and plywood frame",
    "8-way hand-tied spring system",
    "Premium bouclé or performance fabric",
  ],
  Vase: [
    "Stoneware clay body",
    "Food-safe reactive glaze",
    "Kiln-fired at 1280°C",
  ],
};

const TYPES: Record<string, string[]> = {
  Lamp: ["Pendant", "Floor", "Table"],
  Cabinet: ["2-Door", "3-Door", "Open Shelf"],
  Chair: ["Standard", "With Ottoman", "Rocking"],
  Sofa: ["2-Seater", "3-Seater", "L-Shape"],
  Vase: ["Small", "Medium", "Large"],
};

const COLORS = ["#F0E8DC", "#E0D0BC", "#C8B49A", "#A89278", "#7A6A58"];

const SOLD = [12, 8, 24, 5, 17, 9, 31, 3, 14, 7, 11];
const RATINGS = [4.5, 4.3, 4.8, 4.1, 4.6, 4.4, 4.7, 4.2, 4.9, 4.0, 4.5];

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
    description: DESCRIPTIONS[category],
    materials: MATERIALS[category],
    colors: COLORS,
    types: TYPES[category],
  }));

export const PRODUCTS: Product[] = [
  ...generate(
    "Lamp", "lamp", 11,
    [320, 180, 240, 290, 150, 210, 175, 260, 195, 310, 220],
    [
      "Pendant Lamp", "Arc Lamp", "Woven Lamp", "Dome Lamp", "Cone Lamp",
      "Globe Lamp", "Minimal Lamp", "Brass Lamp", "Clay Lamp", "Rattan Lamp", "Linen Lamp",
    ]
  ),
  ...generate(
    "Cabinet", "cabinet", 10,
    [580, 420, 490, 640, 380, 520, 460, 710, 390, 430],
    [
      "Oak Sideboard", "Drift Console", "Slim Cabinet", "Wide Cabinet", "Open Shelf",
      "Walnut Cabinet", "Media Console", "Tall Cabinet", "Low Board", "Corner Cabinet",
    ]
  ),
  ...generate(
    "Chair", "chair", 7,
    [340, 280, 310, 260, 390, 220, 450],
    [
      "Pebble Chair", "Lounge Chair", "Accent Chair", "Barrel Chair",
      "Wing Chair", "Side Chair", "Swivel Chair",
    ]
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
