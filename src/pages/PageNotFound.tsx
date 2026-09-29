import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Icon from "@/components/ui/icon";

const PageNotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );

    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);

    const prevTitle = document.title;
    document.title = "Страница не найдена — ПожДозор";

    return () => {
      document.head.removeChild(meta);
      document.title = prevTitle;
    };
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--dark)] px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-xl bg-[var(--blue)] flex items-center justify-center mx-auto mb-6">
          <Icon name="ShieldAlert" size={32} className="text-white" />
        </div>
        <div className="font-display font-black text-7xl text-white mb-3">404</div>
        <h1 className="font-display font-bold text-xl text-white mb-3">Страница не найдена</h1>
        <p className="text-gray-400 mb-8">
          Похоже, эта страница не существует или была перемещена. Вернитесь на главную — там вы найдёте всё о наших услугах мониторинга.
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-[var(--blue)] text-white font-bold rounded-xl hover:bg-[var(--blue-dark)] transition-colors"
        >
          <Icon name="Home" size={18} />
          Вернуться на главную
        </a>
      </div>
    </div>
  );
};

export default PageNotFound;
