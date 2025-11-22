import HeroSection from "@/components/landing/hero-section";

export default function Home() {
  return (
    <main className="flex flex-col w-full bg-black">
      {/* Full-screen hero */}
        <HeroSection />

      {/* More content */}
      <section className="w-full py-32 px-16 bg-black text-white">
        {/* content here */}
      </section>
    </main>
  );
}
