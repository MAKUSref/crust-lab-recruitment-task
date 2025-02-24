import { useAppSelector } from "@/redux/hooks";
import { Transaction } from "@/lib/types";

export default function useGetUserTransactions(userId: string) {
  const { transactions } = useAppSelector((state) => state.usersState);

  const userTransactions = transactions.filter((transaction) => {
    const userIsTransactionSender = transaction.userSnapshot.id === userId;
    const userIsTransactionRecipient = transaction.recipientSnapshot?.id === userId;
    return userIsTransactionSender || userIsTransactionRecipient;
  });
  return userTransactions.sort(transactionComperator);
}

function transactionComperator(a: Transaction, b: Transaction) {
  return Date.parse(b.date) - Date.parse(a.date);
}
