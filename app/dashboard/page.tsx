"use client";

import Link from "next/link";
import Image from "next/image";
import BrandModel from "@/assets/midomanModelImage.png";
import GenerateAccountModal from "@/components/modals/GenerateAccountModal";
import { Fragment, useState } from "react";
import AddFundsModal from "@/components/modals/AddFundsModal";
import WithdrawalFlow from "@/components/withdraw/WithdrawalFlow";
import MidomanLogo from "@/assets/midomanLogoCropped.png";
import depositIcon from "@/assets/deposit-icon.png";
import escrowIcon from "@/assets/escrow-icon.png";
import historyIcon from "@/assets/history-icon.png";
import withdrawIcon from "@/assets/withdraw-icon.png";
import depositEmptyIcon from "@/assets/deposit-empty-icon.png";
import { ArrowRight, Copy, Plus } from "lucide-react";

export default function DashboardHome() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [account, setAccount] = useState<{
    balance: string;
    bankName: string;
    accountNumber: string;
  } | null>(null);
  const [isAddFundsOpen, setIsAddFundsOpen] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showMobileRightColumn, setShowMobileRightColumn] = useState(false);

  const hasAccount = !!account;

  return (
    <div className="max-w-6xl mx-auto">
      {/* Page title - mobile only */}
      <h1 className="text-xl font-semibold text-gray-900 mb-6 hidden">Home</h1>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
        {/* ========== LEFT + CENTER COLUMN ========== */}
        <div
          className={`xl:col-span-5 space-y-6 ${
            showMobileRightColumn ? "hidden xl:block" : ""
          }`}
        >
          {/* Account Balance Card */}
          <div className="rounded-2xl h-50.25 lg:h-64.75 text-white relative overflow-hidden">
            <div className="relative z-10 bg-transparent">
              <div className="items-start lg:h-40 p-6 flex justify-between rounded-br-2xl bg-brand">
                <div>
                  <p className="text-blue-100 text-[14px] mb-1">
                    Account balance
                  </p>
                  <h2 className="text-[26px] font-medium tracking-tight">
                    {hasAccount ? account.balance : "0.00NGN"}
                  </h2>
                </div>
                <div className="text-left -ml-5 w-28">
                  <p className="text-blue-100 text-[14px] mb-1">Bank Name</p>
                  <p className="font-medium">
                    {hasAccount ? account.bankName : "N/A"}
                  </p>
                </div>
              </div>
              {/* The Lower Part of the Card */}
              <div className="grid grid-cols-2 bg-transparent">
                <div className="flex col-span-1 items-center justify-between h-27 lg:-mt-2 rounded-br-[60px] lg:rounded-br-3xl gap-4 bg-brand">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      <div className="flex ml-6 flex-col">
                        <p className="text-blue-100 text-[14px] lg:text-[14px]  mb-0.5">
                          Account Number
                        </p>
                        <p className="font-sans font-medium text-[14px] lg:text-[16px]">
                          {hasAccount ? account.accountNumber : "N/A"}
                        </p>
                      </div>
                      <span className="flex items-center justify-center p-2 rounded-lg bg-transparent transition cursor-pointer">
                        <Copy width={20} height={20} />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center col-span-1 bg-gray-50 h-25 px-3 rounded-lg -ml-2 z-50">
                  {hasAccount ? (
                    <button
                      onClick={() => setIsAddFundsOpen(true)}
                      className="flex items-center gap-2 bg-white h-15 w-52 hover:bg-white/20 border border-blue-500 text-blue-500 border-dashed rounded-xl px-4 py-2.5 text-sm font-medium transition"
                    >
                      <Plus className="w-4 h-4" aria-hidden="true" />
                      Add Funds
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="flex items-center gap-2 bg-white h-15 w-52 hover:bg-white/20 border border-blue-500 text-blue-500 border-dashed rounded-xl px-4 py-2.5 text-[12px] lg:text-sm font-medium transition"
                    >
                      <Plus className="w-4 h-4" aria-hidden="true" />
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
                    <Image
                      src={withdrawIcon}
                      alt="Withdraw"
                      className="w-5 h-5"
                      aria-hidden="true"
                    />
                  ),
                },
                {
                  label: "Deposit",
                  href: "/dashboard/deposit",
                  icon: (
                    <Image
                      src={depositIcon}
                      alt="Deposit"
                      className="w-5 h-5"
                      aria-hidden="true"
                    />
                  ),
                },
                {
                  label: "Escrow",
                  href: "/dashboard/escrow",
                  icon: (
                    <Image
                      src={escrowIcon}
                      alt="Escrow"
                      className="w-5 h-5"
                      aria-hidden="true"
                    />
                  ),
                },
                {
                  label: "History",
                  href: "/dashboard/transactions",
                  icon: (
                    <Image
                      src={historyIcon}
                      alt="History"
                      className="w-5 h-5"
                      aria-hidden="true"
                    />
                  ),
                },
              ].map((action) =>
                action.label === "Withdraw" ? (
                  <button
                    key={action.label}
                    type="button"
                    onClick={() => {
                      setShowWithdraw(true);
                      setShowMobileRightColumn(true);
                    }}
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
                  <Fragment key={action.label}>
                    <Link
                      href={action.href}
                      className="hidden flex-col items-center gap-2 rounded-xl p-3 transition hover:bg-gray-50 group xl:flex"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-100 bg-gray-50 text-gray-600 transition group-hover:border-blue-100 group-hover:bg-blue-50 group-hover:text-blue-600">
                        {action.icon}
                      </div>
                      <span className="text-xs font-medium text-gray-600 group-hover:text-gray-900">
                        {action.label}
                      </span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => setShowMobileRightColumn(true)}
                      className="flex flex-col items-center gap-2 rounded-xl p-3 transition hover:bg-gray-50 group xl:hidden"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-100 bg-gray-50 text-gray-600 transition group-hover:border-blue-100 group-hover:bg-blue-50 group-hover:text-blue-600">
                        {action.icon}
                      </div>
                      <span className="text-xs font-medium text-gray-600 group-hover:text-gray-900">
                        {action.label}
                      </span>
                    </button>
                  </Fragment>
                ),
              )}
            </div>
          </div>

          {/* Promo Card - Fund 100% Secured */}
          <div className="bg-[#FFF2E7] mt-18 rounded-2xl h-43.75 px-5 flex items-center gap-5 border border-orange-100/60 overflow-visible relative">
            <div className="flex-1 min-w-0">
              <Image
                src={MidomanLogo}
                alt="Midoman"
                className="mb-2 h-6 w-auto"
              />
              <h3 className="text-lg font-bold text-gray-900 leading-tight mt-5 mb-3">
                Fund 100%
                <br />
                Secured
              </h3>
              <Link
                href="/dashboard/escrow/create"
                className="inline-flex p-2 rounded items-center gap-1.5 text-sm font-medium text-black hover:text-blue-700 transition shadow-sm hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Create escrow
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
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
              <h3 className="text-sm lg:text-[24px] font-semibold text-gray-900">
                Active transaction
              </h3>
              <Link
                href="/dashboard/transactions"
                className="text-sm text-gray-300 font-normal hover:underline"
              >
                See all
              </Link>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <Image
                    src={depositIcon}
                    alt="Deposit"
                    className="w-5 h-5"
                    aria-hidden="true"
                  />
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
          {showMobileRightColumn && (
            <button
              type="button"
              onClick={() => {
                setShowMobileRightColumn(false);
                setShowWithdraw(false);
              }}
              className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-blue-600 xl:hidden"
            >
              <span aria-hidden="true">&larr;</span>
              Back to dashboard
            </button>
          )}
          {showWithdraw ? (
            <WithdrawalFlow
              availableBalance={account ? 20000 : 0}
              onClose={() => setShowWithdraw(false)}
            />
          ) : (
            /* Deposit History */
            <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 h-full min-h-[320px] flex flex-col">
              <h3 className="text-base lg:text-[24px] font-medium text-gray-900 mb-8">
                Deposit history
              </h3>

              {hasAccount ? (
                <div className="space-y-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex shadow-sm p-3 rounded-2xl bg-gray-50/25 items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                          <Image
                            src={depositIcon}
                            alt="Deposit"
                            className="w-4 h-4 text-gray-500"
                            aria-hidden="true"
                          />
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
                  <div className="w-30 h-30 lg:-mt-100 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                    <Image
                      src={depositEmptyIcon}
                      alt="Deposit Empty"
                      className="w-30 h-30 object-cover text-blue-400"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="text-[20px] font-medium text-gray-700 mb-1">
                    You have not deposited
                  </p>
                  <p className="text-base text-gray-400 max-w-78.75">
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
