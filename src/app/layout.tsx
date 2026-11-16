import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "K Commerce | প্রিমিয়াম অনলাইন শপিং ও ফ্যাশন",
  description: "K Commerce - সারা বাংলাদেশে ক্যাশ অন ডেলিভারি সুবিধা সহ সেরা মূল্যে কোয়ালিটি জ্যাকেট, শার্ট, ব্লেজার ও গ্যাজেট কিনুন। হেল্পলাইন: 01643526721",
  manifest: "/manifest.json",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png"
  }
};

export const viewport: Viewport = {
  themeColor: "#7e22ce",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#f8fafc]`}>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
