import Link from "next/link";
import {
  ArrowUpRight,
  BadgeCheck,
  Clock3,
  Plus,
  ShieldCheck,
} from "lucide-react";

const escrowItems = [
  {
    id: "ESC-2048",
    title: "Website redesign",
    counterparty: "Northstar Creative",
    amount: "450,000 NGN",
    status: "In progress",
    detail: "Delivery due in 3 days",
    statusClass: "bg-blue-50 text-blue-700",
  },
  {
    id: "ESC-2047",
    title: "Product photography",
    counterparty: "Studio August",
    amount: "125,000 NGN",
    status: "Needs review",
    detail: "Review the submitted work",
    statusClass: "bg-amber-50 text-amber-700",
  },
  {
    id: "ESC-2046",
    title: "Brand identity package",
    counterparty: "Goodform Design",
    amount: "210,000 NGN",
    status: "Completed",
    detail: "Funds released",
    statusClass: "bg-green-50 text-green-700",
  },
];

export default function EscrowPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <section className="overflow-hidden rounded-2xl bg-blue-600 p-6 text-white sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              Protected payments
            </div>
            <h2 className="text-2xl font-bold tracking-tight">
              Escrow workspace
            </h2>
            <p className="mt-2 text-sm leading-6 text-blue-100">
              Keep payment and delivery details together so both sides know
              what to expect.
            </p>
            <p className="mt-2 text-xs text-blue-100/80">
              Sample figures and activity for layout preview only.
            </p>
          </div>
          <Link
            href="#escrow-activity"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            Explore escrow activity
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3" aria-label="Escrow summary">
        {[
          { label: "Active agreements", value: "2", icon: <Clock3 /> },
          { label: "Awaiting your review", value: "1", icon: <BadgeCheck /> },
          { label: "Completed", value: "8", icon: <ShieldCheck /> },
        ].map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 [&>svg]:h-5 [&>svg]:w-5">
              {item.icon}
            </span>
            <div>
              <p className="text-sm text-gray-500">{item.label}</p>
              <p className="mt-1 text-xl font-bold text-gray-900">
                {item.value}
              </p>
            </div>
          </div>
        ))}
      </section>

      <section
        id="escrow-activity"
        className="scroll-mt-24 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6"
      >
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              Recent escrow activity
            </h2>
            <p className="mt-1 text-xs text-gray-400">
              Sample activity for layout preview
            </p>
          </div>
          <Link
            href="/dashboard/transactions"
            className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            View transactions
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="space-y-3">
          {escrowItems.map((item) => (
            <article
              key={item.id}
              className="flex flex-col gap-4 rounded-xl border border-gray-100 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">
                    {item.id} - {item.counterparty}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 sm:justify-end">
                <div className="sm:text-right">
                  <p className="text-sm font-semibold text-gray-900">
                    {item.amount}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">{item.detail}</p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${item.statusClass}`}
                >
                  {item.status}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        id="escrow-guide"
        className="rounded-2xl border border-blue-100 bg-blue-50/70 p-5 sm:p-6"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              A simple way to work together
            </h2>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
              Agree on the work, keep progress in one place, and review the
              result before a payment is marked complete.
            </p>
          </div>
          <Link
            href="/dashboard/transactions"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-800"
          >
            Go to transactions
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
