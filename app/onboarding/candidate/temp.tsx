"use client";
import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, FormEvent, KeyboardEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaCamera, FaFileArrowUp, FaXmark, FaUserTie } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import icon from "@/app/icon.png";

const JOB_TYPES = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
  "Freelance",
];
const MAX_AVATAR_MB = 2;
const MAX_RESUME_MB = 5;
const RESUME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

type FieldKey = "avatar" | "resume" | "location" | "jobTypes" | "skills";
type Errors = Partial<Record<FieldKey, string>>;

export default function CandidateOnboarding() {
  const router = useRouter();
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const resumeInputRef = useRef<HTMLInputElement>(null);

  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [resume, setResume] = useState<File | null>(null);
  const [location, setLocation] = useState("");
  const [jobTypes, setJobTypes] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  // avatar preview (revoke the blob URL when it changes or on unmount)
  useEffect(() => {
    if (!avatar) {
      setAvatarPreview(null);
      return;
    }
    const url = URL.createObjectURL(avatar);
    setAvatarPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [avatar]);

  const setError = (key: FieldKey, message: string) =>
    setErrors((prev) => ({ ...prev, [key]: message }));

  const clearError = (key: FieldKey) =>
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });

  const pickAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/"))
      return setError("avatar", "Please choose an image file.");
    if (file.size > MAX_AVATAR_MB * 1024 * 1024)
      return setError("avatar", `Image must be under ${MAX_AVATAR_MB} MB.`);
    setAvatar(file);
    clearError("avatar");
  };

  const pickResume = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!RESUME_TYPES.includes(file.type))
      return setError("resume", "Resume must be a PDF, DOC or DOCX file.");
    if (file.size > MAX_RESUME_MB * 1024 * 1024)
      return setError("resume", `Resume must be under ${MAX_RESUME_MB} MB.`);
    setResume(file);
    clearError("resume");
  };

  const toggleJobType = (type: string) => {
    setJobTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
    clearError("jobTypes");
  };

  const addSkill = () => {
    const value = skillInput.trim();
    if (!value) return;
    const exists = skills.some((s) => s.toLowerCase() === value.toLowerCase());
    if (!exists) setSkills((prev) => [...prev, value]);
    setSkillInput("");
    clearError("skills");
  };

  const removeSkill = (skill: string) =>
    setSkills((prev) => prev.filter((s) => s !== skill));

  const validate = (): Errors => {
    const e: Errors = {};
    if (!avatar) e.avatar = "Profile picture is required.";
    if (!resume) e.resume = "Resume is required.";
    if (!location.trim()) e.location = "Preferred location is required.";
    if (jobTypes.length === 0) e.jobTypes = "Select at least one job type.";
    if (skills.length === 0) e.skills = "Add at least one skill.";
    return e;
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    if (!avatar || !resume) return; // narrows File | null to File for TypeScript

    const formData = new FormData();
    formData.append("avatar", avatar);
    formData.append("resume", resume);
    formData.append("preferredLocation", location.trim());
    jobTypes.forEach((t) => formData.append("preferredJobTypes", t));
    skills.forEach((s) => formData.append("skills", s));

    setLoading(true);
    try {
      // TODO: your API call goes here, send `formData` as the body.
      // Don't set the Content-Type header yourself; the browser adds
      // multipart/form-data with the correct boundary.
      // On success: refresh the user in your auth state, then
      // router.replace("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen gap-6 py-8">
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

      <Card className="w-[90%] max-w-sm md:max-w-lg bg-card border border-border-light shadow-sm">
        <form onSubmit={submit} noValidate className="flex flex-col gap-6">
          <CardHeader>
            <CardTitle className="text-center md:text-start text-foreground">
              Complete Your Profile
            </CardTitle>
            <CardDescription className="text-center md:text-start text-muted-foreground">
              Tell us a bit about yourself so we can find the right
              opportunities. All fields are required.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-6">
            {/* Avatar */}
            <div className="flex flex-col items-center gap-2">
              <button
                type="button"
                onClick={() => avatarInputRef.current?.click()}
                aria-label="Upload profile picture"
                className="relative size-24 rounded-full overflow-hidden bg-muted text-muted-foreground flex items-center justify-center border-2 border-dashed border-border-primary hover:border-primary transition-colors focus-visible:ring-2 focus-visible:ring-ring outline-none"
              >
                {avatarPreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={avatarPreview}
                    alt="Profile preview"
                    className="size-full object-cover"
                  />
                ) : (
                  <FaUserTie className="size-10" />
                )}
                <span className="absolute bottom-0 inset-x-0 bg-primary text-primary-foreground py-1 flex justify-center">
                  <FaCamera className="size-3.5" />
                </span>
              </button>
              <input
                ref={avatarInputRef}
                type="file"
                accept="image/*"
                onChange={pickAvatar}
                className="sr-only"
                tabIndex={-1}
              />
              <p className="text-sm text-muted-foreground">
                {avatar ? avatar.name : "Upload profile picture"}
              </p>
              {errors.avatar && (
                <p className="text-sm text-destructive">{errors.avatar}</p>
              )}
            </div>

            {/* Resume */}
            <div className="flex flex-col gap-2">
              <Label>Resume</Label>
              <button
                type="button"
                onClick={() => resumeInputRef.current?.click()}
                className={`flex items-center gap-3 rounded-lg border-2 border-dashed p-4 text-left transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  resume
                    ? "border-primary bg-primary-subtle"
                    : "border-border hover:border-primary-light bg-input-soft"
                }`}
              >
                <FaFileArrowUp
                  className={`size-6 shrink-0 ${
                    resume ? "text-primary" : "text-muted-foreground"
                  }`}
                />
                <span className="min-w-0 text-sm">
                  {resume ? (
                    <span className="block truncate text-foreground font-medium">
                      {resume.name}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">
                      Click to upload your resume
                    </span>
                  )}
                  <span className="block text-xs text-muted-foreground">
                    PDF, DOC or DOCX, up to {MAX_RESUME_MB} MB
                  </span>
                </span>
              </button>
              <input
                ref={resumeInputRef}
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={pickResume}
                className="sr-only"
                tabIndex={-1}
              />
              {errors.resume && (
                <p className="text-sm text-destructive">{errors.resume}</p>
              )}
            </div>

            {/* Preferred location */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="location">Preferred location</Label>
              <Input
                id="location"
                value={location}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setLocation(e.target.value);
                  clearError("location");
                }}
                placeholder="e.g. Guwahati, Assam"
                aria-invalid={!!errors.location}
              />
              {errors.location && (
                <p className="text-sm text-destructive">{errors.location}</p>
              )}
            </div>

            {/* Preferred job types */}
            <div className="flex flex-col gap-2">
              <Label>Preferred job types</Label>
              <div className="flex flex-wrap gap-2">
                {JOB_TYPES.map((type) => {
                  const selected = jobTypes.includes(type);
                  return (
                    <button
                      key={type}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => toggleJobType(type)}
                      className={`rounded-full border px-3 py-1.5 text-sm transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                        selected
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-card text-foreground border-border hover:border-primary-light"
                      }`}
                    >
                      {type}
                    </button>
                  );
                })}
              </div>
              {errors.jobTypes && (
                <p className="text-sm text-destructive">{errors.jobTypes}</p>
              )}
            </div>

            {/* Skills */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="skills">Skills</Label>
              <div className="flex gap-2">
                <Input
                  id="skills"
                  value={skillInput}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setSkillInput(e.target.value)
                  }
                  onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === "Enter" || e.key === ",") {
                      e.preventDefault();
                      addSkill();
                    }
                  }}
                  placeholder="Type a skill and press Enter"
                  aria-invalid={!!errors.skills}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={addSkill}
                  className="border-border-primary text-primary hover:bg-primary-soft"
                >
                  Add
                </Button>
              </div>
              {skills.length > 0 && (
                <ul className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-center gap-1.5 rounded-full bg-primary-soft text-secondary-foreground pl-3 pr-2 py-1 text-sm"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        aria-label={`Remove ${skill}`}
                        className="rounded-full p-0.5 hover:bg-primary-muted outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <FaXmark className="size-3" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              {errors.skills && (
                <p className="text-sm text-destructive">{errors.skills}</p>
              )}
            </div>
          </CardContent>

          <CardFooter className="justify-end">
            <Button
              type="submit"
              disabled={loading}
              className="bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active"
            >
              {loading ? "Saving..." : "Finish"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </section>
  );
}
