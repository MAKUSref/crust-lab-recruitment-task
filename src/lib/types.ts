export enum CurrencyType {
  PLN = "PLN",
  USD = "USD",
  EUR = "EUR",
}

export enum TransactionType {
  Transfer = "transfer",
  Withdraw = "withdraw",
  Deposit = "deposit",
  Exchange = "exchange",
}

export type Balance = Record<CurrencyType, number>;

export interface User {
  id: string;
  avatar: string;
  name: string;
  balance: Balance;
}

export interface Transaction {
  id: string;
  userSnapshot: User;
  recipientSnapshot?: User;
  type: TransactionType;
  date: string;
  currency: CurrencyType;
  amount: number;
  fee?: number;
  exchangeRate?: number;
  exchangeCurrency?: CurrencyType;
  exchangeAmount?: number;
}
