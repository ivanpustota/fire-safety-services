import {useEffect, type ReactNode} from "react";
import {HeadContent, Outlet, Scripts, createRootRoute, useLocation} from "@tanstack/react-router";
import {Toaster} from "@/components/ui/toaster";
import {Toaster as Sonner} from "@/components/ui/sonner";
import {TooltipProvider} from "@/components/ui/tooltip";
import {PLATFORM_META, PLATFORM_SCRIPTS} from "@/platform/scripts.gen";
import {HMR_CLIENT} from "@/platform/dev-hmr";
import PageNotFound from "@/pages/PageNotFound";
import {captureUtm} from "@/lib/utm";
import appCss from "@/index.css?url";

const TITLE = "Круглосуточный мониторинг пожарной сигнализации | ПожДозор Москва";
const DESCRIPTION =
    "ПожДозор — мониторинг, обслуживание и ремонт пожарной сигнализации 24/7 в Москве. Реакция за 5 минут, 1200+ объектов. Лицензия МЧС России.";
const KEYWORDS =
    "мониторинг пожарной сигнализации Москва, удалённый мониторинг пожарной безопасности, контроль пожарной сигнализации 24/7, обслуживание пожарной сигнализации, техническое обслуживание пожарной сигнализации, проверка пожарной сигнализации, мониторинг систем пожаротушения, мониторинг СКУД, мониторинг дымоудаления, центр мониторинга безопасности, диспетчерский мониторинг объектов, неисправность пожарной сигнализации, пожарная безопасность объекта Москва, обслуживание противопожарных систем, ТО пожарной сигнализации, пожарный мониторинг объектов недвижимости, мониторинг пожарных систем цена, подключить мониторинг пожарной сигнализации, круглосуточная система мониторинга противопожарных систем";
const OG_TITLE = "Мониторинг пожарной сигнализации 24/7 | ПожДозор";
const OG_DESCRIPTION =
    "Центр удалённого мониторинга систем пожарной сигнализации. Узнайте о неисправности до аварии и проверки МЧС. Реакция за 5 минут. 1200+ объектов под контролем.";
const OG_IMAGE =
    "https://cdn.poehali.dev/projects/031d4dc8-7cba-4766-8fd9-e78f2a02f069/files/og-image-1790789690421.jpg";
const FAVICON =
    "https://cdn.poehali.dev/projects/031d4dc8-7cba-4766-8fd9-e78f2a02f069/files/favicon-1790868858099.jpg";

const LOCAL_BUSINESS_LD = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "ПожДозор",
    description:
        "Центр удалённого мониторинга систем пожарной безопасности. Круглосуточный контроль исправности пожарной сигнализации, пожаротушения и систем безопасности объекта.",
    url: "https://pozhdozor.ru/",
    telephone: "+74994902201",
    email: "skpb01@mail.ru",
    address: {
        "@type": "PostalAddress",
        streetAddress: "ул. 5-я Магистральная, дом 12, офис 410",
        addressLocality: "Москва",
        addressCountry: "RU",
    },
    openingHoursSpecification: [
        {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "09:00",
            closes: "18:00",
        },
        {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            opens: "00:00",
            closes: "23:59",
            name: "Диспетчерская служба",
        },
    ],
    areaServed: "Москва",
    priceRange: "$$",
    foundingDate: "2016",
    hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Услуги",
        itemListElement: [
            {"@type": "Offer", itemOffered: {"@type": "Service", name: "Удалённый мониторинг пожарной сигнализации 24/7"}},
            {"@type": "Offer", itemOffered: {"@type": "Service", name: "Мониторинг систем пожаротушения"}},
            {"@type": "Offer", itemOffered: {"@type": "Service", name: "Мониторинг систем дымоудаления"}},
            {"@type": "Offer", itemOffered: {"@type": "Service", name: "Монтаж пожарной сигнализации"}},
            {"@type": "Offer", itemOffered: {"@type": "Service", name: "Обслуживание пожарной сигнализации"}},
            {"@type": "Offer", itemOffered: {"@type": "Service", name: "Видеонаблюдение"}},
            {"@type": "Offer", itemOffered: {"@type": "Service", name: "Контроль доступа СКУД"}},
        ],
    },
};

