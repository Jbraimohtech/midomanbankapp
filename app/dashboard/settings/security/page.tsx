"use client";

import { useState } from "react";
import Link from "next/link";

export default function SecurityPage() {
  const [rememberMe, setRememberMe] = useState(true);
  const [googleAuth, setGoogleAuth] = useState(false);
  const [emailAuth, setEmailAuth] = useState(false);

  return (
    <>
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link
            href="/dashboard/settings"
            className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition lg:hidden"
          >
            <svg
              className="w-5 h-5 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </Link>
          <h1 className="text-xl font-semibold text-gray-900">Security</h1>
        </div>

        {/* Security Options */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          {/* Remember me */}
          <div className="flex items-center justify-between px-4 py-4">
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
          <div className="flex items-center justify-between px-4 py-4 border-t border-gray-100">
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
          <div className="flex items-center justify-between px-4 py-4 border-t border-gray-100">
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
          <button className="flex items-center justify-between px-4 py-4 border-t border-gray-100 w-full hover:bg-gray-50 transition">
            <span className="text-sm font-medium text-gray-900">
              Device management
            </span>
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Change Password Button */}
        <div className="mt-6">
          <button className="w-full py-3.5 border border-blue-600 text-blue-600 font-medium rounded-xl hover:bg-blue-50 transition">
            Change password
          </button>
        </div>
      </div>
    </>
  );
}
