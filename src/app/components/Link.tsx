"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
export default function CustomLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  const currentRoute = usePathname();
  const classes = [className, currentRoute === href ? "active-link" : ""]
    .filter(Boolean)
    .join(" ");
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
