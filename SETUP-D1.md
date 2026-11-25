# K Commerce: Cloudflare D1 সেটআপ (একবারই করতে হবে)

> ⚠️ **ধাপ ১-৩ শেষ না করে PR merge করবেন না।** D1 না থাকলে লাইভ সাইটে প্রোডাক্ট লোড হবে না।
> নিরাপদে টেস্ট করতে: branch push হলে Cloudflare Pages একটি **Preview URL** বানায়। ধাপ ১-৩ করে (Preview-তেও) সেই URL-এ টেস্ট করুন, তারপর merge করুন।

## ধাপ ১: D1 ডাটাবেস বানান
1. Cloudflare Dashboard → **Storage & Databases → D1 → Create database** → নাম: `kcommerce-db`
2. ডাটাবেস খুলে **Console** ট্যাবে যান।
3. `db/schema.sql` এর পুরো লেখা কপি করে Console-এ পেস্ট করে **Execute** করুন।
4. তারপর `db/seed.sql` (২৪টি প্রোডাক্ট) পেস্ট করে **Execute** করুন।
   (Console বড় লেখা না নিলে সেটি কয়েক ভাগে ভাগ করে চালান।)

## ধাপ ২: Pages প্রজেক্টে D1 যুক্ত করুন
**Workers & Pages → (আপনার প্রজেক্ট) → Settings → Bindings → Add → D1 database**
- Variable name: `DB` (বড় হাতের, হুবহু)
- Database: `kcommerce-db`
- **Production এবং Preview দুটোতেই** যোগ করুন।

## ধাপ ৩: অ্যাডমিন পাসওয়ার্ড ও সিক্রেট
**Settings → Variables and Secrets → Add (type: Secret)**, Production ও Preview দুটোতেই:

| নাম | মান |
|---|---|
| `ADMIN_PASSWORD` | লম্বা শক্ত পাসওয়ার্ড (কমপক্ষে ১২ অক্ষর) |
| `SESSION_SECRET` | র‍্যান্ডম ৩২+ অক্ষর। বানাতে: `openssl rand -hex 32` |

## ধাপ ৪: বিকাশ নম্বর
`src/lib/config.ts` এ `BKASH_NUMBER` আপনার আসল বিকাশ নম্বর দিয়ে বদলান (এখন হেল্পলাইন নম্বর বসানো আছে)।

## ধাপ ৫: Build সেটিং যাচাই
Build command: `npm run build` • Output directory: `out` • `functions/` ফোল্ডার Cloudflare নিজেই চিনে নেয়।

---

## কীভাবে কাজ করে
- **গ্রাহক:** প্রোডাক্ট `/api/products` থেকে আসে। অর্ডার `/api/orders` এ যায়; দাম, কুপন ও ডেলিভারি ফি **সার্ভারে** আবার হিসাব হয়। ট্র্যাকিংয়ে অর্ডার নম্বর **ও** ফোন নম্বর দুটোই লাগে।
- **অ্যাডমিন:** `/admin` এ পাসওয়ার্ড লগইন (৮ ঘণ্টার সেশন, ৫ বার ভুল হলে ১৫ মিনিট লক)। অর্ডার স্ট্যাটাস, পেমেন্ট "Paid" মার্ক, কুরিয়ার ট্র্যাকিং কোড, প্রোডাক্ট যোগ/স্টক/ডিলিট।
- **বিকাশ:** গ্রাহক Send Money করে TrxID দেন। আপনি বিকাশ অ্যাপে মিলিয়ে অ্যাডমিন থেকে "Paid" মার্ক করেন। (ভুয়া PIN/OTP পপআপ সরানো হয়েছে।)
- **কুপন:** `coupons` টেবিলে (EASY10, WELCOME50, FREEDEL)। নতুন কুপন D1 Console থেকে `INSERT` করুন।

## লোকাল টেস্ট (ঐচ্ছিক)
```bash
cp .dev.vars.example .dev.vars   # পাসওয়ার্ড বদলান
# একটি অস্থায়ী wrangler.toml বানান (commit করবেন না) যাতে [[d1_databases]] binding = "DB" থাকে
npx wrangler d1 execute kcommerce-db --local --file=db/schema.sql
npx wrangler d1 execute kcommerce-db --local --file=db/seed.sql
npm run build && npx wrangler pages dev out
```
প্রোডাক্ট ডাটা বদলালে `npm run db:seed:generate` দিয়ে `db/seed.sql` নতুন করে বানানো যায়।
