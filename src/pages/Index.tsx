import { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Icon from "@/components/ui/icon";
import TestimonialsSection from "@/components/TestimonialsSection";
import { testimonials } from "@/pages/ism/ism.data";

const DRONE_DEFENSE_IMAGE = "/assets/drone-hero.webp";

const VkIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.785 16.241s.288-.032.436-.194c.136-.148.132-.427.132-.427s-.02-1.304.587-1.496c.6-.19 1.37 1.261 2.185 1.817.617.42 1.085.328 1.085.328l2.180-.03s1.139-.071.599-.964c-.044-.073-.314-.661-1.618-1.869-1.366-1.265-1.183-1.060.462-3.246.999-1.33 1.399-2.142 1.274-2.490-.12-.332-.854-.244-.854-.244l-2.455.015s-.182-.025-.317.055c-.133.079-.218.264-.218.264s-.387 1.056-.902 1.954c-1.086 1.843-1.52 1.940-1.698 1.826-.413-.267-.31-1.075-.31-1.648 0-1.793.271-2.540-.529-2.733-.266-.065-.46-.107-1.141-.114-.872-.009-1.610.003-2.028.207-.278.135-.493.437-.362.454.162.022.528.099.722.363.25.345.241 1.118.241 1.118s.144 2.112-.335 2.372c-.329.177-.78-.184-1.748-1.836-.496-.859-.870-1.810-.870-1.810s-.072-.177-.203-.272c-.158-.115-.379-.151-.379-.151l-2.333.015s-.35.01-.478.163c-.115.136-.009.418-.009.418s1.826 4.271 3.893 6.423c1.896 1.974 4.047 1.843 4.047 1.843h.975z"/>
  </svg>
);

const HERO_IMAGE = "https://cdn.poehali.dev/projects/031d4dc8-7cba-4766-8fd9-e78f2a02f069/files/bcbeb4b0-58b1-4df4-8045-320330c10235.jpg";
const PANEL_IMAGE = "https://cdn.poehali.dev/projects/031d4dc8-7cba-4766-8fd9-e78f2a02f069/files/505ffc71-e2d6-403c-8cfb-8470c1467b9e.jpg";
const CERT_IMAGE = "https://cdn.poehali.dev/projects/031d4dc8-7cba-4766-8fd9-e78f2a02f069/bucket/0467becb-2d83-4414-8a10-6389014bfee0.png";

