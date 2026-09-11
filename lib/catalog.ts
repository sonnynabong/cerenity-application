export type CitationKind = "structured" | "document";

export type Citation = {
  kind: CitationKind;
  title: string;
  snippet: string;
};

export type Product = {
  sku: string;
  name: string;
  category: string;
  priceCents: number;
  stock: number;
  owner: string;
};

export type Employee = {
  name: string;
  role: string;
  department: string;
  email: string;
  location: string;
};

export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  role: ChatRole;
  content: string;
  citations: Citation[];
  createdAt: number;
};

export const SEED_PRODUCTS: Product[] = [
  {
    sku: "CER-101",
    name: "Calm Drops",
    category: "supplements",
    priceCents: 2499,
    stock: 40,
    owner: "Maya Chen",
  },
  {
    sku: "CER-102",
    name: "Sleep Tea",
    category: "beverages",
    priceCents: 1899,
    stock: 120,
    owner: "Jordan Hale",
  },
  {
    sku: "CER-103",
    name: "Focus Chews",
    category: "supplements",
    priceCents: 2199,
    stock: 75,
    owner: "Maya Chen",
  },
  {
    sku: "CER-104",
    name: "Pulse Band",
    category: "wearables",
    priceCents: 12900,
    stock: 18,
    owner: "Sam Ortiz",
  },
  {
    sku: "CER-105",
    name: "Aura Mat",
    category: "recovery",
    priceCents: 8900,
    stock: 22,
    owner: "Priya Shah",
  },
  {
    sku: "CER-106",
    name: "Night Oil",
    category: "supplements",
    priceCents: 3299,
    stock: 54,
    owner: "Maya Chen",
  },
  {
    sku: "CER-107",
    name: "Breath Kit",
    category: "recovery",
    priceCents: 4599,
    stock: 31,
    owner: "Jordan Hale",
  },
  {
    sku: "CER-108",
    name: "Desk Light",
    category: "workspace",
    priceCents: 7400,
    stock: 12,
    owner: "Sam Ortiz",
  },
  {
    sku: "CER-109",
    name: "Hydrate Mix",
    category: "beverages",
    priceCents: 1599,
    stock: 200,
    owner: "Priya Shah",
  },
  {
    sku: "CER-110",
    name: "Stretch Bands",
    category: "recovery",
    priceCents: 2799,
    stock: 88,
    owner: "Jordan Hale",
  },
  {
    sku: "CER-111",
    name: "Quiet Buds",
    category: "wearables",
    priceCents: 15900,
    stock: 9,
    owner: "Sam Ortiz",
  },
  {
    sku: "CER-112",
    name: "Morning Blend",
    category: "beverages",
    priceCents: 2199,
    stock: 64,
    owner: "Priya Shah",
  },
];

export const SEED_EMPLOYEES: Employee[] = [
  {
    name: "Maya Chen",
    role: "Head of Product",
    department: "Product",
    email: "maya.chen@cerenity.test",
    location: "Manila",
  },
  {
    name: "Jordan Hale",
    role: "Wellness Lead",
    department: "Clinical",
    email: "jordan.hale@cerenity.test",
    location: "Singapore",
  },
  {
    name: "Sam Ortiz",
    role: "Hardware PM",
    department: "Product",
    email: "sam.ortiz@cerenity.test",
    location: "Austin",
  },
  {
    name: "Priya Shah",
    role: "Supply Chain",
    department: "Operations",
    email: "priya.shah@cerenity.test",
    location: "London",
  },
  {
    name: "Alex Rivera",
    role: "People Ops",
    department: "People",
    email: "alex.rivera@cerenity.test",
    location: "Remote",
  },
  {
    name: "Chris Novak",
    role: "Support Lead",
    department: "Support",
    email: "chris.novak@cerenity.test",
    location: "Manila",
  },
  {
    name: "Riley Cho",
    role: "Finance Partner",
    department: "Finance",
    email: "riley.cho@cerenity.test",
    location: "Singapore",
  },
  {
    name: "Dana Okonkwo",
    role: "Counsel",
    department: "Legal",
    email: "dana.okonkwo@cerenity.test",
    location: "London",
  },
];
