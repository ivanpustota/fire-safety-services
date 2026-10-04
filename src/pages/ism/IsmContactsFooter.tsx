import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";
import { navLinks, sendLead, FormState } from "./ism.data";

const VkIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.785 16.241s.288-.032.436-.194c.136-.148.132-.427.132-.427s-.02-1.304.587-1.496c.6-.19 1.37 1.261 2.185 1.817.617.42 1.085.328 1.085.328l2.180-.03s1.139-.071.599-.964c-.044-.073-.314-.661-1.618-1.869-1.366-1.265-1.183-1.060.462-3.246.999-1.33 1.399-2.142 1.274-2.490-.12-.332-.854-.244-.854-.244l-2.455.015s-.182-.025-.317.055c-.133.079-.218.264-.218.264s-.387 1.056-.902 1.954c-1.086 1.843-1.52 1.940-1.698 1.826-.413-.267-.31-1.075-.31-1.648 0-1.793.271-2.540-.529-2.733-.266-.065-.46-.107-1.141-.114-.872-.009-1.610.003-2.028.207-.278.135-.493.437-.362.454.162.022.528.099.722.363.25.345.241 1.118.241 1.118s.144 2.112-.335 2.372c-.329.177-.78-.184-1.748-1.836-.496-.859-.870-1.810-.870-1.810s-.072-.177-.203-.272c-.158-.115-.379-.151-.379-.151l-2.333.015s-.35.01-.478.163c-.115.136-.009.418-.009.418s1.826 4.271 3.893 6.423c1.896 1.974 4.047 1.843 4.047 1.843h.975z"/>
  </svg>
);

interface InViewObs {
  ref: React.RefObject<HTMLDivElement>;
  inView: boolean;
}

interface IsmContactsFooterProps {
  contactsObs: InViewObs;
  name: string;
  setName: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  objectType: string;
  setObjectType: (v: string) => void;
  comment: string;
  setComment: (v: string) => void;
  formState: FormState;
  setFormState: (v: FormState) => void;
  callbackOpen: boolean;
  setCallbackOpen: (v: boolean) => void;
  callbackPhone: string;
  setCallbackPhone: (v: string) => void;
  callbackState: FormState;
  setCallbackState: (v: FormState) => void;
  formPromise?: string;
}

