"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ErrorMessage } from "../ui/error-message";
import { Spinner } from "../ui/spinner";

export function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email || !email.includes("@") || password.length < 6) {
      setError(
        "Enter a valid email and a password with at least 6 characters.",
      );
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const user = await login(email, password);
      router.push(
        user.role === "employer"
          ? "/employer/dashboard"
          : user.role === "candidate"
            ? "/candidate/dashboard"
            : "/select-role",
      );
    } catch {
      setError(
        "We could not sign you in. Check your credentials and try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <ErrorMessage message={error} />}
      <div className="space-y-2">
        <Label htmlFor="email">Email address</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <Link href="#" className="text-xs font-semibold text-primary">
            Forgot password?
          </Link>
        </div>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Your password"
          autoComplete="current-password"
        />
      </div>
      <Button type="submit" className="h-10 w-full gap-2" disabled={submitting}>
        {submitting && <Spinner className="size-4" />} Sign in
      </Button>
      <div className="relative py-1">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border-light" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-card px-3 text-xs text-muted-foreground">
            or continue with
          </span>
        </div>
      </div>
      <div className="space-y-2">
        <Button
          type="button"
          variant="outline"
          className="h-10 w-full justify-center gap-3 px-4"
        >
          <FcGoogle className="size-4" /> Sign in with Google
        </Button>
        <div className="flex justify-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Sign in with GitHub"
            title="Sign in with GitHub"
          >
            <FaGithub className="size-4 text-[#181717]" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Sign in with Facebook"
            title="Sign in with Facebook"
          >
            <FaFacebookF className="size-4 text-[#1877f2]" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Sign in with LinkedIn"
            title="Sign in with LinkedIn"
          >
            <FaLinkedinIn className="size-4 text-[#0a66c2]" />
          </Button>
        </div>
      </div>
      <p className="text-center text-sm text-muted-foreground">
        New to खोजौ JAGIR?{" "}
        <Link
          href="/auth/signup"
          className="font-semibold text-primary hover:underline"
        >
          Create an account
        </Link>
      </p>
    </form>
  );
}
