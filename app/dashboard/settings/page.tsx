"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  CircleHelp,
  Info,
  Languages,
  LockKeyhole,
  LogOut,
  MessageCircle,
  Moon,
  UserRound,
} from "lucide-react";

type Tab = "general" | "profile" | "security";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("general");
  const [rememberMe, setRememberMe] = useState(true);
  const [googleAuth, setGoogleAuth] = useState(false);
  const [emailAuth, setEmailAuth] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [appearance, setAppearance] = useState<"light" | "dark" | "system">(
    "light",
  );

  return (
    <div className="max-w-5xl mx-auto">
      {/* Page Title */}
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Settings</h1>

      {/* ========== DESKTOP VERSION ========== */}
      <div className="hidden lg:block">
        {/* Tabs */}
        <div className="flex items-center gap-8 border-b border-gray-200 mb-8">
          {[
            { id: "general", label: "General" },
            { id: "profile", label: "Profile" },
            { id: "security", label: "Security" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`pb-3 text-sm font-medium transition relative ${
                activeTab === tab.id
                  ? "text-blue-600"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
              )}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left Content */}
          <div className="xl:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8">
              {/* ===== GENERAL TAB ===== */}
              {activeTab === "general" && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-1">
                    General settings
                  </h2>
                  <p className="text-sm text-gray-500 mb-8">
                    Update your profile and how people can contact you generally
                  </p>

                  {/* Profile details */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium text-gray-900">
                        Profile details
                      </h3>
                      <button className="text-sm text-blue-600 font-medium hover:underline">
                        Edit
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1.5">
                          First name
                        </label>
                        <input
                          type="text"
                          defaultValue="Kelvin"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1.5">
                          Last name
                        </label>
                        <input
                          type="text"
                          defaultValue="Tech"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-xs text-gray-500 mb-1.5">
                        Email address
                      </label>
                      <input
                        type="email"
                        defaultValue="Kelvintech@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-gray-500 mb-1.5">
                        Date of birth
                      </label>
                      <input
                        type="text"
                        defaultValue="12/27/1998"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="mb-8 pt-6 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-900">
                          Languages
                        </span>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="text-base">🇺🇸</span>
                          English
                        </div>
                      </div>
                      <button className="text-sm text-blue-600 font-medium hover:underline">
                        Change
                      </button>
                    </div>
                  </div>

                  {/* App appearance */}
                  <div className="pt-6 border-t border-gray-100">
                    <h3 className="text-sm font-medium text-gray-900 mb-4">
                      App appearance
                    </h3>
                    <div className="flex flex-wrap gap-6">
                      {[
                        { id: "light", label: "Light mode" },
                        { id: "dark", label: "Dark mode" },
                        { id: "system", label: "System preference" },
                      ].map((option) => (
                        <label
                          key={option.id}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="appearance"
                            checked={appearance === option.id}
                            onChange={() => setAppearance(option.id as any)}
                            className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">
                            {option.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ===== PROFILE TAB ===== */}
              {activeTab === "profile" && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-1">
                    Profile
                  </h2>
                  <p className="text-sm text-gray-500 mb-8">
                    Manage your personal information
                  </p>
                  <p className="text-sm text-gray-500">
                    This tab can contain the same fields as General or more
                    detailed profile settings. We can expand it later.
                  </p>
                </div>
              )}

              {/* ===== SECURITY TAB ===== */}
              {activeTab === "security" && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-1">
                    Security
                  </h2>
                  <p className="text-sm text-gray-500 mb-8">
                    Update your profile and how people can contact you generally
                  </p>

                  <div className="space-y-1">
                    {/* Remember me */}
                    <div className="flex items-center justify-between py-4">
                      <span className="text-sm font-medium text-gray-900">
                        Remember me
                      </span>
                      <button
                        onClick={() => setRememberMe(!rememberMe)}
                        className={`relative w-11 h-6 rounded-full transition ${
                          rememberMe ? "bg-blue-600" : "bg-gray-200"
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                            rememberMe ? "translate-x-5" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>

                    {/* Google Authenticator */}
                    <div className="flex items-center justify-between py-4 border-t border-gray-100">
                      <span className="text-sm font-medium text-gray-900">
                        Google Authenticator
                      </span>
                      <button
                        onClick={() => setGoogleAuth(!googleAuth)}
                        className={`relative w-11 h-6 rounded-full transition ${
                          googleAuth ? "bg-blue-600" : "bg-gray-200"
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                            googleAuth ? "translate-x-5" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>

                    {/* Email Authenticator */}
                    <div className="flex items-center justify-between py-4 border-t border-gray-100">
                      <span className="text-sm font-medium text-gray-900">
                        Email Authenticator
                      </span>
                      <button
                        onClick={() => setEmailAuth(!emailAuth)}
                        className={`relative w-11 h-6 rounded-full transition ${
                          emailAuth ? "bg-blue-600" : "bg-gray-200"
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                            emailAuth ? "translate-x-5" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>

                    {/* Device management */}
                    <button className="flex items-center justify-between py-4 border-t border-gray-100 w-full group">
                      <span className="text-sm font-medium text-gray-900">
                        Device management
                      </span>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right - Help and Support */}
          <div>
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
              <h3 className="text-base font-semibold text-gray-900 mb-5">
                Help and Support
              </h3>

              <div className="space-y-5">
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    Looking for info about us?
                  </p>
                  <Link
                    href="#"
                    className="text-sm text-blue-600 font-medium hover:underline"
                  >
                    Learn more
                  </Link>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    Tips on how to use midoman?
                  </p>
                  <Link
                    href="#"
                    className="text-sm text-blue-600 font-medium hover:underline"
                  >
                    Learn more
                  </Link>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <p className="text-sm font-medium text-gray-900 mb-3">
                    Need something else?
                  </p>
                  <div className="space-y-2.5">
                    <Link
                      href="#"
                      className="flex items-center gap-2 text-sm text-blue-600 font-medium hover:underline"
                    >
                      <MessageCircle className="w-4 h-4" aria-hidden="true" />
                      Contact support
                    </Link>
                    <Link
                      href="#"
                      className="flex items-center gap-2 text-sm text-blue-600 font-medium hover:underline"
                    >
                      <CircleHelp className="w-4 h-4" aria-hidden="true" />
                      FAQ&apos;s
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========== MOBILE VERSION ========== */}
      <div className="lg:hidden space-y-6">
        {/* User info */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
            <div className="w-full h-full flex items-center justify-center text-gray-500 text-lg font-medium">
              K
            </div>
          </div>
          <div>
            <p className="font-semibold text-gray-900">Kelvin</p>
            <p className="text-sm text-gray-500">Kelvintech@gmail.com</p>
          </div>
        </div>

        {/* General section */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <p className="px-4 pt-4 pb-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
            General
          </p>

          <Link
            href="/dashboard/settings/personal-info"
            className="flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 transition"
          >
            <div className="flex items-center gap-3">
              <UserRound className="w-5 h-5 text-gray-500" aria-hidden="true" />
              <span className="text-sm font-medium text-gray-900">
                Personal info
              </span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" aria-hidden="true" />
          </Link>

          <Link
            href="/dashboard/settings/security"
            className="flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 transition border-t border-gray-50"
          >
            <div className="flex items-center gap-3">
              <LockKeyhole className="w-5 h-5 text-gray-500" aria-hidden="true" />
              <span className="text-sm font-medium text-gray-900">
                Security
              </span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" aria-hidden="true" />
          </Link>

          <button className="flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 transition border-t border-gray-50 w-full">
            <div className="flex items-center gap-3">
              <Languages className="w-5 h-5 text-gray-500" aria-hidden="true" />
              <span className="text-sm font-medium text-gray-900">
                Language
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">English (US)</span>
              <ChevronRight className="w-5 h-5 text-gray-400" aria-hidden="true" />
            </div>
          </button>

          <div className="flex items-center justify-between px-4 py-3.5 border-t border-gray-50">
            <div className="flex items-center gap-3">
              <Moon className="w-5 h-5 text-gray-500" aria-hidden="true" />
              <span className="text-sm font-medium text-gray-900">
                Dark mode
              </span>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`relative w-11 h-6 rounded-full transition ${
                darkMode ? "bg-blue-600" : "bg-gray-200"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  darkMode ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        {/* About section */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <p className="px-4 pt-4 pb-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
            About
          </p>

          <Link
            href="#"
            className="flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 transition"
          >
            <div className="flex items-center gap-3">
              <CircleHelp className="w-5 h-5 text-gray-500" aria-hidden="true" />
              <span className="text-sm font-medium text-gray-900">
                Help Center
              </span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" aria-hidden="true" />
          </Link>

          <Link
            href="#"
            className="flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 transition border-t border-gray-50"
          >
            <div className="flex items-center gap-3">
              <Info className="w-5 h-5 text-gray-500" aria-hidden="true" />
              <span className="text-sm font-medium text-gray-900">
                About midoman
              </span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" aria-hidden="true" />
          </Link>
        </div>

        {/* Logout */}
        <button className="flex items-center gap-3 px-4 py-3.5 text-red-500 font-medium text-sm w-full">
          <LogOut className="w-5 h-5" aria-hidden="true" />
          Logout
        </button>
      </div>
    </div>
  );
}
