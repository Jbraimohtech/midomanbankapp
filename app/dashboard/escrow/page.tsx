"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import {
  getBuyerEscrowsSnapshot,
  getServerBuyerEscrowsSnapshot,
  parseBuyerEscrowsSnapshot,
  subscribeToBuyerEscrows,
} from "./escrowStorage";
import {
  Clock3,
  FileText,
  Mail,
  MoreVertical,
  Plus,
  ShieldCheck,
} from "lucide-react";

type Tab = "buyer" | "seller";

const sellerEscrows = [
  {
    id: "1",
    email: "Kelvintech@gmail.com",
    amount: "NGN20,000",
    days: "7 days",
    service: "Logo design",
    status: "waiting for delivery",
    statusColor: "orange",
  },
  {
    id: "2",
    email: "Kelvintech@gmail.com",
    amount: "NGN20,000",
    days: "7 days",
    service: "Logo design",
    status: "waiting for delivery",
    statusColor: "orange",
  },
  {
    id: "3",
    email: "Kelvintech@gmail.com",
    amount: "NGN20,000",
    days: "7 days",
    service: "Logo design",
    status: "waiting for confirmation",
    statusColor: "purple",
  },
  {
    id: "4",
    email: "Kelvintech@gmail.com",
    amount: "NGN20,000",
    days: "7 days",
    service: "Logo design",
    status: "Transaction completed",
    statusColor: "green",
  },
];

