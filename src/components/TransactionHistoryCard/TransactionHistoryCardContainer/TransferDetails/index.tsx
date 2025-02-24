import { Transaction } from "@/lib/types";
import DetailParagraph from "../DetailParagraph";
import { roundBalance } from "@/lib/exchangeUtils";
import Link from "next/link";

export default function TransferDetails({
  amount,
  currency,
  userSnapshot,
  recipientSnapshot,
  fee,
}: Transaction) {
  if (!recipientSnapshot || !fee) {
    return null;
  }

  return (
    <>
      <div className="flex flex-col gap-6 text-sm">
        <div>
          <DetailParagraph label="Sender: ">
            <Link className="underline" href={`/users/${userSnapshot.id}`}>
              {userSnapshot.name}
            </Link>
          </DetailParagraph>
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
        <div>
          <DetailParagraph label="Receiver: ">
            <Link
              className="underline"
              href={`/users/${recipientSnapshot?.id}`}
            >
              {recipientSnapshot?.name}
            </Link>
          </DetailParagraph>
          <DetailParagraph label={`Amount (${currency}): `}>
            <span className="text-green-600">
              + {roundBalance(amount - fee)} {currency}
            </span>
          </DetailParagraph>
          <DetailParagraph label="Fee: ">
            {fee} {currency}
          </DetailParagraph>
          <DetailParagraph label="Before: ">
            {recipientSnapshot.balance[currency]} {currency}
          </DetailParagraph>
          <DetailParagraph label="After: ">
            {roundBalance(recipientSnapshot.balance[currency] + amount - fee)}{" "}
            {currency}
          </DetailParagraph>
        </div>
      </div>
    </>
  );
}
