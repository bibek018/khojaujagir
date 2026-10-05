"use client";

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
import icon from "../icon.png";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Home() {
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const router = useRouter();

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
        <h2 className="text-2xl font-bold text-primary">खोजौ JAGIR</h2>
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
          <form>
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
                  required
                />
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
                  required
                />
              </div>

              {/* Phone Number */}
              <div className="grid gap-2">
                <Label htmlFor="phone_no">Phone Number</Label>

                <div className="flex flex-row items-center justify-center gap-2">
                  <Input
                    value="+977 "
                    className="w-15 text-muted-foreground"
                    readOnly
                  />

                  <Input id="phone_no" type="text" placeholder="9*********" />
                </div>
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
                    required
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
              </div>

              {/* Confirm Password */}
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword" className="gap-1">
                  Confirm Password
                  <span className="text-destructive">*</span>
                </Label>

                <InputGroup>
                  <InputGroupInput
                    id="confirmPassword"
                    type={showPassword2 ? "text" : "password"}
                    placeholder="Re-enter your password"
                    required
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
              </div>

              {/* Password Requirements */}
              <span className="text-xs leading-relaxed text-muted-foreground">
                Password must contain at least one uppercase letter, one
                lowercase letter, one number, and one special symbol.
              </span>

              {/* Sign Up */}
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col items-center gap-3 pt-2">
          {/* Login */}
          <div className="flex flex-row items-center justify-center text-center">
            Already have an account?
            <Button
              variant="link"
              onClick={() => {
                router.push("/login");
              }}
            >
              <span className="underline">Login</span>
            </Button>
          </div>

          {/* Divider */}
          <div className="flex w-full items-center gap-4">
            <div className="h-px flex-1 bg-border" />

            <span className="text-xs font-medium text-muted-foreground">
              OR
            </span>

            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Google */}
          <Button variant="outline" size="lg" className="h-auto w-full p-1">
            <FcGoogle className="size-7" />
            Sign up with Google
          </Button>

          {/* Social Buttons */}
          <div className="flex flex-row items-center justify-center gap-5">
            <Button className="h-auto bg-transparent p-2 hover:bg-transparent hover:border-border-primary">
              <FaFacebook className="size-7 text-blue-500" />
            </Button>

            <Button className="h-auto bg-transparent p-2 hover:bg-transparent hover:border-border-primary">
              <FaLinkedin className="size-7 text-[#0077B5]" />
            </Button>

            <Button className="h-auto bg-transparent p-2 hover:bg-transparent hover:border-border-primary">
              <FaGithub className="size-7 text-black" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </section>
  );
}
