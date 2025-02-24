"use client"

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { CurrencyType, User } from "@/lib/types";
import { formatBalance } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function UsersListItem({ id, name, balance, avatar }: User) {
  const router = useRouter();
  const navigateToUserDetails = () => {
    router.push(`/users/${id}`);
  };

  return (
    <div className="grid grid-cols-12 border-b border-gray-200 px-3 py-3 items-center hover:bg-gray-100 transition duration-300 cursor-pointer" onClick={navigateToUserDetails}>
      <div className="col-span-4 flex gap-3 items-center">
        <Avatar>
          <AvatarImage src={avatar} />
        </Avatar>
        <p className="text-sm">{name}</p>
      </div>
      <div className="col-span-2">
        <p className="caption">#{id}</p>
      </div>
      <div className="col-span-2">
        <p className="caption text-right">{formatBalance(balance.PLN, CurrencyType.PLN)}</p>
      </div>
      <div className="col-span-2">
        <p className="caption text-right">{formatBalance(balance.EUR, CurrencyType.EUR)}</p>
      </div>
      <div className="col-span-2">
        <p className="caption text-right">{formatBalance(balance.USD, CurrencyType.USD)}</p>
      </div>
    </div>
  );
}
