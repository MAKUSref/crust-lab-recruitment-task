import { Transaction, TransactionType, User } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { calcExchange, roundBalance } from "@/lib/exchangeUtils";
import USERS_JSON from "@/bin/users.json";

type TransactionAction<T extends Transaction> = Omit<T, "id" | "type">;
type TransactionPayload<T extends Transaction> = PayloadAction<
  TransactionAction<T>
>;
type TransferPayload = TransactionPayload<
  Omit<Transaction, "recipientSnapshot" | "fee"> &
    Required<Pick<Transaction, "recipientSnapshot" | "fee">>
>;
type ExchangePayload = TransactionPayload<
  Omit<Transaction, "exchangeRate" | "exchangeCurrency"> &
    Required<Pick<Transaction, "exchangeRate" | "exchangeCurrency">>
>;

export interface UsersSliceState {
  users: User[];
  transactions: Transaction[];
}

const initialState: UsersSliceState = {
  users: USERS_JSON satisfies User[],
  transactions: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    deposit(state, { payload }: TransactionPayload<Transaction>) {
      state.users = state.users.map((user) => {
        if (user.id === payload.userSnapshot.id) {
          const newUserBalance =
            user.balance[payload.currency] + payload.amount;
          user.balance[payload.currency] = roundBalance(newUserBalance);
        }
        return user;
      });
      state.transactions.push({
        ...payload,
        id: crypto.randomUUID(),
        type: TransactionType.Deposit,
      });
    },

    withdraw(state, { payload }: TransactionPayload<Transaction>) {
      state.users = state.users.map((user) => {
        if (user.id === payload.userSnapshot.id) {
          if (user.balance[payload.currency] < payload.amount) {
            throw new Error("Insufficient funds");
          }
          const newUserBalance =
            user.balance[payload.currency] - payload.amount;
          user.balance[payload.currency] = roundBalance(newUserBalance);
        }
        return user;
      });
      state.transactions.push({
        ...payload,
        id: crypto.randomUUID(),
        type: TransactionType.Withdraw,
      });
    },

    exchange(state, { payload }: ExchangePayload) {
      const { currency, exchangeCurrency, amount, exchangeRate } = payload;
      const exchangeAmount = calcExchange(amount, currency, exchangeCurrency);

      state.users = state.users.map((user) => {
        if (user.id === payload.userSnapshot.id) {
          if (user.balance[currency] < amount) {
            throw new Error("Insufficient funds");
          }
          if (!exchangeCurrency || !exchangeRate) {
            throw new Error("Internal error");
          }

          const newUserCurrencyFromBalance = user.balance[currency] - amount;
          const newUserCurrencyToBalance =
            user.balance[exchangeCurrency] + exchangeAmount;

          user.balance[currency] = roundBalance(newUserCurrencyFromBalance);
          user.balance[exchangeCurrency] = roundBalance(
            newUserCurrencyToBalance
          );
        }
        return user;
      });
      state.transactions.push({
        ...payload,
        id: crypto.randomUUID(),
        type: TransactionType.Exchange,
        exchangeAmount,
      });
    },

    transfer(state, { payload }: TransferPayload) {
      state.users = state.users.map((user) => {
        if (user.id === payload.userSnapshot?.id) {
          if (user.balance[payload.currency] < payload.amount) {
            throw new Error("Insufficient funds");
          }
          const newSenderBalance =
            user.balance[payload.currency] - payload.amount;
          user.balance[payload.currency] = roundBalance(newSenderBalance);
        }
        if (user.id === payload.recipientSnapshot?.id) {
          const newReceiverBalance =
            user.balance[payload.currency] + payload.amount - payload.fee;
          user.balance[payload.currency] = roundBalance(newReceiverBalance);
        }
        return user;
      });
      state.transactions.push({
        ...payload,
        id: crypto.randomUUID(),
        type: TransactionType.Transfer,
      });
    },
  },
});

export const { deposit, withdraw, exchange, transfer } = usersSlice.actions;
export default usersSlice.reducer;
