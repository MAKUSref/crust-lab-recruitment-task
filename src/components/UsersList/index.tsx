"use client";

import ListFooter from "./UsersListFooter";
import ListHeader from "./UsersListHeader";
import UsersListItem from "./UsersListItem";
import useGetUsersList from "@/hooks/useGetUsersList";

export default function UsersList() {
  const { users } = useGetUsersList();

  return (
    <div className="flex flex-col border border-gray-200 rounded">
      <div className="w-full overflow-x-scroll lg:overflow-x-auto">
        <div className="w-[770px] lg:w-full">
          <ListHeader />
          {users.map((user) => (
            <UsersListItem key={user.id} {...user} />
          ))}
        </div>
      </div>
      <ListFooter />
    </div>
  );
}
