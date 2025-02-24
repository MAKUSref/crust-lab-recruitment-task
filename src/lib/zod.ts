import { z } from "zod";
import { CurrencyType } from "./types";

export const creditBalanceSchemaZod = z.object({
  amount: z.coerce.number().positive(),
});

export type CreditBalanceSchema = z.infer<typeof creditBalanceSchemaZod>;

export const exchangeSchemaZod = z
  .object({
    currencyFrom: z.nativeEnum(CurrencyType),
    amountFrom: z.coerce.number().positive(),
    currencyTo: z.nativeEnum(CurrencyType),
    amountTo: z.coerce.number().positive(),
  })
  .refine((data) => data.currencyFrom !== data.currencyTo, {
    message: "Currency To must be different from Currency From",
    path: ["currencyTo"],
  });

export type ExchangeSchema = z.infer<typeof exchangeSchemaZod>;
