import { Balance, CurrencyType } from "./types";

export const TRANSFER_FEE = 0.02;

export const currencySymbols: Record<CurrencyType, string> = {
  PLN: "zł",
  EUR: "€",
  USD: "$",
};

export function calcFee(amount: number) {
  return amount * TRANSFER_FEE;
}

export function roundBalance(value: number) {
  return Math.round(value * 100) / 100;
}

export function calcExchange(
  amount: number,
  currencyFrom: CurrencyType,
  currencyTo: CurrencyType
) {
  const exchangeAmount = amount * exchangeStock[currencyFrom][currencyTo];
  return roundBalance(exchangeAmount);
}

type ExchangeStock = Record<CurrencyType, Balance>;

export const exchangeStock: ExchangeStock = {
  PLN: {
    EUR: 0.24,
    USD: 0.25,
    PLN: 1,
  },
  EUR: {
    PLN: 4.16,
    USD: 1.1,
    EUR: 1,
  },
  USD: {
    PLN: 3.96,
    EUR: 0.95,
    USD: 1,
  },
};
