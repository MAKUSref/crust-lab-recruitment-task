"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

export default function AmountInput() {
  const { watch, control, setValue } = useFormContext();
  const amount = watch("amount");
  const currency = watch("currency");

  useEffect(() => {
    if (!amount) return;

    const offsetAmount = amount * 100;
    const hasAmountDigits = offsetAmount % 1 !== 0;
    if (hasAmountDigits) {
      const valueWith2Digits = Math.floor(amount * 100) / 100;
      setValue("amount", valueWith2Digits);
    }
  }, [amount, setValue]);

  return (
    <FormField
      control={control}
      name={"amount"}
      render={({ field }) => (
        <FormItem className="grid grid-cols-4 items-center gap-4 space-y-0">
          <FormLabel className="text-right">Amount</FormLabel>
          <div className="col-span-3">
            <FormControl>
              <div className="flex w-full">
                <Input
                  type="number"
                  placeholder="0.00"
                  className="rounded-r-none"
                  {...field}
                />
                <div className="flex items-center justify-center w-[100px] rounded-r-md border border-l-0 bg-muted text-sm">
                  {currency}
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}
