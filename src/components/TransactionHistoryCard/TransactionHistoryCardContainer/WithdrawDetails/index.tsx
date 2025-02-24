import { Transaction } from "@/lib/types";
import DetailParagraph from "../DetailParagraph";
import { roundBalance } from "@/lib/exchangeUtils";

export default function WithdrawDetails({
  amount,
  currency,
  userSnapshot,
}: Transaction) {
  return (
    <div className="flex flex-col gap-6 text-sm">
      <div>
        <DetailParagraph label={`Amount (${currency}): `}>
          <span className="text-red-600">
            - {amount} {currency}
          </span>
        </DetailParagraph>
        <DetailParagraph label="Before: ">
          {userSnapshot.balance[currency]} {currency}
        </DetailParagraph>
        <DetailParagraph label="After: ">
          {roundBalance(userSnapshot.balance[currency] - amount)} {currency}
        </DetailParagraph>
      </div>
    </div>
  );
}