export default function IsmContactsFooter({
  contactsObs,
  name, setName,
  phone, setPhone,
  objectType, setObjectType,
  comment, setComment,
  formState, setFormState,
  callbackOpen, setCallbackOpen,
  callbackPhone, setCallbackPhone,
  callbackState, setCallbackState,
  formPromise,
}: IsmContactsFooterProps) {

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;
    setFormState("loading");
    try {
      await sendLead({ name, phone, object_type: objectType, comment, source: "Главная — форма контактов" });
      setFormState("success");
      setName(""); setPhone(""); setObjectType(""); setComment("");
    } catch { setFormState("error"); }
  };

  const handleCallback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackPhone.trim()) return;
    setCallbackState("loading");
    try {
      await sendLead({ name: "", phone: callbackPhone, object_type: "", comment: "", source: "Обратный звонок" });
      setCallbackState("success");
      setCallbackPhone("");
    } catch { setCallbackState("error"); }
  };

  return (
    <>
      {/* КОНТАКТЫ */}
      <section id="contacts" className="py-20 bg-white scroll-mt-16">
        <div ref={contactsObs.ref} className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className={`text-center mb-14 ${contactsObs.inView ? "animate-fade-in-up" : "opacity-0"}`}>
            <div className="inline-flex items-center gap-2 text-[var(--blue)] text-sm font-semibold uppercase tracking-wider mb-3">
              <div className="section-divider w-8" />
              Связаться
              <div className="section-divider w-8" />
            </div>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-[var(--dark)] mb-4">Контакты</h2>
            <p className="text-[var(--gray)] max-w-xl mx-auto">Оставьте заявку и мы перезвоним в течение 15 минут</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-stretch">
            <div className={`${contactsObs.inView ? "animate-fade-in-left" : "opacity-0"}`}>
              <div className="bg-[var(--gray-light)] rounded-2xl p-4 sm:p-8 h-full flex flex-col">
                <h3 className="font-display font-bold text-xl text-[var(--dark)] mb-6">Оставить заявку</h3>
                {formPromise && (
                  <div className="flex items-center gap-3 bg-white border border-[var(--blue)]/30 rounded-xl px-4 py-3 mb-6">
                    <div className="w-9 h-9 bg-[var(--blue)] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="Calculator" size={18} className="text-white" />
                    </div>
                    <span className="font-display font-bold text-[var(--dark)]">{formPromise}</span>
                  </div>
                )}
                {formState === "success" ? (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="CheckCircle" size={32} className="text-green-600" />
                    </div>
                    <div className="font-display font-bold text-xl text-[var(--dark)] mb-2">Заявка отправлена!</div>
                    <p className="text-[var(--gray)]">Свяжемся с вами в течение 15 минут</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1">
                    <div>
                      <label className="block text-sm font-medium text-[var(--dark)] mb-1.5">Ваше имя</label>
                      <input type="text" placeholder="Иван Иванов" value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-[var(--dark)] placeholder-gray-400 focus:outline-none focus:border-[var(--blue)] focus:ring-2 focus:ring-[var(--blue)]/10 transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--dark)] mb-1.5">Телефон <span className="text-red-500">*</span></label>
                      <input type="tel" placeholder="+7 (___) ___-__-__" required value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-[var(--dark)] placeholder-gray-400 focus:outline-none focus:border-[var(--blue)] focus:ring-2 focus:ring-[var(--blue)]/10 transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--dark)] mb-1.5">Тип объекта</label>
                      <select value={objectType} onChange={e => setObjectType(e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-[var(--dark)] focus:outline-none focus:border-[var(--blue)] focus:ring-2 focus:ring-[var(--blue)]/10 transition-all">
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
                      <textarea placeholder="Площадь объекта, пожелания..." rows={3} value={comment} onChange={e => setComment(e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-[var(--dark)] placeholder-gray-400 focus:outline-none focus:border-[var(--blue)] focus:ring-2 focus:ring-[var(--blue)]/10 transition-all resize-none" />
                    </div>
                    {formState === "error" && <div className="text-red-500 text-sm text-center">Ошибка отправки. Позвоните нам напрямую.</div>}
                    <button type="submit" disabled={formState === "loading"} className="w-full py-4 bg-[var(--blue)] text-white font-bold rounded-xl hover:bg-[var(--blue-dark)] transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
                      {formState === "loading" ? <><Icon name="Loader" size={18} className="animate-spin" /> Отправляем...</> : <><Icon name="Send" size={18} /> Отправить заявку</>}
                    </button>
                    <p className="text-xs text-gray-400 text-center">Нажимая кнопку, вы соглашаетесь с обработкой персональных данных</p>
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
                    {c.lines.map(l => <div key={l} className="text-[var(--gray)] text-sm">{l}</div>)}
                  </div>
                </div>
              ))}
              <div className="bg-[#0a1628] rounded-2xl p-6 text-white flex-1 flex flex-col justify-between">
                <div>
                  <div className="font-display font-extrabold text-lg mb-2">Выезд специалиста — бесплатно</div>
                  <p className="text-blue-200 text-sm mb-5">Приедем, осмотрим объект и составим смету без обязательств</p>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a href="tel:+74994902201" className="flex-1 inline-flex items-center justify-center gap-2 bg-white text-[var(--blue)] font-bold px-5 py-3 rounded-xl hover:bg-blue-50 transition-colors text-sm">
                      <Icon name="Phone" size={16} />
                      Позвонить сейчас
                    </a>
                    <button onClick={() => setCallbackOpen(true)} className="flex-1 inline-flex items-center justify-center gap-2 bg-white/15 border border-white/30 text-white font-bold px-5 py-3 rounded-xl hover:bg-white/25 transition-colors text-sm">
                      <Icon name="PhoneCall" size={16} />
                      Заказать звонок
                    </button>
                  </div>
                  <a href="https://vk.com/club239578012" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white font-semibold px-5 py-3 rounded-xl hover:bg-white/20 transition-colors text-sm">
                    <VkIcon size={16} />
                    Сообщество ВКонтакте
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 rounded-2xl overflow-hidden shadow-lg">
            <a href="https://yandex.ru/maps/org/7311320648" target="_blank" rel="noopener noreferrer" className="block relative group">
              <iframe src="https://yandex.ru/map-widget/v1/?z=12&ol=biz&oid=7311320648" width="100%" height="380" frameBorder="0" allowFullScreen className="w-full block pointer-events-none" title="Карта проезда" />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[var(--blue)] text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-lg flex items-center gap-2 group-hover:bg-[var(--blue-dark)] transition-colors">
                <Icon name="MapPin" size={16} />
                Открыть маршрут на Яндекс Картах
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ПОДВАЛ */}
      <footer className="bg-[var(--dark)] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[var(--blue)] flex items-center justify-center">
                  <Icon name="ShieldCheck" size={20} className="text-white" />
                </div>
                <div>
                  <div className="font-display font-extrabold text-base">
                    <span className="text-white">Пож</span><span className="text-[var(--blue-light)]">Дозор</span>
                  </div>
                  <div className="text-[10px] text-blue-400 tracking-widest uppercase">Мониторинг 24/7</div>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                Центр удалённого мониторинга систем пожарной безопасности. Профессиональный монтаж и обслуживание с 2011 года.
              </p>
            </div>
            <div>
              <div className="font-display font-bold text-sm mb-4 text-gray-300 uppercase tracking-wider">Разделы</div>
              <ul className="space-y-2">
                <li>
                  <Link to="/uslugi" reloadDocument className="text-gray-400 text-sm hover:text-[var(--blue-light)] transition-colors">Услуги</Link>
                </li>
                <li>
                  <Link to="/drone-defense" reloadDocument className="text-gray-400 text-sm hover:text-[var(--blue-light)] transition-colors">Защита от БПЛА</Link>
                </li>
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="text-gray-400 text-sm hover:text-[var(--blue-light)] transition-colors">{l.label}</a>
                  </li>
                ))}

              </ul>
            </div>
            <div>
              <div className="font-display font-bold text-sm mb-4 text-gray-300 uppercase tracking-wider">Контакты</div>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-center gap-2"><Icon name="Phone" size={14} className="text-[var(--blue-light)]" />+7 (499) 490-22-01</li>
                <li className="flex items-center gap-2"><Icon name="Mail" size={14} className="text-[var(--blue-light)]" />skpb01@mail.ru</li>
                <li className="flex items-start gap-2"><Icon name="MapPin" size={14} className="text-[var(--blue-light)] mt-0.5" />ул. 5-я Магистральная, д. 12, офис 410</li>
                <li className="flex items-start gap-2"><Icon name="Building2" size={14} className="text-[var(--blue-light)] mt-0.5" />ООО «СПАРК», ИНН 7734401111</li>
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

      {/* Плавающая кнопка звонка */}
      <a href="tel:+74994902201" className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[var(--blue)] text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-[var(--blue-dark)] transition-colors btn-pulse">
        <Icon name="Phone" size={22} />
      </a>

      {/* Попап обратного звонка */}
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
                  <input type="tel" placeholder="+7 (___) ___-__-__" value={callbackPhone} onChange={e => setCallbackPhone(e.target.value)} required autoFocus className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[var(--dark)] placeholder-gray-400 focus:outline-none focus:border-[var(--blue)] focus:ring-2 focus:ring-[var(--blue)]/10 transition-all" />
                </div>
                {callbackState === "error" && <div className="text-red-500 text-sm text-center">Ошибка отправки. Позвоните нам напрямую.</div>}
                <button type="submit" disabled={callbackState === "loading"} className="w-full py-4 bg-[var(--blue)] text-white font-bold rounded-xl hover:bg-[var(--blue-dark)] transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
                  {callbackState === "loading" ? <><Icon name="Loader" size={18} className="animate-spin" /> Отправляем...</> : <><Icon name="PhoneCall" size={18} /> Перезвоните мне</>}
                </button>
                <p className="text-xs text-gray-400 text-center">Нажимая кнопку, вы соглашаетесь с обработкой персональных данных</p>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}