import { NavBar } from "@/components/nav-bar";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <NavBar />
      <main className="flex-grow">
        <Contact />
      </main>
      <Footer />
    </div>
  );
}