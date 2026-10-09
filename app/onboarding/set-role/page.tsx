"use client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FaUserTie, FaUsers } from "react-icons/fa6";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import Image from "next/image";
import icon from "@/app/icon.png";
import { useRouter } from "next/navigation";
import api from "@/lib/app";
import { RoleSaveResponse, Role } from "@/types/onboarding.types";
import axios from "axios";
import { useAuthStore } from "@/stores/authStore";

const roles = [
  {
    value: "candidate",
    title: "Candidate",
    Icon: FaUserTie,
    points: [
      "Create a Showcase",
      "Discover Opportunities",
      "Find Your Next Challenge",
    ],
  },
  {
    value: "employer",
    title: "Employer",
    Icon: FaUsers,
    points: [
      "Search for talent",
      "Review portfolios",
      "Connect with innovators",
    ],
  },
] as const;

export default function Home() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const isInitialized = useAuthStore((s) => s.isInitialized);
  useEffect(() => {
    console.log(user);
    if (!isInitialized) {
      return;
    }
    if (!user) {
      toast.warning("Please log in to continue.");
      router.push("/login");
      return;
    }

    if (user?.role) {
      if (user.onboardingComplete) {
        router.replace("/dashboard");
      } else {
        router.replace(`/onboarding/${user.role}`);
      }
      return;
    }
  }, [user, isInitialized, router]);
  const [role, setRole] = useState<Role>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const submitRole = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!role) {
      toast.info("Please select a role to begin.");
      return;
    }
    setLoading(true);
    const toastID = toast.loading(`Saving user as ${role}`);
    try {
      const response = await api.patch<RoleSaveResponse>(
        "/profile/v1/set-role",
        {
          role,
        },
      );
      toast.success(response.data?.message, {
        id: toastID,
      });
      router.push(`/onboarding/${role}`);
    } catch (err) {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message ||
          (err.request
            ? "Cannot reach server. Check your connection."
            : "Something went wrong")
        : "Something went wrong";
      toast.error(message, { id: toastID });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen gap-6">
      <div className="flex flex-row items-center justify-center gap-2">
        <Image
          src={icon}
          alt="icon"
          height={36}
          width={36}
          className="object-contain h-9 w-9 -translate-y-0.5"
        />
        <h2 className="text-primary text-2xl font-extrabold">खोजौ JAGIR</h2>
      </div>

      <Card className="w-[80%] max-w-sm md:max-w-lg flex flex-col gap-8 bg-card border border-border-light shadow-sm">
        <CardHeader>
          <CardTitle className="text-center md:text-start text-foreground">
            Select Account Type
          </CardTitle>
          <CardDescription className="text-center md:text-start text-muted-foreground">
            Your journey starts here.
          </CardDescription>
        </CardHeader>

        <CardContent
          role="radiogroup"
          aria-label="Account type"
          className="flex flex-row items-stretch gap-4"
        >
          {roles.map(({ value, title, Icon, points }) => {
            const selected = role === value;
            return (
              <Card
                key={value}
                role="radio"
                aria-checked={selected}
                tabIndex={0}
                onClick={() => setRole(value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setRole(value);
                  }
                }}
                className={`flex-1 items-center cursor-pointer border-2 transition-colors outline-none
                  focus-visible:ring-2 focus-visible:ring-ring h-full pb-4
                  ${
                    selected
                      ? "border-primary bg-primary-subtle"
                      : "border-border bg-card hover:border-primary-light"
                  }`}
              >
                <CardTitle
                  className={`text-center ${
                    selected ? "text-primary" : "text-foreground"
                  }`}
                >
                  {title}
                </CardTitle>

                <div
                  className={`rounded-full p-4 transition-colors  ${
                    selected
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <Icon className="size-14 md:size-24" />
                </div>

                <ul className="hidden md:block list-disc list-inside space-y-1 text-sm text-muted-foreground marker:text-primary">
                  {points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </Card>
            );
          })}
        </CardContent>

        <CardFooter>
          <form
            onSubmit={submitRole}
            className="w-full flex flex-row justify-end items-center"
          >
            <Button
              disabled={!role || loading}
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active"
            >
              Next
            </Button>
          </form>
        </CardFooter>
      </Card>
    </section>
  );
}
