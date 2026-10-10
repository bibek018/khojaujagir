"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import icon from "@/app/icon.png";
import { FaCamera, FaBuilding, FaUserTie } from "react-icons/fa6";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import api from "@/lib/app";
import { OnBoardCandidateResponse } from "@/types/onboarding.types";

const COMPANY_SIZES = ["1-10", "11-50", "51-200", "201-500", "500+"];
const MAX_DESCRIPTION = 300;
type FieldKey =
  | "avatar"
  | "companyLogo"
  | "companyName"
  | "companySize"
  | "industry"
  | "description";

type Errors = Partial<Record<FieldKey, string>>;

// object URL for previewing a picked file (revoked when it changes/unmounts)
const useFilePreview = (file: File | null) => {
  const [url, setUrl] = useState<string | null>(null);
  useEffect(() => {
    if (!file) {
      setUrl(null);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);
  return url;
};

export default function EmployerOnboarding() {
  const [avatar, setAvatar] = useState<File | null>(null);
  const [companyLogo, setCompanyLogo] = useState<File | null>(null);
  const [companyName, setCompanyName] = useState<string>("");
  const [companySize, setCompanySize] = useState<string>("");
  const [industry, setIndustry] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState<boolean>(false);
  const avatarPreview = useFilePreview(avatar);
  const logoPreview = useFilePreview(companyLogo);
  const setUser = useAuthStore((state) => state.setUser);

  const router = useRouter();

  const setError = (key: FieldKey, message: string) => {
    setErrors((prev) => {
      return { ...prev, [key]: message };
    });
  };

  const clearError = (key: FieldKey) => {
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  // one picker for both images: pass the setter for the field it fills
  const pickImage =
    (setFile: (file: File) => void, field: FieldKey) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      e.target.value = "";
      if (!file) return;
      if (!file.type.startsWith("image/")) {
        return setError(field, "Please choose an image file.");
      }
      if (file.size > 1 * 1024 * 1024) {
        return setError(field, "Image must be less than 1 MB.");
      }
      setFile(file);
      clearError(field);
    };

  const handleOnboarding = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: Errors = {};
    if (!avatar) newErrors.avatar = "Profile picture is required.";
    if (!companyLogo) newErrors.companyLogo = "Company logo is required.";
    if (!companyName.trim())
      newErrors.companyName = "Company name is required.";
    if (!companySize) newErrors.companySize = "Please select a company size.";
    if (!industry.trim()) newErrors.industry = "Industry is required.";
    if (!description.trim())
      newErrors.description = "Company description is required.";

    // Update state with all found errors
    setErrors(newErrors);

    // Stop if any errors exist
    if (Object.keys(newErrors).length > 0) return;
    if (!avatar || !companyLogo) {
      return;
    }
    const formData = new FormData();
    formData.append("avatar", avatar);
    formData.append("companyLogo", companyLogo);
    formData.append("companyName", companyName.trim());
    formData.append("companySize", companySize);
    formData.append("industry", industry.trim());
    formData.append("description", description.trim());

    // TODO: API call, send `formData` as the body (no manual Content-Type)
    const toastId = toast.loading("Submitting the details...");
    setLoading(true);
    try {
      const response = await api.patch<OnBoardCandidateResponse>(
        "/profile/v1/onboarding/employer",
        formData,
      );
      setErrors({});
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

  return (
    <section className="flex flex-col items-center justify-center min-h-screen gap-6 py-6">
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
      <Card className="w-[90%] min-w-0 max-w-lg">
        <CardHeader>
          <CardTitle>Set Up Your Company</CardTitle>
          <CardDescription>
            Tell us about your company so candidates can get to know you. All
            fields are required.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id="employer-onboarding"
            onSubmit={handleOnboarding}
            className="flex flex-col items-center justify-center gap-4"
          >
            {/* Avatar + company logo, side by side to save height */}
            <div className="flex flex-row items-start justify-center gap-8">
              <div className="flex flex-col items-center">
                <Label
                  htmlFor="avatar-upload"
                  className="relative size-24 rounded-full overflow-hidden bg-muted text-muted-foreground flex flex-row items-center justify-center border-2 border-dashed border-border-primary hover:border-primary transition-colors cursor-pointer"
                >
                  {avatarPreview ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={avatarPreview}
                      alt="Profile preview"
                      className="size-full object-cover"
                    />
                  ) : (
                    <>
                      <FaUserTie className="size-10" />
                      <span className="absolute bottom-0 inset-x-0 bg-primary text-primary-foreground py-1 flex justify-center">
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
                  onChange={pickImage(setAvatar, "avatar")}
                />
                <p className="text-xs text-muted-foreground text-center mt-2 max-w-24 truncate">
                  {avatar ? avatar.name : "Profile Picture"}
                </p>
                {errors.avatar && (
                  <p className="text-xs md:text-sm text-destructive">
                    {errors.avatar}
                  </p>
                )}
              </div>

              <div className="flex flex-col items-center">
                <Label
                  htmlFor="logo-upload"
                  className="relative size-24 rounded-lg overflow-hidden bg-muted text-muted-foreground flex flex-row items-center justify-center border-2 border-dashed border-border-primary hover:border-primary transition-colors cursor-pointer"
                >
                  {logoPreview ? (
                    <img
                      src={logoPreview}
                      alt="Company logo preview"
                      className="size-full object-contain p-1"
                    />
                  ) : (
                    <>
                      <FaBuilding className="size-10" />
                      <span className="absolute bottom-0 inset-x-0 bg-primary text-primary-foreground py-1 flex justify-center">
                        <FaCamera className="size-3.5" />
                      </span>
                    </>
                  )}
                </Label>
                <Input
                  id="logo-upload"
                  name="companyLogo"
                  hidden
                  tabIndex={-1}
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={pickImage(setCompanyLogo, "companyLogo")}
                />
                <p className="text-xs text-muted-foreground text-center mt-2 max-w-24 truncate">
                  {companyLogo ? companyLogo.name : "Company Logo"}
                </p>
                {errors.companyLogo && (
                  <p className="text-xs md:text-sm text-destructive">
                    {errors.companyLogo}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col items-center w-full gap-1">
              <p className="text-start w-full">Company Name</p>
              <Input
                name="companyName"
                value={companyName}
                type="text"
                placeholder="eg. Khojau Technologies, Self-Employed, Private Employer"
                className="text-xs md:text-sm truncate"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setCompanyName(e.target.value);
                  clearError("companyName");
                }}
              />
              {errors.companyName && (
                <p className="text-xs md:text-sm text-destructive w-full text-start mt-1 ml-2">
                  {errors.companyName}
                </p>
              )}
            </div>

            <div className="flex flex-col items-center w-full gap-1">
              <p className="text-start w-full">Company Size</p>
              <div className="flex flex-wrap gap-2 w-full">
                {COMPANY_SIZES.map((size) => {
                  const selected = companySize === size;
                  return (
                    <Button
                      key={size}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => {
                        setCompanySize(size);
                        clearError("companySize");
                      }}
                      className={`rounded-full border px-3 py-1.5 text-sm transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                        selected
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-card text-foreground border-border hover:border-primary-light"
                      }`}
                    >
                      {size}
                    </Button>
                  );
                })}
              </div>
              {errors.companySize && (
                <p className="text-xs md:text-sm text-destructive w-full text-start mt-1 ml-2">
                  {errors.companySize}
                </p>
              )}
            </div>

            <div className="flex flex-col items-center w-full gap-1">
              <p className="text-start w-full">Industry</p>
              <Input
                name="industry"
                value={industry}
                type="text"
                placeholder="eg. Software, Healthcare, Education"
                className="text-xs md:text-sm "
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setIndustry(e.target.value);
                  clearError("industry");
                }}
              />
              {errors.industry && (
                <p className="text-xs md:text-sm text-destructive w-full text-start mt-1 ml-2">
                  {errors.industry}
                </p>
              )}
            </div>

            <div className="flex flex-col items-center w-full gap-1">
              <p className="text-start w-full">Company Description</p>
              <p className="text-xs text-muted-foreground w-full text-end">
                {description.length}/{MAX_DESCRIPTION}
              </p>
              <Textarea
                name="description"
                value={description}
                maxLength={MAX_DESCRIPTION}
                rows={4}
                placeholder="What does your company do? What is it like to work there?"
                className="w-full text-xs md:text-sm resize-none"
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  setDescription(e.target.value);
                  clearError("description");
                }}
              />

              {errors.description && (
                <p className="text-xs md:text-sm text-destructive w-full text-start mt-1 ml-2">
                  {errors.description}
                </p>
              )}
            </div>
          </form>
        </CardContent>
        <CardFooter className="w-full flex flex-row items-center justify-end">
          <Button form="employer-onboarding" type="submit" disabled={loading}>
            Finish
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
