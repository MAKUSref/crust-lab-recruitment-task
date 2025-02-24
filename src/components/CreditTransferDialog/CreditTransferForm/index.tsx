import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CurrencySelect from "@/components/inputs/CurrencySelect";
import UserSelect from "@/components/inputs/UserSelect";
import AmountInput from "@/components/inputs/AmountInput";
import useGetUser from "@/hooks/useGetUser";
import { User } from "@/lib/types";

interface CreditTransferFormProps {
  userId: User["id"];
}

export default function CreditTransferForm({
  userId,
}: CreditTransferFormProps) {
  const user = useGetUser(userId);

  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right text-gray-500">
          Sender
        </Label>
        <Input id="name" value={user?.name} className="col-span-3" disabled />
      </div>
      <UserSelect userId={userId} />
      <CurrencySelect />
      <AmountInput />
    </div>
  );
}
