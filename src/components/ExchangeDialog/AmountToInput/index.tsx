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

export default function AmountToInput() {
  const form = useFormContext<ExchangeSchema>();
  const currencyFrom = form.watch("currencyFrom");
  const currencyTo = form.watch("currencyTo");

  return (
    <FormField
      control={form.control}
      name="amountTo"
      render={({ field }) => (
        <FormItem className="grid grid-cols-4 items-center gap-4 space-y-0">
          <FormLabel className="text-right">Amount To</FormLabel>
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
                      currencyTo,
                      currencyFrom
                    );
                    form.setValue("amountFrom", calculatedValue);
                    field.onChange(fixedValue);
                  }}
                />
                <div className="flex items-center justify-center w-[100px] rounded-r-md border border-l-0 bg-muted text-sm">
                  {currencyTo}
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
