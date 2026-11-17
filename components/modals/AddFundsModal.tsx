"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";

interface AddFundsModalProps {
  isOpen: boolean;
  onClose: () => void;
  accountNumber: string;
  bankName: string;
}

const quickAmounts = [5000, 10000, 20000, 50000, 100000];

export default function AddFundsModal({
  isOpen,
  onClose,
  accountNumber,
  bankName,
}: AddFundsModalProps) {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [step, setStep] = useState<"form" | "success">("form");

  if (!isOpen) return null;

  const handleQuickAmount = (value: number) => {
    setAmount(value.toString());
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || Number(amount) < 100) {
      setError("Please enter a valid amount (minimum ₦100)");
      return;
    }

    // Simulate processing
    setStep("success");

    // Auto close after success
    setTimeout(() => {
      setStep("form");
      setAmount("");
      setError("");
      onClose();
    }, 2200);
  };

  const handleClose = () => {
    setStep("form");
    setAmount("");
    setError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={handleClose}
      />

      <div className="relative bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden">
        {step === "form" ? (
          <>
            <div className="p-6 pb-2 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Add Funds</h2>
              <button
                onClick={handleClose}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 pt-4 space-y-5">
              {/* Account Info */}
              <div className="bg-blue-50 rounded-xl p-4">
                <p className="text-xs text-blue-600 mb-1">
                  Transfer to this account
                </p>
                <p className="font-semibold text-gray-900">{bankName}</p>
                <p className="text-sm text-gray-600 mt-0.5">{accountNumber}</p>
              </div>

              {/* Amount Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Amount (₦)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                    ₦
                  </span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => {
                      setAmount(e.target.value);
                      setError("");
                    }}
                    placeholder="0.00"
                    className={`w-full pl-9 pr-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition ${
                      error
                        ? "border-red-400 focus:ring-red-500/20"
                        : "border-gray-200 focus:ring-blue-500/20 focus:border-blue-500"
                    }`}
                  />
                </div>
                {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
              </div>

              {/* Quick Amounts */}
              <div>
                <p className="text-xs text-gray-500 mb-2">Quick amounts</p>
                <div className="flex flex-wrap gap-2">
                  {quickAmounts.map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => handleQuickAmount(value)}
                      className={`px-3.5 py-1.5 rounded-lg text-sm font-medium border transition ${
                        amount === value.toString()
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-700 border-gray-200 hover:border-blue-300"
                      }`}
                    >
                      ₦{value.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-3.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition"
              >
                Continue
              </button>
            </form>
          </>
        ) : (
          /* Success State */
          <div className="p-10 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-5">
              <Check className="w-8 h-8 text-green-600" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Transfer Initiated
            </h3>
            <p className="text-sm text-gray-500">
              Send ₦{Number(amount).toLocaleString()} to the account above
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
