"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import icon from "@/app/icon.png";
import { FaCamera, FaFileArrowUp, FaXmark, FaUserTie } from "react-icons/fa6";

export default function CandidateOnboarding() {
  const handleOnboarding = () => {};
  
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
      <Card className="min-w-[90%] md:min-w-lg">
        <CardHeader>
          <CardTitle>Complete Your Profile</CardTitle>
          <CardDescription>
            Tell us a bit about yourself so we can find right oppurtunities. All
            fields are required.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleOnboarding}
            className="flex flex-col items-center"
          >
            <div>
              <Label
                htmlFor="avatar-upload"
                className="text-sm relative size-24 rounded-full overflow-hidden bg-muted text-muted-foreground flex flex-row items-center justify-center border-2 border-dashed border-border-primary  hover:border-primary transition-colors  cursor-pointer focus-within:ring-2 focus-within:ring-ring outline-none"
              >
                <FaUserTie className="size-10 " />
                <span className="absolute bottom-0 inset-x-0 bg-primary text-primary-foreground py-1 flex justify-center ">
                  <FaCamera className="size-3.5" />
                </span>
              </Label>
              <Input
                id="avatar-upload"
                name="avatar"
                hidden
                tabIndex={-1}
                type="file"
                accept="image/*"
                className="sr-only"
              />
            </div>
          </form>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </section>
  );
}
