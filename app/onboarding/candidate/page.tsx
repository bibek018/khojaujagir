"use client";
import { useState } from "react";
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
import { Button } from "@/components/ui/button";

const JOB_TYPES = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
  "Freelance",
];

export default function CandidateOnboarding() {
  const [avatar, setAvatar] = useState<File | null>(null);
  const [resume, setResume] = useState<File | null>(null);
  const [location, setLocation] = useState<string>("");
  const [error, setError] = useState<String>("");
  const handleOnboarding = () => {};

  const pickAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) {
      return;
    }
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }
    if (file.size >= 1 * 1024 * 1024) {
      setError("Image must be under 1 MB.");
      return;
    }
    setAvatar(file);
  };

  const pickResume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";

    if (!file) return;

    if (file.type !== "application/pdf") {
      setError("Please choose a PDF file.");
      return;
    }

    if (file.size > 1 * 1024 * 1024) {
      setError("Resume must be under 1 MB.");
      return;
    }
    setResume(file);
  };

  const pickLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
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
            className="flex flex-col items-center justify-center gap-4"
          >
            <div className=" flex flex-col items-center justify-center ">
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
                onChange={pickAvatar}
              />
              <p className="text-xs text-muted-foreground text-center mt-2">
                {avatar ? avatar.name : "Upload Profile Picture"}
              </p>
            </div>
            <div className="flex flex-col items-center w-full">
              <p className="text-muted-foreground text-start w-full">Resume</p>
              <Label
                htmlFor="resume-upload"
                className="w-full border-2 border-dashed px-2 py-3  bg-background text-xs   rounded-md text-muted-foreground border-border hover:border-border-focus "
              >
                <FaFileArrowUp className="size-6" />
                <p className="flex flex-col items-start w-full">
                  {resume ? (
                    <span className="block truncate text-foreground font-medium">
                      {resume.name}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">
                      Click to upload your resume
                    </span>
                  )}
                  <span>PDF only, up to 1 MB.</span>
                </p>
              </Label>
              <Input
                id="resume-upload"
                name="resume"
                hidden
                tabIndex={-1}
                type="file"
                accept=".pdf, application/pdf"
                className="sr-only"
                onChange={pickResume}
              />
            </div>
            <div className="flex flex-col items-center w-full gap-1">
              <p className="text-muted-foreground text-start w-full">
                Preferred Location
              </p>
              <Input
                name="preferredLocation"
                value={location}
                type="text"
                placeholder="eg. Kathmandu, Dhangadhi, Remote"
                className="placeholder:text-xs md:placeholder:text-sm"
                onChange={pickLocation}
              />
            </div>
            <div className="flex flex-col items-center w-full gap-1">
              <p className="text-muted-foreground text-start w-full">
                Preferred job types
              </p>
              <div className="flex flex-wrap gap-2 w-full">
                {JOB_TYPES.map((item) => {
                  return (
                    <Button
                      key={item}
                      className="bg-card text-foreground border-border hover:border-primary-light"
                    >
                      {item}
                    </Button>
                  );
                })}
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </section>
  );
}
