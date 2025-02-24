"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import useGetUser from "@/hooks/useGetUser";
import { User } from "@/lib/types";
import Image from "next/image";
import ARROW_ICON from "@/assets/arrow-right.svg";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function UserDetails({ userId }: { userId: User["id"] }) {
  const user = useGetUser(userId);

  if (!user) {
    return <></>;
  }

  return (
    <div>
      <Link href="/users">
        <Button className="pl-0" variant="link" size="sm">
          <Image className="rotate-180 inline" src={ARROW_ICON} alt="..." />
          Go Back to Users
        </Button>
      </Link>
      <div className="mt-4 flex gap-8">
        <Avatar className="w-24 h-24">
          <AvatarImage src={user?.avatar} />
        </Avatar>
        <div>
          <h5>{user?.name}</h5>
          <p className="text-gray-500">#{user?.id}</p>
        </div>
      </div>
    </div>
  );
}
