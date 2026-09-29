import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

interface InViewObs {
  ref: React.RefObject<HTMLDivElement>;
  inView: boolean;
}

const HERO_IMAGE = "/assets/drone-hero.webp";

export default function IsmDroneDefensePromo({ obs }: { obs: InViewObs }) {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div ref={obs.ref} className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className={`relative rounded-3xl overflow-hidden bg-[#0a1628] ${obs.inView ? "animate-fade-in-up" : "opacity-0"}`}>
          <div className="absolute inset-0">
            <img src={HERO_IMAGE} alt="Активная защита кровли от БПЛА — установка для тушения крыши" className="w-full h-full object-cover opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628] via-[#0a1628]/85 to-[#0a1628]/60" />
          </div>
          <div className="relative z-10 px-6 py-14 sm:px-10 sm:py-16 lg:px-16 lg:py-20 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/15 border border-red-500/40 rounded-full text-red-300 text-xs sm:text-sm font-medium mb-5">
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
              Активная защита от дроновой атаки
            </div>
            <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-white leading-[1.15] mb-5">
              Активная защита кровли от БПЛА и пожара: тушение крыши когда еще не поздно
            </h2>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-8 max-w-2xl">
              Автономная контейнерная установка для тушения крыши подаёт воду в очаг возгорания после падения БПЛА за 3 минуты — без зависимости от электросети и несущих конструкций здания.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              {[
                { icon: "Timer", label: "3 минуты до подачи воды" },
                { icon: "Gauge", label: "Дальность струи до 80 м" },
                { icon: "BatteryCharging", label: "Полная энергонезависимость" },
              ].map((f, i) => (
                <div key={i} className="flex items-center gap-2 text-white/90 text-sm">
                  <Icon name={f.icon} fallback="Check" size={16} className="text-[var(--blue-light)]" />
                  {f.label}
                </div>
              ))}
            </div>
            <Link
              to="/drone-defense"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[var(--blue)] text-white font-bold rounded-xl hover:bg-[var(--blue-dark)] transition-all text-base"
            >
              Подробнее о системе
              <Icon name="ArrowRight" size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}