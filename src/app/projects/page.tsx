import { NavBar } from "@/components/nav-bar";
import { Projects } from "@/components/sections/projects";
import { BentoGrid } from "@/components/sections/bento-grid";
import { Footer } from "@/components/sections/footer";

export default function ProjectsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <NavBar />
      <main className="flex-grow">
        <Projects />
        <BentoGrid />
      </main>
      <Footer />
    </div>
  );
}