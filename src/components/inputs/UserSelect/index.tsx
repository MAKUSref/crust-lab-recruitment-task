"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useAppSelector } from "@/redux/hooks";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";

interface UserSelectProps {
  userId: string;
}

export default function UserSelect({ userId }: UserSelectProps) {
  const { users } = useAppSelector((state) => state.usersState);
  const { control } = useFormContext();

  const filteredUsers = useMemo(() => {
    return users.filter((user) => user.id !== userId);
  }, [userId, users]);

  return (
    <FormField
      control={control}
      name="userId"
      render={({ field }) => (
        <FormItem className="grid grid-cols-4 items-center gap-4 space-y-0">
          <FormLabel className="text-right">receiver</FormLabel>
          <div className="col-span-3">
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a user" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {filteredUsers.map((user, i) => (
                  <SelectItem key={i} value={user.id}>
                    <div className="flex flex-row items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={user.avatar} />
                      </Avatar>
                      <p>{user.name}</p>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormDescription>Choose your receiver.</FormDescription>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}
