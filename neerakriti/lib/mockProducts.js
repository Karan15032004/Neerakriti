// lib/mockProducts.js
// These 6 products mirror the exact MongoDB schema we locked.
// Shape: _id, name, price, description, images[], category,
//        size, tags[], careInstructions, isBundle, isCustomizable, createdAt

const mockProducts = [
  {
    _id: "1",
    name: "Seven Chakras Mandala Plate",
    price: 2400,
    description:
      "A hand-painted dot mandala representing all seven chakras in vibrant gem hues. Every dot placed by hand on a 12-inch MDF plate, sealed for longevity.",
    images: [],  // Real image URLs go here in Phase 4
    category: "Wall Decor",
    size: "12in",
    tags: ["Best Seller", "Diwali"],
    careInstructions: "Wipe with a dry cloth. Avoid moisture and direct sunlight.",
    isBundle: false,
    isCustomizable: false,
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    _id: "2",
    name: "Evil Eye Protection Mandala",
    price: 1800,
    description:
      "Deep indigo evil-eye mandala with pearl-white dot work. Traditionally believed to ward off negative energy. Hand-painted on a 10-inch MDF plate.",
    images: [],
    category: "Wall Decor",
    size: "10in",
    tags: ["Best Under Personalised Gifts"],
    careInstructions: "Wipe with a dry cloth. Avoid moisture.",
    isBundle: false,
    isCustomizable: true,  // Can be personalised with a name or message
    createdAt: "2024-02-01T10:00:00Z",
  },
  {
    _id: "3",
    name: "Bridal Mirror Jharoka Frame",
    price: 4500,
    description:
      "A grand jharoka-style mirror frame with intricate dot mandala work in antique gold and burgundy. A statement piece for a wedding home.",
    images: [],
    category: "Jharokhas",
    size: "16in",
    tags: ["Best Seller", "Wedding Season"],
    careInstructions: "Handle with care. Wipe frame with a dry cloth. Do not apply cleaners to the painted surface.",
    isBundle: false,
    isCustomizable: true,
    createdAt: "2024-02-10T10:00:00Z",
  },
  {
    _id: "4",
    name: "Diwali Gift Hamper",
    price: 3200,
    description:
      "A curated Diwali gift set with three hand-painted pieces: a 10-inch chakra plate, a pair of painted diyas, and a 5x7 photo frame — all in coordinating festive tones.",
    images: [],
    category: "Gift Bundles",
    size: null,         // Bundles don't have a single size
    tags: ["Diwali"],
    careInstructions: "Individual care instructions included with each piece.",
    isBundle: true,     // This is a bundle — used later to render differently
    isCustomizable: false,
    createdAt: "2024-02-15T10:00:00Z",
  },
  {
    _id: "5",
    name: "Lotus Bloom Photo Frame",
    price: 1600,
    description:
      "A 5x7 inch photo frame surrounded by hand-painted lotus mandala in blush pink and dusty gold. A deeply personal gift for birthdays, anniversaries, or housewarmings.",
    images: [],
    category: "Photo Frames",
    size: "5x7in",
    tags: ["Best Under Personalised Gifts", "Wedding Season"],
    careInstructions: "Wipe with a dry cloth.",
    isBundle: false,
    isCustomizable: true,
    createdAt: "2024-03-01T10:00:00Z",
  },
  {
    _id: "6",
    name: "Geometric Sun Mandala",
    price: 2000,
    description:
      "A bold geometric sun mandala in warm terracotta and dusty gold on a 12-inch canvas board. Minimal, striking, and at home in any modern interior.",
    images: [],
    category: "Paintings",
    size: "12in",
    tags: [],
    careInstructions: "Keep away from direct sunlight to preserve colour.",
    isBundle: false,
    isCustomizable: false,
    createdAt: "2024-03-10T10:00:00Z",
  },
];

export default mockProducts;