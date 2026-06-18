"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Home", href: "/home" },
  { label: "Catalog", href: "/catalog" },
  { label: "Custom", href: "/custom" },
  { label: "Account", href: "/account/profile" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="w-full bg-white border-b border-gray-100">
      <div className="max-w-[1440px] mx-auto px-8 h-[70px] flex items-center justify-between">
        <Link href="/home" className="text-[#C1714F] font-bold text-2xl tracking-tight font-display">
          Morphara
        </Link>
        <nav className="flex items-center gap-10">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[15px] transition-colors duration-150 ${
                  isActive ? "font-bold text-gray-900" : "text-gray-700 hover:text-gray-900"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