const WWW_REDIRECT = `if (location.hostname.indexOf("www.") === 0) {
  location.replace(location.protocol + "//" + location.hostname.slice(4) + location.pathname + location.search + location.hash);
}`;

const METRIKA = `(function(m,e,t,r,i,k,a){
    m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();
    for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
})(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=109689933', 'ym');
ym(109689933, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});`;

export const Route = createRootRoute({
    head: () => ({
        meta: [
            {charSet: "utf-8"},
            {name: "viewport", content: "width=device-width, initial-scale=1.0"},
            {title: TITLE},
            {name: "description", content: DESCRIPTION},
            {name: "keywords", content: KEYWORDS},
            {name: "robots", content: "index, follow"},
            {name: "yandex-verification", content: "628875a73314f410"},
            {name: "google-site-verification", content: "VmJxLR_P6nWezBBwEh-T_ViHVhoazhyvPRBOIEqXC3U"},
            {name: "author", content: "ПожДозор"},
            {property: "og:type", content: "website"},
            {property: "og:locale", content: "ru_RU"},
            {property: "og:url", content: "https://pozhdozor.ru/"},
            {property: "og:title", content: OG_TITLE},
            {property: "og:description", content: OG_DESCRIPTION},
            {property: "og:image:width", content: "1200"},
            {property: "og:image:height", content: "630"},
            {property: "og:image:alt", content: "ПожДозор — центр мониторинга пожарной безопасности 24/7"},
            {property: "og:image", content: OG_IMAGE},
            {name: "twitter:card", content: "summary_large_image"},
            {name: "twitter:title", content: OG_TITLE},
            {
                name: "twitter:description",
                content: "Центр удалённого мониторинга систем пожарной сигнализации. Реакция за 5 минут. 1200+ объектов под контролем.",
            },
            {name: "twitter:image", content: "https://cdn.poehali.dev/intertnal/img/og.png"},
            ...PLATFORM_META,
        ],
        links: [
            {rel: "stylesheet", href: appCss},
            {rel: "preconnect", href: "https://fonts.googleapis.com"},
            {rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous"},
            {
                rel: "stylesheet",
                href: "https://fonts.googleapis.com/css2?family=Golos+Text:wght@400;500;600;700;800;900&family=PT+Sans:ital,wght@0,400;0,700;1,400&display=swap",
            },
            {rel: "icon", type: "image/jpg", href: FAVICON},
        ],
        // IMPORTANT: DO NOT REMOVE PLATFORM SCRIPTS AND THE DEV HMR CLIENT!
        scripts: [
            ...(import.meta.env.DEV ? [{children: HMR_CLIENT}] : []),
            ...PLATFORM_SCRIPTS,
            {children: WWW_REDIRECT},
            {type: "application/ld+json", children: JSON.stringify(LOCAL_BUSINESS_LD)},
            {children: METRIKA},
        ],
    }),
    component: RootComponent,
    notFoundComponent: PageNotFound,
});

function ScrollToTop() {
    const {pathname, hash} = useLocation();
    useEffect(() => {
        if (hash) {
            const id = hash.replace("#", "");
            let attempts = 0;
            const tryScroll = () => {
                const el = document.getElementById(id);
                if (el) {
                    el.scrollIntoView({behavior: "smooth", block: "start"});
                } else if (attempts < 30) {
                    attempts++;
                    requestAnimationFrame(tryScroll);
                }
            };
            tryScroll();
        } else {
            window.scrollTo(0, 0);
        }
    }, [pathname, hash]);
    return null;
}

function RootComponent() {
    useEffect(() => {
        captureUtm();
    }, []);
    return (
        <RootDocument>
            <TooltipProvider>
                <Toaster/>
                <Sonner/>
                <ScrollToTop/>
                <Outlet/>
            </TooltipProvider>
        </RootDocument>
    );
}

function RootDocument({children}: { children: ReactNode }) {
    return (
        <html lang="ru">
        <head>
            <HeadContent/>
        </head>
        <body>
        {children}
        <noscript>
            <div>
                <img src="https://mc.yandex.ru/watch/109689933" style={{position: "absolute", left: "-9999px"}} alt=""/>
            </div>
        </noscript>
        <Scripts/>
        </body>
        </html>
    );
}