const navLinks = [
  { label: "Услуги", href: "#services" },
  { label: "О компании", href: "#about" },
  { label: "Портфолио", href: "#portfolio" },
  { label: "Отзывы", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Контакты", href: "#contacts" },
];

const services = [
  {
    icon: "MonitorCheck",
    title: "Круглосуточная система мониторинга противопожарных систем",
    desc: "Установка оборудования, позволяющего круглосуточно отслеживать и анализировать реальное состояние всех противопожарных систем объекта.",
    details: "Первичный анализ журнала событий приёмно-контрольного прибора проводит искусственный интеллект, помогающий отслеживать реальную ситуацию по всем неисправностям и событиям. На основании этих отчётов наши операторы круглосуточно отслеживают ситуацию на объекте, высылают краткий отчёт ответственным лицам и в случае необходимости имеют возможность оперативно отправить ремонтную бригаду.",
    items: ["Мониторинг 24/7", "Ежедневные AI-отчёты", "Оперативный выезд бригады"],
    price: "от 5 000 ₽/мес",
    image: "https://cdn.poehali.dev/projects/031d4dc8-7cba-4766-8fd9-e78f2a02f069/files/c26f5cd0-b692-4a48-965b-ca797ec2563a.jpg",
    imageAlt: "Оборудование системы мониторинга противопожарных систем",
  },
  {
    icon: "Wrench",
    title: "Техобслуживание",
    desc: "Регулярное техническое обслуживание всех типов систем безопасности. Заключаем договоры ТО с гарантией.",
    details: "Проводим ежеквартальное плановое ТО с полной проверкой работоспособности всех элементов системы. Ведём журнал ТО и предоставляем акты выполненных работ для надзорных органов.",
    items: ["Ежеквартальное ТО", "Аварийный выезд 24/7", "Ведение документации"],
    price: "от 5 000 ₽/квартал",
    image: "https://cdn.poehali.dev/projects/031d4dc8-7cba-4766-8fd9-e78f2a02f069/files/53f0a815-5dc7-44fb-8ad2-87f36a3fef6b.jpg",
    imageAlt: "Инструменты для технического обслуживания систем безопасности",
  },
  {
    icon: "Flame",
    title: "Пожарная сигнализация",
    desc: "Проектирование, монтаж и техническое обслуживание систем пожарной сигнализации любой сложности. Соответствие всем нормам НПБ и ГОСТ.",
    details: "Выполняем полный цикл работ: проектирование, монтаж, пусконаладку и сдачу в эксплуатацию. Работаем с адресными и аналоговыми системами ведущих производителей. Все работы сопровождаются полным пакетом исполнительной документации.",
    items: ["Адресные системы", "Аналоговые системы", "Беспроводные системы"],
    price: "от 16 000 ₽",
    image: "https://cdn.poehali.dev/projects/031d4dc8-7cba-4766-8fd9-e78f2a02f069/bucket/2c594c2e-2da5-47d8-9261-dc46dc8e6f69.png",
    imageAlt: "Прибор пожарной сигнализации Болид Сириус",
  },
  {
    icon: "Shield",
    title: "Охранная сигнализация",
    desc: "Комплексные решения охранной сигнализации для объектов любого масштаба — от квартиры до крупного предприятия.",
    details: "Проектируем и монтируем охранные системы с датчиками движения, разбития стекла, магнитными контактами. Возможна интеграция с GSM-оповещением и пультом централизованной охраны.",
    items: ["GSM-сигнализация", "Периметральная охрана", "Тревожные кнопки"],
    price: "от 15 000 ₽",
    image: "https://cdn.poehali.dev/projects/031d4dc8-7cba-4766-8fd9-e78f2a02f069/files/d7b973d4-4e46-47b2-beaa-6c110f335249.jpg",
    imageAlt: "Панель управления охранной сигнализацией",
  },
  {
    icon: "Camera",
    title: "Видеонаблюдение",
    desc: "Установка систем IP-видеонаблюдения с удалённым доступом. Аналитика, распознавание лиц и хранение записей.",
    details: "Проектируем системы видеонаблюдения с учётом особенностей объекта. Используем камеры высокого разрешения с ИК-подсветкой. Настраиваем удалённый доступ с телефона или компьютера.",
    items: ["IP-камеры", "Облачное хранение", "Мобильный доступ"],
    price: "от 20 000 ₽",
    image: "https://cdn.poehali.dev/projects/031d4dc8-7cba-4766-8fd9-e78f2a02f069/files/4fb3841a-081d-48c0-8900-ab465dc6f598.jpg",
    imageAlt: "IP-камера видеонаблюдения",
  },
  {
    icon: "DoorOpen",
    title: "Контроль доступа",
    desc: "Системы управления доступом — от простых домофонов до биометрических комплексов с интеграцией в СКУД.",
    details: "Устанавливаем системы контроля доступа на основе карт, PIN-кодов и биометрии. Возможна интеграция с системой учёта рабочего времени и охранной сигнализацией.",
    items: ["Биометрия", "Турникеты", "Электромагнитные замки"],
    price: "от 18 000 ₽",
    image: "https://cdn.poehali.dev/projects/031d4dc8-7cba-4766-8fd9-e78f2a02f069/files/a70bb40c-a332-4d76-9ce7-477710ea622c.jpg",
    imageAlt: "Биометрический считыватель системы контроля доступа",
  },
  {
    icon: "Droplets",
    title: "Пожаротушение",
    desc: "Проектирование и монтаж систем автоматического пожаротушения: спринклерных, порошковых, газовых.",
    details: "Разрабатываем проекты и монтируем системы автоматического пожаротушения в соответствии с требованиями СП и ГОСТ. Работаем с объектами любой категории пожарной опасности.",
    items: ["Спринклерные", "Газовые системы", "Порошковые модули"],
    price: "от 50 000 ₽",
    image: "https://cdn.poehali.dev/projects/031d4dc8-7cba-4766-8fd9-e78f2a02f069/files/dd77784e-7c31-4940-988a-27ea39315412.jpg",
    imageAlt: "Спринклерная система автоматического пожаротушения",
  },
];

const stats = [
  { value: "1200+", label: "Объектов сдано" },
  { value: "15", label: "Лет на рынке" },
  { value: "98%", label: "Клиентов довольны" },
  { value: "24/7", label: "Техподдержка" },
];

const portfolio = [
  { title: "ТЦ «Галерея»", type: "Пожарная сигнализация + СОУЭ", year: "2024", area: "12 000 м²" },
  { title: "Офисный комплекс «Башня»", type: "Охранная сигнализация + СКУД", year: "2024", area: "8 500 м²" },
  { title: "Завод «МеталлПром»", type: "Газовое пожаротушение", year: "2023", area: "22 000 м²" },
  { title: "Жилой комплекс «Парковый»", type: "Видеонаблюдение + домофония", year: "2023", area: "15 000 м²" },
  { title: "Гипермаркет «Продуктовый»", type: "Пожарная сигнализация + АПТ", year: "2023", area: "6 200 м²" },
  { title: "Бизнес-центр «Горизонт»", type: "Комплексная безопасность", year: "2022", area: "18 000 м²" },
];

const certificates = [
  { title: "Лицензия МЧС России", num: "Л014-00101-77/00112662", desc: "Монтаж и техническое обслуживание систем пожарной безопасности" },

  { title: "ISO 9001:2015", num: "Сертификат RU-0342", desc: "Система менеджмента качества" },
  { title: "СРО «Безопасность»", num: "Допуск СРО-С-034", desc: "Строительно-монтажные работы" },
];

const faqs = [
  {
    q: "Сколько стоит круглосуточная система мониторинга противопожарных систем?",
    a: "Стоимость подключения зависит от типа и количества противопожарных систем на объекте. В среднем — от 35 000 руб. за первоначальную установку оборудования и от 5 000 руб./мес. за круглосуточный мониторинг с AI-аналитикой. Точную стоимость рассчитываем бесплатно после обследования объекта.",
  },
  {
    q: "Сколько стоит монтаж пожарной сигнализации?",
    a: "Стоимость зависит от площади объекта, типа системы и требований. Для торгового помещения 200 м² — от 80 000 руб. Точную стоимость рассчитываем бесплатно после выезда специалиста.",
  },
  {
    q: "Как долго длится монтаж?",
    a: "Монтаж пожарной сигнализации на объекте до 1000 м² занимает 2–5 рабочих дней. Более крупные объекты — от 1 недели. Сроки фиксируются в договоре.",
  },
  {
    q: "Даёте ли вы гарантию на работы?",
    a: "Да, мы даём гарантию 1 год на все виды работ и оборудование. Гарантийное обслуживание — бесплатно. Дополнительно предлагаем договоры технического обслуживания.",
  },
  {
    q: "Работаете ли вы с юридическими лицами?",
    a: "Да, работаем с ООО, ИП и государственными структурами. Принимаем безналичную оплату, предоставляем полный пакет документов для бухгалтерии.",
  },
  {
    q: "Нужно ли получать разрешения для монтажа?",
    a: "Мы берём на себя согласование проекта с надзорными органами — МЧС, пожарная инспекция. Вам не нужно ни о чём беспокоиться.",
  },
  {
    q: "Есть ли у вас аварийная служба?",
    a: "Да, наша аварийная служба работает круглосуточно 365 дней в году. Время выезда — не более 2 часов по Москве и области.",
  },
];

function useInView(threshold = 0.15) {
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

const SEND_URL = "https://functions.poehali.dev/6dd07b4a-af2f-481a-b26d-adbf5ebe7a0b";

type FormState = "idle" | "loading" | "success" | "error";

async function sendLead(data: { name: string; phone: string; object_type: string; comment: string; source: string }) {
  const res = await fetch(SEND_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Ошибка отправки");
  return res.json();
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [expandedServices, setExpandedServices] = useState<number[]>([]);
  const toggleService = (i: number) => setExpandedServices(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);

  // Form state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [objectType, setObjectType] = useState("");
  const [comment, setComment] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");

  // Callback popup
  const [callbackOpen, setCallbackOpen] = useState(false);
  const [callbackPhone, setCallbackPhone] = useState("");
  const [callbackState, setCallbackState] = useState<FormState>("idle");

  const handleCallback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackPhone.trim()) return;
    setCallbackState("loading");
    try {
      await sendLead({ name: "", phone: callbackPhone, object_type: "", comment: "", source: "Обратный звонок" });
      setCallbackState("success");
      setCallbackPhone("");
    } catch {
      setCallbackState("error");
    }
  };

  const handleSubmit = async (e: React.FormEvent, source = "Форма на сайте") => {
    e.preventDefault();
    if (!phone.trim()) return;
    setFormState("loading");
    try {
      await sendLead({ name, phone, object_type: objectType, comment, source });
      setFormState("success");
      setName(""); setPhone(""); setObjectType(""); setComment("");
    } catch {
      setFormState("error");
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const heroObs = useInView(0.1);
  const servicesObs = useInView(0.05);
  const aboutObs = useInView(0.1);
  const portfolioObs = useInView(0.05);
  const testimonialsObs = useInView(0.05);
  const certsObs = useInView(0.1);
  const faqObs = useInView(0.1);
  const contactsObs = useInView(0.1);

  const { pathname } = useLocation();
  const canonicalUrl = `https://pozhdozor.ru${pathname === "/" ? "" : pathname}`;

  return (
    <div className="min-h-screen bg-white font-body">
      <Helmet>
        <title>Услуги пожарной безопасности: монтаж, ТО, мониторинг | ПожДозор</title>
        <meta
          name="description"
          content="Монтаж, техническое обслуживание и круглосуточный мониторинг пожарной сигнализации, видеонаблюдения и СКУД в Москве. Лицензия МЧС России, выезд инженера — бесплатно."
        />
        <meta
          name="keywords"
          content="монтаж пожарной сигнализации, обслуживание пожарной сигнализации, активная защита кровли от пожара, тушение крыши, активная защита от дроновой атаки, защита кровли от БПЛА"
        />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>
      {/* NAVBAR */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-[0_2px_20px_rgba(26,95,180,0.1)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-8 flex items-center justify-between h-16 md:h-20 py-3 lg:py-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-lg bg-[var(--blue)] flex items-center justify-center flex-shrink-0">
              <Icon name="ShieldCheck" size={20} className="text-white" />
            </div>
            <div className="flex flex-col min-w-0">
              <a href="/">
                <div className="font-display font-extrabold text-base leading-none">
                  <span className={scrolled ? "text-[var(--dark)]" : "text-white"}>Пож</span><span className="text-[var(--blue)]">Дозор</span>
                </div>
                <div className={`text-[10px] font-medium tracking-wider uppercase transition-colors ${scrolled ? "text-[var(--blue)]" : "text-blue-300"}`}>
                  Мониторинг 24/7
                </div>
              </a>
              <a href="tel:+74994902201" className={`lg:hidden flex items-center gap-1 text-[11px] font-semibold mt-0.5 transition-colors ${scrolled ? "text-[var(--blue)]" : "text-white/80"}`}>
                <Icon name="Phone" size={11} />
                +7 (499) 490-22-01
              </a>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-6">
            <a
              href="/"
              className={`nav-link text-sm font-medium transition-colors whitespace-nowrap ${
                scrolled ? "text-[var(--dark)] hover:text-[var(--blue)]" : "text-white/90 hover:text-white"
              }`}
            >
              Главная
            </a>
            <a href="/drone-defense" className="btn-blink-red px-3 py-1.5 text-sm font-semibold whitespace-nowrap">
              Защита от БПЛА
            </a>
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`nav-link text-sm font-medium transition-colors whitespace-nowrap ${
                  scrolled ? "text-[var(--dark)] hover:text-[var(--blue)]" : "text-white/90 hover:text-white"
                }`}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex flex-col items-end gap-1">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCallbackOpen(true)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors btn-cta ${
                  scrolled
                    ? "border-[var(--blue)] text-[var(--blue)] hover:bg-[var(--blue-50)]"
                    : "border-white/40 text-white hover:bg-white/10"
                }`}
              >
                <Icon name="PhoneCall" size={13} />
                Заказать звонок
              </button>
              <a
                href="#contacts"
                className="px-3 py-1.5 bg-[var(--blue)] text-white text-xs font-semibold rounded-lg hover:bg-[var(--blue-dark)] transition-colors"
              >
                Получить расчёт
              </a>
            </div>
            <a
              href="tel:+74994902201"
              className={`flex items-center gap-1.5 text-xs font-semibold transition-colors ${scrolled ? "text-[var(--blue)]" : "text-white/80"}`}
            >
              <Icon name="Phone" size={12} />
              +7 (499) 490-22-01
            </a>
          </div>

          <button
            className={`lg:hidden p-2 transition-colors ${scrolled ? "text-[var(--dark)]" : "text-white"}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl animate-fade-in">
            <a href="/" onClick={() => setMenuOpen(false)} className="block px-6 py-3 text-[var(--dark)] font-medium hover:bg-[var(--blue-50)] hover:text-[var(--blue)] transition-colors">
              Главная
            </a>
            <a href="/drone-defense" onClick={() => setMenuOpen(false)} className="btn-blink-red block mx-6 my-2 px-4 py-3 text-center font-semibold">
              Защита от БПЛА
            </a>
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="block px-6 py-3 text-[var(--dark)] font-medium hover:bg-[var(--blue-50)] hover:text-[var(--blue)] transition-colors"
              >
                {l.label}
              </a>
            ))}
            <div className="px-6 py-4 border-t border-gray-100">
              <a href="tel:+74994902201" className="block text-[var(--blue)] font-semibold mb-3">
                +7 (499) 490-22-01
              </a>
              <a href="#contacts" className="block w-full text-center px-4 py-3 bg-[var(--blue)] text-white font-semibold rounded-lg">
                Получить расчёт
              </a>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center hero-gradient overflow-hidden noise pb-28 pt-16 md:pt-20">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] -translate-y-1/2 translate-x-1/3 rounded-full bg-[var(--blue)] opacity-10 blur-[120px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 pt-24 pb-16">
          <div ref={heroObs.ref} className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className={`inline-flex items-center gap-2 px-4 py-2 bg-[var(--blue)]/20 border border-[var(--blue)]/30 rounded-full text-blue-300 text-sm font-medium mb-6 ${heroObs.inView ? "animate-fade-in-up" : "opacity-0"}`}>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                Лицензированная компания МЧС России
              </div>

              <h1
                className={`font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] mb-6 ${heroObs.inView ? "animate-fade-in-up delay-100" : "opacity-0"}`}
              >
                Круглосуточная система мониторинга{" "}
                <span className="text-[var(--blue-light)]">противопожарных систем</span>
              </h1>

              <p
                className={`text-lg text-blue-200 leading-relaxed mb-8 max-w-lg ${heroObs.inView ? "animate-fade-in-up delay-200" : "opacity-0"}`}
              >
                Круглосуточный мониторинг всех противопожарных систем объекта. Монтаж пожарной, охранной сигнализации, видеонаблюдения, контроля доступа и других противопожарных систем в Москве. Лицензия МЧС России.
              </p>

              <div className={`flex flex-col sm:flex-row gap-4 mb-20 sm:mb-0 ${heroObs.inView ? "animate-fade-in-up delay-300" : "opacity-0"}`}>
                <a
                  href="#contacts"
                  className="px-8 py-4 bg-[var(--blue)] text-white font-bold text-base rounded-xl hover:bg-[var(--blue-light)] transition-all btn-pulse btn-cta flex items-center gap-2 justify-center"
                >
                  <Icon name="Calculator" size={18} />
                  Рассчитать стоимость
                </a>
                <a
                  href="#services"
                  className="px-8 py-4 bg-white/10 border border-white/20 text-white font-semibold text-base rounded-xl hover:bg-white/20 transition-all flex items-center gap-2 justify-center backdrop-blur-sm"
                >
                  <Icon name="ChevronDown" size={18} />
                  Наши услуги
                </a>
              </div>


            </div>

            <div className={`hidden lg:flex flex-col gap-5 ${heroObs.inView ? "animate-scale-in delay-300" : "opacity-0"}`}>
              {[
                { icon: "ShieldCheck", title: "Лицензия МЧС", sub: "Л014-00101-77/00112662" },
                { icon: "Award", title: "Гарантия 1 год", sub: "на все виды работ" },
                { icon: "Clock", title: "Выезд за 2 часа", sub: "по Москве и области" },
                { icon: "Users", title: "40+ специалистов", sub: "сертифицированы" },
              ].map((item) => (
                <div key={item.title} className="flex items-center gap-4 bg-white/8 backdrop-blur-sm border border-white/10 rounded-2xl px-6 py-4">
                  <div className="w-12 h-12 bg-[var(--blue)]/30 border border-[var(--blue-light)]/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon name={item.icon} fallback="Shield" size={22} className="text-[var(--blue-light)]" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-white text-sm">{item.title}</div>
                    <div className="text-blue-300 text-xs">{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 stats-bg py-8">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((s, i) => (
                <div key={i} className="text-center">
                  <div className="font-display font-black text-3xl md:text-4xl text-white mb-1">{s.value}</div>
                  <div className="text-blue-200 text-sm">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20 bg-[var(--gray-light)]">
        <div ref={servicesObs.ref} className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className={`text-center mb-14 ${servicesObs.inView ? "animate-fade-in-up" : "opacity-0"}`}>
            <div className="inline-flex items-center gap-2 text-[var(--blue)] text-sm font-semibold uppercase tracking-wider mb-3">
              <div className="section-divider w-8" />
              Что мы предлагаем
              <div className="section-divider w-8" />
            </div>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-[var(--dark)] mb-4">
              Интеллектуальная безопасность объектов
            </h2>
            <p className="text-[var(--gray)] max-w-xl mx-auto">
              Внедрение современных систем мониторинга и защиты с применением искусственного интеллекта для объектов любой сложности
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => {
              const isOpen = expandedServices.includes(i);
              const svc = s as typeof s & { details?: string; price: string; image: string; imageAlt: string };
              return (
                <div
                  key={i}
                  className={`bg-white rounded-2xl border-2 border-gray-200 card-hover overflow-hidden ${
                    servicesObs.inView ? `animate-fade-in-up delay-${(i % 3) * 100 + 100}` : "opacity-0"
                  }`}
                >
                  <div className="relative h-40 overflow-hidden">
                    <img src={svc.image} alt={svc.imageAlt} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-3 left-3 flex items-center gap-2">
                      <div className="w-8 h-8 bg-[var(--blue)] rounded-lg flex items-center justify-center">
                        <Icon name={s.icon} fallback="Shield" size={16} className="text-white" />
                      </div>
                    </div>
                    <div className="absolute top-3 right-3 bg-[var(--blue)] text-white text-xs font-bold px-2.5 py-1 rounded-full">
                      {svc.price}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display font-bold text-lg sm:text-xl text-[var(--dark)] mb-2">{s.title}</h3>
                    <p className="text-[var(--gray)] text-sm leading-relaxed mb-3">{s.desc}</p>
                    <button
                      onClick={() => toggleService(i)}
                      className="flex items-center gap-1 text-[var(--blue)] text-sm font-semibold mb-3 hover:opacity-80 transition-opacity"
                    >
                      {isOpen ? "Свернуть" : "Подробнее"}
                      <Icon name={isOpen ? "ChevronUp" : "ChevronDown"} size={15} />
                    </button>
                    {isOpen && (
                      <div className="mb-4">
                        {svc.details && (
                          <p className="text-[var(--gray)] text-sm leading-relaxed mb-3 border-l-2 border-[var(--blue)] pl-3">
                            {svc.details}
                          </p>
                        )}
                        <ul className="space-y-1">
                          {s.items.map((item) => (
                            <li key={item} className="flex items-center gap-2 text-sm text-[var(--gray)]">
                              <div className="w-1.5 h-1.5 bg-[var(--blue)] rounded-full flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-3">
                      <a href="#contacts" className="text-[var(--blue)] text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                        Узнать стоимость <Icon name="ArrowRight" size={14} />
                      </a>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ALL SERVICES */}
      <section id="all-services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 text-[var(--blue)] text-sm font-semibold uppercase tracking-wider mb-3">
              <div className="section-divider w-8" />
              Полный спектр работ
              <div className="section-divider w-8" />
            </div>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-[var(--dark)] mb-4">
              Все наши услуги
            </h2>
            <p className="text-[var(--gray)] max-w-xl mx-auto">
              Проектирование, монтаж и техническое обслуживание систем безопасности любой сложности
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "Wrench",
                title: "Техобслуживание",
                desc: "Регулярное техническое обслуживание всех типов систем безопасности. Заключаем договоры ТО с гарантией.",
                items: ["Ежеквартальное ТО", "Аварийный выезд 24/7", "Ведение документации"],
                price: "от 5 000 ₽/квартал",
                image: "https://cdn.poehali.dev/projects/031d4dc8-7cba-4766-8fd9-e78f2a02f069/files/53f0a815-5dc7-44fb-8ad2-87f36a3fef6b.jpg",
              },
              {
                icon: "Flame",
                title: "Пожарная сигнализация",
                desc: "Проектирование, монтаж и техническое обслуживание систем пожарной сигнализации любой сложности. Соответствие всем нормам НПБ и ГОСТ.",
                items: ["Адресные системы", "Аналоговые системы", "Беспроводные системы"],
                price: "от 16 000 ₽",
                image: "https://cdn.poehali.dev/projects/031d4dc8-7cba-4766-8fd9-e78f2a02f069/bucket/2c594c2e-2da5-47d8-9261-dc46dc8e6f69.png",
              },
              {
                icon: "Wind",
                title: "Дымоудаление",
                desc: "Проектирование и монтаж систем дымоудаления и противодымной вентиляции. Обеспечиваем безопасную эвакуацию и соответствие нормам пожарной безопасности.",
                items: ["Системы дымоудаления", "Подпор воздуха", "Противодымные клапаны"],
                price: "от 40 000 ₽",
                image: "https://cdn.poehali.dev/projects/031d4dc8-7cba-4766-8fd9-e78f2a02f069/files/c98ba9a4-0456-4b4c-a573-988d17d5ebdc.jpg",
              },
              {
                icon: "Shield",
                title: "Охранная сигнализация",
                desc: "Комплексные решения охранной сигнализации для объектов любого масштаба — от квартиры до крупного предприятия.",
                items: ["GSM-сигнализация", "Периметральная охрана", "Тревожные кнопки"],
                price: "от 15 000 ₽",
                image: "https://cdn.poehali.dev/projects/031d4dc8-7cba-4766-8fd9-e78f2a02f069/files/d7b973d4-4e46-47b2-beaa-6c110f335249.jpg",
              },
              {
                icon: "Camera",
                title: "Видеонаблюдение",
                desc: "Установка систем IP-видеонаблюдения с удалённым доступом. Аналитика, распознавание лиц и хранение записей.",
                items: ["IP-камеры", "Облачное хранение", "Мобильный доступ"],
                price: "от 20 000 ₽",
                image: "https://cdn.poehali.dev/projects/031d4dc8-7cba-4766-8fd9-e78f2a02f069/files/4fb3841a-081d-48c0-8900-ab465dc6f598.jpg",
              },
              {
                icon: "DoorOpen",
                title: "Контроль доступа",
                desc: "Системы управления доступом — от простых домофонов до биометрических комплексов с интеграцией в СКУД.",
                items: ["Биометрия", "Турникеты", "Электромагнитные замки"],
                price: "от 18 000 ₽",
                image: "https://cdn.poehali.dev/projects/031d4dc8-7cba-4766-8fd9-e78f2a02f069/files/a70bb40c-a332-4d76-9ce7-477710ea622c.jpg",
              },
              {
                icon: "Droplets",
                title: "Пожаротушение",
                desc: "Проектирование и монтаж систем автоматического пожаротушения: спринклерных, порошковых, газовых.",
                items: ["Спринклерные", "Газовые системы", "Порошковые модули"],
                price: "от 50 000 ₽",
                image: "https://cdn.poehali.dev/projects/031d4dc8-7cba-4766-8fd9-e78f2a02f069/files/dd77784e-7c31-4940-988a-27ea39315412.jpg",
              },
            ].map((s, i) => (
              <div key={i} className="bg-[var(--gray-light)] rounded-2xl border-2 border-gray-100 card-hover overflow-hidden">
                <div className="relative h-40 overflow-hidden">
                  <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <div className="w-8 h-8 bg-[var(--blue)] rounded-lg flex items-center justify-center">
                      <Icon name={s.icon} fallback="Shield" size={16} className="text-white" />
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 bg-[var(--blue)] text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    {s.price}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display font-bold text-lg text-[var(--dark)] mb-2">{s.title}</h3>
                  <p className="text-[var(--gray)] text-sm leading-relaxed mb-4">{s.desc}</p>
                  <ul className="space-y-1 mb-4">
                    {s.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-[var(--gray)]">
                        <div className="w-1.5 h-1.5 bg-[var(--blue)] rounded-full flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-3 border-t border-gray-200">
                    <a href="#contacts" className="text-[var(--blue)] text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                      Узнать стоимость <Icon name="ArrowRight" size={14} />
                    </a>
                  </div>
                </div>
              </div>
            ))}

            <div className="bg-[#0a1628] rounded-2xl border-2 border-[var(--blue)]/30 card-hover overflow-hidden">
              <div className="relative h-40 overflow-hidden">
                <img src={DRONE_DEFENSE_IMAGE} alt="Активная защита кровли от БПЛА — тушение пожара на крыше склада" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                    <Icon name="Siren" size={16} className="text-white" />
                  </div>
                </div>
                <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  Новинка
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display font-bold text-lg text-white mb-2">Активная защита кровли от БПЛА</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-4">
                  Автономная установка для тушения пожара на крыше и защиты кровли от последствий дроновой атаки. Подача воды за 3 минуты, дальность струи до 80 метров.
                </p>
                <ul className="space-y-1 mb-4">
                  {["Активная защита от дроновой атаки", "Тушение крыши без электросети", "Дальность струи 60–80 м"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-white/60">
                      <div className="w-1.5 h-1.5 bg-[var(--blue-light)] rounded-full flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="pt-3 border-t border-white/10">
                  <Link to="/drone-defense" className="text-[var(--blue-light)] text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                    Подробнее о системе <Icon name="ArrowRight" size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 bg-white overflow-hidden">
        <div ref={aboutObs.ref} className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div className={`relative ${aboutObs.inView ? "animate-fade-in-left" : "opacity-0"}`}>
              <div className="rounded-2xl overflow-hidden">
                <img src={HERO_IMAGE} alt="Монтаж пожарной сигнализации — специалисты ПожарОхрана за работой" className="w-full h-[480px] object-cover" />
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
                С 2011 года мы занимаемся проектированием, монтажом пожарной сигнализации и техническим обслуживанием систем пожарной и охранной безопасности в Москве. За эти годы мы сдали более 1200 объектов — от небольших офисов до крупных промышленных предприятий.
              </p>
              <p className="text-[var(--gray)] leading-relaxed mb-8">
                Наша команда — это 40+ сертифицированных специалистов с многолетним опытом монтажа и обслуживания противопожарных систем. Работаем строго в соответствии с НПБ, ГОСТ и требованиями МЧС России.
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

              <a
                href="#contacts"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--blue)] text-white font-semibold rounded-xl hover:bg-[var(--blue-dark)] transition-colors"
              >
                Связаться с нами
                <Icon name="ArrowRight" size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-20 bg-[var(--gray-light)]">
        <div ref={portfolioObs.ref} className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className={`text-center mb-14 ${portfolioObs.inView ? "animate-fade-in-up" : "opacity-0"}`}>
            <div className="inline-flex items-center gap-2 text-[var(--blue)] text-sm font-semibold uppercase tracking-wider mb-3">
              <div className="section-divider w-8" />
              Наши работы
              <div className="section-divider w-8" />
            </div>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-[var(--dark)] mb-4">Портфолио</h2>
            <p className="text-[var(--gray)] max-w-xl mx-auto">
              Реализованные объекты — наша лучшая визитная карточка
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolio.map((p, i) => (
              <div
                key={i}
                className={`bg-white rounded-2xl overflow-hidden card-hover border border-gray-100 ${
                  portfolioObs.inView ? `animate-fade-in-up delay-${(i % 3) * 100 + 100}` : "opacity-0"
                }`}
              >
                <div className="h-3 bg-gradient-to-r from-[var(--blue-dark)] to-[var(--blue-light)]" />
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 bg-[var(--blue-50)] rounded-xl flex items-center justify-center">
                      <Icon name="Building2" size={20} className="text-[var(--blue)]" />
                    </div>
                    <span className="text-xs font-semibold text-[var(--blue)] bg-[var(--blue-50)] px-3 py-1 rounded-full">
                      {p.year}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-[var(--dark)] mb-1">{p.title}</h3>
                  <p className="text-[var(--blue)] text-sm font-medium mb-3">{p.type}</p>
                  <div className="flex items-center gap-1 text-[var(--gray)] text-sm">
                    <Icon name="Maximize2" size={14} />
                    {p.area}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection testimonials={testimonials} obs={testimonialsObs} />

      {/* CERTIFICATES */}
      <section id="certificates" className="py-20 bg-white">
        <div ref={certsObs.ref} className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className={`text-center mb-14 ${certsObs.inView ? "animate-fade-in-up" : "opacity-0"}`}>
            <div className="inline-flex items-center gap-2 text-[var(--blue)] text-sm font-semibold uppercase tracking-wider mb-3">
              <div className="section-divider w-8" />
              Документы
              <div className="section-divider w-8" />
            </div>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-[var(--dark)] mb-4">Сертификаты и лицензии</h2>
            <p className="text-[var(--gray)] max-w-xl mx-auto">
              Работаем в полном соответствии с законодательством. Все документы в наличии
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-stretch">
            <div className={`${certsObs.inView ? "animate-fade-in-left" : "opacity-0"}`}>
              <img src={CERT_IMAGE} alt="Лицензии и сертификаты МЧС России компании ПожДозор" className="rounded-2xl w-full h-full object-cover object-top shadow-xl" style={{minHeight: "340px"}} />
            </div>
            <div className="grid grid-cols-1 gap-4 content-start">
              {certificates.map((c, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-4 p-5 bg-[var(--gray-light)] rounded-xl card-hover ${
                    certsObs.inView ? `animate-fade-in-up delay-${i * 100 + 100}` : "opacity-0"
                  }`}
                >
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
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-[var(--dark)] mb-4">
              Часто задаваемые вопросы
            </h2>
            <p className="text-[var(--gray)]">Ответы на популярные вопросы наших клиентов</p>
          </div>

          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div
                key={i}
                className={`bg-white rounded-xl overflow-hidden border border-gray-100 card-hover ${
                  faqObs.inView ? `animate-fade-in-up delay-${i * 50 + 100}` : "opacity-0"
                }`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-display font-semibold text-[var(--dark)] pr-4">{f.q}</span>
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                      openFaq === i ? "bg-[var(--blue)] text-white rotate-45" : "bg-[var(--blue-50)] text-[var(--blue)]"
                    }`}
                  >
                    <Icon name="Plus" size={16} />
                  </div>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-[var(--gray)] leading-relaxed animate-fade-in border-t border-gray-100 pt-4">
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-20 bg-white">
        <div ref={contactsObs.ref} className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className={`text-center mb-14 ${contactsObs.inView ? "animate-fade-in-up" : "opacity-0"}`}>
            <div className="inline-flex items-center gap-2 text-[var(--blue)] text-sm font-semibold uppercase tracking-wider mb-3">
              <div className="section-divider w-8" />
              Связаться
              <div className="section-divider w-8" />
            </div>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-[var(--dark)] mb-4">Контакты</h2>
            <p className="text-[var(--gray)] max-w-xl mx-auto">
              Оставьте заявку и мы перезвоним в течение 15 минут
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-stretch">
            <div className={`${contactsObs.inView ? "animate-fade-in-left" : "opacity-0"}`}>
              <div className="bg-[var(--gray-light)] rounded-2xl p-8 h-full flex flex-col">
                <h3 className="font-display font-bold text-xl text-[var(--dark)] mb-6">Получить бесплатный расчёт</h3>

                {formState === "success" ? (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="CheckCircle" size={32} className="text-green-600" />
                    </div>
                    <div className="font-display font-bold text-xl text-[var(--dark)] mb-2">Заявка отправлена!</div>
                    <p className="text-[var(--gray)] mb-6">Мы перезвоним вам в течение 15 минут</p>
                    <button onClick={() => setFormState("idle")} className="text-[var(--blue)] text-sm font-medium hover:underline">
                      Отправить ещё одну заявку
                    </button>
                  </div>
                ) : (
                  <form className="space-y-4" onSubmit={(e) => handleSubmit(e, "Форма расчёта")}>
                    <div>
                      <label className="block text-sm font-medium text-[var(--dark)] mb-1.5">Ваше имя</label>
                      <input
                        type="text"
                        placeholder="Иван Иванов"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-[var(--dark)] placeholder-gray-400 focus:outline-none focus:border-[var(--blue)] focus:ring-2 focus:ring-[var(--blue)]/10 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--dark)] mb-1.5">Телефон <span className="text-red-500">*</span></label>
                      <input
                        type="tel"
                        placeholder="+7 (___) ___-__-__"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-[var(--dark)] placeholder-gray-400 focus:outline-none focus:border-[var(--blue)] focus:ring-2 focus:ring-[var(--blue)]/10 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--dark)] mb-1.5">Тип объекта</label>
                      <select
                        value={objectType}
                        onChange={(e) => setObjectType(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-[var(--dark)] focus:outline-none focus:border-[var(--blue)] focus:ring-2 focus:ring-[var(--blue)]/10 transition-all"
                      >
                        <option value="">Выберите тип объекта</option>
                        <option>Офис</option>
                        <option>Торговое помещение</option>
                        <option>Склад / производство</option>
                        <option>Жилое здание</option>
                        <option>Другое</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--dark)] mb-1.5">Комментарий</label>
                      <textarea
                        placeholder="Площадь объекта, пожелания..."
                        rows={3}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-[var(--dark)] placeholder-gray-400 focus:outline-none focus:border-[var(--blue)] focus:ring-2 focus:ring-[var(--blue)]/10 transition-all resize-none"
                      />
                    </div>
                    {formState === "error" && (
                      <div className="text-red-500 text-sm text-center">Ошибка отправки. Позвоните нам напрямую.</div>
                    )}
                    <button
                      type="submit"
                      disabled={formState === "loading"}
                      className="w-full py-4 bg-[var(--blue)] text-white font-bold rounded-xl hover:bg-[var(--blue-dark)] transition-colors flex items-center justify-center gap-2 disabled:opacity-60 btn-cta"
                    >
                      {formState === "loading" ? (
                        <><Icon name="Loader" size={18} className="animate-spin" /> Отправляем...</>
                      ) : (
                        <><Icon name="Send" size={18} /> Отправить заявку</>
                      )}
                    </button>
                    <p className="text-xs text-gray-400 text-center">
                      Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
                    </p>
                  </form>
                )}
              </div>
            </div>

            <div className={`flex flex-col gap-4 ${contactsObs.inView ? "animate-fade-in-up delay-200" : "opacity-0"}`}>
              {[
                { icon: "Phone", title: "Телефон", lines: ["+7 (499) 490-22-01"] },
                { icon: "Mail", title: "Email", lines: ["skpb01@mail.ru"] },
                { icon: "MapPin", title: "Адрес", lines: ["г. Москва, ул. 5-я Магистральная,", "дом 12, офис 410"] },
                { icon: "Clock", title: "Режим работы", lines: ["Пн–Пт: 9:00 – 18:00", "Диспетчерская служба: 24/7"] },
                { icon: "Building2", title: "Реквизиты", lines: ["ООО «СПАРК»", "ИНН 7734401111"] },
              ].map((c, i) => (
                <div key={i} className="flex items-start gap-4 p-5 bg-[var(--gray-light)] rounded-xl">
                  <div className="w-12 h-12 bg-[var(--blue)] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon name={c.icon} fallback="Phone" size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-[var(--dark)] mb-1">{c.title}</div>
                    {c.lines.map((l) => (
                      <div key={l} className="text-[var(--gray)] text-sm">{l}</div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="stats-bg rounded-2xl p-6 text-white flex-1 flex flex-col justify-between">
                <div>
                  <div className="font-display font-extrabold text-lg mb-2">Выезд специалиста — бесплатно</div>
                  <p className="text-blue-200 text-sm mb-5">Приедем, осмотрим объект и составим смету без обязательств</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="tel:+74994902201"
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-white text-[var(--blue)] font-bold px-5 py-3 rounded-xl hover:bg-blue-50 transition-colors text-sm"
                  >
                    <Icon name="Phone" size={16} />
                    Позвонить сейчас
                  </a>
                  <button
                    onClick={() => setCallbackOpen(true)}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-white/15 border border-white/30 text-white font-bold px-5 py-3 rounded-xl hover:bg-white/25 transition-colors text-sm"
                  >
                    <Icon name="PhoneCall" size={16} />
                    Заказать звонок
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 rounded-2xl overflow-hidden shadow-lg">
          <a
            href="https://yandex.ru/maps/org/7311320648"
            target="_blank"
            rel="noopener noreferrer"
            className="block relative group"
          >
            <iframe
              src="https://yandex.ru/map-widget/v1/?z=12&ol=biz&oid=7311320648"
              width="100%"
              height="380"
              frameBorder="0"
              allowFullScreen
              className="w-full block pointer-events-none"
              title="Карта проезда"
            />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[var(--blue)] text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-lg flex items-center gap-2 group-hover:bg-[var(--blue-dark)] transition-colors">
              <Icon name="MapPin" size={16} />
              Открыть маршрут на Яндекс Картах
            </div>
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[var(--dark)] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[var(--blue)] flex items-center justify-center">
                  <Icon name="ShieldCheck" size={20} className="text-white" />
                </div>
                <div>
                  <div className="font-display font-extrabold text-base">ПожДозор</div>
                  <div className="text-[10px] text-blue-400 tracking-widest uppercase">Комплексная безопасность</div>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                Профессиональный монтаж и обслуживание систем пожарной и охранной безопасности с 2009 года.
              </p>
            </div>

            <div>
              <div className="font-display font-bold text-sm mb-4 text-gray-300 uppercase tracking-wider">Разделы</div>
              <ul className="space-y-2">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="text-gray-400 text-sm hover:text-[var(--blue-light)] transition-colors">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="font-display font-bold text-sm mb-4 text-gray-300 uppercase tracking-wider">Контакты</div>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <Icon name="Phone" size={14} className="text-[var(--blue-light)]" />
                  +7 (499) 490-22-01
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={14} className="text-[var(--blue-light)]" />
                  skpb01@mail.ru
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="MapPin" size={14} className="text-[var(--blue-light)] mt-0.5" />
                  ул. 5-я Магистральная, д. 12, офис 410
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Building2" size={14} className="text-[var(--blue-light)] mt-0.5" />
                  ООО «СПАРК», ИНН 7734401111
                </li>
                <li className="flex items-center gap-2">
                  <VkIcon size={14} className="text-[var(--blue-light)]" />
                  <a href="https://vk.com/club239578012" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Сообщество ВКонтакте</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="text-gray-500 text-sm">© 2026 ООО «СПАРК», ИНН 7734401111. Все права защищены.</div>
            <div className="flex items-center gap-4 text-xs text-gray-600">
              <a href="/docs/privacy-policy.docx" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors">Политика конфиденциальности</a>
              <a href="/docs/terms-of-use.docx" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors">Условия использования</a>
              <a href="https://webmaster.yandex.ru/siteinfo/?site=https://pozhdozor.ru" target="_blank" rel="noopener noreferrer">
                <img width="88" height="31" alt="ИКС Яндекс" className="rounded-lg" src="https://yandex.ru/cycounter?https://pozhdozor.ru&theme=dark&lang=ru" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating call button */}
      <a
        href="tel:+74994902201"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[var(--blue)] text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-[var(--blue-dark)] transition-colors btn-pulse"
      >
        <Icon name="Phone" size={22} />
      </a>

      {/* Callback popup */}
      {callbackOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => { setCallbackOpen(false); setCallbackState("idle"); setCallbackPhone(""); }}>
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display font-bold text-xl text-[var(--dark)]">Заказать обратный звонок</h3>
              <button onClick={() => { setCallbackOpen(false); setCallbackState("idle"); setCallbackPhone(""); }} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                <Icon name="X" size={16} className="text-gray-500" />
              </button>
            </div>

            {callbackState === "success" ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="CheckCircle" size={32} className="text-green-600" />
                </div>
                <div className="font-display font-bold text-lg text-[var(--dark)] mb-2">Заявка принята!</div>
                <p className="text-[var(--gray)] mb-6">Перезвоним в течение 15 минут</p>
                <button onClick={() => { setCallbackOpen(false); setCallbackState("idle"); }} className="text-[var(--blue)] text-sm font-medium hover:underline">Закрыть</button>
              </div>
            ) : (
              <form onSubmit={handleCallback} className="space-y-4">
                <p className="text-[var(--gray)] text-sm">Оставьте номер телефона — мы перезвоним в течение 15 минут</p>
                <div>
                  <label className="block text-sm font-medium text-[var(--dark)] mb-1.5">Телефон <span className="text-red-500">*</span></label>
                  <input
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    value={callbackPhone}
                    onChange={(e) => setCallbackPhone(e.target.value)}
                    required
                    autoFocus
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[var(--dark)] placeholder-gray-400 focus:outline-none focus:border-[var(--blue)] focus:ring-2 focus:ring-[var(--blue)]/10 transition-all"
                  />
                </div>
                {callbackState === "error" && (
                  <div className="text-red-500 text-sm text-center">Ошибка отправки. Позвоните нам напрямую.</div>
                )}
                <button
                  type="submit"
                  disabled={callbackState === "loading"}
                  className="w-full py-4 bg-[var(--blue)] text-white font-bold rounded-xl hover:bg-[var(--blue-dark)] transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {callbackState === "loading" ? (
                    <><Icon name="Loader" size={18} className="animate-spin" /> Отправляем...</>
                  ) : (
                    <><Icon name="PhoneCall" size={18} /> Перезвоните мне</>
                  )}
                </button>
                <p className="text-xs text-gray-400 text-center">Нажимая кнопку, вы соглашаетесь с обработкой персональных данных</p>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}