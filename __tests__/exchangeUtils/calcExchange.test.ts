import '@testing-library/jest-dom';
import { calcExchange, exchangeStock } from "@/lib/exchangeUtils";
import { CurrencyType } from "@/lib/types";

// Przykładowy test funkcji przliczającej waluty
// Gdyby było więcej czasu napisałbym więcej przypadków testowych 
// oraz przetestowałbym więcej funkcji

describe("Exchange Utils", () => {
  it("Calc Exchange should properly calculate exchange value", () => {
    const amount = 10;
    const currencyFrom = CurrencyType.PLN;
    const currencyTo = CurrencyType.EUR;

    const result = calcExchange(amount, currencyFrom, currencyTo);
    expect(result).toBe(amount * exchangeStock[currencyFrom][currencyTo]);
  });
});
