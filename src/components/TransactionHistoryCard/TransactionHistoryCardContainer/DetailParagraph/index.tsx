import { PropsWithChildren } from "react";

export default function DetailParagraph({
  label,
  children,
}: PropsWithChildren<{
  label: string;
}>) {
  return (
    <p className="my-1">
      <span className="caption">{label}</span>
      <span className="font-medium">{children}</span>
    </p>
  );
}