import Categories from "@/components/sections/Categories";
import CTA from "@/components/sections/CTA";
import Features from "@/components/sections/Features";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";

export default function Landing() {
  return (
    <div className="min-h-screen min-w-screen">
      <Header />
      <main>
        <Hero />
        <Features />
        <Categories />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
