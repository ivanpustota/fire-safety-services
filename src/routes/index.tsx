import { createFileRoute } from "@tanstack/react-router";
import Ism from "@/pages/Ism";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Круглосуточный мониторинг пожарной сигнализации | ПожДозор Москва" },
      {
        name: "description",
        content:
          "ПожДозор — мониторинг, обслуживание и ремонт пожарной сигнализации 24/7 в Москве. Реакция за 5 минут, 1200+ объектов. Лицензия МЧС России.",
      },
      {
        name: "keywords",
        content:
          "мониторинг пожарной безопасности, обслуживание пожарной сигнализации, активная защита кровли от пожара, тушение крыши, активная защита от дроновой атаки, защита кровли от БПЛА",
      },
    ],
    links: [{ rel: "canonical", href: "https://pozhdozor.ru/" }],
  }),
  component: Ism,
});
