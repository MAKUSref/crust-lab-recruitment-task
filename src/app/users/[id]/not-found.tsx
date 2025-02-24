import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function UserNotFoundPage() {
  return (
    <div className="text-center">
      <h3 className="font-medium mt-10 mb-6">Uups... User not found!</h3>
      <div>
        <Link href="/users">
          <Button>Go back</Button>
        </Link>
      </div>
    </div>
  );
}
