import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Morphara – Premium Furniture",
  description: "Discover and customize premium furniture for your home.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
