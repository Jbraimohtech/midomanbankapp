"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveBuyerEscrow } from "../escrowStorage";

export default function CreateEscrowPage() {
  const router = useRouter();

  const [service, setService] = useState("Product design service");
  const [sellerTag, setSellerTag] = useState("");
  const [details, setDetails] = useState("");
  const [amount, setAmount] = useState("");
  const [delivery, setDelivery] = useState("7 days");
  const [feePayer, setFeePayer] = useState("Buyer");

  const [showSummary, setShowSummary] = useState(false);
  const [storageError, setStorageError] = useState("");

  const sellerEmail = `${sellerTag.trim().replace(/^@/, "")}@gmail.com`;

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();

    if (!sellerTag.trim() || !amount) {
      alert("Please fill in Seller tag and Amount");
      return;
    }

    // Tag lookup is temporarily bypassed so the summary flow can be reviewed.
    setStorageError("");
    setShowSummary(true);
  };

  const handleSecureFunds = () => {
    try {
      saveBuyerEscrow({
        id: `ESC${Date.now()}`,
        email: sellerEmail,
        amount: `NGN${Number(amount).toLocaleString()}`,
        days: delivery,
        service,
        status: "waiting for seller delivery",
        statusColor: "orange",
        details,
        feePayer,
      });
    } catch (error) {
      console.error("Could not save escrow details", error);
      setStorageError("We couldn't save the escrow details. Please try again.");
      return;
    }

    setShowSummary(false);
    router.push("/dashboard/escrow?tab=buyer");
  };

  return (
    <>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Escrow</h1>

        {/* Tabs (visual only on this page) */}
        <div className="flex items-center gap-2 mb-8">
          <button className="px-5 py-2 rounded-full text-sm font-medium bg-white text-gray-900 shadow-sm border border-gray-200">
            Buyer
          </button>
          <button className="px-5 py-2 rounded-full text-sm font-medium text-gray-500">
            Seller
          </button>
        </div>

        <form onSubmit={handleContinue}>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* LEFT */}
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Service
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  >
                    <option>Product design service</option>
                    <option>Logo design</option>
                    <option>Web development</option>
                    <option>Mobile app design</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Sellers tag
                  </label>
                  <input
                    type="text"
                    value={sellerTag}
                    onChange={(e) => setSellerTag(e.target.value)}
                    placeholder="Kelvintech"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Escrow details/conditions
                  </label>
                  <textarea
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    rows={4}
                    placeholder="Describe the conditions..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
                  />
                </div>
              </div>

              {/* RIGHT */}
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Amount
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-green-500 text-white text-[10px] font-bold flex items-center justify-center">
                        ₦
                      </span>
                      <span className="text-sm text-gray-500">NGN</span>
                    </div>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Enter Amount"
                      className="w-full pl-20 pr-20 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-blue-600 font-medium"
                    >
                      Max
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-1.5">
                    Available Balance: NGN 0.00
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Delivery date
                  </label>
                  <select
                    value={delivery}
                    onChange={(e) => setDelivery(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  >
                    <option>3 days</option>
                    <option>5 days</option>
                    <option>7 days</option>
                    <option>14 days</option>
                    <option>30 days</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Who pays escrow fee?
                  </label>
                  <select
                    value={feePayer}
                    onChange={(e) => setFeePayer(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  >
                    <option>Buyer</option>
                    <option>Seller</option>
                    <option>50/50 Split</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <button
                type="submit"
                className="px-8 py-3 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition"
              >
                Continue
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* ========== TRANSACTION SUMMARY MODAL ========== */}
      {showSummary && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowSummary(false)}
          />
          <div className="relative bg-white rounded-2xl w-full max-w-md shadow-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">
              Transaction summary
            </h3>

            <div className="space-y-3 text-sm mb-4">
              <div className="flex justify-between">
                <span className="text-gray-500">Product/service :</span>
                <span className="font-medium text-gray-900">{service}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Amount :</span>
                <span className="font-medium text-gray-900">
                  NGN{Number(amount).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Seller email :</span>
                <span className="font-medium text-gray-900">
                  {sellerEmail}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Delivery :</span>
                <span className="font-medium text-gray-900">{delivery}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Fee :</span>
                <span className="font-medium text-gray-900">
                  {feePayer} pays
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-400 mb-6">
              Please review carefully. In case of dispute, these details will be
              used for resolution. Please ensure conditions are accurate before
              proceeding.
            </p>

            {storageError && (
              <p role="alert" className="mb-4 text-sm text-red-600">
                {storageError}
              </p>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowSummary(false)}
                className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSecureFunds}
                className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700"
              >
                Secure Funds
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
