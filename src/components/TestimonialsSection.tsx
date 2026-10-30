import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface Testimonial {
  company: string;
  desc: string;
  image: string;
}

interface InViewObs {
  ref: React.RefObject<HTMLDivElement | null>;
  inView: boolean;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  obs: InViewObs;
}

export default function TestimonialsSection({ testimonials, obs }: TestimonialsSectionProps) {
  const [active, setActive] = useState<Testimonial | null>(null);

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div ref={obs.ref} className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className={`text-center mb-14 ${obs.inView ? "animate-fade-in-up" : "opacity-0"}`}>
          <div className="inline-flex items-center gap-2 text-[var(--blue)] text-sm font-semibold uppercase tracking-wider mb-3">
            <div className="section-divider w-8" />
            Нам доверяют
            <div className="section-divider w-8" />
          </div>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-[var(--dark)] mb-4">Отзывы клиентов</h2>
          <p className="text-[var(--gray)] max-w-xl mx-auto">
            Благодарственные письма от наших клиентов — лучшее подтверждение качества нашей работы
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((t, i) => (
            <button
              key={i}
              onClick={() => setActive(t)}
              className={`text-left bg-white rounded-2xl overflow-hidden border border-gray-100 card-hover group ${
                obs.inView ? `animate-fade-in-up delay-${(i % 4) * 100 + 100}` : "opacity-0"
              }`}
            >
              <div className="relative h-56 overflow-hidden bg-[var(--gray-light)]">
                <img src={t.image} alt={t.company} className="w-full h-full object-cover object-top" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-3">
                    <Icon name="ZoomIn" size={20} className="text-[var(--blue)]" />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-display font-bold text-sm text-[var(--dark)] mb-1 leading-snug">{t.company}</h3>
                <p className="text-[var(--gray)] text-xs">{t.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Dialog open={!!active} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent className="max-w-2xl p-2 sm:p-4">
          <DialogTitle className="sr-only">{active?.company}</DialogTitle>
          {active && (
            <img src={active.image} alt={active.company} className="w-full h-auto rounded-lg" />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}