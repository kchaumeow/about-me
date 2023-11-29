"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
export default function CustomLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const currentRoute = usePathname();
  return (
    <Link href={href} className={currentRoute === href ? "active-link" : ""}>
      {children}
    </Link>
  );
}
