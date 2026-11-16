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
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&auto=format&fit=crop&q=80"
    ],
    description: "উচ্চমানের ডেনিম ফেব্রিক এবং ভেতরে সফট ফ্লিস লাইনিং যা আপনাকে কনকনে শীতেও রাখবে আরামদায়ক ও ফ্যাশনেবল। স্টাইলিশ কলার ও পকেট ডিজাইন।",
    sizes: ["M", "L", "XL", "XXL"],
    colors: [
      { name: "Denim Blue", hex: "#3b82f6" },
      { name: "Deep Indigo", hex: "#1e3a8a" }
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
      "https://images.unsplash.com/photo-1544441893-675973e31985?w=800&auto=format&fit=crop&q=80"
    ],
    description: "মডার্ন কোরিয়ান স্টাইল ওভারসাইজড হুডি জ্যাকেট। ডাবল লেয়ার ফ্লিস ফেব্রিক যা হালকা কিন্তু প্রচণ্ড উষ্ণ। প্রিমিয়াম মেটাল জিপার।",
    sizes: ["M", "L", "XL"],
    colors: [
      { name: "Mustard Gold", hex: "#d97706" },
      { name: "Cream White", hex: "#fef3c7" }
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
      "https://images.unsplash.com/photo-1520975954732-35dd22299614?w=800&auto=format&fit=crop&q=80"
    ],
    description: "বাজেট ফ্রেন্ডলি ট্রেন্ডি মিড-লেন্থ উইন্ডপ্রুফ কোট। লাইটওয়েট ভেলভেট ফিনিশ, জিপার পকেট এবং ড্রস্ট্রিং হুড।",
    sizes: ["L", "XL", "XXL"],
    colors: [
      { name: "Heather Blue", hex: "#38bdf8" },
      { name: "Charcoal Grey", hex: "#4b5563" }
    ],
    isPopular: true,
    isFeatured: true,
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
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&auto=format&fit=crop&q=80"
    ],
    description: "সুপার সফট ওয়াফেল নিট কার্ডিগান। ক্যাজুয়াল লাউঞ্জওয়্যার অথবা আউটিংয়ের জন্য পার্ফেক্ট চয়েস। অত্যন্ত আরামদায়ক ও ব্রিদেবল।",
    sizes: ["Free Size", "M", "L"],
    colors: [
      { name: "Milky White", hex: "#f8fafc" },
      { name: "Oatmeal Beige", hex: "#e2e8f0" }
    ],
    isPopular: true,
    isFeatured: true,
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
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=80"
    ],
    description: "প্রিমিয়াম টেক্সচার্ড নিট ফেব্রিক দিয়ে তৈরি সামার ও অটাম ক্যাজুয়াল শার্ট। ওপেন ক্যাম্প কলার ও মার্জিত বাটন ডিজাইন।",
    sizes: ["M", "L", "XL"],
    colors: [
      { name: "Vintage Brown", hex: "#78350f" },
      { name: "Olive Khaki", hex: "#713f12" }
    ],
    isPopular: true,
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
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&auto=format&fit=crop&q=80"
    ],
    description: "রিচ ওয়াইন মেরুন কালারওয়েতে স্পেশাল নিট প্যাটার্ন। পার্টি বা রেগুলার স্মার্ট ক্যাজুয়াল লুকে নিয়ে আসবে অনন্য ক্লাস।",
    sizes: ["M", "L", "XL"],
    colors: [
      { name: "Meron Wine", hex: "#881337" },
      { name: "Burgundy", hex: "#4c0519" }
    ],
    isPopular: true,
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
    isPopular: true,
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
    isFeatured: true,
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
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80"
    ],
    description: "লাক্সারি কাট ও ব্রিটিশ টেইলারিং স্ট্যান্ডার্ডে তৈরি ডাবল ব্রেস্টেড ব্লেজার। গোল্ডেন এক্সেন্ট বাটন ও প্রিমিয়াম সাটিন লাইনিং। কর্পোরেট মিটিং বা বিয়ের অনুষ্ঠানের জন্য অতুলনীয়।",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Royal Black", hex: "#09090b" },
      { name: "Navy Blue", hex: "#172554" }
    ],
    isFeatured: true,
    inStock: true,
    tags: ["blazer", "blackrace", "formal", "suit"]
  },
  {
    id: "p10",
    title: "Vintage Genuine Leather Biker Jacket",
    banglaTitle: "ভিন্টেজ জেনুইন লেদার বাইকার জ্যাকেট",
    category: "Mens Fashion",
    price: 3850,
    originalPrice: 4800,
    rating: 4.9,
    soldCount: "55 sold",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=80"
    ],
    description: "প্রিমিয়াম সফট লেদার এবং মেটাল জিপার ডিজাইন। বাইকার ও উইন্টার ফ্যাশনে অনন্য ক্লাসিক লুক এনে দেয়।",
    sizes: ["M", "L", "XL"],
    colors: [
      { name: "Onyx Black", hex: "#18181b" },
      { name: "Dark Walnut", hex: "#451a03" }
    ],
    inStock: true,
    tags: ["leather", "jacket", "biker"]
  },
  {
    id: "p11",
    title: "Minimalist Wool Blend Winter Trench Coat",
    banglaTitle: "মিনিমালিস্ট উল ব্লেন্ড উইন্টার লং ট্রেন্স কোট",
    category: "Winter Wear",
    price: 4200,
    originalPrice: 5200,
    rating: 4.9,
    soldCount: "38 sold",
    images: [
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&auto=format&fit=crop&q=80"
    ],
    description: "হাই-এন্ড ইউরোপিয়ান কাটের লং কোট। উচ্চমানের উল ব্লেন্ড ফেব্রিক যা অত্যন্ত আরামদায়ক ও এলিগ্যান্ট।",
    sizes: ["M", "L", "XL"],
    colors: [
      { name: "Camel Tan", hex: "#d97706" },
      { name: "Charcoal Black", hex: "#27272a" }
    ],
    inStock: true,
    tags: ["overcoat", "wool", "winter"]
  },
  {
    id: "p12",
    title: "Heavyweight Oversized Streetwear Hoodie",
    banglaTitle: "হেভিওয়েট ওভারসাইজড ক্যাজুয়াল স্ট্রিটওয়্যার হুডি",
    category: "Winter Wear",
    price: 1650,
    originalPrice: 2100,
    rating: 4.8,
    soldCount: "140 sold",
    images: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80"
    ],
    description: "৪০০+ জিএসএম প্রিমিয়াম কটন ফ্লিস। ড্রপ শোল্ডার ওভারসাইজ কাট যা এই সিজনের সেরা স্ট্রিটওয়্যার চয়েস।",
    sizes: ["M", "L", "XL"],
    colors: [
      { name: "Heather Grey", hex: "#9ca3af" },
      { name: "Jet Black", hex: "#18181b" }
    ],
    inStock: true,
    tags: ["hoodie", "streetwear", "winter"]
  },
  {
    id: "p13",
    title: "British Tailored Corduroy Casual Overshirt",
    banglaTitle: "ব্রিটিশ টেইলর্ড কর্ডুরয় ক্যাজুয়াল ওভারশার্ট",
    category: "Mens Fashion",
    price: 2750,
    originalPrice: 3400,
    rating: 4.7,
    soldCount: "72 sold",
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&auto=format&fit=crop&q=80"
    ],
    description: "প্রিমিয়াম ফাইন-ওয়েল কর্ডুরয়। শীতের হালকা ঠান্ডায় টি-শার্টের ওপর জ্যাকেট হিসেবে পরার জন্য আদর্শ।",
    sizes: ["M", "L", "XL"],
    colors: [
      { name: "Rust Brown", hex: "#9a3412" },
      { name: "Navy Blue", hex: "#1e3a8a" }
    ],
    inStock: true,
    tags: ["corduroy", "overshirt", "jacket"]
  },
  {
    id: "p14",
    title: "Premium Handcrafted Leather Crossbody Bag",
    banglaTitle: "হ্যান্ডক্রাফটেড প্রিমিয়াম লেদার ক্রস বডি ও ট্রাভেল ব্যাগ",
    category: "Gadgets & Accessories",
    price: 1850,
    originalPrice: 2450,
    rating: 4.9,
    soldCount: "220 sold",
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop&q=80"
    ],
    description: "১০০% খাঁটি লেদারে তৈরি স্টাইলিশ ক্রস বডি ব্যাগ। মাল্টিপল কম্পার্টমেন্ট, মেটাল বাকল ও অ্যাডজাস্টেবল স্ট্র্যাপ।",
    sizes: ["Standard (12x9 inch)"],
    colors: [
      { name: "Cognac Brown", hex: "#78350f" },
      { name: "Classic Tan", hex: "#b45309" }
    ],
    inStock: true,
    tags: ["bag", "leather", "crossbody", "travel"]
  },
  {
    id: "p15",
    title: "Waterproof Anti-Theft Smart Laptop Backpack",
    banglaTitle: "ওয়াটারপ্রুফ অ্যান্টি-থেফট স্মার্ট ল্যাপটপ ব্যাকপ্যাক",
    category: "Gadgets & Accessories",
    price: 2150,
    originalPrice: 2800,
    rating: 4.8,
    soldCount: "310 sold",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80"
    ],
    description: "ল্যাপটপ, ট্যাবলেট ও গ্যাজেট বহনের জন্য প্রিমিয়াম মিনিমালিস্ট ব্যাকপ্যাক। ইউএসবি চার্জিং পোর্ট ও ওয়াটারপ্রুফ কোটিং।",
    sizes: ["15.6 inch capacity"],
    colors: [
      { name: "Matte Black", hex: "#18181b" },
      { name: "Steel Grey", hex: "#64748b" }
    ],
    inStock: true,
    tags: ["backpack", "bag", "laptop"]
  },
  {
    id: "p16",
    title: "Italian Knit Cashmere Blend Crewneck Sweater",
    banglaTitle: "ইতালিয়ান নিট ক্যাশমেয়ার ব্লেন্ড সোয়েটার",
    category: "Winter Wear",
    price: 1950,
    originalPrice: 2500,
    rating: 4.8,
    soldCount: "88 sold",
    images: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&auto=format&fit=crop&q=80"
    ],
    description: "আল্ট্রা সফট ক্যাশমেয়ার উল ফেব্রিক। হালকা ও আরামদায়ক যা অফিস বা আউটিং উভয় পরিবেশেই নিখুঁত মানায়।",
    sizes: ["M", "L", "XL"],
    colors: [
      { name: "Oatmeal Cream", hex: "#f5f5f4" },
      { name: "Sage Green", hex: "#84cc16" }
    ],
    inStock: true,
    tags: ["sweater", "knit", "cashmere"]
  },
  {
    id: "p17",
    title: "Premium Leather Low-Top Casual Sneakers",
    banglaTitle: "প্রিমিয়াম হোয়াইট লেদার ক্যাজুয়াল স্নিকার্স",
    category: "Mens Fashion",
    price: 2450,
    originalPrice: 3200,
    rating: 4.9,
    soldCount: "175 sold",
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop&q=80"
    ],
    description: "ক্ল্যাসিক অল-হোয়াইট চামড়ার স্নিকার। কুশনযুক্ত আরামদায়ক সোল এবং ওয়াটার রেজিস্ট্যান্ট লেদার ফিনিশ।",
    sizes: ["40", "41", "42", "43", "44"],
    colors: [
      { name: "Pure White", hex: "#ffffff" }
    ],
    inStock: true,
    tags: ["sneakers", "shoes", "leather"]
  },
  {
    id: "p18",
    title: "Handcrafted Suede Chelsea Leather Boots",
    banglaTitle: "হ্যান্ডক্রাফটেড সুয়েড চেলসি লেদার বুট",
    category: "Mens Fashion",
    price: 3450,
    originalPrice: 4200,
    rating: 4.9,
    soldCount: "64 sold",
    images: [
      "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=800&auto=format&fit=crop&q=80"
    ],
    description: "প্রিমিয়াম সুয়েড লেদারে তৈরি স্লিপ-অন চেলসি বুট। জিন্স বা চিনো প্যান্টের সাথে পার্ফেক্ট উইন্টার লুক।",
    sizes: ["40", "41", "42", "43"],
    colors: [
      { name: "Sand Suede", hex: "#d4b895" },
      { name: "Dark Espresso", hex: "#3e2723" }
    ],
    inStock: true,
    tags: ["boots", "chelsea", "shoes"]
  },
  {
    id: "p19",
    title: "Luxury Chronograph Sapphire Dial Watch",
    banglaTitle: "লাক্সারি ক্রোনোগ্রাফ স্যাফায়ার ডায়াল জেন্টলম্যান ওয়াচ",
    category: "Gadgets & Accessories",
    price: 3250,
    originalPrice: 4500,
    rating: 5.0,
    soldCount: "92 sold",
    images: [
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80"
    ],
    description: "স্ক্র্যাচপ্রুফ স্যাফায়ার ক্রিস্টাল গ্লাস ও ৩-সাবডায়াল ক্রোনোগ্রাফ। জেনুইন লেদার স্ট্র্যাপ ও ওয়াটারপ্রুফ।",
    sizes: ["Standard"],
    colors: [
      { name: "Midnight Black", hex: "#18181b" },
      { name: "Rose Gold", hex: "#fb7185" }
    ],
    inStock: true,
    tags: ["watch", "luxury", "accessories"]
  },
  {
    id: "p20",
    title: "Sports Barrel-Shaped Silicon Strap Watch",
    banglaTitle: "স্পোর্টস ব্যারেল-শেপড সিলিকন স্ট্র্যাপ ওয়াচ",
    category: "Gadgets & Accessories",
    price: 301,
    originalPrice: 650,
    rating: 4.5,
    soldCount: "200k sold",
    images: [
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80"
    ],
    description: "ব্যারেল-শেপড স্কেলেটন ডায়াল ও প্রিমিয়াম ওয়াটারপ্রুফ সিলিকন স্ট্র্যাপ সমৃদ্ধ ট্রেন্ডি ওয়াচ।",
    sizes: ["Standard"],
    colors: [
      { name: "Vibrant Red", hex: "#ef4444" },
      { name: "Racing Blue", hex: "#2563eb" }
    ],
    inStock: true,
    tags: ["watch", "accessories", "sports"]
  },
  {
    id: "p21",
    title: "Active Noise-Cancelling Wireless Headphones",
    banglaTitle: "অ্যাক্টিভ নয়েজ ক্যানসেলিং ওয়্যারলেস হেডফোন",
    category: "Gadgets & Accessories",
    price: 2850,
    originalPrice: 3800,
    rating: 4.9,
    soldCount: "130 sold",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80"
    ],
    description: "হাই-রেস অডিও ও ডিপ বাস। ৪০ ঘণ্টার দীর্ঘ ব্যাটারি ব্যাকআপ এবং সফট মেমোরি ফোম ইয়ারপ্যাড।",
    sizes: ["Standard"],
    colors: [
      { name: "Matte Black", hex: "#18181b" },
      { name: "Silver White", hex: "#f1f5f9" }
    ],
    inStock: true,
    tags: ["headphones", "gadgets", "wireless"]
  },
  {
    id: "p22",
    title: "Classic Polarized Aviator Sunglasses",
    banglaTitle: "ক্লাসিক পোলারাইজড এভিয়েটর সানগ্লাস",
    category: "Gadgets & Accessories",
    price: 850,
    originalPrice: 1250,
    rating: 4.8,
    soldCount: "260 sold",
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=80"
    ],
    description: "১০০% ইউভি-৪০০ প্রটেকশন ও অ্যান্টি-গ্লেয়ার পোলারাইজড লেন্স। হালকা কিন্তু টেকসই মেটাল ফ্রেম।",
    sizes: ["Standard"],
    colors: [
      { name: "Classic Gold / Green", hex: "#854d0e" },
      { name: "Gunmetal Black", hex: "#27272a" }
    ],
    inStock: true,
    tags: ["sunglasses", "accessories"]
  },
  {
    id: "p23",
    title: "100% Pima Cotton Slim-Fit Oxford Polo",
    banglaTitle: "১০০% পিমা কটন স্লিম-ফিট অক্সফোর্ড পোলো শার্ট",
    category: "Mens Fashion",
    price: 990,
    originalPrice: 1350,
    rating: 4.8,
    soldCount: "190 sold",
    images: [
      "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=800&auto=format&fit=crop&q=80"
    ],
    description: "লাক্সারি পিমা কটন পোলো। কালার গ্যারান্টি ও প্রিমিয়াম কলার ফিনিশ যা বারবার ধোয়ার পরেও নতুনের মতো থাকে।",
    sizes: ["M", "L", "XL", "XXL"],
    colors: [
      { name: "Navy Blue", hex: "#1e3a8a" },
      { name: "Burgundy Red", hex: "#881337" }
    ],
    inStock: true,
    tags: ["polo", "shirt", "cotton"]
  },
  {
    id: "p24",
    title: "Konka Coffee Machine Fully Automatic",
    banglaTitle: "কনকা ফুললি অটোমেটিক এক্সপ্রেসো কফি মেকার",
    category: "Home & Kitchen",
    price: 2291,
    originalPrice: 2890,
    rating: 4.7,
    soldCount: "3.6k sold",
    images: [
      "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&auto=format&fit=crop&q=80"
    ],
    description: "বাসা ও অফিসের জন্য সহজে এসপ্রেসো, ক্যাপুচিনো এবং ল্যাটে বানানোর আধুনিক কফি মেকার।",
    sizes: ["Standard"],
    colors: [
      { name: "Matte Black", hex: "#27272a" }
    ],
    inStock: true,
    tags: ["coffee", "kitchen", "konka"]
  }
];

export const initialCoupons: { [code: string]: number } = {
  EASY10: 10,
  WELCOME50: 50,
  FREEDEL: 100
};
