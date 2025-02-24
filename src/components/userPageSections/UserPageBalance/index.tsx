"use client";

import BalanceCard from "@/components/BalanceCard";
import CreditTransferDialog from "@/components/CreditTransferDialog";
import ExchangeDialog from "@/components/ExchangeDialog";
import useGetUser from "@/hooks/useGetUser";
import { CurrencyType, User } from "@/lib/types";

export default function UserBalance({ userId }: { userId: User["id"] }) {
  const user = useGetUser(userId);

  if (!user) {
    return null;
  }

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 lg:justify-between lg:items-center mt-8">
        <h5>Current Balance</h5>
        <div className="flex gap-2">
          <ExchangeDialog userId={user.id} />
          <CreditTransferDialog userId={user.id} />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4 mt-4 p-4 rounded-xl bg-gradient-to-r from-custom-gradient-from via-custom-gradient-via to-custom-gradient-to">
        <div className="col-span-12 lg:col-span-4">
          <BalanceCard
            userId={user.id}
            currency={CurrencyType.PLN}
            balance={user.balance.PLN}
          />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <BalanceCard
            userId={user.id}
            currency={CurrencyType.EUR}
            balance={user.balance.EUR}
          />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <BalanceCard
            userId={user.id}
            currency={CurrencyType.USD}
            balance={user.balance.USD}
          />
        </div>
      </div>
    </>
  );
}
