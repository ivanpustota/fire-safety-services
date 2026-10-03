import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import Icon from "@/components/ui/icon";
import IsmHeader from "./ism/IsmHeader";
import IsmContactsFooter from "./ism/IsmContactsFooter";
import { FormState } from "./ism/ism.data";

const droneNavLinks = [
  { label: "Как работает", href: "#article" },
  { label: "Видео", href: "#video" },
  { label: "Цена", href: "#price" },
  { label: "FAQ", href: "#faq" },
  { label: "Контакты", href: "#contacts" },
];

const HERO_IMAGE = "/assets/drone-hero.webp";
const HERO_IMAGE_ABSOLUTE = "https://pozhdozor.ru/assets/drone-hero.webp";
const TOWER_IMAGE = "/assets/drone-tower.webp";

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
  { icon: "BatteryCharging", title: "Энергонезависимость", desc: "Насос работает от дизельного привода. Отключение электроснабжения объекта не влияет на работу системы." },
  { icon: "Building2", title: "Независимость от здания", desc: "Вышки устанавливаются на расстоянии от стены без интеграции в несущие конструкции, что допускает монтаж на эксплуатируемых объектах." },
  { icon: "Target", title: "Дальность подачи воды", desc: "Струя воды или пены достигает 70–80 метров, что позволяет защищать кровлю большой площади ограниченным числом вышек." },
  { icon: "Zap", title: "Автоматическая активация", desc: "Система запускается по сигналу тревоги без необходимости присутствия персонала на объекте. Время реакции — от 3 минут, необходимых для запуска двигателя насосной станции и заполнения сухотрубной магистрали водой." },
  { icon: "Layers", title: "Секционные вышки", desc: "Вышки собираются из стандартных секций под необходимую высоту непосредственно на объекте, что упрощает транспортировку и монтаж." },
  { icon: "Thermometer", title: "Всесезонная эксплуатация", desc: "Контейнер теплоизолирован, ёмкость с водой оснащена автоматическим электрическим подогревом — система рассчитана на эксплуатацию при температуре до −40 °C." },
  { icon: "PackageCheck", title: "Модульная поставка", desc: "Контейнер с насосной станцией, вышки или любую другую часть системы можно заказать отдельно от полного комплекта." },
  { icon: "ScanEye", title: "Полностью автоматическая работа", desc: "В топовой комплектации лафетные стволы оснащены датчиками пламени: они самостоятельно обнаруживают возгорание, запускают насосную станцию и направляют струю воды в очаг без участия оператора." },
];

const specs = [
  { icon: "Container", label: "Контейнер", value: "40 футов утеплённый", sub: "с подогреваемой ёмкостью 40 кубов" },
  { icon: "Thermometer", label: "Температура эксплуатации", value: "до −40 °C", sub: "" },
  { icon: "Ruler", label: "Труба", value: "Сухотруб Ø 100 мм", sub: "с переходом на 80 мм, 30 м" },
  { icon: "MoveVertical", label: "Высота вышки", value: "18 м", sub: "сборные секции" },
  { icon: "Waves", label: "Лафетный ствол", value: "ЛС-С60, 1 шт.", sub: "с ручным управлением" },
  { icon: "Gauge", label: "Насосная станция", value: "Гейзер МП-20/100", sub: "на основе пожарной мотопомпы" },
  { icon: "SlidersHorizontal", label: "Управление", value: "Пульт управления", sub: "мотопомпой" },
  { icon: "Lightbulb", label: "Прожектор", value: "Светодиодный мощный", sub: "дальнего действия, монтируется на вышке" },
  { icon: "Banknote", label: "Цена", value: "5 498 000 руб.", sub: "включает монтаж установки на объекте, с НДС" },
];

const containerContents = [
  "Утеплённая ёмкость с водой с автоматическим электрическим подогревом (2/3 объёма контейнера)",
  "Пожарный насос с дизельным приводом",
  "Ёмкости с пенообразователем",
  "Резервная бензиновая мотопомпа",
];

const timeline = [
  { icon: "Siren", title: "Сигнал тревоги", desc: "Система фиксирует возгорание на кровле после падения БПЛА" },
  { icon: "Timer", title: "От 3 минут", desc: "Запуск двигателя насосной станции и заполнение сухотрубной магистрали водой" },
  { icon: "Droplets", title: "Подача воды", desc: "Вода подаётся в очаг возгорания через лафетные стволы на вышках" },
  { icon: "Repeat", title: "15 минут автономно + пополнение", desc: "Запас воды рассчитан на 15 минут работы, далее возможно пополнение из гидранта, скважины или водоёма" },
];

