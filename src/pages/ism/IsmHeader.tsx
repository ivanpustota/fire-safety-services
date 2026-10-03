import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { navLinks } from "./ism.data";

interface IsmHeaderProps {
  scrolled: boolean;
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
  onCallbackOpen: () => void;
  links?: { label: string; href: string }[];
  basePath?: string;
}

function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string, basePath: string) {
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  if (el) {
    e.preventDefault();
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `${basePath}${href}`);
  }
}

export default function IsmHeader({ scrolled, menuOpen, setMenuOpen, onCallbackOpen, links = navLinks, basePath = "/" }: IsmHeaderProps) {
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-[0_2px_20px_rgba(26,95,180,0.1)]" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 lg:px-8 flex items-center justify-between lg:h-20 py-3 lg:py-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-lg bg-[var(--blue)] flex items-center justify-center flex-shrink-0">
            <Icon name="ShieldCheck" size={20} className="text-white" />
          </div>
          <div className="flex flex-col min-w-0">
            <Link to="/">
              <div className="font-display font-extrabold text-base leading-none">
                <span className={scrolled ? "text-[var(--dark)]" : "text-white"}>Пож</span><span className="text-[var(--blue)]">Дозор</span>
              </div>
              <div className={`text-[10px] font-medium tracking-wider uppercase transition-colors ${scrolled ? "text-[var(--blue)]" : "text-blue-300"}`}>
                Мониторинг 24/7
              </div>
            </Link>
            <a href="tel:+74994902201" className={`lg:hidden flex items-center gap-1 text-[12px] font-bold mt-0.5 transition-colors ${scrolled ? "text-[var(--blue)]" : "text-white"}`}>
              <Icon name="Phone" size={12} />
              +7 (499) 490-22-01
            </a>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-4">
          <Link to="/" className={`text-sm font-medium transition-colors whitespace-nowrap ${scrolled ? "text-[var(--dark)] hover:text-[var(--blue)]" : "text-white/90 hover:text-white"}`}>
            Главная
          </Link>
          <Link to="/drone-defense" className={`btn-blink-red px-3 py-1.5 text-sm font-medium transition-colors whitespace-nowrap ${scrolled ? "text-[var(--dark)] hover:text-[var(--blue)]" : "text-white/90 hover:text-white"}`}>
            Защита от БПЛА
          </Link>
          {links.map((l) => (
            <Link key={l.href} to={`${basePath}${l.href}`} onClick={(e) => handleNavClick(e, l.href, basePath)} className={`text-sm font-medium transition-colors whitespace-nowrap ${scrolled ? "text-[var(--dark)] hover:text-[var(--blue)]" : "text-white/90 hover:text-white"}`}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex flex-col items-end gap-1">
          <div className="flex items-center gap-2">
            <button
              onClick={onCallbackOpen}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${scrolled ? "border-[var(--blue)] text-[var(--blue)] hover:bg-[var(--blue-50)]" : "border-white/40 text-white hover:bg-white/10"}`}
            >
              <Icon name="PhoneCall" size={13} />
              Заказать звонок
            </button>
            <a href="#contacts" className="px-3 py-1.5 bg-[var(--blue)] text-white text-xs font-semibold rounded-lg hover:bg-[var(--blue-dark)] transition-colors">
              Подключить
            </a>
          </div>
          <a href="tel:+74994902201" className={`flex items-center gap-1.5 text-xs font-semibold transition-colors ${scrolled ? "text-[var(--blue)]" : "text-white/80"}`}>
            <Icon name="Phone" size={12} />
            +7 (499) 490-22-01
          </a>
        </div>

        <button className={`lg:hidden p-2 transition-colors ${scrolled ? "text-[var(--dark)]" : "text-white"}`} onClick={() => setMenuOpen(!menuOpen)}>
          <Icon name={menuOpen ? "X" : "Menu"} size={24} />
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl">
          <Link to="/" onClick={() => setMenuOpen(false)} className="block px-6 py-3 text-[var(--dark)] font-medium hover:bg-[var(--blue-50)] hover:text-[var(--blue)] transition-colors">
            Главная
          </Link>
          <Link to="/drone-defense" onClick={() => setMenuOpen(false)} className="btn-blink-red block mx-6 my-2 px-4 py-3 text-center text-[var(--dark)] font-medium">
            Защита от БПЛА
          </Link>
          {links.map((l) => (
            <Link
              key={l.href}
              to={`${basePath}${l.href}`}
              onClick={(e) => { handleNavClick(e, l.href, basePath); setMenuOpen(false); }}
              className="block px-6 py-3 text-[var(--dark)] font-medium hover:bg-[var(--blue-50)] hover:text-[var(--blue)] transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <div className="px-6 py-4 border-t border-gray-100">
            <a href="tel:+74994902201" className="block text-[var(--blue)] font-semibold mb-3">+7 (499) 490-22-01</a>
            <a href="#contacts" onClick={() => setMenuOpen(false)} className="block w-full text-center px-4 py-3 bg-[var(--blue)] text-white font-semibold rounded-lg">
              Подключить мониторинг
            </a>
          </div>
        </div>
      )}
    </header>
  );
}