export default function EscrowPage() {
  const [activeTab, setActiveTab] = useState<Tab>("buyer");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const buyerEscrowsSnapshot = useSyncExternalStore(
    subscribeToBuyerEscrows,
    getBuyerEscrowsSnapshot,
    getServerBuyerEscrowsSnapshot,
  );
  const { escrows: buyerEscrows, error: buyerEscrowsError } =
    parseBuyerEscrowsSnapshot(buyerEscrowsSnapshot);
  const buyerEscrowsLoaded = buyerEscrowsSnapshot !== "";

  const hasBuyerEscrows = buyerEscrows.length > 0;
  const hasSellerEscrows = sellerEscrows.length > 0;

  const statusStyles: Record<string, string> = {
    orange: "bg-orange-50 text-orange-600 border-orange-100",
    green: "bg-green-50 text-green-600 border-green-100",
    purple: "bg-purple-50 text-purple-600 border-purple-100",
  };

  return (
    <>
      <div className="max-w-6xl mx-auto relative">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Escrow</h1>

        {/* Tabs */}
        <div className="flex w-full lg:max-w-100 items-center gap-1 rounded-md bg-gray-100 p-1.5 mb-8 sm:gap-2 sm:p-2">
          <button
            onClick={() => setActiveTab("buyer")}
            className={`min-w-0 flex-1 px-3 py-2 rounded-md text-sm font-medium text-center transition sm:px-5 ${
              activeTab === "buyer"
                ? "bg-white text-gray-900 shadow-sm border border-gray-200"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            Buyer
          </button>
          <button
            onClick={() => setActiveTab("seller")}
            className={`min-w-0 flex-1 px-3 py-2 rounded-md text-sm font-medium text-center transition sm:px-5 ${
              activeTab === "seller"
                ? "bg-white text-gray-900 shadow-sm border border-gray-200"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            Seller
          </button>
        </div>

        {/* ========== BUYER TAB ========== */}
        {activeTab === "buyer" && (
          <>
            {!buyerEscrowsLoaded ? (
              <div
                role="status"
                className="rounded-2xl border border-gray-100 bg-white p-8 text-center text-sm text-gray-500"
              >
                Loading your escrows...
              </div>
            ) : buyerEscrowsError ? (
              <div
                role="alert"
                className="rounded-2xl border border-red-100 bg-white p-8 text-center text-sm text-red-600"
              >
                {buyerEscrowsError}
              </div>
            ) : !hasBuyerEscrows ? (
              /* Empty State */
              <div className="bg-white rounded-2xl border border-gray-100 py-20 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-5">
                  <FileText
                    className="w-10 h-10 text-blue-400"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  You have no Escrow
                </h3>
                <p className="text-sm text-gray-500 mb-6 max-w-xs">
                  Set your first Escrow and take control of your product
                </p>
                <Link
                  href="/dashboard/escrow/create"
                  className="px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition"
                >
                  Create Escrow
                </Link>
              </div>
            ) : (
              /* Buyer Cards Grid */
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {buyerEscrows.map((item, index) => (
                  <div
                    key={`${item.id}-${index}`}
                    className="bg-white rounded-2xl border border-gray-100 p-5 relative hover:shadow-md transition"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          #{item.id}
                        </p>
                        <div className="flex items-center gap-1.5 mt-1 text-xs text-gray-500">
                          <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                          {item.email}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock3 className="w-3.5 h-3.5" aria-hidden="true" />
                          {item.days}
                        </span>
                        <div className="relative">
                          <button
                            onClick={() =>
                              setOpenMenuId(
                                openMenuId === `buyer-${index}`
                                  ? null
                                  : `buyer-${index}`,
                              )
                            }
                            className="p-1 rounded-lg hover:bg-gray-100 text-gray-400"
                          >
                            <MoreVertical
                              className="w-5 h-5"
                              aria-hidden="true"
                            />
                          </button>

                          {openMenuId === `buyer-${index}` && (
                            <div className="absolute right-0 top-8 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-20">
                              <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                                Contact Seller
                              </button>
                              <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                                Share transaction
                              </button>
                              <button className="w-full px-4 py-2.5 text-left text-sm text-red-500 hover:bg-red-50 flex items-center gap-2">
                                Raise dispute
                              </button>
                              <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                                Cancel transaction
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <p className="text-base font-bold text-gray-900 mb-4">
                      {item.amount}
                    </p>

                    {item.details && (
                      <p className="mb-3 text-sm text-gray-600">
                        {item.details}
                      </p>
                    )}

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Service</p>
                        <span className="inline-block px-2.5 py-1 rounded-lg text-xs font-medium bg-blue-50 text-blue-600 border border-blue-100">
                          {item.service}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-400 mb-1">Status</p>
                        <span
                          className={`inline-block px-2.5 py-1 rounded-lg text-xs font-medium border ${
                            statusStyles[item.statusColor]
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                    </div>
                    <p className="mt-3 text-xs text-gray-400">
                      {item.feePayer} pays the escrow fee
                    </p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ========== SELLER TAB ========== */}
        {activeTab === "seller" && (
          <>
            {!hasSellerEscrows ? (
              <div className="bg-white rounded-2xl border border-gray-100 py-20 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-5">
                  <FileText
                    className="w-10 h-10 text-blue-400"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No seller escrows yet
                </h3>
                <p className="text-sm text-gray-500 max-w-xs">
                  Escrows where you are the seller will appear here
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sellerEscrows.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl border border-gray-100 p-5 relative hover:shadow-md transition"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                          <ShieldCheck
                            className="w-4 h-4 text-blue-600"
                            aria-hidden="true"
                          />
                        </div>
                        <p className="text-sm font-semibold text-gray-900">
                          Funds Secured in Escrow
                        </p>
                      </div>

                      <div className="relative">
                        <button
                          onClick={() =>
                            setOpenMenuId(
                              openMenuId === `seller-${item.id}`
                                ? null
                                : `seller-${item.id}`,
                            )
                          }
                          className="p-1 rounded-lg hover:bg-gray-100 text-gray-400"
                        >
                          <MoreVertical
                            className="w-5 h-5"
                            aria-hidden="true"
                          />
                        </button>

                        {openMenuId === `seller-${item.id}` && (
                          <div className="absolute right-0 top-8 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-20">
                            <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50">
                              Contact buyer
                            </button>
                            <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50">
                              Share transaction
                            </button>
                            <button className="w-full px-4 py-2.5 text-left text-sm text-red-500 hover:bg-red-50">
                              Raise concern
                            </button>
                            <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50">
                              Cancel transaction
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Status</span>
                        <span
                          className={`px-2.5 py-0.5 rounded-lg text-xs font-medium border ${
                            statusStyles[item.statusColor]
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500">Buyer</span>
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-gray-200" />
                          <span className="font-medium text-gray-900">
                            {item.email}
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Delivery</span>
                        <span className="font-medium text-gray-900">
                          {item.days}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Amount</span>
                        <span className="font-medium text-gray-900">
                          {item.amount}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500">Service</span>
                        <span className="px-2.5 py-0.5 rounded-lg text-xs font-medium bg-amber-50 text-amber-700 border border-amber-100">
                          {item.service}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Floating Create Button */}
        <Link
          href="/dashboard/escrow/create"
          className="fixed bottom-24 right-6 lg:bottom-10 lg:right-10 w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-blue-600/30 hover:bg-blue-700 transition z-30"
        >
          <Plus className="w-6 h-6" aria-hidden="true" />
        </Link>
      </div>
    </>
  );
}
