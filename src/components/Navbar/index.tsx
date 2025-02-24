import Link from "next/link";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 border-b bg-white z-50">
      <div className="container py-4">
        <div className="flex justify-between items-center">
          <Link href="/">
            <span className="flex items-center font-semibold text-xl">
              <span>Admin</span>
              <span className="text-blue-700">Panel</span>
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <span>Admin</span>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
            </Avatar>
          </div>
        </div>
      </div>
    </nav>
  );
}
