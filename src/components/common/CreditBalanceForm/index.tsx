import AmountInput from "@/components/inputs/AmountInput";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { CurrencyType, User } from "@/lib/types";

interface CreditBalanceFormProps {
  user: User;
  currency: CurrencyType;
}

export default function CreditBalanceForm({
  currency,
  user,
}: CreditBalanceFormProps) {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right text-gray-500">
          Name
        </Label>
        <Input id="name" value={user.name} className="col-span-3" disabled />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="currency" className="text-right text-gray-500">
          Currency
        </Label>
        <Input id="currency" value={currency} className="col-span-3" disabled />
      </div>
      <AmountInput />
    </div>
  );
}
