import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import Icon from "@/components/ui/icon";
import IsmHeader from "./ism/IsmHeader";
import IsmContactsFooter from "./ism/IsmContactsFooter";
import { FormState } from "./ism/ism.data";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/031d4dc8-7cba-4766-8fd9-e78f2a02f069/bucket/74ad597d-1e4c-406e-88f0-c01abf068a6f.png";
const TOWER_IMAGE = "https://cdn.poehali.dev/projects/031d4dc8-7cba-4766-8fd9-e78f2a02f069/bucket/b5937be9-70fe-4add-8386-88abe9e9aadf.png";

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const advantages = [
  { icon: "BatteryCharging", title: "Полная энергонезависимость", desc: "Дизельный насос работает автономно. Отключение электричества на объекте не остановит систему." },
  { icon: "Building2", title: "Независимость от здания", desc: "Вышки стоят на небольшом расстоянии от стены. Не требуется интеграция в несущие конструкции — можно установить даже на уже эксплуатируемых объектах." },
  { icon: "Target", title: "Высокая эффективность", desc: "Струя 70–80 метров позволяет защищать кровлю большой площади с минимальным количеством вышек." },
  { icon: "Zap", title: "Быстрый старт", desc: "3 минуты до подачи воды — это скорость, которая часто определяет грань между локальным возгоранием и крупной катастрофой." },
];

const specs = [
  { icon: "Container", label: "Контейнер", value: "40 футов", sub: "с насосами и оборудованием" },
  { icon: "Ruler", label: "Труба", value: "Ø 100 мм", sub: "от контейнера к обеим лестницам" },
  { icon: "Building", label: "Высота склада", value: "до 20 м", sub: "типовой расчёт" },
  { icon: "MoveVertical", label: "Высота вышки", value: "22–23 м", sub: "2 шт. на объект" },
  { icon: "Waves", label: "Лафетные стволы", value: "2 шт.", sub: "на площадках вышек" },
  { icon: "Gauge", label: "Дальность струи", value: "60–80 м", sub: "воды и пены на крышу" },
];

const containerContents = [
  "Утеплённая ёмкость с водой (2/3 объёма контейнера)",
  "Мощный пожарный насос с дизельным приводом",
  "Бочки с пенообразователем",
  "Резервная бензиновая мотопомпа",
];

const timeline = [
  { icon: "Siren", title: "Сигнал тревоги", desc: "Система фиксирует возгорание на кровле после падения БПЛА" },
  { icon: "Timer", title: "3 минуты", desc: "Вода подаётся в очаг возгорания через лафетные стволы на вышках" },
  { icon: "Droplets", title: "15 минут автономно", desc: "Запаса воды в контейнере хватает, чтобы сбить первичное пламя" },
  { icon: "Repeat", title: "Пополнение", desc: "Патрубки позволяют пополнить запас из гидранта, скважины или водоёма" },
];

const droneFaqs = [
  { q: "Что такое активная защита кровли от пожара?", a: "Это вынесенная за периметр здания система тушения крыши: вышки с лафетными стволами подают воду или пену прямо на кровлю снаружи, не завися от внутренних коммуникаций и несущих конструкций объекта." },
  { q: "Как быстро начинается тушение крыши после сигнала тревоги?", a: "Автономная контейнерная установка подаёт воду в очаг возгорания на крыше в течение 3 минут после сигнала тревоги — этого времени достаточно, чтобы сбить первичное пламя и не допустить распространения огня." },
  { q: "Как работает активная защита от дроновой атаки?", a: "При падении БПЛА на кровлю и возникновении возгорания вышки по периметру здания начинают подачу воды на крышу через лафетные стволы дальностью 60–80 метров, не завися от состояния самого здания и электросети." },
  { q: "Нужно ли электричество для тушения крыши?", a: "Нет. Насос установки работает от дизельного привода, поэтому тушение крыши возможно даже при полном отключении электроэнергии на объекте." },
  { q: "На сколько хватает запаса воды в контейнере?", a: "Запаса воды хватает на 15 минут интенсивного тушения. Для длительной борьбы с огнём предусмотрены патрубки для пополнения из гидранта, скважины или ближайшего водоёма." },
  { q: "Можно ли установить защиту кровли от БПЛА на уже эксплуатируемый объект?", a: "Да. Вышки размещаются на небольшом расстоянии от стены и не требуют интеграции в несущие конструкции здания, поэтому систему можно смонтировать без остановки работы объекта." },
];

