"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  BellRing,
  CheckCheck,
  ChevronRight,
  CircleCheck,
  Settings,
  ShieldAlert,
  ShieldCheck,
  UserRound,
  type LucideIcon,
} from "lucide-react";

type NotificationCategory =
  | "Transactions"
  | "Escrow"
  | "Security"
  | "Account";
type NotificationFilter = "All" | NotificationCategory;
type NotificationGroup = "Today" | "Yesterday" | "Earlier";

type NotificationItem = {
  id: number;
  title: string;
  message: string;
  time: string;
  category: NotificationCategory;
  group: NotificationGroup;
  read: boolean;
  icon: LucideIcon;
  iconColor: string;
  iconBackground: string;
};

const initialNotifications: NotificationItem[] = [
  {
    id: 1,
    title: "Deposit received",
    message: "₦20,000.00 was added to your wallet via Providus Bank.",
    time: "5 min ago",
    category: "Transactions",
    group: "Today",
    read: false,
    icon: ArrowDownLeft,
    iconColor: "text-blue-600",
    iconBackground: "bg-blue-50",
  },
  {
    id: 2,
    title: "Escrow funded",
    message: "Funds for your MacBook Pro transaction are now secured.",
    time: "1 hour ago",
    category: "Escrow",
    group: "Today",
    read: false,
    icon: ShieldCheck,
    iconColor: "text-violet-600",
    iconBackground: "bg-violet-50",
  },
  {
    id: 3,
    title: "Review your security",
    message: "Add an extra layer of protection by enabling two-factor authentication.",
    time: "3 hours ago",
    category: "Security",
    group: "Today",
    read: false,
    icon: ShieldAlert,
    iconColor: "text-amber-600",
    iconBackground: "bg-amber-50",
  },
  {
    id: 4,
    title: "Withdrawal successful",
    message: "₦8,500.00 has been sent to your Access Bank account.",
    time: "Yesterday",
    category: "Transactions",
    group: "Yesterday",
    read: true,
    icon: ArrowUpRight,
    iconColor: "text-emerald-600",
    iconBackground: "bg-emerald-50",
  },
  {
    id: 5,
    title: "Escrow completed",
    message: "Your transaction is complete. Thanks for using Midoman.",
    time: "Yesterday",
    category: "Escrow",
    group: "Yesterday",
    read: true,
    icon: CircleCheck,
    iconColor: "text-emerald-600",
    iconBackground: "bg-emerald-50",
  },
  {
    id: 6,
    title: "Welcome to Midoman",
    message: "Your account is ready. You can now securely manage your funds.",
    time: "2 days ago",
    category: "Account",
    group: "Earlier",
    read: true,
    icon: UserRound,
    iconColor: "text-gray-600",
    iconBackground: "bg-gray-100",
  },
];

