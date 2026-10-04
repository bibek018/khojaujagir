import Navbar from "@/components/landing/navLinks";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="h-fit flex sticky top-0 z-50 flex-col gap-2 md:flex-row md:justify-between md:items-center bg-background px-4 py-2 shadow-sm">
      <div className="flex flex-row justify-between items-center md:gap-15">
        <span className="flex flex-row items-center justify-center gap-2">
          <img src="icon.png" alt="icon" className="rounded h-10 w-10" />
          <h3 className="font-bold text-xl">खोजौ JAGIR</h3>
        </span>
        <Navbar />
      </div>
      <div className="flex flex-row items-center justify-center gap-5">
        <Button className="bg-background font-semibold text-foreground px-4 py-2 rounded-radius hover:bg-background hover:border-primary">
          Login
        </Button>
        <Button className="bg-secondary text-secondary-foreground px-4 py-2 rounded-radius hover:bg-secondary-hover">
          Sign Up
        </Button>
        <Button className="bg-primary text-primary-foreground px-4 py-2 rounded-radius hover:bg-primary-hover">
          Post a Job
        </Button>
      </div>
    </header>
  );
}
