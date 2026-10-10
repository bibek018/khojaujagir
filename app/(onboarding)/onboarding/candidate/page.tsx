"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import icon from "@/app/icon.png";
import { FaCamera, FaFileArrowUp, FaXmark, FaUserTie } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import api from "@/lib/app";
import { OnBoardCandidateResponse } from "@/types/onboarding.types";

const JOB_TYPES = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
  "Freelance",
];

const useFilePreview = (file: File | null) => {
  const [url, setUrl] = useState<string | null>(null);
  useEffect(() => {
    if (!file) {
      setUrl(null);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setUrl(objectUrl);
    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [file]);
  return url;
};

type FieldKey =
  | "avatar"
  | "resume"
  | "preferredLocation"
  | "preferredJobType"
  | "skills";
type Errors = Partial<Record<FieldKey, string>>;

export default function CandidateOnboarding() {
  const [avatar, setAvatar] = useState<File | null>(null);
  const [resume, setResume] = useState<File | null>(null);
  const [preferredLocation, setPeferredLocation] = useState<string>("");
  const [preferredJobType, setPreferredJobType] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [currSkill, setCurrSkill] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({});
  const avatarPreview = useFilePreview(avatar);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const setError = (key: FieldKey, message: string) =>
    setErrors((prev) => ({ ...prev, [key]: message }));

  const clearError = (key: FieldKey) =>
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });

  const handleOnboarding = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: Errors = {};
    if (!avatar) newErrors.avatar = "Profile picture is required.";
    if (!resume) newErrors.resume = "Resume is required.";
    if (!preferredLocation.trim())
      newErrors.preferredLocation = "Preferred location is required.";
    if (preferredJobType.length === 0)
      newErrors.preferredJobType = "Select at least one job type.";
    if (skills.length === 0) newErrors.skills = "Add at least one skill.";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    const formData = new FormData();

    if (avatar) formData.append("avatar", avatar);
    if (resume) formData.append("resume", resume);
    formData.append(
      "preferredLocation",
      JSON.stringify(preferredLocation.split(",")),
    );
    formData.append("skills", JSON.stringify(skills));
    formData.append("preferredJobType", JSON.stringify(preferredJobType));

    setLoading(true);
    const toastId = toast.loading("Submitting the details");
    try {
      const response = await api.patch<OnBoardCandidateResponse>(
        "profile/v1/onboarding/candidate",
        formData,
      );
      toast.success(response.data.message, {
        id: toastId,
      });
      setUser(response.data.user);
      router.replace("/dashboard");
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
  const pickAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) {
      return;
    }
    if (!file.type.startsWith("image/")) {
      setError("avatar", "Please choose an image file.");
      return;
    }
    if (file.size >= 1 * 1024 * 1024) {
      setError("avatar", "Image must be under 1 MB.");
      return;
    }
    setAvatar(file);
    clearError("avatar");
  };

  const pickResume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";

    if (!file) return;

    if (file.type !== "application/pdf") {
      setError("resume", "Please choose a PDF file.");
      return;
    }

    if (file.size > 1 * 1024 * 1024) {
      setError("resume", "Resume must be under 1 MB.");
      return;
    }
    setResume(file);
    clearError("resume");
  };

  const pickLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPeferredLocation(e.target.value);
    clearError("preferredLocation");
  };

  const toogleJobType = (type: string) => {
    setPreferredJobType((prev) =>
      prev.includes(type)
        ? prev.filter((item) => item !== type)
        : [...prev, type],
    );
    clearError("preferredJobType");
  };

  const addSkill = () => {
    const skill = currSkill.trim();
    if (!skill) return;
    setSkills((prev) =>
      prev.some((item) => item.toLowerCase() === skill.toLowerCase())
        ? prev
        : [...prev, skill],
    );
    setCurrSkill("");
    clearError("skills");
  };
  const removeSkill = (type: string) => {
    setSkills((prev) => prev.filter((e) => e !== type));
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen gap-6">
      <div className="flex flex-row items-center justify-center gap-2 mt-6 md:mt-0">
        <Image
          src={icon}
          alt="icon"
          height={36}
          width={36}
          className="object-contain h-9 w-9 -translate-y-0.5"
        />
        <h2 className="text-primary text-2xl font-extrabold">खोजौ JAGIR</h2>
      </div>
      <Card className="max-w-[90%] md:min-w-lg">
        <CardHeader>
          <CardTitle>Complete Your Profile</CardTitle>
          <CardDescription>
            Tell us a bit about yourself so we can find right oppurtunities. All
            fields are required.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id="candidate-onboarding"
            onSubmit={handleOnboarding}
            className="flex flex-col items-center justify-center gap-4"
          >
            <div className=" flex flex-col items-center justify-center ">
              <Label
                htmlFor="avatar-upload"
                className="text-sm relative size-24 rounded-full overflow-hidden bg-muted text-muted-foreground flex flex-row items-center justify-center border-2 border-dashed border-border-primary  hover:border-primary transition-colors  cursor-pointer focus-within:ring-2 focus-within:ring-ring outline-none"
              >
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="avatar"
                    className="size-full object-cover"
                  />
                ) : (
                  <>
                    <FaUserTie className="size-10 " />
                    <span className="absolute bottom-0 inset-x-0 bg-primary text-primary-foreground py-1 flex justify-center ">
                      <FaCamera className="size-3.5" />
                    </span>
                  </>
                )}
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
              {errors.avatar && (
                <p className="text-destructive text-xs md:text-sm ">
                  {errors.avatar}
                </p>
              )}
            </div>
            <div className="flex flex-col items-center w-full">
              <p className=" text-start w-full">Resume</p>
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
              {errors.resume && (
                <p className="text-destructive text-xs md:text-sm text-start w-full mt-1 ml-2">
                  {errors.resume}
                </p>
              )}
            </div>
            <div className="flex flex-col items-center w-full gap-1">
              <p className=" text-start w-full">Preferred Location</p>
              <Input
                name="preferredLocation"
                value={preferredLocation}
                type="text"
                placeholder="eg. Kathmandu, Dhangadhi, Remote"
                className="placeholder:text-xs md:placeholder:text-sm"
                onChange={pickLocation}
              />
              {errors.preferredLocation && (
                <p className="text-destructive text-xs md:text-sm text-start w-full mt-1 ml-2">
                  {errors.preferredLocation}
                </p>
              )}
            </div>
            <div className="flex flex-col items-center w-full gap-1">
              <p className=" text-start w-full">Preferred job types</p>
              <div className="flex flex-wrap gap-2 w-full">
                {JOB_TYPES.map((type) => {
                  const selected = preferredJobType.includes(type);
                  return (
                    <Button
                      key={type}
                      type="button"
                      onClick={() => toogleJobType(type)}
                      className={`rounded-full border px-3 py-1.5 text-sm transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                        selected
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-card text-foreground border-border hover:border-primary-light"
                      }`}
                    >
                      {type}
                    </Button>
                  );
                })}
              </div>
              {errors.preferredJobType && (
                <p className="text-destructive text-xs md:text-sm text-start w-full mt-1 ml-2">
                  {errors.preferredJobType}
                </p>
              )}
            </div>

            <div className="flex flex-col items-center w-full gap-1">
              <p className=" text-start w-full">Skills</p>
              <div className="flex flex-row gap-2 items-center w-full justify-start">
                <Input
                  type="text"
                  placeholder="Type a skill and press Enter"
                  className="placeholder:text-xs md:placeholder:text-sm"
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === "Enter") {
                      addSkill();
                    }
                  }}
                  name="skill"
                  value={currSkill}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setCurrSkill(e.target.value);
                  }}
                />
                <Button
                  variant="outline"
                  className="border-border-primary text-primary hover:bg-primary-light"
                  onClick={addSkill}
                >
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 w-full ">
                {skills.map((type) => {
                  return (
                    <span
                      key={type}
                      className="border-2  rounded-lg px-2 py-1 bg-card text-card-foreground  border-border hover:hover:border-primary hover:bg-card flex flex-row items-center justify-center gap-2 select-none"
                    >
                      {type}
                      <ImCross
                        className="size-2 cursor-pointer"
                        onClick={() => removeSkill(type)}
                      />
                    </span>
                  );
                })}
              </div>
              {errors.skills && (
                <p className="text-destructive text-xs md:text-sm text-start w-full mt-1 ml-2">
                  {errors.skills}
                </p>
              )}
            </div>
          </form>
        </CardContent>
        <CardFooter className="w-full flex flex-row items-center justify-end">
          <Button form="candidate-onboarding" type="submit" disabled={loading}>
            Finish
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
