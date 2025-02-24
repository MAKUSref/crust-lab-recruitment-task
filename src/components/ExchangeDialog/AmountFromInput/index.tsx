"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { calcExchange } from "@/lib/exchangeUtils";
import { cutExtraDigits } from "@/lib/utils";
import { ExchangeSchema } from "@/lib/zod";
import { useFormContext } from "react-hook-form";

export default function AmountFromInput() {
  const { control, watch, setValue } = useFormContext<ExchangeSchema>();
  const currencyTo = watch("currencyTo");
  const currencyFrom = watch("currencyFrom");

  return (
    <FormField
      control={control}
      name={"amountFrom"}
      render={({ field }) => (
        <FormItem className="grid grid-cols-4 items-center gap-4 space-y-0">
          <FormLabel className="text-right">Amount From</FormLabel>
          <div className="col-span-3">
            <FormControl>
              <div className="flex w-full">
                <Input
                  type="number"
                  placeholder="0.00"
                  className="rounded-r-none"
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value;
                    const fixedValue = cutExtraDigits(value);
                    const calculatedValue = calcExchange(
                      Number(fixedValue),
                      currencyFrom,
                      currencyTo
                    );
                    setValue("amountTo", calculatedValue);
                    field.onChange(fixedValue);
                  }}
                />
                <div className="flex items-center justify-center w-[100px] rounded-r-md border border-l-0 bg-muted text-sm">
                  {currencyFrom}
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
