import Icon from "@/components/ui/icon";
import { ISM_IMAGE, MONTAZH_IMAGE, flowSteps, controls, results, tariffs } from "./ism.data";

interface InViewObs {
  ref: React.RefObject<HTMLDivElement>;
  inView: boolean;
}

interface IsmHeroSectionsProps {
  howObs: InViewObs;
  controlsObs: InViewObs;
  resultsObs: InViewObs;
  tariffsObs: InViewObs;
}

export default function IsmHeroSections({ howObs, controlsObs, resultsObs, tariffsObs }: IsmHeroSectionsProps) {
  return (
    <>
      {/* ГЕРОЙ */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#0a1628] w-full">
        <div className="absolute inset-0 bg-cover opacity-40" style={{ backgroundImage: `url(${MONTAZH_IMAGE})`, backgroundPosition: "center 20%" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628] via-[#0a1628]/80 to-transparent" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 lg:px-8 pt-24 md:pt-32 pb-16">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div className="w-full min-w-0">
              <div className="mb-4 flex flex-col gap-2">
                <a href="#contacts" className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-white/80 text-xs font-medium hover:bg-white/15 transition-colors">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse flex-shrink-0" />
                  Центр мониторинга работает 24/7
                </a>
                <a href="#contacts" className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-red-500/70 rounded-full text-white/80 text-xs font-medium hover:bg-white/15 transition-colors lg:hidden">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse flex-shrink-0" />
                  Срочный ремонт сигнализации
                </a>
              </div>
              <h1 className="font-display font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-[1.1] mb-5">
                Круглосуточная система мониторинга противопожарных систем
                <br />
                <span className="text-white/80 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">Контролируем и обслуживаем пожарную безопасность 24/7</span>
              </h1>
              <p className="text-base sm:text-lg text-white/90 font-medium leading-relaxed mb-8">
                Удалённо отслеживаем состояние систем безопасности, выявляем и анализируем неисправности. Уведомляем ответственных лиц. Оперативно ремонтируем систему.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="#contacts" className="px-6 py-3.5 bg-[var(--blue)] text-white font-bold rounded-xl hover:bg-[var(--blue-dark)] transition-all text-center text-base">
                  Подключить мониторинг
                </a>
                <a href="#how" className="px-6 py-3.5 border border-white/25 text-white font-bold rounded-xl hover:bg-white/10 transition-all text-center text-base">
                  Как это работает
                </a>
              </div>
            </div>
            <div className="hidden lg:flex flex-col gap-5">
              <div className="flex flex-col items-start gap-1">
                <a href="#contacts" className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-red-500/70 rounded-full text-white/80 text-xs font-medium hover:bg-white/15 transition-colors animate-pulse-border w-full">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse flex-shrink-0" />
                  Срочный ремонт пожарной сигнализации
                </a>
                <p className="text-[10px] text-white/40 pl-3.5">Выезд от 1 часа · Диагностика бесплатна · Выезд инженера — 1 500 ₽, если ремонт не нужен</p>
              </div>
              {[
                { icon: "Eye", title: "Мониторинг 24/7", sub: "круглосуточный контроль" },
                { icon: "BellRing", title: "Реакция за 5 минут", sub: "при обнаружении неисправности" },
                { icon: "FileText", title: "Ежедневные отчёты", sub: "на email и в мессенджер" },
                { icon: "ShieldCheck", title: "Лицензия МЧС", sub: "Л014-00101-77/00112662" },
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
      </section>

      {/* СТАТИСТИКА */}
      <div className="bg-[#0d3d73] py-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {[
            { value: "1200+", label: "Объектов сдано" },
            { value: "15", label: "Лет на рынке" },
            { value: "98%", label: "Клиентов довольны" },
            { value: "24/7", label: "Техподдержка" },
          ].map((s, i) => (
            <div key={i}>
              <div className="font-display font-black text-2xl md:text-4xl mb-1">{s.value}</div>
              <div className="text-white/60 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* КАК РАБОТАЕТ */}
      <section id="how" className="py-20 bg-gray-50">
        <div ref={howObs.ref} className="max-w-5xl mx-auto px-4 lg:px-8">
          <div className={`text-center mb-14 ${howObs.inView ? "animate-fade-in-up" : "opacity-0"}`}>
            <div className="inline-flex items-center gap-2 text-[var(--blue)] text-sm font-semibold uppercase tracking-wider mb-3">
              <div className="section-divider w-8" />
              Принцип работы
              <div className="section-divider w-8" />
            </div>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-[#0a1628] mb-4">Как это работает</h2>
            <p className="text-gray-700 max-w-2xl mx-auto text-base md:text-xl font-medium text-left md:text-center">Мы подключаем Вашу пожарную сигнализацию и другое оборудование к Нашему Ситуационному Центру мониторинга, где операторы круглосуточно следят за техническим состоянием всех противопожарных систем и при необходимости отправляют ремонтную бригаду.</p>
          </div>
          {/* Мобиль: вертикальная цепочка-бусы */}
          <div className="flex flex-col md:hidden w-full max-w-xs mx-auto">
            {flowSteps.map((step, i) => (
              <div key={i} className={`flex flex-row items-stretch gap-4 ${howObs.inView ? `animate-fade-in-up delay-${i * 100}` : "opacity-0"}`}>
                <div className="flex flex-col items-center flex-shrink-0" style={{ width: 48 }}>
                  <div className="w-12 h-12 rounded-2xl bg-[#0d3d73] flex items-center justify-center shadow-md">
                    <Icon name={step.icon} fallback="Circle" size={22} className="text-white" />
                  </div>
                  {i < flowSteps.length - 1 && (
                    <div className="flex items-center justify-center my-1 h-8">
                      <Icon name="ChevronDown" size={22} className="text-[var(--blue)]" />
                    </div>
                  )}
                </div>
                <div className="flex items-center pb-6">
                  <span className="text-sm font-semibold text-[#0a1628] leading-tight">{step.label}</span>
                </div>
              </div>
            ))}
          </div>
          {/* Десктоп: горизонтальная цепочка */}
          <div className="hidden md:flex md:flex-row md:items-start justify-center">
            {flowSteps.map((step, i) => (
              <div key={i} className="flex md:flex-row items-start">
                <div className={`flex flex-col items-center text-center w-28 lg:w-32 px-1 ${howObs.inView ? `animate-fade-in-up delay-${i * 100}` : "opacity-0"}`}>
                  <div className="w-14 h-14 rounded-2xl bg-[#0d3d73] flex items-center justify-center mb-2 shadow-md">
                    <Icon name={step.icon} fallback="Circle" size={22} className="text-white" />
                  </div>
                  <span className="text-sm font-semibold text-[#0a1628] leading-tight">{step.label}</span>
                </div>
                {i < flowSteps.length - 1 && (
                  <div className="flex items-center justify-center mt-5 mx-1">
                    <Icon name="ChevronRight" size={18} className="text-[var(--blue)]/40" />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className={`mt-12 max-w-2xl mx-auto bg-white border border-[var(--blue)]/15 rounded-2xl px-6 py-6 shadow-sm ${howObs.inView ? "animate-fade-in-up" : "opacity-0"}`}>
            <p className="text-[#0a1628] font-semibold text-base mb-3">При необходимости мы можем работать с вашей текущей системой обслуживания</p>
            <ul className="flex flex-col gap-2">
              {[
                "не требует замены подрядчика",
                "не требует модернизации АПС",
                "подключается к действующему оборудованию",
                "помогает контролировать состояние системы между плановыми ТО",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                  <Icon name="Check" size={16} className="text-[var(--blue)] mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className={`mt-4 max-w-2xl mx-auto bg-white border border-[var(--blue)]/15 rounded-2xl px-6 py-6 shadow-sm ${howObs.inView ? "animate-fade-in-up" : "opacity-0"}`}>
            <p className="text-[#0a1628] font-semibold text-base mb-3">Работаем с большинством пожарных сигнализаций</p>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">Такими как <span className="font-medium text-[#0a1628]">Болид, Рубеж, Стрелец, Астра, Ритм, Сибирский Арсенал</span> и другие. Для каждого производителя применяются разные модули сопряжения и программные продукты. Наши инженеры смогут подобрать подходящий набор оборудования для интеграции системы мониторинга на Вашем объекте.</p>
            <p className="text-gray-600 text-sm leading-relaxed">Если на объекте смонтированы системы разных производителей, мы объединяем их в один информационный блок.</p>
          </div>
          <div className={`mt-4 max-w-2xl mx-auto bg-[#f8faff] border border-[var(--blue)]/15 rounded-2xl px-6 py-6 shadow-sm ${howObs.inView ? "animate-fade-in-up" : "opacity-0"}`}>
            <div className="flex items-start gap-3 mb-3">
              <Icon name="BookOpen" size={18} className="text-[var(--blue)] mt-0.5 flex-shrink-0" />
              <p className="text-[#0a1628] font-semibold text-base">Согласно ГОСТ Р 59638-2021, п. 6.5.1</p>
            </div>
            <div className="flex flex-col gap-2 text-gray-600 text-sm leading-relaxed">
              <p>Обслуживающая организация должна осуществлять <span className="font-medium text-[#0a1628]">круглосуточный приём заявок</span> о неисправностях и ложных срабатываниях СПС.</p>
              <p>Устранение неисправностей должно осуществляться за время <span className="font-medium text-[#0a1628]">не более 24 часов</span>.</p>
              <p className="text-gray-400 text-xs">Допускается увеличение до 72 ч, если единичная неисправность не влияет на работоспособность СПС.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ЧТО КОНТРОЛИРУЕМ */}
      <section id="controls" className="py-20 bg-white">
        <div ref={controlsObs.ref} className="max-w-5xl mx-auto px-4 lg:px-8">
          <div className={`text-center mb-14 ${controlsObs.inView ? "animate-fade-in-up" : "opacity-0"}`}>
            <div className="inline-flex items-center gap-2 text-[var(--blue)] text-sm font-semibold uppercase tracking-wider mb-3">
              <div className="section-divider w-8" />
              Системы
              <div className="section-divider w-8" />
            </div>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-[#0a1628] mb-4">Что мы контролируем</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Единая точка контроля всех систем безопасности объекта</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {controls.map((c, i) => (
              <div key={i} className={`flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-[var(--blue)]/30 hover:bg-[var(--blue-50)]/40 transition-all ${controlsObs.inView ? `animate-fade-in-up delay-${(i % 3) * 100 + 100}` : "opacity-0"}`}>
                <div className="w-10 h-10 bg-[var(--blue)] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon name={c.icon} fallback="Shield" size={18} className="text-white" />
                </div>
                <span className="font-semibold text-[#0a1628] text-sm">{c.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ФОТО РАЗДЕЛИТЕЛЬ */}
      <div className="w-full">
        <img src={ISM_IMAGE} alt="Оператор центра мониторинга следит за состоянием систем безопасности" className="w-full h-[220px] sm:h-[280px] md:h-[360px] object-cover object-center" />
      </div>

      {/* ЧТО ПОЛУЧАЕТ КЛИЕНТ */}
      <section id="tariffs" className="py-20 bg-[#0a1628]">
        <div ref={resultsObs.ref} className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className={`text-center mb-14 ${resultsObs.inView ? "animate-fade-in-up" : "opacity-0"}`}>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white mb-4">Что получает клиент</h2>
            <p className="text-white/50 max-w-xl mx-auto text-lg">Не функции. Результаты.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <Icon name="ShieldCheck" size={26} className="text-green-400 flex-shrink-0" />
                <span className="font-display font-bold text-white text-base">С мониторингом ПожДозор</span>
              </div>
              <ul className="space-y-3">
                {results.map((r, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-green-500 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon name="Check" size={11} className="text-white" />
                    </div>
                    <span className="text-white/90 text-sm leading-relaxed">{r}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white/5 border border-red-500/20 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <Icon name="ShieldOff" size={26} className="text-red-400 flex-shrink-0" />
                <span className="font-display font-bold text-white text-base">Без мониторинга</span>
              </div>
              <ul className="space-y-3">
                {[
                  "Неисправность обнаруживается только во время ТО",
                  "Потеря связи с датчиками остаётся незамеченной",
                  "Нет уверенности, что система сработает в нужный момент",
                  "Есть риск позднего обнаружения пожара",
                  "Проверка выявляет нарушения раньше вас",
                  "Растут риски штрафов и предписаний",
                ].map((r, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-red-500 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon name="X" size={11} className="text-white" />
                    </div>
                    <span className="text-white/70 text-sm leading-relaxed">{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-center mb-12">
            <a href="#contacts" className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--blue)] text-white font-bold rounded-xl hover:bg-[var(--blue-dark)] transition-all text-lg">
              <Icon name="PhoneCall" size={20} />
              Подключить мониторинг
            </a>
            <p className="text-white/40 text-sm mt-3">Бесплатный выезд инженера и расчёт стоимости</p>
          </div>

          {/* Тарифы */}
          <div ref={tariffsObs.ref} className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {tariffs.map((t, i) => (
              <div key={i} className={`bg-white rounded-2xl border overflow-hidden w-full ${t.popular ? "border-[var(--blue-light)] shadow-lg" : "border-gray-100"} ${tariffsObs.inView ? `animate-fade-in-up delay-${i * 100 + 100}` : "opacity-0"}`}>
                {t.popular && <div className="bg-[#0a1628] text-white text-xs font-bold text-center py-2 tracking-wide">ПОПУЛЯРНЫЙ ВЫБОР</div>}
                <div className="relative h-36 overflow-hidden">
                  <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="p-6">
                  <div className="font-display font-black text-xl text-[#0a1628] mb-1">{t.name}</div>
                  <div className="text-[var(--blue)] font-bold text-lg mb-2">{t.price}</div>
                  <p className="text-gray-500 text-sm mb-4">{t.desc}</p>
                  <ul className="space-y-2 mb-6">
                    {t.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-gray-700">
                        <Icon name="Check" size={15} className="text-[var(--blue)] flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a href="#contacts" className={`block text-center py-3 rounded-xl font-bold text-sm transition-colors ${t.popular ? "bg-[#0a1628] text-white hover:bg-[#0d3d73]" : "border border-[var(--blue)] text-[var(--blue)] hover:bg-[var(--blue-50)]"}`}>
                    Подключить
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a href="#contacts" className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--blue)] text-white font-bold rounded-xl hover:bg-[var(--blue-dark)] transition-all text-lg">
              <Icon name="PhoneCall" size={20} />
              Подключить мониторинг
            </a>
            <p className="text-white/50 text-sm mt-3">Бесплатный выезд инженера и расчёт стоимости</p>
          </div>
        </div>
      </section>

      {/* ВСЕ УСЛУГИ */}
      <section id="all-services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 text-[var(--blue)] text-sm font-semibold uppercase tracking-wider mb-3">
              <div className="section-divider w-8" />
              Полный спектр работ
              <div className="section-divider w-8" />
            </div>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-[var(--dark)] mb-4">Наши услуги</h2>
            <p className="text-[var(--gray)] max-w-xl mx-auto">Проектирование, монтаж и техническое обслуживание систем безопасности любой сложности</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "MonitorCheck",
                title: "Круглосуточная система мониторинга противопожарных систем",
                desc: "Установка оборудования, позволяющего круглосуточно отслеживать и анализировать реальное состояние всех противопожарных систем объекта.",
                items: ["Мониторинг 24/7", "Ежедневные AI-отчёты", "Оперативный выезд бригады"],
                price: "от 5 000 ₽/мес",
                image: "https://cdn.poehali.dev/projects/031d4dc8-7cba-4766-8fd9-e78f2a02f069/files/c26f5cd0-b692-4a48-965b-ca797ec2563a.jpg",
              },
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
              {
                icon: "Flame",
                title: "Огнезащита",
                desc: "Огнезащита любой сложности — металлических, деревянных конструкций, тканей, кровельных покрытий, кабелей, проводов и воздуховодов. Огнезащита декоративных элементов отделки на путях эвакуации, огнезащита бетона.",
                items: ["Металлические и деревянные конструкции", "Кабели, провода и воздуховоды", "Декоративные элементы и бетон"],
                price: "от 30 000 ₽",
                image: "https://cdn.poehali.dev/projects/031d4dc8-7cba-4766-8fd9-e78f2a02f069/files/dd1f50e9-7d24-4ec3-911f-8d5513d0c8be.jpg",
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
          </div>

        </div>
      </section>
    </>
  );
}