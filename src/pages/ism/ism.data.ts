import { withUtm } from "@/lib/utm";
export const SEND_URL = "https://functions.poehali.dev/6dd07b4a-af2f-481a-b26d-adbf5ebe7a0b";
export const ISM_IMAGE = "https://cdn.poehali.dev/projects/031d4dc8-7cba-4766-8fd9-e78f2a02f069/files/790384c5-0086-4312-95b9-ab675381f276.jpg";
export const MONTAZH_IMAGE = "https://cdn.poehali.dev/projects/031d4dc8-7cba-4766-8fd9-e78f2a02f069/files/bcbeb4b0-58b1-4df4-8045-320330c10235.jpg";
export const CERT_IMAGE = "https://cdn.poehali.dev/projects/031d4dc8-7cba-4766-8fd9-e78f2a02f069/bucket/0467becb-2d83-4414-8a10-6389014bfee0.png";

export const navLinks = [
  { label: "Как работает", href: "#how" },
  { label: "О компании", href: "#about" },
  { label: "Портфолио", href: "#portfolio" },
  { label: "Отзывы", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Контакты", href: "#contacts" },
];

export const flowSteps = [
  { icon: "Building2", label: "Объект" },
  { icon: "Wifi", label: "Передача данных" },
  { icon: "MonitorDot", label: "Центр мониторинга" },
  { icon: "BrainCircuit", label: "Анализ состояния" },
  { icon: "BellRing", label: "Согласование с клиентом" },
  { icon: "Wrench", label: "Выезд ремонтной бригады" },
];

export const controls = [
  { icon: "Flame", label: "Пожарная сигнализация" },
  { icon: "Droplets", label: "Пожаротушение" },
  { icon: "Wind", label: "Дымоудаление" },
  { icon: "KeyRound", label: "СКУД" },
  { icon: "Camera", label: "Видеонаблюдение" },
  { icon: "Settings2", label: "Инженерные системы" },
];

export const results = [
  "Значительное снижение риска пожара",
  "В чрезвычайной ситуации вызов пожарной охраны",
  "Оперативный выезд ремонтной бригады",
  "Информация о неисправностях в режиме реального времени",
  "Контроль между регламентными обслуживаниями",
  "Снижение риска штрафов",
  "История событий и отчёты",
];

export const tariffs = [
  {
    name: "Базовый",
    price: "от 5 000 ₽/мес",
    desc: "Для небольших объектов — офисы, магазины до 500 м²",
    items: ["Мониторинг 1 системы", "Ежедневный отчёт на email", "Реакция оператора 24/7", "Выезд бригады по запросу"],
    image: "https://cdn.poehali.dev/projects/031d4dc8-7cba-4766-8fd9-e78f2a02f069/files/75f4c78e-8d83-46f4-8fd3-34439217eedc.jpg",
  },
  {
    name: "Стандарт",
    price: "от 9 000 ₽/мес",
    desc: "Для средних объектов — склады, торговые центры до 3 000 м²",
    items: ["Мониторинг до 3 систем", "Ежедневный отчёт + SMS", "Реакция оператора 24/7", "2 выезда бригады в месяц", "Ежеквартальный аудит"],
    image: "https://cdn.poehali.dev/projects/031d4dc8-7cba-4766-8fd9-e78f2a02f069/files/c26f5cd0-b692-4a48-965b-ca797ec2563a.jpg",
    popular: true,
  },
  {
    name: "Премиум",
    price: "от 15 000 ₽/мес",
    desc: "Для крупных объектов — производства, бизнес-центры от 3 000 м²",
    items: ["Мониторинг без ограничений", "Отчёты в мессенджер + email", "Персональный менеджер", "Неограниченные выезды", "Ежемесячный аудит", "Приоритетная реакция 5 мин"],
    image: ISM_IMAGE,
  },
];

export const portfolio = [
  { title: "Резиденция Премьер-министра РФ Дмитрия Медведева", type: "Пожарная сигнализация и охранные системы", area: "Государственный объект", image: "https://cdn.poehali.dev/projects/031d4dc8-7cba-4766-8fd9-e78f2a02f069/bucket/074f88d6-a794-4ea8-8cc7-4b49843e4474.png" },
  { title: "ФСО России. Комплекс правительственных особняков на Воробьёвых горах", type: "Комплексная система безопасности", area: "Государственный объект", image: "https://cdn.poehali.dev/projects/031d4dc8-7cba-4766-8fd9-e78f2a02f069/bucket/f5c80256-eadc-40d6-a6f5-61be8846a59a.png" },
  { title: "Даниловский монастырь. Здание отдела внешних связей РПЦ", type: "Пожарная сигнализация", area: "Культурный объект", image: "https://cdn.poehali.dev/projects/031d4dc8-7cba-4766-8fd9-e78f2a02f069/bucket/ba9f8a9d-5d87-4174-be39-a98509772f2b.png" },
  { title: "ООО «Красный октябрь». Комплекс исторических зданий", type: "Пожарная сигнализация + СОУЭ", area: "Производственный комплекс", image: "https://cdn.poehali.dev/projects/031d4dc8-7cba-4766-8fd9-e78f2a02f069/bucket/b5fe874a-c9b0-45b3-a5b3-c70cb3064d3d.png" },
  { title: "Бистро Пронто. Сеть из 42 ресторанов", type: "Пожарная сигнализация — 42 объекта", area: "Сеть объектов", image: "https://cdn.poehali.dev/projects/031d4dc8-7cba-4766-8fd9-e78f2a02f069/bucket/bf6d9395-1609-4f42-b3dd-57c92a9dd2b6.png" },
  { title: "РотФронт. Здание производственного корпуса ОАО «РотФронт»", type: "Пожарная сигнализация + охранные системы", area: "Производственный объект", image: "https://cdn.poehali.dev/projects/031d4dc8-7cba-4766-8fd9-e78f2a02f069/bucket/6e56f066-6087-4c57-bafa-d0dd17ec1db8.png" },
];

export const testimonials = [
  { company: "ОАО «Московская кондитерская фабрика «Красный Октябрь»", desc: "Отзыв о качественном выполнении противопожарных работ", image: "https://cdn.poehali.dev/projects/031d4dc8-7cba-4766-8fd9-e78f2a02f069/bucket/d215631d-94c0-4d13-9997-7d0d1fb22e50.jpg" },
  { company: "ОАО «Кондитерский концерн Бабаевский»", desc: "Отзыв о выполнении комплекса противопожарных работ", image: "https://cdn.poehali.dev/projects/031d4dc8-7cba-4766-8fd9-e78f2a02f069/bucket/3030fe87-06cd-4333-8c65-2eb8322a3199.jpg" },
  { company: "Фирма «1С»", desc: "Благодарность за профессионализм и качество выполненных работ", image: "https://cdn.poehali.dev/projects/031d4dc8-7cba-4766-8fd9-e78f2a02f069/bucket/2112d2d6-64a6-4b74-8dd3-b1dec1505b05.jpg" },
  { company: "ФСО России", desc: "Благодарность за усиление пожарной безопасности на объектах ФСО", image: "https://cdn.poehali.dev/projects/031d4dc8-7cba-4766-8fd9-e78f2a02f069/bucket/9a8547f3-f9ad-419d-a83a-db1fd1eff55b.jpg" },
];

export const certificates = [
  { title: "Лицензия МЧС России", num: "Л014-00101-77/00112662", desc: "Монтаж и техническое обслуживание систем пожарной безопасности" },
  { title: "ISO 9001:2015", num: "Сертификат RU-0342", desc: "Система менеджмента качества" },
  { title: "СРО «Безопасность»", num: "Допуск СРО-С-034", desc: "Строительно-монтажные работы" },
];

export const faqs = [
  { q: "Сколько стоит подключение к мониторингу?", a: "Стоимость подключения зависит от типа и количества систем на объекте. В среднем — от 35 000 руб. за установку оборудования и от 5 000 руб./мес. за мониторинг. Точную стоимость рассчитываем бесплатно после обследования объекта." },
  { q: "Подходит ли для любого объекта?", a: "Да, система совместима с большинством современных приёмно-контрольных приборов. Перед подключением наш инженер проводит бесплатный осмотр объекта." },
  { q: "Как быстро происходит реакция на неисправность?", a: "Диспетчерская служба работает 24/7. При обнаружении критической неисправности оператор связывается с вами в течение 5 минут." },
  { q: "Что входит в ежедневный отчёт?", a: "Отчёт содержит общий статус систем, список событий за сутки, выявленные неисправности и рекомендации по устранению." },
  { q: "Даёте ли вы гарантию?", a: "Да, мы даём гарантию 1 год на все виды работ и оборудование. Гарантийное обслуживание — бесплатно." },
  { q: "Работаете ли вы с физическими лицами?", a: "Да, работаем с физическими лицами — собственниками квартир, частных домов и дач. Принимаем оплату наличными и картой, предоставляем все необходимые документы и договор на выполненные работы." },
];

export type FormState = "idle" | "loading" | "success" | "error";

export async function sendLead(data: { name: string; phone: string; object_type: string; comment: string; source: string }) {
  const res = await fetch(SEND_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, source: withUtm(data.source) }) });
  if (!res.ok) throw new Error();
  return res.json();
}