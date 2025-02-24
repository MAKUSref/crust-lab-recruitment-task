import UsersFilters from "@/components/UsersFilters";
import UsersList from "@/components/UsersList";

export default function UsersPage() {
  return (
    <div className="flex flex-col gap-4">
      <h4>All Users</h4>
      <UsersFilters />
      <UsersList />
    </div>
  );
}
