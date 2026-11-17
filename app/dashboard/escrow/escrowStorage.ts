export type BuyerEscrow = {
  id: string;
  email: string;
  amount: string;
  days: string;
  service: string;
  status: string;
  statusColor: "orange" | "green" | "purple";
  details: string;
  feePayer: string;
};

const storageKey = "midoman:buyer-escrows";
const updateEvent = "midoman:buyer-escrows-updated";

function isBuyerEscrow(value: unknown): value is BuyerEscrow {
  if (typeof value !== "object" || value === null) return false;

  const record = value as Record<string, unknown>;

  return (
    typeof record.id === "string" &&
    typeof record.email === "string" &&
    typeof record.amount === "string" &&
    typeof record.days === "string" &&
    typeof record.service === "string" &&
    typeof record.status === "string" &&
    typeof record.details === "string" &&
    typeof record.feePayer === "string" &&
    (record.statusColor === "orange" ||
      record.statusColor === "green" ||
      record.statusColor === "purple")
  );
}

export function subscribeToBuyerEscrows(onStoreChange: () => void) {
  window.addEventListener(updateEvent, onStoreChange);
  return () => window.removeEventListener(updateEvent, onStoreChange);
}

export function getBuyerEscrowsSnapshot() {
  return sessionStorage.getItem(storageKey) ?? "[]";
}

export function getServerBuyerEscrowsSnapshot() {
  return "";
}

export function parseBuyerEscrowsSnapshot(snapshot: string): {
  escrows: BuyerEscrow[];
  error?: string;
} {
  if (!snapshot) return { escrows: [] };

  try {
    const parsed: unknown = JSON.parse(snapshot);
    if (!Array.isArray(parsed) || !parsed.every(isBuyerEscrow)) {
      return {
        escrows: [],
        error: "Saved buyer escrow data has an invalid format.",
      };
    }

    return { escrows: parsed };
  } catch (error) {
    console.error("Could not parse buyer escrow data", error);
    return {
      escrows: [],
      error: "We couldn't load your escrow list. Please try again.",
    };
  }
}

export function saveBuyerEscrow(escrow: BuyerEscrow) {
  const storedEscrows = getBuyerEscrowsSnapshot();
  const { escrows, error } = parseBuyerEscrowsSnapshot(storedEscrows);
  if (error) throw new Error(error);

  sessionStorage.setItem(storageKey, JSON.stringify([escrow, ...escrows]));
  window.dispatchEvent(new Event(updateEvent));
}