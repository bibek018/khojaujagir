import Image from "next/image";
import logo from "@/public/logo.png";
export const DashboardHeader = () => {
  return (
    <header className="sticky top-0 z-50 bg-background shadow-sm">
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
      </div>
    </header>
  );
};
