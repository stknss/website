import HeroSection from '@/components/landing/HeroSection';
import ProcessSection from '@/components/landing/ProcessSection';
import PortfolioSection from '@/components/landing/PortfolioSection';
import ProofSection from '@/components/landing/ProofSection';
import ContactSection from '@/components/landing/ContactSection';

const navItems = [
['Работы', '#portfolio'],
['Философия', '#philosophy'],
['Процесс', '#process'],
['Контакт', '#contact']];


export default function Home() {
  return (
    <main className="relative overflow-hidden bg-background text-foreground">
      <nav className="fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-10 lg:flex" aria-label="Навигация по странице">
        {navItems.map(([label, href]) =>
        <a key={href} href={href} className="origin-center rotate-90 font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground transition hover:text-primary pb-12 pl-4 pt-8">
            {label}
          </a>
        )}
      </nav>
      <HeroSection />
      <ProcessSection />
      <PortfolioSection />
      <ProofSection />
      <ContactSection />
    </main>);

}