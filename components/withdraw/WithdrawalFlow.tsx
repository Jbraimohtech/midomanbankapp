"use client";

import { useState } from "react";
import { Check, Landmark } from "lucide-react";

type Step = "amount" | "method" | "add-bank" | "confirm" | "otp" | "success";

interface WithdrawalFlowProps {
  availableBalance?: number;
  onClose?: () => void;
}

const banks = [
  "Kuda microfinance bank",
  "Providus Bank",
  "GTBank",
  "Access Bank",
  "Zenith Bank",
  "UBA",
  "First Bank",
  "Opay",
  "Palmpay",
];

export default function WithdrawalFlow({
  availableBalance = 0,
  onClose,
}: WithdrawalFlowProps) {
  const [step, setStep] = useState<Step>("amount");
  const [amount, setAmount] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [showBankList, setShowBankList] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [error, setError] = useState("");

  const numericAmount = Number(amount) || 0;

  // ==================== AMOUNT PANEL (NOT a modal) ====================
  if (step === "amount") {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-6 h-full min-h-[420px] flex flex-col">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-lg font-semibold text-gray-900">Withdrawal</h2>
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>

        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="text-4xl font-bold text-gray-900 mb-2">
            ₦{amount ? Number(amount).toLocaleString() : "0"}
          </div>
          <button
            type="button"
            onClick={() => setAmount(availableBalance.toString())}
            className="text-sm text-blue-600 font-medium mb-6"
          >
            Use Max
          </button>

          <p className="text-sm text-gray-500 mb-6">
            Select amount you want to withdraw
          </p>

          <div className="flex items-center gap-2 mb-6">
            <span className="w-6 h-6 rounded-full bg-green-500 text-white text-xs font-bold flex items-center justify-center">
              ₦
            </span>
            <span className="text-sm font-medium text-gray-700">NGN</span>
          </div>

          <input
            type="number"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
              setError("");
            }}
            placeholder="Enter amount"
            className="w-full max-w-xs px-4 py-3 rounded-xl border border-gray-200 text-center text-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
          {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
        </div>

        <button
          type="button"
          onClick={() => {
            if (!amount || numericAmount <= 0) {
              setError("Please enter a valid amount");
              return;
            }
            setStep("method"); // ← only now open the modal
          }}
          className="w-full py-3.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition mt-6"
        >
          Proceed
        </button>
      </div>
    );
  }

  // ==================== METHOD MODAL ====================
  if (step === "method") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setStep("amount")}
        />
        <div className="relative bg-white rounded-2xl w-full max-w-sm shadow-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">
            How would you like to Withdraw?
          </h3>

          <button
            type="button"
            onClick={() => setStep("add-bank")}
            className="w-full flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 transition text-left"
          >
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              <Landmark
                className="w-5 h-5 text-gray-600"
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </div>
            <div>
              <p className="font-medium text-gray-900">Bank transfer</p>
              <p className="text-sm text-gray-500">
                Withdraw using bank transfer
              </p>
            </div>
          </button>
        </div>
      </div>
    );
  }

  // ==================== ADD BANK (panel again) ====================
  if (step === "add-bank") {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-6 h-full min-h-[420px] flex flex-col relative">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Withdrawal</h2>

        <div className="space-y-5 flex-1">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Bank name
            </label>
            <button
              type="button"
              onClick={() => setShowBankList(true)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-left text-sm flex items-center justify-between"
            >
              <span
                className={selectedBank ? "text-gray-900" : "text-gray-400"}
              >
                {selectedBank || "Select a bank"}
              </span>
              <span className="text-gray-400">▼</span>
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Enter your 10 digit account number
            </label>
            <input
              type="text"
              value={accountNumber}
              onChange={(e) =>
                setAccountNumber(e.target.value.replace(/\D/g, "").slice(0, 10))
              }
              placeholder="Account number"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            if (!selectedBank || accountNumber.length !== 10) {
              setError(
                "Select a bank and enter a valid 10-digit account number",
              );
              return;
            }
            setError("");
            setStep("confirm");
          }}
          className="w-full py-3.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
          disabled={!selectedBank || accountNumber.length !== 10}
        >
          Add bank account
        </button>
        {error && (
          <p className="text-xs text-red-500 text-center mt-2">{error}</p>
        )}

        {showBankList && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setShowBankList(false)}
            />
            <div className="relative bg-white rounded-2xl w-full max-w-sm shadow-xl max-h-[70vh] overflow-hidden">
              <div className="p-4 border-b">
                <input
                  type="text"
                  placeholder="Search for bank"
                  className="w-full px-4 py-2.5 rounded-xl border text-sm"
                />
              </div>
              <div className="overflow-y-auto max-h-80">
                {banks.map((bank) => (
                  <button
                    key={bank}
                    type="button"
                    onClick={() => {
                      setSelectedBank(bank);
                      setShowBankList(false);
                    }}
                    className="w-full px-4 py-3.5 text-left text-sm hover:bg-gray-50 border-b border-gray-50"
                  >
                    {bank}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ==================== CONFIRM MODAL ====================
  if (step === "confirm") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setStep("add-bank")}
        />
        <div className="relative bg-white rounded-2xl w-full max-w-md shadow-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">
            Confirm to withdraw
          </h3>

          <div className="space-y-3 mb-8 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Remaining amount :</span>
              <span className="font-medium">
                NGN{(availableBalance - numericAmount).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Bank name :</span>
              <span className="font-medium">{selectedBank}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Account number :</span>
              <span className="font-medium">****{accountNumber.slice(-4)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Account name :</span>
              <span className="font-medium">Kelvin Tech</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Withdrawal amount :</span>
              <span className="font-medium">
                NGN{numericAmount.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep("add-bank")}
              className="flex-1 py-3 rounded-xl border border-gray-300 font-medium"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => setStep("otp")}
              className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-medium"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==================== OTP MODAL ====================
  if (step === "otp") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        <div className="relative bg-white rounded-2xl w-full max-w-md shadow-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">
            Enter verification code
          </h3>
          <p className="text-sm text-gray-500 text-center mb-8">
            Enter the code sent to{" "}
            <span className="font-medium">Kelvintech@gmail.com</span>
          </p>

          <div className="flex justify-center gap-3 mb-8">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  const newOtp = [...otp];
                  newOtp[index] = value;
                  setOtp(newOtp);
                  if (value && index < 4) {
                    document.getElementById(`otp-${index + 1}`)?.focus();
                  }
                }}
                className="w-12 h-12 text-center text-lg font-semibold rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            ))}
          </div>

          <button
            type="button"
            disabled={otp.some((d) => !d)}
            onClick={() => setStep("success")}
            className="w-full py-3 rounded-xl bg-blue-600 text-white font-medium disabled:opacity-50"
          >
            Verify
          </button>
        </div>
      </div>
    );
  }

  // ==================== SUCCESS ====================
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div className="relative bg-white rounded-2xl w-full max-w-sm shadow-xl p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
          <Check className="w-8 h-8 text-green-600" aria-hidden="true" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Withdrawal Successful
        </h3>
        <p className="text-sm text-gray-500 mb-6">
          ₦{numericAmount.toLocaleString()} has been sent to your account
        </p>
        <button
          type="button"
          onClick={onClose}
          className="w-full py-3 bg-blue-600 text-white font-medium rounded-xl"
        >
          Done
        </button>
      </div>
    </div>
  );
}
