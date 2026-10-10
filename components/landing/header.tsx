import Image from "next/image";
import Navbar from "@/components/landing/navLinks";
import logo from "@/public/logo.png";
import { HeaderAuthComponent } from "./headerAuthComponent";
import { Container } from "./container";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background shadow-sm">
      <Container wide className="flex flex-col gap-2 py-2 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-row items-center justify-between md:gap-15">
        <span className="flex flex-row items-center justify-center gap-2">
          <Image
            src={logo}
            alt="logo"
            height={38}
            width={38}
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
      </Container>
    </header>
  );
}
