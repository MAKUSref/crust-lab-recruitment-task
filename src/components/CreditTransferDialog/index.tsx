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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Form } from "@/components/ui/form";
import useGetUser from "@/hooks/useGetUser";
import { useCallback, useState } from "react";
import { transfer } from "@/redux/users/usersSlice";
import { toast } from "sonner";
import { calcFee } from "@/lib/exchangeUtils";
import CreditTransferForm from "./CreditTransferForm";

interface CreditTransferDialogProps {
  userId: User["id"];
}

const creditTransferSchema = z.object({
  userId: z.string(),
  currency: z.nativeEnum(CurrencyType),
  amount: z.coerce.number().positive(),
});

type CreditTransferSchema = z.infer<typeof creditTransferSchema>;

export default function CreditTransferDialog({
  userId,
}: CreditTransferDialogProps) {
  const { users } = useAppSelector((state) => state.usersState);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const user = useGetUser(userId);
  const dispatch = useAppDispatch();

  const form = useForm<CreditTransferSchema>({
    resolver: zodResolver(creditTransferSchema),
    defaultValues: {
      amount: 0,
      currency: CurrencyType.PLN,
    },
  });

  const onSubmit = useCallback(
    ({ amount, currency, userId }: CreditTransferSchema) => {
      if (!user) return;
      const userBalanceTooLow = user.balance[currency] < amount;
      if (userBalanceTooLow) {
        setError(
          `Not enough balance! Current balance ${user.balance[currency]} ${currency}`
        );
        return;
      }

      const receiver = users.find((userToFind) => userToFind.id === userId);
      if (!receiver) {
        setError(`Receiver not found!`);
        return;
      }

      dispatch(
        transfer({
          recipientSnapshot: receiver,
          userSnapshot: user,
          amount: amount,
          currency: currency,
          fee: calcFee(amount),
          date: new Date().toISOString(),
        })
      );
      setOpen(false);
      toast.success("The money was successfully transfer.");
    },
    [dispatch, user, users]
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
        <Button size="sm">Credit Transfer</Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Transfer credits to another user</DialogTitle>
            </DialogHeader>
            <CreditTransferForm userId={userId} />
            {!!error && (
              <p className="text-sm text-center font-medium text-red-600">
                {error}
              </p>
            )}
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="secondary">Cancel</Button>
              </DialogClose>
              <Button type="submit">Transfer</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
