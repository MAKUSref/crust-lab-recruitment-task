import { useAppSelector } from "@/redux/hooks";
import { useMemo } from "react";

export default function useGetUsersList() {
  const { users } = useAppSelector((state) => state.usersState);
  const { currentPage, resultsPerPage, searchText } = useAppSelector(
    (state) => state.session.userFilters
  );

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const nameIncludesSearchText = user.name
        .toLowerCase()
        .includes(searchText.toLowerCase());
      const idIncludesSearchText = user.id
        .toLowerCase()
        .includes(searchText.toLowerCase());
      return nameIncludesSearchText || idIncludesSearchText;
    });
  }, [searchText, users]);

  const { nextPageIndex, paginationUsers, prevPageIndex } = useMemo(() => {
    const endIndex = currentPage * resultsPerPage;
    const startIndex = endIndex - resultsPerPage;
    const isLastPage = endIndex >= filteredUsers.length;
    const isFirstPage = startIndex === 0;

    const prevPageIndex = isFirstPage ? undefined : currentPage - 1;
    const nextPageIndex = isLastPage ? undefined : currentPage + 1;
    const paginationUsers = filteredUsers.slice(startIndex, endIndex);
    return { prevPageIndex, nextPageIndex, paginationUsers };
  }, [currentPage, filteredUsers, resultsPerPage]);

  return {
    users: paginationUsers,
    usersFoundNumber: filteredUsers.length,
    prevPageIndex,
    nextPageIndex,
  };
}
