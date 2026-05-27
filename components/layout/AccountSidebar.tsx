"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarItems = [
  { label: "Profile", href: "/account/profile" },
  { label: "Cart", href: "/account/cart" },
  { label: "On The Way", href: "/account/on-the-way" },
  { label: "History", href: "/account/history" },
  { label: "Log Out", href: "/login" },
];

export default function AccountSidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-[240px] flex-shrink-0 flex flex-col gap-3">
      {sidebarItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={isActive ? "sidebar-btn-active text-center block" : "sidebar-btn text-center block"}
          >
            {item.label}
          </Link>
        );
      })}
    </aside>
  );
}
