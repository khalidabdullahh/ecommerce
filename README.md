# EasyBuy BD & Zarposh Standard E-Commerce Platform

একটি আধুনিক, হাই-কনভার্টিং এবং স্কেলেবল বাংলাদেশি ই-কমার্স ওয়েব অ্যাপ্লিকেশন (PWA Ready)। এটি **EasyBuy BD**, **Zarposh**, এবং **Black Race** এর সেরা ফিচার ও ইউআই/ইউএক্স রেফারেন্সের সমন্বয়ে তৈরি করা হয়েছে।

---

## 🌟 মূল ফিচারসমূহ (Core Highlights)

### ১. মোবাইল-ফার্স্ট অ্যাপ এক্সপেরিয়েন্স (Mobile-First App-like UX)
- **২-কলাম রেসপন্সিভ গ্রিড**: প্রতিটি কার্ডে ছবি, মূল্য (টাকা ৳), ডিসকাউন্ট ব্যাজ, সেলস কাউন্ট ("100 sold", "25k sold") এবং স্টার রেটিং (★ ৪.৮)।
- **ফিক্সড বটম ন্যাভিগেশন বার**: Home, Categories, Cart (রিয়েল-টাইম কাউন্টার ব্যাজসহ), Wishlist, Track Order, এবং Account।
- **ভিজ্যুয়াল / ক্যামেরা সার্চ (Image Search)**: টেক্সট সার্চের পাশাপাশি ক্যামেরার মাধ্যমে পণ্য অনুসন্ধান মডাল।

### ২. হাই-কনভার্টিং ১-পেজ চেকআউট (BD 1-Page Instant Checkout)
- **পেমেন্ট অপশন নির্বাচন**:
  - 🔘 **Cash on Delivery (COD)** — সরাসরি অর্ডার প্লেস
  - 🔘 **Pay Total Amount (bKash)** — ইন্টারেক্টিভ বিকাশ পেমেন্ট গেটওয়ে সিমুলেশন (PIN/OTP সহ)
- **ডেলিভারি এরিয়া ড্রপডাউন/রেডিও**:
  - ঢাকার ভেতরে (৳৭০)
  - ঢাকার বাইরে (৳১৩০) — সাথে সাথে গ্র্যান্ড টোটাল অটো-ক্যালকুলেশন
- **কুপন কোড ডিসকাউন্ট**: `EASY10` (১০% ছাড়) বা `WELCOME50` (৳৫০ ছাড়)।
- **কনফেটি অ্যানিমেশন**: অর্ডার নিশ্চিত হওয়ার সাথে সাথে আনন্দঘন কনফেটি সেলিব্রেশন ও বিস্তারিত অর্ডার মেমো।

### ৩. লাইভ কাস্টমার সাপোর্ট বাবল (Floating Contact Us)
- Zarposh স্টাইলে ফ্লোটিং বাবল যার মাধ্যমে গ্রাহক সরাসরি **WhatsApp**, **Facebook Messenger**, অথবা ফোনে কল করতে পারবেন।

### ৪. অর্ডার ট্র্যাকিং সিস্টেম (`/track`)
- অর্ডার আইডি (যেমন: `BD-90214`) বা মোবাইল নম্বর দিয়ে গ্রাহক তার পার্সেলের বর্তমান অবস্থা (অর্ডার রিসিভড ➔ কনফার্মড ➔ কুরিয়ারে হস্তান্তর ➔ ডেলিভার্ড) লাইভ দেখতে পারবেন।

### ৫. মার্চেন্ট অ্যাডমিন ড্যাশবোর্ড (`/admin`)
- **লাইভ অ্যানালিটিক্স**: মোট সেলস (৳), পেন্ডিং অর্ডার, কুরিয়ারে থাকা অর্ডার ও ডেলিভারি কাউন্ট।
- **অর্ডার ম্যানেজমেন্ট**: স্ট্যাটাস পরিবর্তন (Pending, Confirmed, In Courier, Delivered)।
- **১-ক্লিক কুরিয়ার এপিআই বুকিং**: **Steadfast Courier** ও **Pathao Courier** এ এক ক্লিকে কনসাইনমেন্ট ট্র্যাকিং কোড জেনারেশন।
- **প্রোডাক্ট কন্ট্রোল**: নতুন পণ্য যুক্ত করা, স্টক ইন/আউট টগল ও ডিলিট করার সুবিধা।

---

## 🛠️ টেকনোলজি স্ট্যাক (Tech Stack)

- **Framework**: [Next.js 14 (App Router)](https://nextjs.org/)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Celebration Effects**: Canvas Confetti
- **State Management**: React Context API + LocalStorage Persistent Sync

---

## 🚀 লোকাল মেশিনে যেভাবে রান করবেন (Getting Started)

১. ডিপেন্ডেন্সি ইনস্টল করুন:
```bash
npm install
```

২. ডেভেলপমেন্ট সার্ভার চালু করুন:
```bash
npm run dev
```

৩. ব্রাউজারে ওপেন করুন:
[http://localhost:3000](http://localhost:3000)

প্রোডাকশন বিল্ড তৈরি করতে:
```bash
npm run build
npm run start
```

---

## 📂 প্রোজেক্ট স্ট্রাকচার (Project Structure)

```
src/
├── app/
│   ├── layout.tsx         # গ্লোবাল লেআউট ও StoreProvider র্যাপার
│   ├── page.tsx           # মূল স্টোরফ্রন্ট ফিড (Popular & Collection)
│   ├── track/page.tsx     # অর্ডার ট্র্যাকিং পেইজ
│   ├── admin/page.tsx     # অ্যাডমিন কন্ট্রোল প্যানেল
│   ├── categories/page.tsx # ক্যাটাগরি ব্রাউজার
│   └── wishlist/page.tsx  # পছন্দের তালিকা
├── components/
│   ├── Navbar.tsx         # মোবাইল/ডেস্কটপ হেডার ও সার্চ
│   ├── BottomNav.tsx      # মোবাইল বটম ন্যাভ বার
│   ├── HeroBanner.tsx     # ব্যানার ও ট্রাস্ট ব্যাজ
│   ├── ProductCard.tsx    # ২-কলাম প্রডাক্ট কার্ড
│   ├── ProductDetailModal.tsx # সাইজ/কালার সিলেক্টর মডাল
│   ├── CartDrawer.tsx     # স্লাইড-ওভার শপিং ব্যাগ
│   ├── CheckoutModal.tsx  # ১-পেজ ফাস্ট চেকআউট
│   ├── BKashPaymentModal.tsx # বিকাশ টোকেনাইজড পেমেন্ট
│   ├── OrderSuccessModal.tsx # অর্ডার কনফার্মেশন ও কনফেটি
│   ├── ImageSearchModal.tsx  # ক্যামেরা ইমেজ সার্চ
│   └── FloatingChat.tsx   # হোয়াটসঅ্যাপ/মেসেঞ্জার উইজেট
├── context/
│   └── StoreContext.tsx   # সেন্ট্রাল স্টেট ও পারসিস্টেন্ট স্টোর
├── data/
│   └── initialProducts.ts # রেফারেন্স প্রডাক্ট ডাটাসেট
└── types/
    └── index.ts           # টাইপস্ক্রিপ্ট টাইপ ডেফিনিশন
```
