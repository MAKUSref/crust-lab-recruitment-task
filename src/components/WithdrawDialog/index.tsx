"use client";

import { CurrencyType, User } from "@/lib/types";
import { useCallback, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import useGetUser from "@/hooks/useGetUser";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "@/redux/hooks";
import { withdraw } from "@/redux/users/usersSlice";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import CreditBalanceForm from "../common/CreditBalanceForm";
import { CreditBalanceSchema, creditBalanceSchemaZod } from "@/lib/zod";

interface WithdrawDialogProps {
  userId: User["id"];
  currency: CurrencyType;
}

export default function WithdrawDialog({
  currency,
  userId,
}: WithdrawDialogProps) {
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const user = useGetUser(userId);
  const dispatch = useAppDispatch();

  const form = useForm<CreditBalanceSchema>({
    resolver: zodResolver(creditBalanceSchemaZod),
    defaultValues: {
      amount: 0,
    },
  });

  const onSubmit = useCallback(
    (values: CreditBalanceSchema) => {
      if (!user) return;
      if (user.balance[currency] < values.amount) {
        setError(`Not enough founds to withdraw!`);
        return;
      }

      dispatch(
        withdraw({
          userSnapshot: user,
          amount: values.amount,
          currency,
          date: new Date().toISOString(),
        })
      );
      setError("");
      setOpen(false);
      toast.success("The money withdraw was successful.");
    },
    [dispatch, user, currency]
  );

  const handleSetOpenDialog = (value: boolean) => {
    setOpen(value);
    form.reset();
    setError("");
  };

  if (!user) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={handleSetOpenDialog}>
      <DialogTrigger asChild>
        <Button size="xs" variant="secondary">
          Withdraw
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Withdraw money</DialogTitle>
            </DialogHeader>
            <CreditBalanceForm user={user} currency={currency} />
            {!!error && (
              <div className="text-sm text-center font-medium">
                <p className="text-red-600">{error}</p>
                <p>
                  Current balance is:{" "}
                  <span className="font-semibold">
                    {user.balance[currency]} {currency}
                  </span>
                </p>
              </div>
            )}
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="secondary">Cancel</Button>
              </DialogClose>
              <Button type="submit">Withdraw</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
