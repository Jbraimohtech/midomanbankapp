import Link from "next/link";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Clock3,
  ReceiptText,
  ShieldCheck,
} from "lucide-react";

const transactions = [
  {
    name: "Client payment",
    reference: "TRX-89342",
    category: "Deposit",
    date: "Today, 10:42 AM",
    amount: "+20,000 NGN",
    status: "Completed",
    incoming: true,
  },
  {
    name: "Website redesign",
    reference: "TRX-89318",
    category: "Escrow",
    date: "Yesterday, 3:16 PM",
    amount: "-125,000 NGN",
    status: "In escrow",
    incoming: false,
  },
  {
    name: "Wallet top up",
    reference: "TRX-89271",
    category: "Deposit",
    date: "Nov 12, 2026",
    amount: "+75,000 NGN",
    status: "Completed",
    incoming: true,
  },
  {
    name: "Bank transfer",
    reference: "TRX-89246",
    category: "Withdrawal",
    date: "Nov 11, 2026",
    amount: "-30,000 NGN",
    status: "Processing",
    incoming: false,
  },
];

export default function TransactionsPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-blue-600">
              Your money activity
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-900">
              Transactions
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
              Review deposits, withdrawals, and payments protected by escrow.
            </p>
            <p className="mt-2 text-xs text-gray-400">
              Sample figures and activity for layout preview only.
            </p>
          </div>
          <Link
            href="/dashboard/escrow"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            View escrow
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3" aria-label="Transaction summary">
        {[
          { label: "Money in", value: "95,000 NGN", icon: <ArrowDownLeft /> },
          { label: "Money out", value: "155,000 NGN", icon: <ArrowUpRight /> },
          { label: "Processing", value: "1 transfer", icon: <Clock3 /> },
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
              <p className="mt-1 text-lg font-bold text-gray-900">
                {item.value}
              </p>
            </div>
          </div>
        ))}
      </section>

      <section
        id="transaction-list"
        className="scroll-mt-24 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6"
      >
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              Recent transactions
            </h2>
            <p className="mt-1 text-xs text-gray-400">
              Sample activity for layout preview
            </p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-gray-50 px-3 py-2 text-xs font-medium text-gray-500">
            <ReceiptText className="h-4 w-4" aria-hidden="true" />
            Latest activity
          </span>
        </div>

        <div className="divide-y divide-gray-100">
          {transactions.map((transaction) => (
            <article
              key={transaction.reference}
              className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                    transaction.incoming
                      ? "bg-green-50 text-green-600"
                      : "bg-blue-50 text-blue-600"
                  }`}
                >
                  {transaction.incoming ? (
                    <ArrowDownLeft className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                  )}
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    {transaction.name}
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">
                    {transaction.category} - {transaction.reference} -{" "}
                    {transaction.date}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-3 pl-13 sm:justify-end sm:pl-0">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    transaction.status === "Completed"
                      ? "bg-green-50 text-green-700"
                      : transaction.status === "In escrow"
                        ? "bg-blue-50 text-blue-700"
                        : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {transaction.status}
                </span>
                <p
                  className={`text-sm font-semibold ${
                    transaction.incoming ? "text-green-600" : "text-gray-900"
                  }`}
                >
                  {transaction.amount}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
