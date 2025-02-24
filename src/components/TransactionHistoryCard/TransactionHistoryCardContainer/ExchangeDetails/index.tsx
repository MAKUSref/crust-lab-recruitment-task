import { Transaction } from "@/lib/types";
import ARROW_ICON from "@/assets/arrow-right.svg";
import Image from "next/image";
import DetailParagraph from "../DetailParagraph";
import { roundBalance } from "@/lib/exchangeUtils";

export default function ExchangeDetails({
  amount,
  currency,
  userSnapshot,
  exchangeAmount,
  exchangeRate,
  exchangeCurrency,
}: Transaction) {
  return (
    <>
      <div className="flex flex-col gap-6 text-sm">
        <div>
          <DetailParagraph label="Currency: ">
            <span>{currency}</span>
            <span className="mx-3">
              <Image className="inline" src={ARROW_ICON} alt="" />
            </span>
            <span>{exchangeCurrency}</span>
          </DetailParagraph>
          <DetailParagraph label="Exchange rate: ">
            {exchangeRate}
          </DetailParagraph>
        </div>
        <div>
          <DetailParagraph label={`Amount (${currency}): `}>
            <span className=" text-red-600">
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
          <DetailParagraph label={`Amount (${exchangeCurrency}): `}>
            <span className=" text-green-600">
              + {exchangeAmount} {exchangeCurrency}
            </span>
          </DetailParagraph>
          <DetailParagraph label="Before: ">
            {userSnapshot.balance[exchangeCurrency!]} {exchangeCurrency}
          </DetailParagraph>
          <DetailParagraph label="After: ">
            {roundBalance(
              userSnapshot.balance[exchangeCurrency!] + exchangeAmount!
            )}{" "}
            {exchangeCurrency}
          </DetailParagraph>
        </div>
      </div>
    </>
  );
}
