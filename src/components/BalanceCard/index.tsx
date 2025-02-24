"use client";

import { CurrencyType } from "@/lib/types";
import { Card, CardHeader, CardFooter } from "../ui/card";
import DepositDialog from "../DepositDialog";
import WithdrawDialog from "../WithdrawDialog";
import { formatBalance } from "@/lib/utils";

interface BalanceCardProps {
  userId: string;
  currency: CurrencyType;
  balance: number;
}

export default function BalanceCard({
  balance,
  currency,
  userId
}: BalanceCardProps) {
  return (
    <Card>
      <CardHeader className="pb-4">
        <p className="caption">{currency}</p>
        <h3 className="font-medium">{formatBalance(balance, currency)}</h3>
      </CardHeader>
      <CardFooter className="flex gap-2 justify-end">
        <WithdrawDialog currency={currency} userId={userId} />
        <DepositDialog currency={currency} userId={userId} />
      </CardFooter>
    </Card>
  );
}
