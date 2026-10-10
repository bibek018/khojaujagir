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
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import api from "@/lib/app"; // <-- check this path (was "@/lib/app")
import { SignUpResponse } from "@/types/auth.types";

type FieldKey = "name" | "email" | "phone_no" | "password" | "confirmPassword";
type Errors = Partial<Record<FieldKey, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

export default function Home() {
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_no, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const clearError = (key: FieldKey) =>
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });

  const signUpHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const newErrors: Errors = {};

    if (!cleanName) newErrors.name = "User's full name is required";

    if (!cleanEmail) newErrors.email = "Email address is required";
    else if (!EMAIL_REGEX.test(cleanEmail))
      newErrors.email = "Enter a valid email address";

    if (phone_no.length > 0 && phone_no.length !== 10) {
      newErrors.phone_no = "Phone number must be 10 digits after +977.";
    }

    if (!password) newErrors.password = "Password is required";
    else if (!PASSWORD_REGEX.test(password))
      newErrors.password =
        "Min 8 characters with uppercase, lowercase, number and special symbol.";

    if (!confirmPassword)
      newErrors.confirmPassword = "Confirm Password is required";
    else if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    const toastId = toast.loading("Creating your account...");

    try {
      const response = await api.post<SignUpResponse>("/auth/v1/signup", {
        name: cleanName,
        email: cleanEmail,
        password,
        confirmPassword,
        ...(phone_no && { phone_no: `+977${phone_no}` }),
      });

      toast.success(response.data.message, { id: toastId });
      setErrors({});
      setName("");
      setEmail("");
      setPhoneNo("");
      setPassword("");
      setConfirmPassword("");
      router.push("/login");
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message ||
          (error.request
            ? "Cannot reach server. Check your connection."
            : "Something went wrong")
        : "Something went wrong";
      toast.error(message, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex min-h-screen flex-col items-center justify-center gap-3 px-4 py-4">
      {/* Logo */}
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

      {/* Registration Card */}
      <Card className="flex w-full max-w-sm flex-col gap-2 md:max-w-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-center font-semibold">
            Create Account
          </CardTitle>
          <CardDescription className="text-center">
            Enter your details to get started.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* noValidate => browser won't block submit; our errors show instead */}
          <form onSubmit={signUpHandler} noValidate>
            <div className="flex flex-col gap-4">
              {/* Full Name */}
              <div className="grid gap-2">
                <Label htmlFor="name" className="gap-1">
                  Full Name<span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Bishal Ojha"
                  className="placeholder:text-xs md:placeholder:text-sm text-sm"
                  value={name}
                  aria-invalid={!!errors.name}
                  onChange={(e) => {
                    setName(e.target.value);
                    clearError("name");
                  }}
                />
                {errors.name && (
                  <p className="text-xs text-destructive">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div className="grid gap-2">
                <Label htmlFor="email" className="gap-1">
                  Email<span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="bishal@example.com"
                  className="placeholder:text-xs md:placeholder:text-sm text-sm"
                  value={email}
                  aria-invalid={!!errors.email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    clearError("email");
                  }}
                />
                {errors.email && (
                  <p className="text-xs text-destructive">{errors.email}</p>
                )}
              </div>

              {/* Phone Number */}
              <div className="grid gap-2">
                <Label htmlFor="phone_no">Phone Number</Label>
                <div className="flex flex-row items-center justify-center gap-2">
                  <Input
                    value="+977"
                    className="w-20 text-muted-foreground text-xs md:text-sm"
                    readOnly
                    tabIndex={-1}
                  />
                  <Input
                    id="phone_no"
                    type="tel"
                    maxLength={10}
                    placeholder="9*********"
                    inputMode="numeric"
                    className="placeholder:text-xs md:placeholder:text-sm text-sm"
                    value={phone_no}
                    aria-invalid={!!errors.phone_no}
                    onChange={(e) => {
                      setPhoneNo(e.target.value.replace(/\D/g, ""));
                      clearError("phone_no");
                    }}
                  />
                </div>
                {errors.phone_no && (
                  <p className="text-xs text-destructive">{errors.phone_no}</p>
                )}
              </div>

              {/* Password */}
              <div className="grid gap-2">
                <Label htmlFor="password" className="gap-1">
                  Password<span className="text-destructive">*</span>
                </Label>
                <InputGroup>
                  <InputGroupInput
                    id="password"
                    type={showPassword1 ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    aria-invalid={!!errors.password}
                    className="placeholder:text-xs md:placeholder:text-sm text-sm"
                    onChange={(e) => {
                      setPassword(e.target.value);
                      clearError("password");
                    }}
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      type="button"
                      onClick={() => setShowPassword1((prev) => !prev)}
                      aria-label={
                        showPassword1 ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword1 ? <EyeOff /> : <Eye />}
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
                {errors.password && (
                  <p className="text-xs text-destructive">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword" className="gap-1">
                  Confirm Password<span className="text-destructive">*</span>
                </Label>
                <InputGroup>
                  <InputGroupInput
                    id="confirmPassword"
                    type={showPassword2 ? "text" : "password"}
                    placeholder="Re-enter your password"
                    value={confirmPassword}
                    aria-invalid={!!errors.confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      clearError("confirmPassword");
                    }}
                    className="placeholder:text-xs md:placeholder:text-sm text-sm"
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      type="button"
                      onClick={() => setShowPassword2((prev) => !prev)}
                      aria-label={
                        showPassword2 ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword2 ? <EyeOff /> : <Eye />}
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
                {errors.confirmPassword && (
                  <p className="text-xs text-destructive">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <span className="text-xs leading-relaxed text-muted-foreground">
                Password must contain at least one uppercase letter, one
                lowercase letter, one number, and one special symbol.
              </span>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing up..." : "Sign Up"}
              </Button>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col items-center gap-3 pt-2">
          <div className="flex flex-row items-center justify-center text-center">
            Already have an account?
            <Button
              type="button"
              variant="link"
              onClick={() => router.push("/login")}
            >
              <span className="underline">Login</span>
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
            Sign up with Google
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