const filters: NotificationFilter[] = [
  "All",
  "Transactions",
  "Escrow",
  "Security",
  "Account",
];
const groups: NotificationGroup[] = ["Today", "Yesterday", "Earlier"];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeFilter, setActiveFilter] =
    useState<NotificationFilter>("All");

  const unreadCount = notifications.filter(
    (notification) => !notification.read,
  ).length;
  const unreadPercent =
    notifications.length === 0
      ? 0
      : (unreadCount / notifications.length) * 100;
  const filteredNotifications =
    activeFilter === "All"
      ? notifications
      : notifications.filter(
          (notification) => notification.category === activeFilter,
        );

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({ ...notification, read: true })),
    );
  };

  const markAsRead = (id: number) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification,
      ),
    );
  };

  return (
    <div className="mx-auto max-w-6xl">
      <header className="mb-6 flex flex-col gap-5 rounded-3xl border border-blue-100 bg-gradient-to-br from-white via-white to-blue-50 p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-7">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
            <BellRing className="h-6 w-6" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-blue-600">
              Activity center
            </p>
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
              Notifications
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Important updates about your account and transactions.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={markAllAsRead}
          disabled={unreadCount === 0}
          className="inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-50 sm:self-auto"
        >
          <CheckCheck className="h-4 w-4" aria-hidden="true" />
          Mark all as read
        </button>
      </header>

      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div
          role="group"
          aria-label="Filter notifications"
          className="flex flex-wrap gap-2"
        >
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              aria-pressed={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
                activeFilter === filter
                  ? "bg-blue-600 text-white shadow-sm shadow-blue-600/20"
                  : "border border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:text-gray-800"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        <p className="shrink-0 text-sm text-gray-500">
          <span className="font-semibold text-gray-900">{unreadCount}</span>{" "}
          unread
        </p>
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="min-w-0 space-y-5">
          {groups.map((group) => {
            const groupNotifications = filteredNotifications.filter(
              (notification) => notification.group === group,
            );
            if (groupNotifications.length === 0) return null;

            return (
              <section
                key={group}
                aria-labelledby={`notifications-${group.toLowerCase()}`}
                className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
              >
                <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                  <h2
                    id={`notifications-${group.toLowerCase()}`}
                    className="text-sm font-semibold text-gray-900"
                  >
                    {group}
                  </h2>
                  <span className="text-xs text-gray-400">
                    {groupNotifications.length}{" "}
                    {groupNotifications.length === 1
                      ? "notification"
                      : "notifications"}
                  </span>
                </div>
                <div className="divide-y divide-gray-100">
                  {groupNotifications.map((notification) => {
                    const NotificationIcon = notification.icon;
                    return (
                      <button
                        key={notification.id}
                        type="button"
                        onClick={() => markAsRead(notification.id)}
                        className={`flex w-full items-start gap-3 p-4 text-left transition hover:bg-gray-50 sm:items-center sm:gap-4 sm:px-5 ${
                          notification.read ? "" : "bg-blue-50/40"
                        }`}
                      >
                        <div
                          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${notification.iconBackground} ${notification.iconColor}`}
                        >
                          <NotificationIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                            <h3 className="text-sm font-semibold text-gray-900">
                              {notification.title}
                            </h3>
                            {!notification.read && (
                              <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-blue-700">
                                New
                              </span>
                            )}
                          </div>
                          <p className="mt-1 text-sm leading-5 text-gray-500">
                            {notification.message}
                          </p>
                          <div className="mt-2 flex items-center justify-between sm:hidden">
                            <span className="text-xs text-gray-400">
                              {notification.time}
                            </span>
                            {!notification.read && (
                              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600">
                                <span className="h-2 w-2 rounded-full bg-blue-600" />
                                Unread
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="hidden shrink-0 items-center gap-2 sm:flex">
                          <span className="whitespace-nowrap text-xs text-gray-400">
                            {notification.time}
                          </span>
                          {!notification.read && (
                            <span
                              className="h-2 w-2 rounded-full bg-blue-600"
                              aria-label="Unread"
                            />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>
            );
          })}

          {filteredNotifications.length === 0 && (
            <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white px-6 text-center shadow-sm">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                <BellRing className="h-6 w-6" aria-hidden="true" />
              </div>
              <h2 className="text-base font-semibold text-gray-900">
                No notifications here
              </h2>
              <p className="mt-1 max-w-sm text-sm text-gray-500">
                Updates in this category will appear here when they arrive.
              </p>
            </div>
          )}
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
              Your inbox
            </p>
            <div className="mt-4 flex items-end justify-between">
              <div>
                <p className="text-3xl font-semibold tracking-tight text-gray-900">
                  {unreadCount}
                </p>
                <p className="mt-1 text-sm text-gray-500">unread updates</p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <BellRing className="h-5 w-5" aria-hidden="true" />
              </div>
            </div>
            <div
              role="progressbar"
              aria-label="Unread notifications"
              aria-valuenow={unreadCount}
              aria-valuemin={0}
              aria-valuemax={notifications.length}
              className="mt-5 h-2 overflow-hidden rounded-full bg-gray-100"
            >
              <div
                className="h-full rounded-full bg-blue-600 transition-all"
                style={{ width: `${unreadPercent}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-gray-400">
              {unreadCount === 0
                ? "You're all caught up with your recent activity."
                : "Review your unread updates to stay up to date."}
            </p>
          </div>

          <Link
            href="/dashboard/settings"
            className="group flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:border-blue-100 hover:shadow-md"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-600 transition group-hover:bg-blue-50 group-hover:text-blue-600">
              <Settings className="h-5 w-5" aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-gray-900">
                Account settings
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Manage your account preferences
              </p>
            </div>
            <ChevronRight className="h-4 w-4 shrink-0 text-gray-400 transition group-hover:translate-x-0.5 group-hover:text-blue-600" aria-hidden="true" />
          </Link>
        </aside>
      </div>
    </div>
  );
}
