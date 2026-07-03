import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import CompaniesGrid from "@/components/CompaniesGrid";
import RecruitmentAreas from "@/components/RecruitmentAreas";
import BenefitsSection from "@/components/BenefitsSection";
import CEOSection from "@/components/CEOSection";
import CTASection from "@/components/CTASection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <StatsBar />
      <CompaniesGrid />
      <RecruitmentAreas />
      <BenefitsSection />
      <CEOSection />
      <CTASection />
      <ContactSection />
      <Footer />
    </main>
  );
}
