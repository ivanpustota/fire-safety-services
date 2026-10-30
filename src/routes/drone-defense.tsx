import { createFileRoute } from "@tanstack/react-router";
import DroneDefense from "@/pages/DroneDefense";
import { droneFaqs } from "@/pages/drone/droneStatic.data";

const HERO_IMAGE_ABSOLUTE = "https://pozhdozor.ru/assets/drone-hero.webp";
const TITLE = "Защита предприятия и склада от БПЛА: пожаротушение кровли | ПожДозор";

export const Route = createFileRoute("/drone-defense")({
  head: () => ({
    meta: [
      { title: TITLE },
      {
        name: "description",
        content:
          "Активная защита кровли склада и предприятия от пожара при падении БПЛА. Автономная контейнерная установка пожаротушения: дальность струи до 80 метров, независимость от электросети.",
      },
      {
        name: "keywords",
        content:
          "активная защита кровли от пожара, тушение крыши, тушение пожара на крыше склада, защита предприятия от БПЛА, защита предприятия от дронов, пожаротушение на предприятии при атаке БПЛА, защита складов и промышленных предприятий, активная защита от дроновой атаки, защита кровли от БПЛА, пожаротушение при падении беспилотника, автономная установка пожаротушения, контейнерная насосная станция, лафетный ствол пожаротушения, защита склада от дрона, пожарная вышка гидромонитор",
      },
      { property: "og:type", content: "article" },
      { property: "og:locale", content: "ru_RU" },
      { property: "og:url", content: "https://pozhdozor.ru/drone-defense" },
      { property: "og:title", content: TITLE },
      {
        property: "og:description",
        content:
          "Защита кровли предприятия и склада от пожара при падении БПЛА. Дальность струи до 80 метров, полная энергонезависимость.",
      },
      { property: "og:image", content: HERO_IMAGE_ABSOLUTE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: "Активная защита кровли предприятия и склада от БПЛА — установка для тушения крыши",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      {
        name: "twitter:description",
        content: "Защита кровли предприятия и склада от пожара при падении БПЛА. Дальность струи до 80 метров.",
      },
      { name: "twitter:image", content: HERO_IMAGE_ABSOLUTE },
    ],
    links: [{ rel: "canonical", href: "https://pozhdozor.ru/drone-defense" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Активная защита кровли предприятия и склада от пожара и дроновой атаки",
          description:
            "Автономная контейнерная установка для тушения кровли предприятия — активная защита от последствий падения БПЛА и возгорания. Дальность струи воды 70–80 метров, пены 50–60 метров, независимость от электроснабжения объекта за счёт дизельного насоса.",
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
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: droneFaqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: DroneDefense,
});
