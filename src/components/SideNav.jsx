import { Link } from 'react-router-dom';

const navItems = [
  ['Процесс', '#process'],
  ['Философия', '#philosophy'],
  ['Работы', '/portfolio'],
  ['Специалисты', '/specialists'],
  ['Контакты', '#contact'],
];

const itemClass =
  'vertical-text whitespace-nowrap font-mono text-xs uppercase tracking-[0.24em] text-foreground/60 transition-colors duration-300 hover:text-primary';

export default function SideNav() {
  return (
    <nav
      className="fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-center gap-7 lg:flex"
      aria-label="Навигация по странице"
    >
      <span className="h-10 w-px bg-gradient-to-b from-transparent to-primary/50" aria-hidden="true" />
      {navItems.map(([label, href]) =>
        href.startsWith('#') ? (
          <a key={href} href={href} className={itemClass}>
            {label}
          </a>
        ) : (
          <Link key={href} to={href} className={itemClass}>
            {label}
          </Link>
        )
      )}
      <span className="h-10 w-px bg-gradient-to-t from-transparent to-primary/50" aria-hidden="true" />
    </nav>
  );
}