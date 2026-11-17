"use client";

import { useState } from "react";
import { CalendarDays, X } from "lucide-react";

interface GenerateAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (account: {
    balance: string;
    bankName: string;
    accountNumber: string;
  }) => void;
}

export default function GenerateAccountModal({
  isOpen,
  onClose,
  onSuccess,
}: GenerateAccountModalProps) {
  const [step, setStep] = useState<"form" | "loading">("form");
  const [bvn, setBvn] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<{
    bvn?: string;
    dob?: string;
    phone?: string;
  }>({});
  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  const maxDob = today.toISOString().slice(0, 10);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!bvn.trim()) newErrors.bvn = "BVN is required";
    else if (bvn.length !== 11 || !/^\d+$/.test(bvn))
      newErrors.bvn = "BVN must be 11 digits";

    if (!dob.trim()) newErrors.dob = "Date of birth is required";
    else if (dob > maxDob)
      newErrors.dob = "Date of birth cannot be in the future";

    if (!phone.trim()) newErrors.phone = "Mobile number is required";
    else if (phone.length < 10) newErrors.phone = "Enter a valid phone number";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStep("loading");

    // Simulate API call
    setTimeout(() => {
      // Mock successful account generation
      const mockAccount = {
        balance: "20,000.00NGN",
        bankName: "Providus Bank",
        accountNumber: "2371281920",
      };

      onSuccess(mockAccount);
      setStep("form");
      setBvn("");
      setDob("");
      setPhone("");
      setErrors({});
      onClose();
    }, 2500);
  };

  const handleClose = () => {
    if (step === "loading") return; // prevent closing while loading
    setStep("form");
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl w-full max-w-md shadow-xl">
        {step === "form" ? (
          <>
            <div className="p-6 pb-2 ml-7 mr-7 border-b border-gray-200 flex items-center justify-center">
              <h2 className="text-lg font-semibold text-gray-900 text-center">
                Generate account
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 pt-4 space-y-4">
              {/* BVN */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  BVN
                </label>
                <input
                  type="text"
                  value={bvn}
                  onChange={(e) => setBvn(e.target.value)}
                  placeholder="2245167728"
                  maxLength={11}
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition ${
                    errors.bvn
                      ? "border-red-400 focus:ring-red-500/20"
                      : "border-gray-200 focus:ring-blue-500/20 focus:border-blue-500"
                  }`}
                />
                {errors.bvn && (
                  <p className="mt-1 text-xs text-red-500">{errors.bvn}</p>
                )}
              </div>

              {/* Date of birth */}
              <div>
                <label
                  htmlFor="account-dob"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Date of birth
                </label>
                <div className="relative">
                  <CalendarDays
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                    aria-hidden="true"
                  />
                  <input
                    id="account-dob"
                    name="dob"
                    type="date"
                    value={dob}
                    max={maxDob}
                    required
                    aria-invalid={Boolean(errors.dob)}
                    aria-describedby={
                      errors.dob ? "account-dob-error" : undefined
                    }
                    onChange={(e) => setDob(e.target.value)}
                    className={`w-full pl-12 pr-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition ${
                      errors.dob
                        ? "border-red-400 focus:ring-red-500/20"
                        : "border-gray-200 focus:ring-blue-500/20 focus:border-blue-500"
                    }`}
                  />
                </div>
                {errors.dob && (
                  <p
                    id="account-dob-error"
                    className="mt-1 text-xs text-red-500"
                  >
                    {errors.dob}
                  </p>
                )}
              </div>

              {/* Mobile phone number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Mobile phone number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="090XXXXXXXX"
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition ${
                    errors.phone
                      ? "border-red-400 focus:ring-red-500/20"
                      : "border-gray-200 focus:ring-blue-500/20 focus:border-blue-500"
                  }`}
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                >
                  Generate account
                </button>
              </div>
            </form>
          </>
        ) : (
          /* Loading State */
          <div className="p-10 flex flex-col items-center justify-center text-center">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>

            <div className="w-12 h-12 mb-5 relative">
              <div className="absolute inset-0 border-4 border-blue-100 rounded-full" />
              <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin" />
            </div>

            <h3 className="text-base font-semibold text-gray-900 mb-1">
              Generating account details
            </h3>
            <p className="text-sm text-gray-500">wait a moment ...</p>
          </div>
        )}
      </div>
    </div>
  );
}
