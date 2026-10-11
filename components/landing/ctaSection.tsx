import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import { MoveRight } from "lucide-react";
import { Button } from "../ui/button";
import { UserPlus } from "lucide-react";
import { UserSearch } from "lucide-react";
export const CTASection = () => {
  return (
    <section className="flex flex-col md:flex-row justify-between ">
      <Card className=" bg-secondary flex w-full max-w-sm flex-col gap-4 md:max-w-xl hover:bg-secondary-hover transition-colors">
        <CardHeader className="flex-col w-full gap-4 ">
          <CardTitle className="bg-primary/90 w-fit p-3 flex flex-row justify-center items-center rounded-md">
            <UserPlus className="size-6 text-primary-foreground" />
          </CardTitle>
          <CardDescription className="text-secondary-foreground font-semibold">
            FOR TECH CANDIDATES
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 text-neutral mb-4">
          <h3 className=" font-semibold text-xl md:text-2xl">
            Ready for your next career leap?
          </h3>
          <p>
            Create a verified profile in 2 minutes and let vetted engineering
            leaders and venture-backed founders apply directly to you.
          </p>
          <Button className="mt-8 bg-primary/90 w-fit py-6 px-8 rounded-lg text-primary-foreground ">
            Create Candidate Profile <MoveRight className="text-xl" />
          </Button>
        </CardContent>
      </Card>

      <Card className=" bg-secondary flex w-full max-w-sm flex-col gap-4 md:max-w-xl hover:bg-secondary-hover transition-colors">
        <CardHeader className="flex-col w-full gap-4 ">
          <CardTitle className="bg-tertiary w-fit p-3 flex flex-row justify-center items-center rounded-md hover:bg-tertiary-hover transition-colors">
            <UserPlus className="size-6 text-tertiary-foreground " />
          </CardTitle>
          <CardDescription className="text-tertiary font-semibold">
            FOR HIRING TEAMS
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 text-neutral mb-4">
          <h3 className=" font-semibold text-xl md:text-2xl">
            Hiring senior engineers & designers?
          </h3>
          <p>
            Reach 85,000+ vetted monthly tech visitors. List your role today and
            connect directly with qualified applicants who meet your salary
            parameters.
          </p>
          <Button className="mt-8 bg-primary/90 w-fit py-6 px-8 rounded-lg text-primary-foreground ">
            Post a Role <MoveRight className="text-xl" />
          </Button>
        </CardContent>
      </Card>
    </section>
  );
};