const ARTICLE_IMAGE_CONTAINER = "/assets/drone-container-40.webp";
const CONTAINER_BLOCK_IMAGE = "/assets/drone-container-pump-v2.webp";
const ARTICLE_IMAGE_TOWER = "/assets/drone-architecture.webp";
const ROOF_FIRE_IMAGE = "/assets/drone-roof-fire.webp";
const ARTICLE_IMAGE_CONTROL = "/assets/drone-control.webp";

const droneFaqs = [
  { q: "Что такое активная защита кровли от пожара?", a: "Система пожаротушения, вынесенная за периметр здания: вышки с лафетными стволами подают воду или пену на кровлю снаружи, независимо от внутренних коммуникаций и несущих конструкций объекта." },
  { q: "Как быстро начинается тушение крыши после сигнала тревоги?", a: "Время реакции составляет от 3 минут. Магистраль от контейнера к вышкам выполнена в виде сухотруба и заполняется водой только в момент пожара, поэтому время реакции складывается из запуска двигателя насосной станции и заполнения трубы водой." },
  { q: "Как работает активная защита от дроновой атаки?", a: "При падении БПЛА на кровлю и возникновении возгорания вышки по периметру здания начинают подачу воды через лафетные стволы дальностью 60–80 метров, независимо от состояния здания и электросети." },
  { q: "Нужно ли электричество для тушения крыши?", a: "Нет. Насос установки работает от дизельного привода, поэтому тушение возможно при полном отключении электроэнергии на объекте." },
  { q: "На сколько хватает запаса воды в контейнере?", a: "Запаса воды хватает на 15 минут работы. Для дальнейшего тушения предусмотрены патрубки для пополнения из гидранта, скважины или ближайшего водоёма." },
  { q: "Можно ли установить защиту кровли от БПЛА на уже эксплуатируемый объект?", a: "Да. Вышки размещаются на расстоянии от стены и не требуют интеграции в несущие конструкции здания, поэтому монтаж возможен без остановки работы объекта." },
  { q: "Насосная станция одинаковая для всех объектов?", a: "Нет. Производительность насосной станции подбирается индивидуально в зависимости от площади кровли, высоты вышек и задач конкретного объекта." },
  { q: "Как монтируются вышки под нужную высоту?", a: "Вышки выполнены в виде стандартных секций, которые собираются под необходимую высоту непосредственно на объекте, что упрощает доставку и монтаж." },
  { q: "Сколько занимает монтаж системы под ключ?", a: "Срок монтажа под ключ составляет от одного до двух месяцев в зависимости от комплектации всей противопожарной системы." },
  { q: "Можно ли заказать только часть системы, например контейнер с насосной станцией?", a: "Да. Контейнер с насосной станцией, вышки с лафетными стволами или любую другую часть системы можно заказать отдельно от полного комплекта." },
  { q: "Работает ли система при сильном морозе?", a: "Да. Контейнер теплоизолирован, а ёмкость с водой оснащена автоматическим электрическим подогревом, поэтому система рассчитана на эксплуатацию при температуре до −40 °C." },
  { q: "Можно ли сделать систему полностью автоматической, без участия оператора?", a: "Да. В топовой комплектации лафетные стволы оснащаются датчиками пламени, которые самостоятельно определяют возгорание, запускают насосную станцию и направляют струю воды в очаг без участия оператора." },
];

