import { NavBar } from "@/components/nav-bar";
import { About } from "@/components/sections/about";
import { Journey } from "@/components/sections/journey";
import { Footer } from "@/components/sections/footer";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <NavBar />
      <main className="flex-grow">
        <About />
        <Journey />
      </main>
      <Footer />
    </div>
  );
}