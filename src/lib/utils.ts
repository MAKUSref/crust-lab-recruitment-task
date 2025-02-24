import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import USER_JSON from "@/bin/users.json";
import { CurrencyType, User } from "./types";
import { currencySymbols } from "./exchangeUtils";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function cutExtraDigits(value: string) {
  const [full, digits] = value.split(".");
  const cutDigits = digits?.slice(0, 2);
  const fixedValue = !!cutDigits ? [full, cutDigits].join(".") : full;
  return fixedValue;
}

// mocks backend behavior
export async function checkIfUserExists(userId: string) {
  const users = USER_JSON satisfies User[];
  return !!users.find((user) => user.id === userId);
}

export function capitalizeFirstLetter(word: string): string {
  if (!word) return "";
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function formatBalance(amount?: string | number, currency?: CurrencyType) {
  if (!currency || !amount) {
    return "0.00"
  }
  const formattedAmount = Number(amount).toFixed(2).replace(".", ",");
  return `${formattedAmount} ${currencySymbols[currency]}`;
}
