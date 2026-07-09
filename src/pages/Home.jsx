import HeroSection from '@/components/landing/HeroSection';
import ProcessSection from '@/components/landing/ProcessSection';
import PortfolioSection from '@/components/landing/PortfolioSection';
import ProofSection from '@/components/landing/ProofSection';
import ContactSection from '@/components/landing/ContactSection';

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-background text-foreground">
      <HeroSection />
      <ProcessSection />
      <PortfolioSection />
      <ProofSection />
      <ContactSection />
    </main>
  );
}