export default function DroneDefense() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [callbackOpen, setCallbackOpen] = useState(false);
  const [callbackPhone, setCallbackPhone] = useState("");
  const [callbackState, setCallbackState] = useState<FormState>("idle");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [objectType, setObjectType] = useState("");
  const [comment, setComment] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const heroObs = useInView(0.1);
  const advObs = useInView(0.1);
  const specsObs = useInView(0.1);
  const architectureObs = useInView(0.1);
  const timelineObs = useInView(0.1);
  const faqObs = useInView(0.1);
  const contactsObs = useInView(0.1);

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      <Helmet>
        <title>Активная защита кровли от БПЛА: тушение крыши за 3 минуты | ПожДозор</title>
        <meta
          name="description"
          content="Активная защита кровли от пожара и последствий дроновой атаки. Автономная установка для тушения крыши: подача воды за 3 минуты, дальность струи до 80 метров, без зависимости от электросети."
        />
        <meta
          name="keywords"
          content="активная защита кровли от пожара, тушение крыши, тушение пожара на крыше склада, активная защита от дроновой атаки, защита кровли от БПЛА, пожаротушение при падении беспилотника, автономная установка пожаротушения, контейнерная насосная станция, лафетный ствол пожаротушения, защита склада от дрона, пожарная вышка гидромонитор"
        />
        <link rel="canonical" href="https://pozhdozor.ru/drone-defense" />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="ru_RU" />
        <meta property="og:url" content="https://pozhdozor.ru/drone-defense" />
        <meta property="og:title" content="Активная защита кровли от БПЛА: тушение крыши за 3 минуты | ПожДозор" />
        <meta
          property="og:description"
          content="Активная защита кровли от пожара и последствий дроновой атаки. Тушение крыши за 3 минуты, дальность струи до 80 метров, полная энергонезависимость."
        />
        <meta property="og:image" content={HERO_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Активная защита кровли от БПЛА — установка для тушения крыши" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Активная защита кровли от БПЛА: тушение крыши за 3 минуты | ПожДозор" />
        <meta
          name="twitter:description"
          content="Активная защита кровли от пожара и дроновой атаки. Тушение крыши за 3 минуты, дальность струи до 80 метров."
        />
        <meta name="twitter:image" content={HERO_IMAGE} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Активная защита кровли от пожара и дроновой атаки",
            description:
              "Автономная контейнерная установка для тушения крыши — активная защита кровли от последствий падения БПЛА и возгорания. Подача воды в очаг за 3 минуты, дальность струи 60–80 метров, полная энергонезависимость за счёт дизельного насоса.",
            provider: {
              "@type": "LocalBusiness",
              name: "ПожДозор",
              telephone: "+74994902201",
              email: "skpb01@mail.ru",
              address: {
                "@type": "PostalAddress",
                streetAddress: "ул. 5-я Магистральная, дом 12, офис 410",
                addressLocality: "Москва",
                addressCountry: "RU",
              },
            },
            areaServed: "Москва",
            image: HERO_IMAGE,
            url: "https://pozhdozor.ru/drone-defense",
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: droneFaqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: f.a,
              },
            })),
          })}
        </script>
      </Helmet>

      <IsmHeader
        scrolled={scrolled}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        onCallbackOpen={() => setCallbackOpen(true)}
      />

      {/* ГЕРОЙ */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-[#0a1628] w-full pt-20">
        <div className="absolute inset-0 bg-cover bg-center opacity-35" style={{ backgroundImage: `url(${HERO_IMAGE})` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/70 to-[#0a1628]/40" />
        <div ref={heroObs.ref} className="relative z-10 w-full max-w-5xl mx-auto px-4 lg:px-8 py-16 text-center">
          <div className={`inline-flex items-center gap-2 px-4 py-2 bg-red-500/15 border border-red-500/40 rounded-full text-red-300 text-sm font-medium mb-6 ${heroObs.inView ? "animate-fade-in-up" : "opacity-0"}`}>
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
            Активная защита от дроновой атаки для объектов с угрозой БПЛА
          </div>
          <h1 className={`font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] mb-6 ${heroObs.inView ? "animate-fade-in-up delay-100" : "opacity-0"}`}>
            Активная защита кровли от пожара: <span className="text-[var(--blue-light)]">тушение крыши за 3 минуты</span>
          </h1>
          <p className={`text-base sm:text-lg text-white/85 font-medium leading-relaxed mb-8 max-w-3xl mx-auto ${heroObs.inView ? "animate-fade-in-up delay-200" : "opacity-0"}`}>
            Автономная контейнерная установка для тушения крыши вступает в борьбу с огнём после падения БПЛА в считанные минуты — без зависимости от электросети и несущих конструкций объекта.
          </p>
          <div className={`flex flex-col sm:flex-row gap-3 justify-center ${heroObs.inView ? "animate-fade-in-up delay-300" : "opacity-0"}`}>
            <a href="#contacts" className="px-6 py-3.5 bg-[var(--blue)] text-white font-bold rounded-xl hover:bg-[var(--blue-dark)] transition-all text-center text-base">
              Рассчитать комплектацию
            </a>
            <a href="#how" className="px-6 py-3.5 border border-white/25 text-white font-bold rounded-xl hover:bg-white/10 transition-all text-center text-base">
              Как это работает
            </a>
          </div>
        </div>
      </section>

      {/* СХЕМА С ВЫШКОЙ */}
      <section className="py-20 bg-gray-50">
        <div ref={architectureObs.ref} className="max-w-6xl mx-auto px-4 lg:px-8">
          <div className={`text-center mb-12 ${architectureObs.inView ? "animate-fade-in-up" : "opacity-0"}`}>
            <div className="inline-flex items-center gap-2 text-[var(--blue)] text-sm font-semibold uppercase tracking-wider mb-3">
              <div className="section-divider w-8" />
              Архитектура защиты
              <div className="section-divider w-8" />
            </div>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-[var(--dark)] mb-4">Вышки и лафетные стволы для тушения крыши</h2>
            <p className="text-[var(--gray)] max-w-2xl mx-auto">
              В отличие от традиционных систем, где вода подаётся изнутри здания, мы выносим противопожарную систему наружу — так реализуется активная защита кровли от пожара. По периметру объекта устанавливаются специальные вышки с гидромониторами.
            </p>
          </div>
          <div className={`rounded-2xl overflow-hidden shadow-xl ${architectureObs.inView ? "animate-fade-in-up delay-200" : "opacity-0"}`}>
            <img src={TOWER_IMAGE} alt="Пожарная вышка с лафетным стволом для защиты кровли склада от возгорания" className="w-full h-auto object-cover" />
          </div>
          <div className={`grid sm:grid-cols-2 gap-4 mt-8 ${architectureObs.inView ? "animate-fade-in-up delay-300" : "opacity-0"}`}>
            <div className="flex items-start gap-4 p-5 bg-white rounded-xl border border-gray-100">
              <div className="w-12 h-12 bg-[var(--blue)] rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon name="ArrowUpFromLine" size={22} className="text-white" />
              </div>
              <div>
                <div className="font-display font-bold text-[var(--dark)] mb-1">Лестница на вышке</div>
                <div className="text-[var(--gray)] text-sm">Подъём на верхнюю площадку для ручного управления лафетным стволом</div>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 bg-white rounded-xl border border-gray-100">
              <div className="w-12 h-12 bg-[var(--blue)] rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon name="Sliders" size={22} className="text-white" />
              </div>
              <div>
                <div className="font-display font-bold text-[var(--dark)] mb-1">Гибкость управления</div>
                <div className="text-[var(--gray)] text-sm">Ручное управление с вышки или удалённое — прямо из контейнера, в безопасной зоне</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* КОНТЕЙНЕР */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden">
                <img src={HERO_IMAGE} alt="40-футовый контейнер с насосной установкой для тушения пожара на кровле склада" className="w-full h-[280px] sm:h-[380px] lg:h-[420px] object-cover object-left" />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-[var(--blue-dark)] text-white rounded-2xl p-5 shadow-2xl max-w-[220px] hidden sm:block">
                <div className="font-display font-black text-3xl mb-1">3 мин</div>
                <div className="text-blue-200 text-sm">до подачи воды в очаг возгорания</div>
              </div>
            </div>
            <div>
              <div className="inline-flex items-center gap-2 text-[var(--blue)] text-sm font-semibold uppercase tracking-wider mb-3">
                <div className="section-divider w-8" />
                Автономность и мощность
              </div>
              <h2 className="font-display font-extrabold text-3xl md:text-4xl text-[var(--dark)] mb-6">
                Полноценная насосная станция в одном контейнере
              </h2>
              <p className="text-[var(--gray)] leading-relaxed mb-6">
                Сердце системы — стандартный 40-футовый морской контейнер. Это не просто склад оборудования, а полноценная насосная станция, готовая к немедленному запуску. Контейнер размещается на площадке рядом со зданием — от него к периметру объекта прокладывается магистраль диаметром 100 мм.
              </p>
              <div className="flex flex-col gap-3">
                {containerContents.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-[var(--blue-50)] rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="Check" size={14} className="text-[var(--blue)]" />
                    </div>
                    <span className="text-[var(--dark)] text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ХАРАКТЕРИСТИКИ */}
      <section className="py-20 bg-[#0a1628]">
        <div ref={specsObs.ref} className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className={`text-center mb-14 ${specsObs.inView ? "animate-fade-in-up" : "opacity-0"}`}>
            <div className="inline-flex items-center gap-2 text-[var(--blue-light)] text-sm font-semibold uppercase tracking-wider mb-3">
              <div className="section-divider w-8" />
              Технические параметры
              <div className="section-divider w-8" />
            </div>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white mb-4">Комплектация установки</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {specs.map((s, i) => (
              <div key={i} className={`flex items-start gap-4 bg-white/8 backdrop-blur-sm border border-white/10 rounded-2xl px-5 py-5 ${specsObs.inView ? `animate-fade-in-up delay-${i * 100}` : "opacity-0"}`}>
                <div className="w-11 h-11 bg-[var(--blue)]/30 border border-[var(--blue-light)]/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon name={s.icon} fallback="Wrench" size={20} className="text-[var(--blue-light)]" />
                </div>
                <div>
                  <div className="text-blue-300 text-xs mb-0.5">{s.label}</div>
                  <div className="font-display font-bold text-white text-lg leading-tight">{s.value}</div>
                  <div className="text-white/50 text-xs mt-0.5">{s.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* СКОРОСТЬ РЕАКЦИИ */}
      <section id="how" className="py-20 bg-gray-50">
        <div ref={timelineObs.ref} className="max-w-5xl mx-auto px-4 lg:px-8">
          <div className={`text-center mb-14 ${timelineObs.inView ? "animate-fade-in-up" : "opacity-0"}`}>
            <div className="inline-flex items-center gap-2 text-[var(--blue)] text-sm font-semibold uppercase tracking-wider mb-3">
              <div className="section-divider w-8" />
              Скорость реакции
              <div className="section-divider w-8" />
            </div>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-[#0a1628] mb-4">3 минуты на спасение</h2>
            <p className="text-gray-700 max-w-2xl mx-auto text-base md:text-lg font-medium">
              Время — критический фактор при пожаре. Наша система обеспечивает подачу воды в очаг возгорания на крыше в течение 3 минут после сигнала тревоги.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {timeline.map((t, i) => (
              <div key={i} className={`flex flex-col items-center text-center gap-3 ${timelineObs.inView ? `animate-fade-in-up delay-${i * 100}` : "opacity-0"}`}>
                <div className="w-14 h-14 rounded-2xl bg-[#0d3d73] flex items-center justify-center shadow-md">
                  <Icon name={t.icon} fallback="Circle" size={22} className="text-white" />
                </div>
                <div>
                  <div className="font-display font-bold text-[#0a1628] text-sm mb-1">{t.title}</div>
                  <div className="text-gray-600 text-xs leading-relaxed">{t.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ПРЕИМУЩЕСТВА */}
      <section className="py-20 bg-white">
        <div ref={advObs.ref} className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className={`text-center mb-14 ${advObs.inView ? "animate-fade-in-up" : "opacity-0"}`}>
            <div className="inline-flex items-center gap-2 text-[var(--blue)] text-sm font-semibold uppercase tracking-wider mb-3">
              <div className="section-divider w-8" />
              Преимущества
              <div className="section-divider w-8" />
            </div>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-[var(--dark)] mb-4">Главные преимущества системы</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {advantages.map((a, i) => (
              <div key={i} className={`flex items-start gap-4 p-6 bg-[var(--gray-light)] rounded-2xl card-hover ${advObs.inView ? `animate-fade-in-up delay-${i * 100}` : "opacity-0"}`}>
                <div className="w-12 h-12 bg-[var(--blue)] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon name={a.icon} fallback="ShieldCheck" size={22} className="text-white" />
                </div>
                <div>
                  <div className="font-display font-bold text-[var(--dark)] mb-1.5">{a.title}</div>
                  <p className="text-[var(--gray)] text-sm leading-relaxed">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-gray-50">
        <div ref={faqObs.ref} className="max-w-3xl mx-auto px-4 lg:px-8">
          <div className={`text-center mb-14 ${faqObs.inView ? "animate-fade-in-up" : "opacity-0"}`}>
            <div className="inline-flex items-center gap-2 text-[var(--blue)] text-sm font-semibold uppercase tracking-wider mb-3">
              <div className="section-divider w-8" />
              FAQ
              <div className="section-divider w-8" />
            </div>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-[var(--dark)] mb-4">Вопросы о защите кровли от БПЛА</h2>
            <p className="text-[var(--gray)]">Отвечаем на частые вопросы о тушении крыши и активной защите от дроновой атаки</p>
          </div>
          <div className="space-y-3">
            {droneFaqs.map((f, i) => (
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

      {/* ЗАКЛЮЧЕНИЕ */}
      <section className="py-16 bg-[var(--blue-dark)]">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-display font-extrabold text-2xl md:text-3xl text-white mb-4">
            Не роскошь, а необходимость
          </h2>
          <p className="text-blue-100 leading-relaxed mb-8">
            Активная защита крыши от последствий падения БПЛА — это необходимость для современных промышленных объектов. Наша контейнерная установка сочетает в себе мощь, автономность и скорость, предлагая надёжное решение там, где стандартные системы могут оказаться бессильны.
          </p>
          <a href="#contacts" className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-[var(--blue-dark)] font-bold rounded-xl hover:bg-blue-50 transition-colors text-base">
            <Icon name="FileText" size={18} />
            Получить техническую документацию
          </a>
        </div>
      </section>

      <IsmContactsFooter
        contactsObs={contactsObs}
        name={name} setName={setName}
        phone={phone} setPhone={setPhone}
        objectType={objectType} setObjectType={setObjectType}
        comment={comment} setComment={setComment}
        formState={formState} setFormState={setFormState}
        callbackOpen={callbackOpen} setCallbackOpen={setCallbackOpen}
        callbackPhone={callbackPhone} setCallbackPhone={setCallbackPhone}
        callbackState={callbackState} setCallbackState={setCallbackState}
      />
    </div>
  );
}