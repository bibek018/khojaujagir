import Image from "next/image";
import Navbar from "@/components/landing/navLinks";
import logo from "@/public/logo.png";
import { HeaderAuthComponent } from "./headerAuthComponent";
export default function Header() {
  return (
    <header className="h-fit flex sticky top-0 z-50 flex-col gap-2 md:flex-row md:justify-between md:items-center bg-background px-4 py-2 shadow-sm">
      <div className="flex flex-row justify-between items-center md:gap-15">
        <span className="flex flex-row items-center justify-center gap-2">
          <Image
            src={logo}
            alt="logo"
            height={36}
            width={36}
            className="object-contain h-9 w-9 -translate-y-0.5"
          />
          <h3 className="font-extrabold text-xl text-center leading-none flex items-center text-primary">
            खोजौ JAGIR
          </h3>
        </span>
        <Navbar />
      </div>
      <div className="flex flex-row items-center justify-center gap-5">
        <HeaderAuthComponent />
      </div>
    </header>
  );
}
