import Header from "@/components/landing/header";
import { HeroSection } from "@/components/landing/heroSection";
import { SearchBar } from "@/components/landing/searchBar";
import { Filters } from "@/components/landing/filters";
import { Stats } from "@/components/landing/stats";
import { OpenJobs } from "@/components/landing/openJobs";
import { Footer } from "@/components/landing/footer";
import { Container } from "@/components/landing/container";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 flex-col">
        {/* Hero area */}
        <section className="bg-[#faf9ff] py-8 md:py-12">
          <Container className="flex flex-col items-center gap-6 md:gap-8">
            <HeroSection />
            <SearchBar />
            <Filters />
            <Stats />
          </Container>
        </section>

        {/* Jobs */}
        <section className="py-10 md:py-14">
          <Container>
            <OpenJobs />
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}