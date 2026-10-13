"use client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useAuthStore } from "@/stores/authStore";
import { ArrowRight } from "lucide-react";
import { UserMenu } from "./UserMenu";
import React from "react";
export const HeaderAuthComponent = () => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const isInitialized = useAuthStore((state) => state.isInitialized);
  const handleDashboardRedirect = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  
  if (!isInitialized) {
    return;
  }
  if (!user) {
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
  }
  if (user) {
    return (
      <>
        <Button className="py-4 px-6" onClick={handleDashboardRedirect}>
          Go to Dashboard <ArrowRight />
        </Button>
        <UserMenu user={user} />
      </>
    );
  }
};
