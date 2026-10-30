import { createFileRoute } from "@tanstack/react-router";
import Index from "@/pages/Index";
import { indexHead } from "@/pages/indexHead";

export const Route = createFileRoute("/uslugi")({
  head: () => indexHead("/uslugi"),
  component: Index,
});
