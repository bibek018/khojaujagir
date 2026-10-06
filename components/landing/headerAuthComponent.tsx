"use client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export const HeaderAuthComponent = () => {
  const router = useRouter();

  return (
    <>
      <Button
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          router.push("/login");
        }}
        className="bg-background font-semibold text-foreground px-4 py-2 rounded-radius hover:bg-background hover:border-primary"
      >
        Login
      </Button>
      <Button
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          router.push("/signup");
        }}
        className="bg-secondary text-secondary-foreground px-4 py-2 rounded-radius hover:bg-secondary-hover"
      >
        Sign Up
      </Button>
      <Button
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          router.push("/login");
        }}
        className="bg-primary text-primary-foreground px-4 py-2 rounded-radius hover:bg-primary-hover"
      >
        Post a Job
      </Button>
    </>
  );
};
