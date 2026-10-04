import Header from "../../components/landing/header";
import { HeroSection } from "@/components/landing/heroSection";
import { SearchBar } from "@/components/landing/searchBar";
import { Filters } from "@/components/landing/filters";
import {Stats} from "@/components/landing/stats"
import { OpenJobs } from "@/components/landing/openJobs";
import { TrustSection } from "@/components/landing/trustSection";
import { SiteFooter } from "@/components/landing/siteFooter";
export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="flex max-w-screen flex-col items-center overflow-hidden">
        <HeroSection />
        <SearchBar />
        <Filters />
        <Stats />
        <OpenJobs />
        <TrustSection />
      </main>
      <SiteFooter />
    </div>
  );
}
