import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Процесс', href: '#process' },
  { label: 'Философия', href: '#philosophy' },
  { label: 'Работы', href: '#portfolio' },
  { label: 'Специалисты', href: '/specialists' },
  { label: 'Контакты', href: '#contact' },
];

export default function Header() {
  const location = useLocation();

  const handleLogoClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link
          to="/"
          onClick={handleLogoClick}
          className="font-display text-xl font-light italic text-foreground transition hover:text-primary"
        >
          Жар-птица
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
      </div>
    </header>
  );
}