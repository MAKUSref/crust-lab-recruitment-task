import UserBalance from "@/components/userPageSections/UserPageBalance";
import UserDetails from "@/components/userPageSections/UserPageDetails";
import UserPageTransactions from "@/components/userPageSections/UserPageTransactions";
import { checkIfUserExists } from "@/lib/utils";
import { notFound } from "next/navigation";

export default async function UserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const userExists = await checkIfUserExists(id);

  if (!userExists) {
    return notFound();
  }

  return (
    <div>
      <UserDetails userId={id} />
      <UserBalance userId={id} />
      <UserPageTransactions userId={id} />
    </div>
  );
}
