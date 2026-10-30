import { useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import Ism from "@/pages/Ism";

export const Route = createFileRoute("/home")({
  head: () => ({ links: [{ rel: "canonical", href: "https://pozhdozor.ru/" }] }),
  component: RedirectHome,
});

function RedirectHome() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate({ to: "/", replace: true });
  }, [navigate]);
  return <Ism />;
}
