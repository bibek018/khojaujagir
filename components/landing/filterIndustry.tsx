import { Button } from "../ui/button";

export const FilterIndustry = () => {
  return (
    <div className="flex flex-wrap  gap-2 p-2 bg-primary-soft rounded-2xl">
      <Button className="bg-background text-foreground shadow-md hover:text-primary-foreground">
        All Tech
      </Button>
      <Button className="bg-background text-foreground shadow-md hover:text-primary-foreground">
        Engineering
      </Button>
      <Button className="bg-background text-foreground shadow-md hover:text-primary-foreground">
        Product Design
      </Button>
      <Button className="bg-background text-foreground shadow-md hover:text-primary-foreground">
        Product Management
      </Button>
      <Button className="bg-background text-foreground shadow-md hover:text-primary-foreground">
        AI & ML
      </Button>
      <Button className="bg-background text-foreground shadow-md hover:text-primary-foreground">
        Data Science
      </Button>
    </div>
  );
};
