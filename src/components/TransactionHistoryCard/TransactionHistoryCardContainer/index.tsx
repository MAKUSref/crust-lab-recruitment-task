"use client";

import { Transaction, TransactionType } from "@/lib/types";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import dayjs from "dayjs";
import ExchangeDetails from "./ExchangeDetails";
import TransferDetails from "./TransferDetails";
import DepositDetails from "./DepositDetails";
import WithdrawDetails from "./WithdrawDetails";
import { PropsWithChildren, useState } from "react";
import TransactionHistoryCardBase from "../TransactionHistoryCardBase";

interface TransactionHistoryCardContainerProps {
  transaction: Transaction;
}

export default function TransactionHistoryCardContainer({
  transaction,
  children,
}: PropsWithChildren<TransactionHistoryCardContainerProps>) {
  const [open, setOpen] = useState(false);
  const { date, type } = transaction;

  return (
    <>
      <div onClick={() => setOpen(true)}>
        <TransactionHistoryCardBase transaction={transaction}>
          {children}
        </TransactionHistoryCardBase>
      </div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent>
          <SheetHeader className="mb-6">
            <SheetTitle>
              {type === TransactionType.Exchange && "Currency exchange"}
              {type === TransactionType.Deposit && "Deposit"}
              {type === TransactionType.Withdraw && "Withdraw"}
              {type === TransactionType.Transfer && "Credit transfer"}
            </SheetTitle>
            <SheetDescription>
              Action time:{" "}
              <span className="underline">
                {dayjs(date).format("DD.MM.YYYY")}
              </span>{" "}
              at{" "}
              <span className="underline">{dayjs(date).format("HH:mm")}</span>
            </SheetDescription>
          </SheetHeader>
          <p className="text-sm font-medium mb-1">Action Details:</p>

          {type === TransactionType.Exchange && (
            <ExchangeDetails {...transaction} />
          )}
          {type === TransactionType.Deposit && (
            <DepositDetails {...transaction} />
          )}
          {type === TransactionType.Withdraw && (
            <WithdrawDetails {...transaction} />
          )}
          {type === TransactionType.Transfer && (
            <TransferDetails {...transaction} />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
