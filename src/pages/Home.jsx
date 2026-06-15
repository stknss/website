import HeroSection from '@/components/landing/HeroSection';
import ProcessSection from '@/components/landing/ProcessSection';
import PortfolioSection from '@/components/landing/PortfolioSection';
import ProofSection from '@/components/landing/ProofSection';
import ContactSection from '@/components/landing/ContactSection';

import { Link } from 'react-router-dom';

const navItems = [
['Работы', '/portfolio'],
['Философия', '#philosophy'],
['Процесс', '#process'],
['Специалисты', '/specialists'],
['Контакт', '#contact']];


export default function Home() {
  return (
    <main className="relative overflow-hidden bg-background text-foreground">
      <nav className="fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-10 lg:flex pl-1" aria-label="Навигация по странице">
        {navItems.map(([label, href]) =>
        href.startsWith('#') ?
        <a key={href} href={href} className="origin-center rotate-90 font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground transition hover:text-primary pb-12 pl-4 pt-5">
              {label}
            </a> :

        <Link key={href} to={href} className="origin-center rotate-90 font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground transition hover:text-primary pb-12 pl-4 pt-5">
              {label}
            </Link>

        )}
      </nav>
      <HeroSection />
      <ProcessSection />
      <PortfolioSection />
      <ProofSection />
      <ContactSection />
    </main>);

}