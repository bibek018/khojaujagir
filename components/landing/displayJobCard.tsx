import { Job } from "@/app/types/jobs.types";
interface Jobs {
  jobs: Job[];
}
export const DisplayJobCard = ({ jobs }: Jobs) => {
  return <div>
    {jobs.map((item:Job)=>{
        
    })}
  </div>;
};
