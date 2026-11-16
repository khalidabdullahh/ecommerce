import { Product } from "@/types";

export const initialProducts: Product[] = [
  {
    id: "p1",
    title: "Autumn and Winter fleece-lined Denim Jacket",
    banglaTitle: "উইন্টার ফ্লিস-লাইন্ড প্রিমিয়াম ডেনিম জ্যাকেট",
    category: "Mens Fashion",
    price: 1273,
    originalPrice: 1750,
    rating: 4.8,
    soldCount: "100 sold",
    images: [
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=80"
    ],
    description: "উচ্চমানের ডেনিম ফেব্রিক এবং ভেতরে সফট ফ্লিস লাইনিং যা আপনাকে কনকনে শীতেও রাখবে আরামদায়ক ও ফ্যাশনেবল। স্টাইলিশ কলার ও পকেট ডিজাইন।",
    sizes: ["M", "L", "XL", "XXL"],
    colors: [
      { name: "Denim Blue", hex: "#3b82f6" },
      { name: "Deep Indigo", hex: "#1e3a8a" },
      { name: "Vintage Wash", hex: "#60a5fa" }
    ],
    isPopular: true,
    isFeatured: true,
    inStock: true,
    tags: ["winter", "denim", "jacket", "mens"]
  },
  {
    id: "p2",
    title: "Wavy fleece hooded zip-up jacket, autumn winter",
    banglaTitle: "ওয়েভি ফ্লিস হুডেড জিপ-আপ জ্যাকেট",
    category: "Winter Wear",
    price: 2407,
    originalPrice: 2950,
    rating: 5.0,
    soldCount: "40 sold",
    images: [
      "https://images.unsplash.com/photo-1544441893-675973e31985?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?w=800&auto=format&fit=crop&q=80"
    ],
    description: "মডার্ন কোরিয়ান স্টাইল ওভারসাইজড হুডি জ্যাকেট। ডাবল লেয়ার ফ্লিস ফেব্রিক যা হালকা কিন্তু প্রচণ্ড উষ্ণ। প্রিমিয়াম মেটাল জিপার।",
    sizes: ["M", "L", "XL"],
    colors: [
      { name: "Mustard Gold", hex: "#d97706" },
      { name: "Cream White", hex: "#fef3c7" },
      { name: "Onyx Black", hex: "#18181b" }
    ],
    isPopular: true,
    isFeatured: true,
    inStock: true,
    tags: ["hoodie", "fleece", "unisex", "winter"]
  },
  {
    id: "p3",
    title: "Men's Hooded Mid-Length Thin Velvet Coat",
    banglaTitle: "মেনস হুডেড মিড-লেন্থ কোট উইন্টার জ্যাকেট",
    category: "Mens Fashion",
    price: 695,
    originalPrice: 999,
    rating: 4.5,
    soldCount: "100 sold",
    images: [
      "https://images.unsplash.com/photo-1520975954732-35dd22299614?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=800&auto=format&fit=crop&q=80"
    ],
    description: "বাজেট ফ্রেন্ডলি ট্রেন্ডি মিড-লেন্থ উইন্ডপ্রুফ কোট। লাইটওয়েট ভেলভেট ফিনিশ, জিপার পকেট এবং ড্রস্ট্রিং হুড।",
    sizes: ["L", "XL", "XXL"],
    colors: [
      { name: "Heather Blue", hex: "#38bdf8" },
      { name: "Charcoal Grey", hex: "#4b5563" }
    ],
    isPopular: true,
    inStock: true,
    tags: ["coat", "velvet", "mens"]
  },
  {
    id: "p4",
    title: "Spot Waffle Knitted Cardigan Top",
    banglaTitle: "প্রিমিয়াম স্পট ওয়াফেল নিটেড কার্ডিগান টপ",
    category: "Womens Collection",
    price: 3008,
    originalPrice: 3800,
    rating: 4.5,
    soldCount: "100 sold",
    images: [
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?w=800&auto=format&fit=crop&q=80"
    ],
    description: "সুপার সফট ওয়াফেল নিট কার্ডিগান। ক্যাজুয়াল লাউঞ্জওয়্যার অথবা আউটিংয়ের জন্য পার্ফেক্ট চয়েস। অত্যন্ত আরামদায়ক ও ব্রিদেবল।",
    sizes: ["Free Size", "M", "L"],
    colors: [
      { name: "Milky White", hex: "#f8fafc" },
      { name: "Oatmeal Beige", hex: "#e2e8f0" }
    ],
    isPopular: true,
    inStock: true,
    tags: ["knitted", "cardigan", "womens"]
  },
  {
    id: "p5",
    title: "Brawon knitted Cuban Collar Shirt",
    banglaTitle: "জারপোশ ব্রাউন নিটেড কিউবান কলার শার্ট",
    category: "Mens Fashion",
    price: 1190,
    originalPrice: 1450,
    rating: 4.8,
    soldCount: "85 sold",
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&auto=format&fit=crop&q=80"
    ],
    description: "প্রিমিয়াম টেক্সচার্ড নিট ফেব্রিক দিয়ে তৈরি সামার ও অটাম ক্যাজুয়াল শার্ট। ওপেন ক্যাম্প কলার ও মার্জিত বাটন ডিজাইন।",
    sizes: ["M", "L", "XL"],
    colors: [
      { name: "Vintage Brown", hex: "#78350f" },
      { name: "Olive Khaki", hex: "#713f12" }
    ],
    isFeatured: true,
    inStock: true,
    tags: ["shirt", "knitted", "zarposh"]
  },
  {
    id: "p6",
    title: "Meron knitted Cardigan Shirt",
    banglaTitle: "জারপোশ মেরুন নিটেড কার্ডিগান শার্ট",
    category: "Mens Fashion",
    price: 1190,
    originalPrice: 1490,
    rating: 4.9,
    soldCount: "120 sold",
    images: [
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80"
    ],
    description: "রিচ ওয়াইন মেরুন কালারওয়েতে স্পেশাল নিট প্যাটার্ন। পার্টি বা রেগুলার স্মার্ট ক্যাজুয়াল লুকে নিয়ে আসবে অনন্য ক্লাস।",
    sizes: ["M", "L", "XL"],
    colors: [
      { name: "Meron Wine", hex: "#881337" },
      { name: "Burgundy", hex: "#4c0519" }
    ],
    isFeatured: true,
    inStock: true,
    tags: ["shirt", "meron", "cardigan"]
  },
  {
    id: "p7",
    title: "Black-White Straipe Casual Retro Shirt",
    banglaTitle: "জারপোশ ব্ল্যাক অ্যান্ড হোয়াইট স্ট্রাইপ ক্যাজুয়াল শার্ট",
    category: "Mens Fashion",
    price: 1190,
    originalPrice: 1400,
    rating: 4.7,
    soldCount: "94 sold",
    images: [
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&auto=format&fit=crop&q=80"
    ],
    description: "রেট্রো ভার্টিক্যাল স্ট্রাইপ ডিজাইন। বডি ফিটিং ও ফিনিশিং ১০০% কোয়ালিটি কন্ট্রোল করা। সহজে কুঁচকে যায় না।",
    sizes: ["M", "L", "XL"],
    colors: [
      { name: "Black / White Stripe", hex: "#18181b" }
    ],
    isFeatured: true,
    inStock: true,
    tags: ["stripe", "retro", "shirt"]
  },
  {
    id: "p8",
    title: "Zarposh Classic Denim Shirt",
    banglaTitle: "জারপোশ ক্লাসিক লাইট ওয়াশ ডেনিম শার্ট",
    category: "Mens Fashion",
    price: 1150,
    originalPrice: 1390,
    rating: 4.8,
    soldCount: "210 sold",
    images: [
      "https://images.unsplash.com/photo-1588731234159-8b9963143fca?w=800&auto=format&fit=crop&q=80"
    ],
    description: "১০০% প্রিমিয়াম সুতি ডেনিম। সফট ওয়াশ ফিনিশ যা গায়ে দেবে মসৃণ অনুভূতি। অল-সিজন পরিধানযোগ্য।",
    sizes: ["M", "L", "XL", "XXL"],
    colors: [
      { name: "Light Denim", hex: "#93c5fd" },
      { name: "Classic Blue", hex: "#3b82f6" }
    ],
    isPopular: true,
    inStock: true,
    tags: ["denim", "shirt", "zarposh"]
  },
  {
    id: "p9",
    title: "Premium Double Breasted Black Blazer",
    banglaTitle: "ব্ল্যাক রেস প্রিমিয়াম ডাবল ব্রেস্টেড ব্লেজার",
    category: "Formal & Party",
    price: 4490,
    originalPrice: 5500,
    rating: 5.0,
    soldCount: "62 sold",
    images: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&auto=format&fit=crop&q=80"
    ],
    description: "লাক্সারি কাট ও ব্রিটিশ টেইলারিং স্ট্যান্ডার্ডে তৈরি ডাবল ব্রেস্টেড ব্লেজার। গোল্ডেন এক্সেন্ট বাটন ও প্রিমিয়াম সাটিন লাইনিং। কর্পোরেট মিটিং বা বিয়ের অনুষ্ঠানের জন্য অতুলনীয়।",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Royal Black", hex: "#09090b" },
      { name: "Navy Blue", hex: "#172554" }
    ],
    isFeatured: true,
    isPopular: true,
    inStock: true,
    tags: ["blazer", "blackrace", "formal", "suit"]
  },
  {
    id: "p10",
    title: "Galanz Microwave Oven 23-Liter",
    banglaTitle: "গ্যালাঞ্জ মাইক্রোওয়েভ ওভেন ২৩ লিটার",
    category: "Home & Kitchen",
    price: 13859,
    originalPrice: 15500,
    rating: 4.5,
    soldCount: "700 sold",
    images: [
      "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=800&auto=format&fit=crop&q=80"
    ],
    description: "২৩ লিটার ক্যাপাসিটি, ডিজিটাল কন্ট্রোল ও অটো-ডিফ্রস্ট সুবিধা সম্পন্ন আধুনিক মাইক্রোওয়েভ ওভেন। ১ বছরের অফিসিয়াল ওয়ারেন্টি।",
    sizes: ["23 Liters"],
    colors: [
      { name: "Silver Grey", hex: "#9ca3af" }
    ],
    inStock: true,
    tags: ["kitchen", "oven", "home"]
  },
  {
    id: "p11",
    title: "Konka Coffee Machine Fully Automatic",
    banglaTitle: "কনকা ফুললি অটোমেটিক এক্সপ্রেসো কফি মেকার",
    category: "Home & Kitchen",
    price: 2291,
    originalPrice: 2890,
    rating: 4.0,
    soldCount: "3.6k sold",
    images: [
      "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&auto=format&fit=crop&q=80"
    ],
    description: "বাসা ও অফিসের জন্য সহজে এসপ্রেসো, ক্যাপুচিনো এবং ল্যাটে বানানোর আধুনিক কফি মেকার। ওয়াটার ট্যাঙ্ক ও মিল্ক ফোমিং নোজল।",
    sizes: ["Standard"],
    colors: [
      { name: "Matte Black", hex: "#27272a" },
      { name: "Red Crimson", hex: "#dc2626" }
    ],
    inStock: true,
    tags: ["coffee", "kitchen", "konka"]
  },
  {
    id: "p12",
    title: "Cross-Border Stainless Steel Cutlery Set",
    banglaTitle: "গোল্ডেন স্টেইনলেস স্টিল কাটলারি চামচ ও কাঁটা সেট",
    category: "Home & Kitchen",
    price: 556,
    originalPrice: 850,
    rating: 4.5,
    soldCount: "10k sold",
    images: [
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=800&auto=format&fit=crop&q=80"
    ],
    description: "লাক্সারি ডাইনিংয়ের জন্য ফুড-গ্রেড স্টেইনলেস স্টিল চামচ ও ফর্ক সেট। অ্যান্টি-রাস্ট ও মিরর ফিনিশ পলিশ।",
    sizes: ["4 Pcs Set", "16 Pcs Set"],
    colors: [
      { name: "Gold / White", hex: "#fef08a" },
      { name: "Rose Gold", hex: "#fb7185" },
      { name: "Classic Silver", hex: "#cbd5e1" }
    ],
    inStock: true,
    tags: ["cutlery", "spoons", "kitchen"]
  },
  {
    id: "p13",
    title: "Household Folding Trash Bin Wall Mounted",
    banglaTitle: "কিচেন কেবিনেট ওয়াল মাউন্টেড ফোল্ডিং ট্র্যাশ বিন",
    category: "Home & Kitchen",
    price: 128,
    originalPrice: 220,
    rating: 4.5,
    soldCount: "51k sold",
    images: [
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&auto=format&fit=crop&q=80"
    ],
    description: "রান্নাঘরের কেবিনেট বা ড্রয়ারে ঝুলিয়ে রাখার মতো ফোল্ডেবল ডাস্টবিন। সহজে জায়গা বাঁচায় ও ময়লা পরিষ্কারে সহায়তা করে।",
    sizes: ["Large (9L)"],
    colors: [
      { name: "Cream White", hex: "#f5f5f4" },
      { name: "Coffee Brown", hex: "#78716c" }
    ],
    inStock: true,
    tags: ["trashbin", "kitchen", "folding"]
  },
  {
    id: "p14",
    title: "Custom Printed Opp Self-Adhesive Bags",
    banglaTitle: "কাস্টম প্রিন্টেড সেলফ-অ্যাডেসিভ ক্লোথিং প্যাকেজিং ব্যাগ",
    category: "Packaging & Bulk",
    price: 4628,
    originalPrice: 5200,
    rating: 4.5,
    soldCount: "100k sold",
    images: [
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&auto=format&fit=crop&q=80"
    ],
    description: "ই-কমার্স ব্যবসায়ীদের কাপড়ের প্যাকেজিংয়ের জন্য প্রিমিয়াম ক্রিস্টাল ক্লিয়ার OPP ব্যাগ (১০০০ পিসের বান্ডেল)। স্ট্রং আঠা ও টেকসই।",
    sizes: ["1000 Pcs"],
    colors: [
      { name: "Transparent", hex: "#ffffff" }
    ],
    inStock: true,
    tags: ["polybag", "packaging", "wholesale"]
  },
  {
    id: "p15",
    title: "New foreign trade model barrel-shaped Sports Watch",
    banglaTitle: "স্পোর্টস ব্যারেল-শেপড সিলিকন স্ট্র্যাপ ওয়াচ",
    category: "Gadgets & Accessories",
    price: 301,
    originalPrice: 650,
    rating: 4.5,
    soldCount: "200k sold",
    images: [
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80"
    ],
    description: "ব্যারেল-শেপড স্কেলেটন ডায়াল ও প্রিমিয়াম ওয়াটারপ্রুফ সিলিকন স্ট্র্যাপ সমৃদ্ধ ট্রেন্ডি ওয়াচ। তরুণদের জন্য দুর্দান্ত ফ্যাশন আইটেম।",
    sizes: ["Standard"],
    colors: [
      { name: "Vibrant Red", hex: "#ef4444" },
      { name: "Racing Blue", hex: "#2563eb" },
      { name: "Emerald Green", hex: "#059669" },
      { name: "Pure White", hex: "#f1f5f9" }
    ],
    isPopular: true,
    inStock: true,
    tags: ["watch", "accessories", "sports"]
  }
];

export const initialCoupons: { [code: string]: number } = {
  EASY10: 10, // 10% off
  WELCOME50: 50, // 50 Taka flat off
  FREEDEL: 100 // 100 Taka off delivery
};
