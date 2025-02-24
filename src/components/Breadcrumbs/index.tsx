"use client";

import { useLazyGetUser } from "@/hooks/useGetUser";
import { capitalizeFirstLetter } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export default function Breadcrumbs() {
  const currentPath = usePathname();
  const getUser = useLazyGetUser();

  const paths = useMemo(
    () => currentPath.split("/").filter((path) => !!path),
    [currentPath]
  );

  const getFullPath = (index: number) =>
    `/${paths.slice(0, index + 1).join("/")}`;

  const isLastPath = (index: number) => index === paths.length - 1;

  const isUserDetailsPage = (index: number) =>
    index > 0 && paths[index - 1] === "users";

  return (
    <ul className="flex gap-1 pb-3 pt-6 caption">
      <li>
        <Link href="/">Home</Link>
      </li>
      {paths.map((path, index) => (
        <li className="flex gap-1" key={index}>
          <span>/</span>
          <Link
            href={getFullPath(index)}
            className={`${isLastPath(index) ? "text-gray-950" : ""}`}
          >
            {isUserDetailsPage(index)
              ? getUser(path)?.name
              : capitalizeFirstLetter(path)}
          </Link>
        </li>
      ))}
    </ul>
  );
}
