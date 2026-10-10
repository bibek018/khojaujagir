"use client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  InputGroupButton,
} from "@/components/ui/input-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import icon from "@/app/icon.png";
import { useRouter } from "next/navigation";
import api from "@/lib/app";
import { LoginResponse } from "@/types/auth.types";
import { useAuthStore } from "@/stores/authStore";
import axios from "axios";

type FieldKey = "email" | "password";
type Errors = Partial<Record<FieldKey, string>>;

export default function Home() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearError = (key: FieldKey) =>
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });

  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const cleanEmail = email.trim();
    const newErrors: Errors = {};

    if (!cleanEmail) newErrors.email = "Email address is required";
    if (!password) newErrors.password = "Password is required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    const toastId = toast.loading("Logging in ...");
    try {
      const response = await api.post<LoginResponse>("/auth/v1/login", {
        email: cleanEmail,
        password,
      });
      const { user, accessToken } = response.data;
      setAuth(user, accessToken);
      setErrors({});
      setEmail("");
      setPassword("");
      if (!user.role) {
        toast.info("Please select role first", {
          id: toastId,
        });
        router.push("/onboarding/set-role");
        return;
      }
      if (!user.onboardingComplete) {
        toast.info("Please complete your profile first", {
          id: toastId,
        });
        router.push(`/onboarding/${user.role}`);
        return;
      }
      toast.info("Logged in successfully.", {
        id: toastId,
      });
      router.push("/dashboard");
    } catch (err) {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message ||
          (err.request
            ? "Cannot reach server. Check your connection."
            : "Something went wrong")
        : "Something went wrong";
      toast.error(message, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex min-h-screen flex-col items-center justify-center gap-6 px-4">
      <div className="flex flex-row items-center justify-center gap-2">
        <Image
          src={icon}
          alt="icon"
          height={36}
          width={36}
          className="h-9 w-9 -translate-y-0.5 object-contain"
        />
        <h2 className="text-2xl font-extrabold text-primary">खोजौ JAGIR</h2>
      </div>

      <Card className="flex w-full max-w-sm flex-col gap-2 md:max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Login to your account</CardTitle>
          <CardDescription className="text-center">
            Enter your email, password below to login to your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form id="login-form" onSubmit={loginHandler} noValidate>
            <div className="flex flex-col gap-6">
              {/* Email */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="bishal@example.com"
                  value={email}
                  aria-invalid={!!errors.email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    clearError("email");
                  }}
                  className="text-xs md:text-sm"
                />
                {errors.email && (
                  <p className="text-xs text-destructive">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <InputGroup className="w-full bg-trasparent">
                  <InputGroupInput
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="placeholder:text-xs md:placeholder:text-sm text-sm min-w-0 bg-transparent"
                    value={password}
                    aria-invalid={!!errors.password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      clearError("password");
                    }}
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      type="button"
                      variant="ghost"
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="bg-transparent"
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
                {errors.password && (
                  <p className="text-xs text-destructive">{errors.password}</p>
                )}
              </div>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col items-center gap-4">
          {/* form="login-form" links this button to the form above */}
          <Button
            type="submit"
            form="login-form"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

          <div className="flex flex-row items-center justify-center text-center">
            Not registered?
            <Button
              type="button"
              variant="link"
              onClick={() => router.push("/signup")}
            >
              <span className="underline">Sign Up</span>
            </Button>
          </div>

          <div className="flex w-full items-center gap-4">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs font-medium text-muted-foreground">
              OR
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <Button
            type="button"
            variant="outline"
            size="lg"
            className="h-auto w-full p-1"
          >
            <FcGoogle className="size-7" />
            Login with Google
          </Button>

          <div className="flex flex-row items-center justify-center gap-5">
            <Button
              type="button"
              className="h-auto border-2 border-transparent bg-transparent p-2 hover:border-border hover:bg-transparent"
            >
              <FaFacebook className="size-7 text-blue-500" />
            </Button>
            <Button
              type="button"
              className="h-auto border-2 border-transparent bg-transparent p-2 hover:border-border hover:bg-transparent"
            >
              <FaLinkedin className="size-7 text-[#0077B5]" />
            </Button>
            <Button
              type="button"
              className="h-auto border-2 border-transparent bg-transparent p-2 hover:border-border hover:bg-transparent"
            >
              <FaGithub className="size-7 text-black" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </section>
  );
}
