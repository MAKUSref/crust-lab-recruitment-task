"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CurrencyType, User } from "@/lib/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "@/redux/hooks";
import { Form } from "@/components/ui/form";
import useGetUser from "@/hooks/useGetUser";
import { deposit } from "@/redux/users/usersSlice";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import CreditBalanceForm from "../common/CreditBalanceForm";
import { CreditBalanceSchema, creditBalanceSchemaZod } from "@/lib/zod";

interface DepositDialogProps {
  userId: User["id"];
  currency: CurrencyType;
}

export default function DepositDialog({
  currency,
  userId,
}: DepositDialogProps) {
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
      dispatch(
        deposit({
          amount: values.amount,
          userSnapshot: user,
          currency,
          date: new Date().toISOString(),
        })
      );
      setOpen(false);
      toast.success("The money deposit was successful.");
    },
    [dispatch, user, currency]
  );

  const handleSetOpen = (value: boolean) => {
    setOpen(value);
    form.reset();
  };

  if (!user) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={handleSetOpen}>
      <DialogTrigger asChild>
        <Button size="xs">Deposit</Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Deposit money</DialogTitle>
            </DialogHeader>
            <CreditBalanceForm user={user} currency={currency} />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="secondary">Cancel</Button>
              </DialogClose>
              <Button type="submit">Deposit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
