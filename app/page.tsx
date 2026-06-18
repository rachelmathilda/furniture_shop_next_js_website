import Navbar from "@/components/layout/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function RootPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="relative w-full h-[calc(100vh-70px)]">
        {/* Background */}
        <Image
          src="/assets/background.png"
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />

        {/* Morphara logo di tengah */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[420px] h-[120px]">
            <Image
              src="/assets/morphara.png"
              alt="Morphara"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </section>
    </div>
  );
}
