import { useAppSelector } from "@/redux/hooks";

export default function useGetUser(userId: string) {
  const { users } = useAppSelector((state) => state.usersState);
  return users.find((user) => user.id === userId);
}

export function useLazyGetUser() {
  const { users } = useAppSelector((state) => state.usersState);
  return (userId: string) => users.find((user) => user.id === userId);
}