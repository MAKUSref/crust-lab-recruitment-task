"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { calcExchange } from "@/lib/exchangeUtils";
import { CurrencyType } from "@/lib/types";
import { ExchangeSchema } from "@/lib/zod";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

export default function CurrencyToSelect() {
  const { control, watch, setValue } = useFormContext<ExchangeSchema>();
  const currencyFrom = watch("currencyFrom");
  const currencyTo = watch("currencyTo");
  const amountFrom = watch("amountFrom");
  const amountTo = watch("amountTo");

  const handleChange = (currentValue: string) => {
    const currenciesTheSame = currentValue === currencyFrom;
    if (currenciesTheSame) {
      setValue("currencyFrom", currencyTo);
      setValue("amountFrom", amountTo);
      setValue("amountTo", amountFrom);
    }
  };

  useEffect(() => {
    setValue("amountFrom", calcExchange(amountTo, currencyTo, currencyFrom));
  }, [currencyTo]);

  return (
    <FormField
      control={control}
      name="currencyTo"
      render={({ field }) => (
        <FormItem className="grid grid-cols-4 items-center gap-4 space-y-0">
          <FormLabel className="text-right">Currency To</FormLabel>
          <div className="col-span-3">
            <Select
              onValueChange={(value) => {
                handleChange(value);
                field.onChange(value);
              }}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a currency" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value={CurrencyType.PLN}>
                  {CurrencyType.PLN}
                </SelectItem>
                <SelectItem value={CurrencyType.EUR}>
                  {CurrencyType.EUR}
                </SelectItem>
                <SelectItem value={CurrencyType.USD}>
                  {CurrencyType.USD}
                </SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}
