"use client";

import React, { useState } from "react";
import { X, ShieldCheck, Loader2 } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import confetti from "canvas-confetti";

export const BKashPaymentModal: React.FC = () => {
  const { isBKashOpen, setIsBKashOpen, createOrder } = useStore();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [bKashNumber, setBKashNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isBKashOpen) return null;

  const pendingPayload = (typeof window !== "undefined" && (window as any).__pendingOrderPayload) || null;
  const amount = pendingPayload ? pendingPayload.grandTotal : 0;

  const handleNextStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!bKashNumber || bKashNumber.replace(/\D/g, "").length < 11) {
      setError("সঠিক ১১ ডিজিটের বিকাশ ওয়ালেট নম্বর দিন");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 800);
  };

  const handleNextStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!otp || otp.length < 4) {
      setError("৬ ডিজিটের ভেরিফিকেশন কোড দিন (যেকোনো ৬ ডিজিট)");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 800);
  };

  const handleFinalPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!pin || pin.length < 4) {
      setError("আপনার বিকাশ পিন নম্বর দিন");
      return;
    }
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (pendingPayload) {
        createOrder({
          ...pendingPayload,
          paymentMethod: "bkash",
          paymentStatus: "Paid"
        });
      }
      setIsBKashOpen(false);
      setStep(1);
      setBKashNumber("");
      setOtp("");
      setPin("");

      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch {
        // Confetti optional
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 animate-in fade-in duration-200">
      <div className="relative bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden my-auto border-2 border-[#D12053]">
        {/* bKash Header */}
        <div className="bg-[#D12053] p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-white text-[#D12053] font-black text-xs px-2 py-0.5 rounded shadow-xs">
              bKash
            </div>
            <div>
              <h3 className="text-xs font-bold">Payment Gateway</h3>
              <p className="text-[10px] text-pink-100">Merchant: K Commerce</p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsBKashOpen(false);
              setStep(1);
            }}
            className="text-pink-100 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Amount Box */}
        <div className="bg-pink-50 p-3 border-b border-pink-100 flex items-center justify-between">
          <span className="text-xs text-gray-700 font-semibold">Invoice Amount:</span>
          <span className="text-base font-black text-[#D12053]">
            ৳{amount.toLocaleString("en-BD")}
          </span>
        </div>

        <div className="p-5">
          {step === 1 && (
            <form onSubmit={handleNextStep1} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1">
                  আপনার বিকাশ অ্যাকাউন্ট নম্বর দিন
                </label>
                <input
                  type="tel"
                  value={bKashNumber}
                  onChange={(e) => setBKashNumber(e.target.value)}
                  placeholder="e.g. 017XXXXXXXX"
                  className="w-full text-sm font-semibold p-2.5 rounded-xl border border-gray-300 focus:border-[#D12053] focus:outline-none"
                  autoFocus
                />
                <p className="text-[10px] text-gray-500 mt-1">
                  * By clicking Proceed, you agree to terms and conditions
                </p>
              </div>

              {error && <p className="text-xs text-red-600 font-semibold">{error}</p>}

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsBKashOpen(false)}
                  className="flex-1 bg-gray-200 text-gray-800 text-xs font-bold py-2.5 rounded-xl hover:bg-gray-300"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-[#D12053] hover:bg-[#b01743] text-white text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5 shadow-md"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>Proceed</span>
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleNextStep2} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1">
                  বিকাশ ভেরিফিকেশন কোড (OTP) লিখুন
                </label>
                <p className="text-[11px] text-gray-600 mb-2">
                  {bKashNumber} নম্বরে প্রেরিত ৬ ডিজিটের ওটিপি দিন (ডেমো কোড: ১২৩৪৫৬)
                </p>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="123456"
                  maxLength={6}
                  className="w-full text-center tracking-widest text-lg font-black p-2.5 rounded-xl border border-gray-300 focus:border-[#D12053] focus:outline-none"
                  autoFocus
                />
              </div>

              {error && <p className="text-xs text-red-600 font-semibold">{error}</p>}

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 bg-gray-200 text-gray-800 text-xs font-bold py-2.5 rounded-xl"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-[#D12053] hover:bg-[#b01743] text-white text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5 shadow-md"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>Confirm OTP</span>
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleFinalPayment} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1">
                  বিকাশ পিন (PIN) নম্বর দিন
                </label>
                <p className="text-[11px] text-gray-600 mb-2">
                  পেমেন্ট সম্পন্ন করতে আপনার ৫ ডিজিটের গোপন পিন দিন
                </p>
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="•••••"
                  maxLength={5}
                  className="w-full text-center text-xl font-black p-2.5 rounded-xl border border-gray-300 focus:border-[#D12053] focus:outline-none"
                  autoFocus
                />
              </div>

              {error && <p className="text-xs text-red-600 font-semibold">{error}</p>}

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex-1 bg-gray-200 text-gray-800 text-xs font-bold py-2.5 rounded-xl"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-[#D12053] hover:bg-[#b01743] text-white text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5 shadow-md"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>Confirm Payment</span>
                </button>
              </div>
            </form>
          )}

          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-center gap-1 text-[10px] text-gray-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>128-bit Encrypted Secured Transaction</span>
          </div>
        </div>
      </div>
    </div>
  );
};
