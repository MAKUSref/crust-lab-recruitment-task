"use client";

import { Input } from "@/components/ui/input";
import useGetUsersList from "@/hooks/useGetUsersList";
import { useAppDispatch } from "@/redux/hooks";
import { setSearchText } from "@/redux/session/sessionSlice";
import { ChangeEvent, useCallback, useState } from "react";

const DEBOUNCE_TIMEOUT = 500; // in ms

export default function UsersFilters() {
  const [debounceTimeoutId, setDebounceTimeoutId] = useState<
    NodeJS.Timeout | undefined
  >();
  const { usersFoundNumber } = useGetUsersList();
  const dispatch = useAppDispatch();

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (debounceTimeoutId) {
        clearTimeout(debounceTimeoutId);
      }
      const timeoutId = setTimeout(() => {
        dispatch(setSearchText(e.target.value));
      }, DEBOUNCE_TIMEOUT);
      setDebounceTimeoutId(timeoutId);
    },
    [debounceTimeoutId, dispatch]
  );

  return (
    <div className="flex justify-between items-center">
      <p className="text-sm">
        Users found: <span className="font-bold">{usersFoundNumber}</span>
      </p>
      <div>
        <Input placeholder="Search users" onChange={handleChange} />
      </div>
    </div>
  );
}
