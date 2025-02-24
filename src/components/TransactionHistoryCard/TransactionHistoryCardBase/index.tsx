"use client";

import { PropsWithChildren } from "react";
import { Transaction, TransactionType } from "@/lib/types";

import Image from "next/image";
import CHANGE_CURRENCY_ICON from "@/assets/change-currency.svg";
import SEND_CREDITS_ICON from "@/assets/send-credits.svg";
import WITHDRAW_ICON from "@/assets/withdraw.svg";
import DEPOSIT_ICON from "@/assets/deposit.svg";
import dayjs from "dayjs";

interface TransactionHistoryCardBaseProps {
  transaction: Transaction;
}

export default function TransactionHistoryCardBase({
  transaction,
  children,
}: PropsWithChildren<TransactionHistoryCardBaseProps>) {
  const { type, date } = transaction;

  return (
    <div className="grid grid-cols-12 gap-2 p-4 rounded-xl shadow-sm border border-gray-200 hover:bg-gray-50 transition duration-300 cursor-pointer">
      <div className="col-span-6 row-start-1 lg:col-span-4 flex gap-4 items-center">
        <div className="w-6 h-6">
          {type === TransactionType.Exchange && (
            <Image className="w-full" src={CHANGE_CURRENCY_ICON} alt="..." />
          )}
          {type === TransactionType.Deposit && (
            <Image className="w-full" src={DEPOSIT_ICON} alt="..." />
          )}
          {type === TransactionType.Withdraw && (
            <Image className="w-full" src={WITHDRAW_ICON} alt="..." />
          )}
          {type === TransactionType.Transfer && (
            <Image className="w-full" src={SEND_CREDITS_ICON} alt="..." />
          )}
        </div>
        <p className="text-sm">
          {type === TransactionType.Exchange && "Currency exchange"}
          {type === TransactionType.Deposit && "Deposit"}
          {type === TransactionType.Withdraw && "Withdraw"}
          {type === TransactionType.Transfer && "Credit transfer"}
        </p>
      </div>

      <div className="col-span-12 row-start-2 lg:row-start-1 lg:col-span-5 flex items-center gap-2 pl-10 lg:pl-0 mt-2 lg:mt-0 text-sm">
        {children}
      </div>

      <div className="col-span-6 row-start-1 lg:col-span-3 flex items-center justify-end">
        <p className="caption flex gap-3">
          <span>{dayjs(date).format("DD.MM.YYYY")}</span>
          <span>|</span>
          <span>{dayjs(date).format("HH:mm")}</span>
        </p>
      </div>
    </div>
  );
}
