"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import MidomanLogo from "@/assets/midomanLogoCropped.png";
import depositIcon from "@/assets/deposit-icon.png";
import escrowIcon from "@/assets/escrow-icon.png";
import historyIcon from "@/assets/history-icon.png";
import withdrawIcon from "@/assets/withdraw-icon.png";
import centerTabIcon from "@/assets/center-tab-icon.png";
import transactionIcon from "@/assets/transaction-icon.png";
import homeIcon from "@/assets/Home-icon.png";
import settingsIcon from "@/assets/setting-icon.png";

import { Bell, LogOut, SunDim, Menu, Moon, Search, X } from "lucide-react";

const navItems = [
  {
    label: "Home",
    href: "/dashboard",
    icon: (
      <Image src={homeIcon} alt="Home" className="w-5 h-5" aria-hidden="true" />
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
    label: "Transactions",
    href: "/dashboard/transactions",
    icon: (
      <Image
        src={transactionIcon}
        alt="Transactions"
        className="w-5 h-5"
        aria-hidden="true"
      />
    ),
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: (
      <Image
        src={settingsIcon}
        alt="Settings"
        className="w-5 h-5"
        aria-hidden="true"
      />
    ),
  },
];

export default function AppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const currentPage =
    navItems.find(
      (item) =>
        pathname === item.href ||
        (item.href !== "/dashboard" && pathname.startsWith(`${item.href}/`)),
    )?.label ?? "Home";

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsMobileMenuOpen(false);
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isMobileMenuOpen]);

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex">
      {/* ========== DESKTOP SIDEBAR ========== */}
      <aside className="hidden lg:flex w-[240px] flex-col bg-white border-r border-gray-100 fixed h-full z-30">
        {/* Logo */}
        <div className="px-6 py-6">
          <Link href="/dashboard" aria-label="Midoman home">
            <Image
              src={MidomanLogo}
              alt="Midoman"
              className="h-4 lg:h-8 w-auto"
              loading="eager"
            />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className="px-4 pb-6 space-y-4 flex flex-col justify-between items-center">
          {/* New features button */}
          <div className="flex flex-col gap-3 justify-center items-center bg-gray-50 w-40 py-3 rounded-lg">
            <button className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/30 hover:bg-blue-700 transition mx-auto">
              <Image
                src={centerTabIcon}
                alt="New Features"
                className="w-11 h-11 object-cover"
                aria-hidden="true"
              />
            </button>
            <p className="text-base font-medium text-gray-300">New features</p>
          </div>
          <div className="flex items-center justify-center gap-2 p-1 rounded-full text-gray-400 bg-gray-100">
            <button className="p-2 hover:text-gray-600 transition bg-white rounded-full">
              <SunDim className="w-4 h-4" aria-hidden="true" />
            </button>
            <button className="p-2 hover:text-gray-600 transition">
              <Moon className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <button className="flex items-center gap-2 text-red-500 text-sm font-medium px-4 py-2 hover:bg-red-50 rounded-lg transition w-full justify-center">
            <LogOut className="w-4 h-4" aria-hidden="true" />
            Log out
          </button>
        </div>
      </aside>

      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <button
            type="button"
            aria-label="Close navigation menu"
            className="absolute inset-0 bg-gray-950/40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <aside
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Main navigation"
            className="relative flex h-full w-80 max-w-[85vw] flex-col bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-5">
              <Link
                href="/dashboard"
                className="flex items-center gap-2.5"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Image src={MidomanLogo} alt="Midoman" className="h-6 w-auto" />
              </Link>
              <button
                type="button"
                aria-label="Close navigation menu"
                className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Main menu" className="flex-1 space-y-1 px-4 py-5">
              <p className="px-4 pb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                Menu
              </p>
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/dashboard" &&
                    pathname.startsWith(`${item.href}/`));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="border-t border-gray-100 px-5 py-4">
              <p className="text-sm font-semibold text-gray-800">
                Payments with peace of mind
              </p>
              <p className="mt-1 text-xs leading-5 text-gray-500">
                Explore escrow, review activity, and manage your account.
              </p>
            </div>
          </aside>
        </div>
      )}

      {/* ========== MAIN CONTENT ========== */}
      <div className="flex-1 lg:ml-[240px] min-h-screen flex flex-col">
        {/* Top header (mobile + desktop) */}
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-gray-100 bg-white/80 px-4 py-4 backdrop-blur-md lg:px-8">
          <div className="flex items-center">
            <button
              type="button"
              aria-label="Open navigation menu"
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 lg:hidden rounded-xl border border-gray-300 bottom-1"
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
            <h1 className="hidden text-xl font-semibold text-gray-900 lg:block">
              {currentPage}
            </h1>
          </div>

          <Link
            href="/dashboard"
            aria-label="Midoman home"
            className="absolute left-1/2 -translate-x-1/2 lg:hidden"
          >
            <Image
              src={MidomanLogo}
              alt="Midoman"
              className="h-6 w-auto"
              loading="eager"
            />
          </Link>

          <div className="flex items-center gap-3 ml-auto">
            <div className="relative hidden sm:block">
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 bg-transparent border border-gray-200 rounded-lg text-sm w-48 lg:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
              <Search
                className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2"
                aria-hidden="true"
              />
            </div>
            <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-2xl transition border border-gray-300 hover:text-gray-900 ">
              <Bell className="w-5 h-5" aria-hidden="true" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-8 pb-24 lg:pb-8">{children}</main>
      </div>

      {/* ========== MOBILE BOTTOM NAV ========== */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-100 px-6 py-2 safe-area-pb">
        <div className="flex items-center justify-between max-w-md mx-auto">
          {navItems.slice(0, 2).map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 py-2 px-3 ${
                  isActive ? "text-blue-600" : "text-gray-400"
                }`}
              >
                {item.icon}
                <span className="text-[11px] font-medium">{item.label}</span>
              </Link>
            );
          })}

          {/* Center action button */}
          <button className="w-14 h-14 -mt-6 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/40">
            <Image
              src={centerTabIcon}
              alt="New Features"
              className="w-6 h-6"
              aria-hidden="true"
            />
          </button>

          {navItems.slice(2).map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 py-2 px-3 ${
                  isActive ? "text-blue-600" : "text-gray-400"
                }`}
              >
                {item.icon}
                <span className="text-[11px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
