import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Процесс', href: '#process' },
  { label: 'Работы', href: '#portfolio' },
  { label: 'О нас', href: '/about' },
  { label: 'Специалисты', href: '/specialists' },
  { label: 'Прайс-лист', href: '/pricelist' },
  { label: 'Контакты', href: '#contact' },
];

export default function Header() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogoClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link
          to="/"
          onClick={handleLogoClick}
          className="flex items-center transition hover:text-primary"
        >
          <img
            src="https://media.base44.com/images/public/6a25b90cc69d8cc1446d8488/4b6e67a3a_favicon7-9.png"
            alt="Жар-птица"
            className="h-9 w-9 sm:h-10 sm:w-10 rounded-full object-cover mr-2"
          />
          <span className="font-display text-lg sm:text-xl font-light italic text-foreground">Жар-птица</span>
        </Link>
        <nav className="hidden lg:flex lg:items-center lg:gap-8" aria-label="Главная навигация">
          {navItems.map((item) => {
            const isAnchor = item.href.startsWith('#');
            const to = isAnchor ? `/${item.href}` : item.href;
            return (
              <Link
                key={item.href}
                to={to}
                className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground transition hover:text-primary"
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="lg:hidden inline-flex h-10 items-center gap-2 px-3 text-foreground transition hover:text-primary"
          aria-label="Меню"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          <span className="font-mono text-xs uppercase tracking-[0.18em]">{mobileOpen ? 'Закрыть' : 'Меню'}</span>
        </button>
      </div>
      {mobileOpen && (
        <nav className="lg:hidden border-t border-border bg-background px-6 py-5" aria-label="Мобильная навигация">
          <div className="flex flex-col gap-5">
            {navItems.map((item) => {
              const isAnchor = item.href.startsWith('#');
              const to = isAnchor ? `/${item.href}` : item.href;
              return (
                <Link
                  key={item.href}
                  to={to}
                  onClick={() => setMobileOpen(false)}
                  className="font-mono text-sm uppercase tracking-[0.18em] text-muted-foreground transition hover:text-primary"
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}