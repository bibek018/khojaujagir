import { Button } from "@/components/ui/button";
export default function Header() {
  return (
    <header className="h-fit flex flex-col gap-2 md:flex-row md:justify-between md:items-center bg-background px-4 py-2">
      <div className="flex flex-row justify-between items-center md:w-1/4">
        <span className="flex flex-row items-center justify-center gap-1">
          <img src="icon.png" alt="icon" className="rounded h-10 w-10" />
          <h3 className="font-bold text-xl">खोजौ JAGIR</h3>
        </span>
        <p className="text-muted-foreground font-semibold">Explore Jobs</p>
      </div>
      <div className="flex flex-row items-center justify-center gap-5">
        <Button className="bg-primary font-semibold text-primary-foreground md:bg-background md:text-foreground px-4 py-2  rounded-radius hover:bg-background hover:border-primary">
          Login
        </Button>
        <Button className="bg-secondary  text-secondary-foreground px-4 py-2 rounded-radius hover:bg-secondary-hover ">
          Sign Up
        </Button>
        <Button className="bg-primary  text-primary-foreground px-4 py-2 rounded-radius hover:bg-primary-hover">
          Post a Job
        </Button>
      </div>
    </header>
  );
}
