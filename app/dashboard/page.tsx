"use client";

import Link from "next/link";
import Image from "next/image";
import BrandModel from "@/assets/midomanModelImage.png";
import GenerateAccountModal from "@/components/modals/GenerateAccountModal";
import { useState } from "react";
import AddFundsModal from "@/components/modals/AddFundsModal";
import WithdrawalFlow from "@/components/withdraw/WithdrawalFlow";

export default function DashboardHome() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [account, setAccount] = useState<{
    balance: string;
    bankName: string;
    accountNumber: string;
  } | null>(null);
  const [isAddFundsOpen, setIsAddFundsOpen] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);

  const hasAccount = !!account;

  return (
    <div className="max-w-6xl mx-auto">
      {/* Page title - mobile only */}
      <h1 className="text-xl font-semibold text-gray-900 mb-6 lg:hidden">
        Home
      </h1>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
        {/* ========== LEFT + CENTER COLUMN ========== */}
        <div className="xl:col-span-5 space-y-6">
          {/* Account Balance Card */}
          <div className="rounded-2xl h-50.25 lg:h-64.75 text-white relative overflow-hidden">
            <div className="relative z-10 bg-transparent">
              <div className="items-start lg:h-40 p-6 flex justify-between rounded-br-2xl bg-brand">
                <div>
                  <p className="text-blue-100 text-sm mb-1">Account balance</p>
                  <h2 className="text-3xl font-bold tracking-tight">
                    {hasAccount ? account.balance : "0.00NGN"}
                  </h2>
                </div>
                <div className="text-right">
                  <p className="text-blue-100 text-sm mb-1">Bank Name</p>
                  <p className="font-medium">
                    {hasAccount ? account.bankName : "N/A"}
                  </p>
                </div>
              </div>
              {/* The Lower Part of the Card */}
              <div className="grid grid-cols-2 bg-transparent">
                <div className="flex col-span-1 items-center justify-between h-27 -mt-2 rounded-br-4xl gap-4 bg-brand">
                  <div className="flex items-center gap-2">
                    <div className="flex m-6 flex-col">
                      <p className="text-blue-100 text-xs mb-0.5">
                        Account Number
                      </p>
                      <p className="font-medium">
                        {hasAccount ? account.accountNumber : "N/A"}
                      </p>
                    </div>
                    {hasAccount && (
                      <button className="p-1.5 rounded-lg bg-transparent hover:bg-white/20 transition">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
                <div className="flex items-center col-span-1 bg-gray-50 h-25 px-3 rounded-lg -ml-2 z-50">
                  {hasAccount ? (
                    <button
                      onClick={() => setIsAddFundsOpen(true)}
                      className="flex items-center gap-2 bg-white h-15 w-52 hover:bg-white/20 border border-blue-500 text-blue-500 border-dashed rounded-xl px-4 py-2.5 text-sm font-medium transition"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      Add Funds
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="flex items-center gap-2 bg-white h-15 w-52 hover:bg-white/20 border border-blue-500 text-blue-500 border-dashed rounded-xl px-4 py-2.5 text-sm font-medium transition"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      Generate Account
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl p-5 mt-13 shadow-sm border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Quick actions
            </h3>
            <div className="grid grid-cols-4 gap-3">
              {[
                {
                  label: "Withdraw",
                  href: "/dashboard/withdraw",
                  icon: (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.8}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 10l7-7m0 0l7 7m-7-7v18"
                      />
                    </svg>
                  ),
                },
                {
                  label: "Deposit",
                  href: "/dashboard/deposit",
                  icon: (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.8}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  ),
                },
                {
                  label: "Escrow",
                  href: "/dashboard/escrow",
                  icon: (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.8}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  ),
                },
                {
                  label: "History",
                  href: "/dashboard/transactions",
                  icon: (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.8}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  ),
                },
              ].map((action) =>
                action.label === "Withdraw" ? (
                  <button
                    key={action.label}
                    type="button"
                    onClick={() => setShowWithdraw(true)}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-50 transition group"
                  >
                    <div className="w-12 h-12 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-600 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-100 transition">
                      {action.icon}
                    </div>
                    <span className="text-xs font-medium text-gray-600 group-hover:text-gray-900">
                      {action.label}
                    </span>
                  </button>
                ) : (
                  <Link
                    key={action.label}
                    href={action.href}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-50 transition group"
                  >
                    <div className="w-12 h-12 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-600 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-100 transition">
                      {action.icon}
                    </div>
                    <span className="text-xs font-medium text-gray-600 group-hover:text-gray-900">
                      {action.label}
                    </span>
                  </Link>
                ),
              )}
            </div>
          </div>

          {/* Promo Card - Fund 100% Secured */}
          <div className="bg-[#FFF2E7] mt-18 rounded-2xl h-43.75 px-5 flex items-center gap-5 border border-orange-100/60 overflow-visible relative">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center">
                  <svg
                    className="w-3.5 h-3.5 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <span className="text-xs font-semibold text-blue-600">
                  Midoman
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 leading-tight mb-3">
                Fund 100%
                <br />
                Secured
              </h3>
              <Link
                href="/dashboard/escrow/create"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 transition"
              >
                Create escrow
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>

            {/* Illustration - Popping out of the box */}
            <Image
              src={BrandModel}
              alt="Brand Model"
              className="w-62.5 h-auto object-contain absolute -right-2 -top-40 z-20 pointer-events-none"
            />
          </div>

          {/* Active Transaction (optional - shown in second desktop design) */}

          <div className="bg-white rounded-2xl p-5 mt-15 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-900">
                Active transaction
              </h3>
              <Link
                href="/dashboard/transactions"
                className="text-xs text-blue-600 font-medium hover:underline"
              >
                See all
              </Link>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Deposit</p>
                  <p className="text-xs text-gray-400">50 min ago</p>
                </div>
              </div>
              <p className="text-sm font-semibold text-green-600">+20,000NGN</p>
            </div>
          </div>
        </div>

        {/* ========== RIGHT COLUMN ========== */}
        <div className="xl:col-span-7 space-y-6">
          {showWithdraw ? (
            <WithdrawalFlow
              availableBalance={account ? 20000 : 0}
              onClose={() => setShowWithdraw(false)}
            />
          ) : (
            /* Deposit History */
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full min-h-[320px] flex flex-col">
              <h3 className="text-base font-semibold text-gray-900 mb-8">
                Deposit history
              </h3>

              {hasAccount ? (
                <div className="space-y-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-gray-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 14l-7 7m0 0l-7-7m7 7V3"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            +20,000NGN
                          </p>
                          <p className="text-xs text-gray-400">
                            deposit via providus bank
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-medium text-green-600">
                        Successful
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
                  <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                    <svg
                      className="w-8 h-8 text-blue-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    You have not deposited
                  </p>
                  <p className="text-xs text-gray-400 max-w-[200px]">
                    Send money to the account number to deposit
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Generate Account Modal */}
      <GenerateAccountModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={(data) => setAccount(data)}
      />

      {/* Add Funds Modal */}
      {account && (
        <AddFundsModal
          isOpen={isAddFundsOpen}
          onClose={() => setIsAddFundsOpen(false)}
          accountNumber={account.accountNumber}
          bankName={account.bankName}
        />
      )}
    </div>
  );
}
