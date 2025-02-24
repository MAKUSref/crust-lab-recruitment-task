"use client";

import TransactionHistoryCard from "@/components/TransactionHistoryCard";
import useGetUserTransactions from "@/hooks/useGetUserTransactions";
import { User } from "@/lib/types";

export default function UserPageTransactions({
  userId,
}: {
  userId: User["id"];
}) {
  const userTransactions = useGetUserTransactions(userId);

  return (
    <>
      <h5 className="mt-8">Transaction history</h5>
      <div className="flex flex-col gap-4 mt-4">
        {userTransactions.map((transaction, i) => (
          <TransactionHistoryCard key={i} transaction={transaction} userId={userId} />
        ))}
        {userTransactions.length === 0 && (
          <p className="text-center caption">There is no transactions yet.</p>
        )}
      </div>
    </>
  );
}
