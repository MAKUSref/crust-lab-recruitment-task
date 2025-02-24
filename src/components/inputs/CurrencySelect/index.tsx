"use client";

import {
  FormControl,
  FormDescription,
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
import { CurrencyType } from "@/lib/types";
import { useFormContext } from "react-hook-form";

export default function CurrencySelect() {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={"currency"}
      render={({ field }) => (
        <FormItem className="grid grid-cols-4 items-center gap-4 space-y-0">
          <FormLabel className="text-right">Currency</FormLabel>
          <div className="col-span-3">
            <Select onValueChange={field.onChange} defaultValue={field.value}>
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
            <FormDescription>Choose your preferred currency.</FormDescription>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}
