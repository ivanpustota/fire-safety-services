import Icon from "@/components/ui/icon";
import TestimonialsSection from "@/components/TestimonialsSection";
import { MONTAZH_IMAGE, CERT_IMAGE, portfolio, testimonials, certificates, faqs } from "./ism.data";

interface InViewObs {
  ref: React.RefObject<HTMLDivElement>;
  inView: boolean;
}

interface IsmAboutSectionsProps {
  aboutObs: InViewObs;
  portfolioObs: InViewObs;
  testimonialsObs: InViewObs;
  certsObs: InViewObs;
  faqObs: InViewObs;
  openFaq: number | null;
  setOpenFaq: (v: number | null) => void;
}

export default function IsmAboutSections({ aboutObs, portfolioObs, testimonialsObs, certsObs, faqObs, openFaq, setOpenFaq }: IsmAboutSectionsProps) {
  return (
    <>
      {/* О НАС */}
      <section id="about" className="py-20 bg-white overflow-hidden">
        <div ref={aboutObs.ref} className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            <div className={`relative ${aboutObs.inView ? "animate-fade-in-left" : "opacity-0"}`}>
              <div className="rounded-2xl overflow-hidden">
                <img src={MONTAZH_IMAGE} alt="Монтаж пожарной сигнализации — специалисты ПожДозор за работой" className="w-full h-[280px] sm:h-[380px] lg:h-[480px] object-cover" />
              </div>
              <div className="absolute bottom-6 right-6 bg-[var(--blue-dark)] text-white rounded-2xl p-5 shadow-2xl max-w-[200px]">
                <div className="font-display font-black text-3xl mb-1">15</div>
                <div className="text-blue-200 text-sm">лет успешной работы на рынке</div>
              </div>
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-[var(--blue-50)] rounded-2xl -z-10" />
            </div>
            <div className={`${aboutObs.inView ? "animate-fade-in-up delay-200" : "opacity-0"}`}>
              <div className="inline-flex items-center gap-2 text-[var(--blue)] text-sm font-semibold uppercase tracking-wider mb-3">
                <div className="section-divider w-8" />
                О нас
              </div>
              <h2 className="font-display font-extrabold text-3xl md:text-4xl text-[var(--dark)] mb-6">
                Надёжный партнёр в области систем безопасности
              </h2>
              <p className="text-[var(--gray)] leading-relaxed mb-5">
                С 2011 года мы занимаемся проектированием, монтажом и техническим обслуживанием систем пожарной и охранной безопасности в Москве. За эти годы мы сдали более 1200 объектов — от небольших офисов до крупных промышленных предприятий.
              </p>
              <p className="text-[var(--gray)] leading-relaxed mb-8">
                Наша команда — это 40+ сертифицированных специалистов с многолетним опытом. Работаем строго в соответствии с НПБ, ГОСТ и требованиями МЧС России.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: "BadgeCheck", text: "Лицензия МЧС России" },
                  { icon: "Users", text: "40+ специалистов" },
                  { icon: "Clock", text: "Выезд за 2 часа" },
                  { icon: "FileCheck", text: "Проектная документация" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3 p-3 bg-[var(--gray-light)] rounded-xl">
                    <Icon name={item.icon} fallback="Check" size={20} className="text-[var(--blue)] flex-shrink-0" />
                    <span className="text-sm font-medium text-[var(--dark)]">{item.text}</span>
                  </div>
                ))}
              </div>
              <a href="#contacts" className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--blue)] text-white font-semibold rounded-xl hover:bg-[var(--blue-dark)] transition-colors">
                Связаться с нами
                <Icon name="ArrowRight" size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ПОРТФОЛИО */}
      <section id="portfolio" className="py-20 bg-[var(--gray-light)]">
        <div ref={portfolioObs.ref} className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className={`text-center mb-14 ${portfolioObs.inView ? "animate-fade-in-up" : "opacity-0"}`}>
            <div className="inline-flex items-center gap-2 text-[var(--blue)] text-sm font-semibold uppercase tracking-wider mb-3">
              <div className="section-divider w-8" />
              Наши работы
              <div className="section-divider w-8" />
            </div>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-[var(--dark)] mb-4">Портфолио</h2>
            <p className="text-[var(--gray)] max-w-xl mx-auto">Реализованные объекты — наша лучшая визитная карточка</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {portfolio.map((p, i) => (
              <div key={i} className={`bg-white rounded-2xl border border-gray-100 card-hover overflow-hidden ${portfolioObs.inView ? `animate-fade-in-up delay-${(i % 3) * 100 + 100}` : "opacity-0"}`}>
                <div className="relative h-48 overflow-hidden">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="font-display font-bold text-sm text-[var(--dark)] mb-2 leading-snug">{p.title}</h3>
                  <p className="text-[var(--blue)] text-sm font-medium mb-2">{p.type}</p>
                  <div className="flex items-center gap-1.5 text-[var(--gray)] text-xs">
                    <Icon name="MapPin" size={12} />
                    {p.area}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection testimonials={testimonials} obs={testimonialsObs} />

      {/* СЕРТИФИКАТЫ */}
      <section id="certificates" className="py-20 bg-white">
        <div ref={certsObs.ref} className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className={`text-center mb-14 ${certsObs.inView ? "animate-fade-in-up" : "opacity-0"}`}>
            <div className="inline-flex items-center gap-2 text-[var(--blue)] text-sm font-semibold uppercase tracking-wider mb-3">
              <div className="section-divider w-8" />
              Документы
              <div className="section-divider w-8" />
            </div>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-[var(--dark)] mb-4">Сертификаты и лицензии</h2>
            <p className="text-[var(--gray)] max-w-xl mx-auto">Работаем в полном соответствии с законодательством. Все документы в наличии</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-stretch">
            <div className={`${certsObs.inView ? "animate-fade-in-left" : "opacity-0"}`}>
              <img src={CERT_IMAGE} alt="Лицензии и сертификаты МЧС России компании ПожДозор" className="rounded-2xl w-full object-cover object-top shadow-xl" style={{ minHeight: "240px", maxHeight: "400px" }} />
            </div>
            <div className="grid grid-cols-1 gap-4 content-start">
              {certificates.map((c, i) => (
                <div key={i} className={`flex items-start gap-4 p-5 bg-[var(--gray-light)] rounded-xl card-hover ${certsObs.inView ? `animate-fade-in-up delay-${i * 100 + 100}` : "opacity-0"}`}>
                  <div className="w-12 h-12 bg-[var(--blue)] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon name="Award" size={22} className="text-white" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-[var(--dark)] mb-0.5">{c.title}</div>
                    <div className="text-[var(--blue)] text-sm font-semibold mb-1">{c.num}</div>
                    <div className="text-[var(--gray)] text-sm">{c.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-[var(--gray-light)]">
        <div ref={faqObs.ref} className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className={`text-center mb-14 ${faqObs.inView ? "animate-fade-in-up" : "opacity-0"}`}>
            <div className="inline-flex items-center gap-2 text-[var(--blue)] text-sm font-semibold uppercase tracking-wider mb-3">
              <div className="section-divider w-8" />
              FAQ
              <div className="section-divider w-8" />
            </div>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-[var(--dark)] mb-4">Часто задаваемые вопросы</h2>
            <p className="text-[var(--gray)]">Ответы на популярные вопросы наших клиентов</p>
          </div>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div key={i} className={`bg-white rounded-xl overflow-hidden border border-gray-100 card-hover ${faqObs.inView ? `animate-fade-in-up delay-${i * 50 + 100}` : "opacity-0"}`}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left">
                  <span className="font-display font-semibold text-[var(--dark)] pr-4">{f.q}</span>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all ${openFaq === i ? "bg-[var(--blue)] text-white rotate-45" : "bg-[var(--blue-50)] text-[var(--blue)]"}`}>
                    <Icon name="Plus" size={16} />
                  </div>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-[var(--gray)] leading-relaxed border-t border-gray-100 pt-4">{f.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}