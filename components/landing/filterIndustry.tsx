import { Button } from "../ui/button";

export const FilterIndustry = () => {
  return (
    <div className="flex w-full flex-wrap gap-1.5 rounded-xl bg-primary-subtle p-1.5 md:max-w-130">
      <Button size="sm" className="bg-primary px-3 text-xs text-white hover:bg-primary-hover">All Tech</Button>
      {['Engineering', 'Product Design', 'Product Management', 'AI & ML', 'Data Science'].map((industry) => (
        <Button key={industry} size="sm" variant="ghost" className="px-3 text-xs text-muted-foreground">{industry}</Button>
      ))}
    </div>
  );
};
