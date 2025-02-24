import { CurrencyType } from "@/lib/types";
import { useCallback, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import useGetUser from "@/hooks/useGetUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import CurrencyFromSelect from "./CurrencyFromSelect";
import CurrencyToSelect from "./CurrencyToSelect";
import AmountFromInput from "./AmountFromInput";
import AmountToInput from "./AmountToInput";
import { useAppDispatch } from "@/redux/hooks";
import { exchange } from "@/redux/users/usersSlice";
import { exchangeStock } from "@/lib/exchangeUtils";
import { toast } from "sonner";
import { ExchangeSchema, exchangeSchemaZod } from "@/lib/zod";

interface ExchangeDialogProps {
  userId: string;
}

export default function ExchangeDialog({ userId }: ExchangeDialogProps) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const user = useGetUser(userId);
  const dispatch = useAppDispatch();

  const form = useForm<ExchangeSchema>({
    resolver: zodResolver(exchangeSchemaZod),
    defaultValues: {
      currencyFrom: CurrencyType.PLN,
      currencyTo: CurrencyType.EUR,
      amountFrom: 0,
      amountTo: 0,
    },
  });

  const onSubmit = useCallback(
    ({ amountFrom, currencyFrom, currencyTo }: ExchangeSchema) => {
      if (!user) return null;
      const notEnoughMoney = amountFrom > user.balance[currencyFrom];
      if (notEnoughMoney) {
        setError("User has not enough balance!");
        return;
      }

      dispatch(
        exchange({
          amount: amountFrom,
          userSnapshot: user,
          currency: currencyFrom,
          exchangeCurrency: currencyTo,
          exchangeRate: exchangeStock[currencyFrom][currencyTo],
          date: new Date().toISOString(),
        })
      );
      setOpen(false);
      toast.success("The currency exchange was successful.");
    },
    [user, dispatch]
  );

  const handleSetOpen = (value: boolean) => {
    setOpen(value);
    form.reset();
    setError("");
  };

  if (!user) {
    return null;
  }
  return (
    <Dialog open={open} onOpenChange={handleSetOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="secondary">
          Currency exchange
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Exchange currency</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right text-gray-500">
                  Name
                </Label>
                <Input
                  id="name"
                  value={user.name}
                  className="col-span-3"
                  disabled
                />
              </div>
              <CurrencyFromSelect />
              <AmountFromInput />
              <CurrencyToSelect />
              <AmountToInput />
              {!!error && (
                <div className="text-sm text-center font-medium">
                  <p className="text-red-600">{error}</p>
                </div>
              )}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="secondary">Cancel</Button>
              </DialogClose>
              <Button type="submit">Exchange</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
