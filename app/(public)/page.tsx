import Image from "next/image";
import Header from "../../components/landing/header";
import { HeroSection } from "@/components/landing/heroSection";
import { SearchBar } from "@/components/landing/searchBar";
import { Filters } from "@/components/landing/filters";
import {Stats} from "@/components/landing/stats"
import { OpenJobs } from "@/components/landing/openJobs";
export default function Home() {
  return (
    <div>
      <Header />
      <main className=" p-4 md:p-10 max-w-screen flex flex-col items-center ">
      <HeroSection  />
      <SearchBar/>
      <Filters/>
      <Stats/>
      <OpenJobs/>
      </main>
    </div>
  );
}