const articleSections = [
  {
    title: "Насосная станция в контейнере",
    image: ARTICLE_IMAGE_CONTAINER,
    imageAlt: "Схема: 40-футовый контейнер с насосной установкой и вышки с лафетными стволами на складе",
    imageFull: true,
    paragraphs: [
      "Основа системы — стандартный 40-футовый морской контейнер, оборудованный под насосную станцию.",
    ],
    list: {
      title: "Компоновка установки:",
      items: [
        "Ёмкость для воды занимает около двух третей объёма контейнера и обеспечивает запас для начала тушения без подключения к внешним источникам.",
        "Оставшийся объём отведён под пожарный насос с дизельным или бензиновым приводом, что обеспечивает работу системы независимо от электроснабжения объекта.",
        "Контейнер устанавливается на площадке рядом со зданием; от него к периметру объекта прокладывается магистраль диаметром 100 мм.",
        "Контейнер теплоизолирован, а ёмкость с водой оснащена автоматическим электрическим подогревом, что обеспечивает работу системы при температуре до −40 °C.",
      ],
    },
  },
  {
    title: "Архитектура защиты: вышки и лафетные стволы",
    image: ARTICLE_IMAGE_TOWER,
    imageAlt: "Вышки с лафетными стволами по периметру склада тушат пожар на кровле",
    imageFull: true,
    paragraphs: [
      "В отличие от систем, где вода подаётся изнутри здания, в данной установке подача организована снаружи. По периметру здания размещаются вышки с лафетными стволами.",
    ],
    list: {
      title: "Что внутри вышки?",
      items: [
        "Лестница для подъёма на верхнюю площадку, РД (разветвление) — для подключения двух дополнительных рукавов.",
        "Лафетный ствол (гидромонитор) с дистанционным управлением и дальностью подачи воды 70–80 метров.",
      ],
    },
    footer: "Вышки выполнены в виде стандартных секций, которые собираются под необходимую высоту непосредственно на объекте. Высота вышек рассчитывается индивидуально и превышает высоту кровли здания на 2 метра. Расположение вышек не зависит от состояния несущих конструкций здания и сохраняет работоспособность даже при повреждении кровли или внутренних коммуникаций.",
  },
  {
    title: "Время реакции",
    paragraphs: [
      "Магистраль от контейнера к вышкам выполнена в виде сухотруба — трубы, которая в обычное время остаётся пустой и заполняется водой только в момент пожара. Время реакции системы составляет от 3 минут: это время необходимо для запуска двигателя насосной станции и заполнения сухотрубной магистрали водой, после чего вода подаётся в очаг возгорания через лафетные стволы на вышках.",
    ],
    list: {
      title: "Ресурс и пополнение:",
      items: [
        "Запас воды в контейнере рассчитан на 15 минут работы, что позволяет ограничить распространение возгорания до прибытия пожарных подразделений.",
        "Для дальнейшего тушения предусмотрены патрубки — систему можно пополнить из ближайшего водоёма, скважины или городского гидранта.",
        "Производительность насосной станции подбирается индивидуально в зависимости от площади кровли и задач объекта.",
      ],
    },
  },
  {
    title: "Управление лафетными стволами",
    image: ARTICLE_IMAGE_CONTROL,
    imageAlt: "Оператор управляет лафетными стволами удалённо из контейнера, в безопасной зоне",
    paragraphs: [
      "Предусмотрены комплектации с ручным управлением лафетными стволами с вышек и с удалённым управлением из контейнера. Удалённое управление позволяет оператору находиться вне зоны воздействия открытого огня.",
      "В топовой комплектации лафетные стволы оснащаются датчиками пламени. Датчики самостоятельно определяют возгорание на кровле, автоматически запускают насосную станцию и направляют струю воды в очаг возгорания без участия оператора.",
    ],
  },
  {
    title: "Сроки монтажа и поставка по частям",
    paragraphs: [
      "Срок монтажа системы под ключ составляет от одного до двух месяцев и зависит от комплектации всей противопожарной системы объекта.",
      "Контейнер с насосной станцией, вышки с лафетными стволами или любую другую часть системы можно заказать отдельно от полного комплекта — например, для поэтапного оснащения объекта или расширения уже установленной системы.",
    ],
  },
  {
    title: "Главные преимущества системы",
    list: {
      items: [
        "Энергонезависимость. Насос работает от дизельного привода и не зависит от электроснабжения объекта.",
        "Независимость от здания. Вышки устанавливаются на расстоянии от стены без интеграции в несущие конструкции, что допускает монтаж на эксплуатируемых объектах.",
        "Дальность подачи воды 70–80 метров позволяет защищать кровлю большой площади ограниченным числом вышек.",
        "Автоматическая активация системы по сигналу тревоги; время реакции — от 3 минут на запуск насосной станции и заполнение сухотрубной магистрали водой.",
        "Производительность насосной станции подбирается индивидуально в зависимости от задач объекта.",
        "Секционная конструкция вышек позволяет собирать их под нужную высоту прямо на объекте.",
        "Всесезонная эксплуатация: теплоизоляция контейнера и электрический подогрев ёмкости с водой обеспечивают работу системы при температуре до −40 °C.",
        "Модульная поставка: контейнер с насосной станцией или любую часть системы можно заказать отдельно.",
        "Полностью автоматическая работа в топовой комплектации: лафетные стволы с датчиками пламени сами определяют возгорание, запускают насосную станцию и направляют струю воды в очаг без участия оператора.",
      ],
    },
  },
  {
    title: "Заключение",
    paragraphs: [
      "Активная защита кровли от последствий падения БПЛА дополняет существующие системы пожарной безопасности объекта. Контейнерная установка обеспечивает подачу воды на кровлю независимо от состояния инженерных систем здания и электроснабжения.",
      "Для расчёта комплектации под конкретный объект и получения технической документации обращайтесь по указанным контактам.",
    ],
  },
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
  const articleObs = useInView(0.1);
  const advObs = useInView(0.1);
  const specsObs = useInView(0.1);
  const architectureObs = useInView(0.1);
  const timelineObs = useInView(0.1);
  const faqObs = useInView(0.1);
  const contactsObs = useInView(0.1);

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      <Helmet>
        <title>Активная защита кровли от БПЛА | ПожДозор</title>
        <meta
          name="description"
          content="Активная защита кровли от пожара и последствий падения БПЛА. Автономная контейнерная установка пожаротушения: дальность струи до 80 метров, независимость от электросети объекта."
        />
        <meta
          name="keywords"
          content="активная защита кровли от пожара, тушение крыши, тушение пожара на крыше склада, активная защита от дроновой атаки, защита кровли от БПЛА, пожаротушение при падении беспилотника, автономная установка пожаротушения, контейнерная насосная станция, лафетный ствол пожаротушения, защита склада от дрона, пожарная вышка гидромонитор"
        />
        <link rel="canonical" href="https://pozhdozor.ru/drone-defense" />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="ru_RU" />
        <meta property="og:url" content="https://pozhdozor.ru/drone-defense" />
        <meta property="og:title" content="Активная защита кровли от БПЛА | ПожДозор" />
        <meta
          property="og:description"
          content="Активная защита кровли от пожара и последствий падения БПЛА. Дальность струи до 80 метров, полная энергонезависимость."
        />
        <meta property="og:image" content={HERO_IMAGE_ABSOLUTE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Активная защита кровли от БПЛА — установка для тушения крыши" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Активная защита кровли от БПЛА | ПожДозор" />
        <meta
          name="twitter:description"
          content="Активная защита кровли от пожара и последствий падения БПЛА. Дальность струи до 80 метров."
        />
        <meta name="twitter:image" content={HERO_IMAGE_ABSOLUTE} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Активная защита кровли от пожара и дроновой атаки",
            description:
              "Автономная контейнерная установка для тушения кровли — активная защита от последствий падения БПЛА и возгорания. Дальность струи 60–80 метров, независимость от электроснабжения объекта за счёт дизельного насоса.",
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
            image: HERO_IMAGE_ABSOLUTE,
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
        links={droneNavLinks}
        basePath="/drone-defense"
      />

      {/* ГЕРОЙ */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-[#0a1628] w-full pt-20">
        <div className="absolute inset-0 bg-cover bg-center opacity-35" style={{ backgroundImage: `url(${HERO_IMAGE})` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/70 to-[#0a1628]/40" />
        <div ref={heroObs.ref} className="relative z-10 w-full max-w-5xl mx-auto px-4 lg:px-8 py-16 text-center">
          <div className={`inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white/80 text-sm font-medium mb-6 ${heroObs.inView ? "animate-fade-in-up" : "opacity-0"}`}>
            <div className="w-2 h-2 bg-blue-400 rounded-full" />
            Активная защита кровли для объектов с угрозой БПЛА
          </div>
          <h1 className={`font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] mb-6 ${heroObs.inView ? "animate-fade-in-up delay-100" : "opacity-0"}`}>
            Активная защита кровли от пожара, вызванного падением БПЛА
          </h1>
          <p className={`text-base sm:text-lg text-white/85 font-medium leading-relaxed mb-8 max-w-3xl mx-auto ${heroObs.inView ? "animate-fade-in-up delay-200" : "opacity-0"}`}>
            Автономная контейнерная установка пожаротушения для кровли: подача воды в очаг возгорания после падения БПЛА, независимо от электросети и несущих конструкций объекта.
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

      {/* СТАТЬЯ */}
      <section id="article" className="py-20 bg-white scroll-mt-16">
        <div ref={articleObs.ref} className="max-w-3xl mx-auto px-4 lg:px-8">
          <div className={`text-center mb-10 ${articleObs.inView ? "animate-fade-in-up" : "opacity-0"}`}>
            <div className="inline-flex items-center gap-2 text-[var(--blue)] text-sm font-semibold uppercase tracking-wider mb-3">
              <div className="section-divider w-8" />
              Статья
              <div className="section-divider w-8" />
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-[var(--dark)] mb-4 leading-tight">
              Активная защита кровли: комплекс пожаротушения для объектов с угрозой БПЛА
            </h2>
          </div>
          <div className={`prose-drone ${articleObs.inView ? "animate-fade-in-up delay-100" : "opacity-0"}`}>
            <p className="text-[var(--gray)] leading-relaxed mb-4">
              Угроза падения беспилотных летательных аппаратов (БПЛА) и связанных с этим возгораний на кровле зданий предъявляет дополнительные требования к системам пожарной безопасности промышленных объектов, складов и производственных цехов.
            </p>
            <p className="text-[var(--gray)] leading-relaxed mb-2">
              Ниже описана автономная установка пожаротушения контейнерного типа, предназначенная для тушения возгораний на кровле, возникающих в результате падения БПЛА.
            </p>

            <div className="mt-4">
              {articleSections.map((s, i) => (
                <div key={i} className="mt-10 pt-10 border-t border-gray-100 first:mt-6 first:pt-0 first:border-0">
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-[var(--dark)] mb-4">{s.title}</h3>
                  {s.image && (
                    <div className={`rounded-xl overflow-hidden mb-5 ${s.imageFull ? "" : "max-h-64"}`}>
                      <img src={s.image} alt={s.imageAlt} className={`w-full ${s.imageFull ? "h-auto" : "h-64 object-cover"}`} />
                    </div>
                  )}
                  {s.paragraphs?.map((p, pi) => (
                    <p key={pi} className="text-[var(--gray)] leading-relaxed mb-4">{p}</p>
                  ))}
                  {s.list && (
                    <div className="mb-2">
                      {s.list.title && <div className="font-display font-semibold text-[var(--dark)] mb-3">{s.list.title}</div>}
                      <ul className="space-y-3">
                        {s.list.items.map((item, li) => (
                          <li key={li} className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-[var(--blue-50)] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Icon name="Check" size={14} className="text-[var(--blue)]" />
                            </div>
                            <span className="text-[var(--gray)] text-sm leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {s.footer && (
                    <p className="text-[var(--gray)] leading-relaxed mt-4 border-l-2 border-[var(--blue)] pl-4">{s.footer}</p>
                  )}
                </div>
              ))}
              <div id="video" className="mt-10 pt-10 border-t border-gray-100 scroll-mt-24">
                <h3 className="font-display font-bold text-xl sm:text-2xl text-[var(--dark)] mb-4">Видео: пожаротушение в работе</h3>
                <div className="rounded-xl overflow-hidden bg-black">
                  <video
                    src="https://cdn.poehali.dev/projects/031d4dc8-7cba-4766-8fd9-e78f2a02f069/bucket/ffde3bc6-24bc-4306-a820-e5494ef5aecf.mp4"
                    controls
                    playsInline
                    preload="metadata"
                    className="w-full max-h-[560px]"
                  />
                </div>
              </div>
            </div>
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
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-[var(--dark)] mb-4">Вышки и лафетные стволы для тушения кровли</h2>
            <p className="text-[var(--gray)] max-w-2xl mx-auto">
              В отличие от систем, где вода подаётся изнутри здания, в данной установке подача организована снаружи — по периметру объекта размещаются вышки с гидромониторами.
            </p>
          </div>
          <div className={`rounded-2xl overflow-hidden shadow-xl aspect-[3/2] ${architectureObs.inView ? "animate-fade-in-up delay-200" : "opacity-0"}`}>
            <img src={TOWER_IMAGE} alt="Пожарная вышка с лафетным стволом для защиты кровли склада от возгорания" width={1400} height={933} className="w-full h-full object-cover" />
          </div>
          <div className={`rounded-2xl overflow-hidden shadow-xl mt-6 aspect-square ${architectureObs.inView ? "animate-fade-in-up delay-200" : "opacity-0"}`}>
            <img src={ROOF_FIRE_IMAGE} alt="Тушение пожара на кровле склада лафетным стволом с пожарной вышки" width={1400} height={1400} className="w-full h-full object-cover" />
          </div>
          <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 ${architectureObs.inView ? "animate-fade-in-up delay-300" : "opacity-0"}`}>
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
            <div className="flex items-start gap-4 p-5 bg-white rounded-xl border border-gray-100">
              <div className="w-12 h-12 bg-[var(--blue)] rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon name="Layers" size={22} className="text-white" />
              </div>
              <div>
                <div className="font-display font-bold text-[var(--dark)] mb-1">Секционная сборка</div>
                <div className="text-[var(--gray)] text-sm">Вышки собираются из стандартных секций под нужную высоту непосредственно на объекте</div>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 bg-white rounded-xl border border-gray-100">
              <div className="w-12 h-12 bg-[var(--blue)] rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon name="ScanEye" size={22} className="text-white" />
              </div>
              <div>
                <div className="font-display font-bold text-[var(--dark)] mb-1">Автоматическое обнаружение</div>
                <div className="text-[var(--gray)] text-sm">В топовой комплектации датчики пламени на лафетных стволах сами запускают тушение без участия оператора</div>
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
              <div className="rounded-2xl overflow-hidden h-[280px] sm:h-[380px] lg:h-[420px]">
                <img src={CONTAINER_BLOCK_IMAGE} alt="Насосная станция внутри 40-футового контейнера с ёмкостью для воды и дизельным насосом" className="w-full h-full object-cover" />
              </div>
            </div>
            <div>
              <div className="inline-flex items-center gap-2 text-[var(--blue)] text-sm font-semibold uppercase tracking-wider mb-3">
                <div className="section-divider w-8" />
                Автономность и мощность
              </div>
              <h2 className="font-display font-extrabold text-3xl md:text-4xl text-[var(--dark)] mb-6">
                Насосная станция в одном контейнере
              </h2>
              <p className="text-[var(--gray)] leading-relaxed mb-6">
                Основа системы — стандартный 40-футовый морской контейнер, оборудованный под насосную станцию. Контейнер теплоизолирован, а ёмкость с водой оснащена автоматическим электрическим подогревом, что обеспечивает работу системы при температуре до −40 °C. Контейнер устанавливается на площадке рядом со зданием, от него к периметру объекта прокладывается магистраль диаметром 100 мм.
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
      <section id="price" className="py-20 bg-[#0a1628] scroll-mt-16">
        <div ref={specsObs.ref} className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className={`text-center mb-14 ${specsObs.inView ? "animate-fade-in-up" : "opacity-0"}`}>
            <div className="inline-flex items-center gap-2 text-[var(--blue-light)] text-sm font-semibold uppercase tracking-wider mb-3">
              <div className="section-divider w-8" />
              Технические параметры
              <div className="section-divider w-8" />
            </div>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white mb-4">Пример стоимости одной из комплектаций установки</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {specs.map((s, i) => (
              <div key={i} className={`flex items-start gap-4 bg-white/8 backdrop-blur-sm border border-white/10 rounded-2xl px-5 py-5 ${specsObs.inView ? `animate-fade-in-up delay-${i * 100}` : "opacity-0"}`}>
                <div className={`w-11 h-11 bg-[var(--blue)]/30 border border-[var(--blue-light)]/30 rounded-xl flex items-center justify-center flex-shrink-0 ${s.label === "Цена" ? "animate-pulse-border-green" : ""}`}>
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
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-[#0a1628] mb-4">Последовательность работы системы</h2>
            <p className="text-gray-700 max-w-2xl mx-auto text-base md:text-lg font-medium">
              Магистраль между контейнером и вышками выполнена в виде сухотруба и заполняется водой только в момент пожара. Время реакции системы — от 3 минут: столько занимает запуск двигателя насосной станции и заполнение трубы водой перед подачей в очаг возгорания.
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
      <section id="faq" className="py-20 bg-gray-50 scroll-mt-16">
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
            Дополнительная защита кровли объекта
          </h2>
          <p className="text-blue-100 leading-relaxed mb-8">
            Контейнерная установка пожаротушения дополняет существующие системы пожарной безопасности и обеспечивает подачу воды на кровлю при возгорании, вызванном падением БПЛА, независимо от состояния инженерных систем здания.
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