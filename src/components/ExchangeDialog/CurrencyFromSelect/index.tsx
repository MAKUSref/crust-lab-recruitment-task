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

export default function CurrencyFromSelect() {
  const { control, watch, setValue } = useFormContext<ExchangeSchema>();
  const currencyTo = watch("currencyTo");
  const currencyFrom = watch("currencyFrom");
  const amountFrom = watch("amountFrom");
  const amountTo = watch("amountTo");

  const handleChange = (currentValue: string) => {
    const currenciesTheSame = currentValue === currencyTo;
    if (currenciesTheSame) {
      setValue("currencyTo", currencyFrom);
      setValue("amountTo", amountFrom);
      setValue("amountFrom", amountTo);
    }
  };

  useEffect(() => {
    setValue("amountTo", calcExchange(amountFrom, currencyFrom, currencyTo));
  }, [currencyFrom]);

  return (
    <FormField
      control={control}
      name="currencyFrom"
      render={({ field }) => (
        <FormItem className="grid grid-cols-4 items-center gap-4 space-y-0">
          <FormLabel className="text-right">Currency From</FormLabel>
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
