import Image from "next/image";

import ARROW_RIGHT_ICON from "@/assets/arrow-right.svg";
import { Transaction, TransactionType } from "@/lib/types";
import { formatBalance } from "@/lib/utils";
import TransactionHistoryCardContainer from "./TransactionHistoryCardContainer";

interface TransactionHistoryCardProps {
  transaction: Transaction;
  userId: string;
}

export default function TransactionHistoryCard({
  transaction,
  userId,
}: TransactionHistoryCardProps) {
  const {
    type,
    amount,
    currency,
    exchangeAmount,
    userSnapshot,
    recipientSnapshot,
    exchangeCurrency,
    fee
  } = transaction;
  const isUserSender = userSnapshot.id === userId;

  if (type === TransactionType.Exchange) {
    return (
      <TransactionHistoryCardContainer transaction={transaction}>
        <span className="text-red-700">
          - {formatBalance(amount, currency)}
        </span>
        <div className="w-7 h-7">
          <Image className="w-full" src={ARROW_RIGHT_ICON} alt="..." />
        </div>
        <span className="text-green-700">
          + {formatBalance(exchangeAmount, exchangeCurrency)}
        </span>
      </TransactionHistoryCardContainer>
    );
  }

  if (type === TransactionType.Deposit) {
    return (
      <TransactionHistoryCardContainer transaction={transaction}>
        <span className="text-green-700">
          + {formatBalance(amount, currency)}
        </span>
      </TransactionHistoryCardContainer>
    );
  }

  if (type === TransactionType.Withdraw) {
    return (
      <TransactionHistoryCardContainer transaction={transaction}>
        <span className="text-red-700">
          - {formatBalance(amount, currency)}
        </span>
      </TransactionHistoryCardContainer>
    );
  }

  return (
    <TransactionHistoryCardContainer transaction={transaction}>
      {isUserSender && <span className="text-red-700">- {formatBalance(amount, currency)}</span>}
      {!isUserSender && <span className="text-green-700">+ {formatBalance(amount - fee!, currency)}</span>}
      <div className="w-7 h-7">
        <Image
          className={`w-full ${isUserSender ? "" : "rotate-180"}`}
          src={ARROW_RIGHT_ICON}
          alt="..."
        />
      </div>
      <span>{isUserSender ? recipientSnapshot?.name : userSnapshot.name}</span>
    </TransactionHistoryCardContainer>
  );
}
