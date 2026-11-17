"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Mail, Pencil } from "lucide-react";

export default function PersonalInfoPage() {
  const [fullName, setFullName] = useState("Kelvin Tech");
  const [escrowTag, setEscrowTag] = useState("KelvinTech32");
  const [email, setEmail] = useState("KelvinTech0032@gmail.com");
  const [dateOfBirth, setDateOfBirth] = useState("12/27/1998");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Later: call API to update profile
    console.log({ fullName, escrowTag, email, dateOfBirth });
    alert("Profile updated successfully!");
  };

  return (
    <>
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link
            href="/dashboard/settings"
            className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition lg:hidden"
          >
            <ArrowLeft
              className="w-5 h-5 text-gray-700"
              aria-hidden="true"
            />
          </Link>
          <h1 className="text-xl font-semibold text-gray-900">Personal info</h1>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Avatar */}
          <div className="flex justify-center mb-2">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                {/* Replace with real image later */}
                <span className="text-3xl font-medium text-gray-500">K</span>
              </div>
              <button
                type="button"
                className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md hover:bg-blue-700 transition"
              >
                <Pencil className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
              placeholder="Enter your full name"
            />
          </div>

          {/* Escrow tag */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Escrow tag
            </label>
            <input
              type="text"
              value={escrowTag}
              onChange={(e) => setEscrowTag(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
              placeholder="@username"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Email
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Mail className="w-4 h-4" aria-hidden="true" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                placeholder="your@email.com"
              />
            </div>
          </div>

          {/* Date of birth */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Date of birth
            </label>
            <div className="relative">
              <input
                type="text"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                placeholder="MM/DD/YYYY"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                <CalendarDays className="w-5 h-5" aria-hidden="true" />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-3.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition shadow-sm shadow-blue-600/20"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
