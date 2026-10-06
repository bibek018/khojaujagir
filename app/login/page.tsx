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
import icon from "../icon.png";
import { useRouter } from "next/navigation";
export default function Home() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  return (
    <section className="flex flex-col items-center justify-center min-h-screen gap-6">
      <div className="flex flex-row items-center justify-center gap-2">
        <Image
          src={icon}
          alt="icon"
          height={36}
          width={36}
          className="object-contain h-9 w-9 -translate-y-0.5 "
        />
        <h2 className="text-primary text-2xl font-extrabold">खोजौ JAGIR</h2>
      </div>
      <Card className="w-full max-w-sm md:max-w-md  flex flex-col gap-8">
        <CardHeader>
          <CardTitle className="text-center">Login to your account</CardTitle>
          <CardDescription className="text-center">
            Enter your email, password below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="bishal@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <InputGroup>
                  <InputGroupInput
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    required
                  />

                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center  gap-4 ">
          <Button type="submit" className="w-full">
            Login
          </Button>
          <div className="text-center flex flex-row items-center justify-center">
            Not registered?
            <Button
              variant="link"
              onClick={(e) => {
                router.push("/signup");
              }}
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
          <Button variant="outline" size="lg" className="w-full h-auto p-1 ">
            <FcGoogle className="size-7" />
            Login with Google
          </Button>
          <div className="flex flex-row items-center justify-center gap-5">
            <Button className="bg-transparent h-auto p-2 hover:bg-transparent hover:border-border-primary">
              <FaFacebook size={28} className="text-blue-500 size-7" />
            </Button>
            <Button className="bg-transparent h-auto p-2 hover:bg-transparent hover:border-border-primary">
              <FaLinkedin size={28} className="text-[#0077B5] size-7" />
            </Button>
            <Button className="bg-transparent h-auto p-2 hover:bg-transparent hover:border-border-primary">
              <FaGithub size={28} className="text-black size-7" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </section>
  );
}
