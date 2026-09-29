import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { FormState } from "./ism/ism.data";
import IsmHeader from "./ism/IsmHeader";
import IsmHeroSections from "./ism/IsmHeroSections";
import IsmDroneDefensePromo from "./ism/IsmDroneDefensePromo";
import IsmAboutSections from "./ism/IsmAboutSections";
import IsmContactsFooter from "./ism/IsmContactsFooter";

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

export default function Ism() {
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

  const howObs = useInView(0.1);
  const controlsObs = useInView(0.1);
  const resultsObs = useInView(0.1);
  const tariffsObs = useInView(0.05);
  const aboutObs = useInView(0.1);
  const portfolioObs = useInView(0.05);
  const testimonialsObs = useInView(0.05);
  const certsObs = useInView(0.1);
  const faqObs = useInView(0.1);
  const contactsObs = useInView(0.1);
  const droneObs = useInView(0.1);

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      <Helmet>
        <title>Круглосуточный мониторинг пожарной безопасности | ПожДозор Москва</title>
        <meta
          name="description"
          content="ПожДозор — мониторинг, обслуживание и ремонт пожарной безопасности 24/7 в Москве. Реакция за 5 минут, 1200+ объектов. Лицензия МЧС России."
        />
        <link rel="canonical" href="https://pozhdozor.ru/" />
      </Helmet>
      <IsmHeader
        scrolled={scrolled}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        onCallbackOpen={() => setCallbackOpen(true)}
      />
      <IsmHeroSections
        howObs={howObs}
        controlsObs={controlsObs}
        resultsObs={resultsObs}
        tariffsObs={tariffsObs}
      />
      <IsmDroneDefensePromo obs={droneObs} />
      <IsmAboutSections
        aboutObs={aboutObs}
        portfolioObs={portfolioObs}
        testimonialsObs={testimonialsObs}
        certsObs={certsObs}
        faqObs={faqObs}
        openFaq={openFaq}
        setOpenFaq={setOpenFaq}
      />
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