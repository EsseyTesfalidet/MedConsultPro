import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import SymptomChecker from "@/components/symptom-checker";
import HealthInfo from "@/components/health-info";
import ContactSection from "@/components/contact-section";
import MedicalDisclaimer from "@/components/medical-disclaimer";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroSection />
      <SymptomChecker />
      <HealthInfo />
      <ContactSection />
      <MedicalDisclaimer />
      <Footer />
    </div>
  );
}
