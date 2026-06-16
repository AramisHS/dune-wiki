import { createFileRoute } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/SiteChrome";
import { FamilyTreeUnified } from "@/components/FamilyTreeUnified";

export const Route = createFileRoute("/familia")({
    head: () => ({
        meta: [
            { title: "Genealogía de las Grandes Casas · Arrakis Wiki" },
            {
                name: "description",
                content: "Árbol genealógico interactivo de las casas Atreides, Harkonnen y Corrino del universo Dune.",
            },
        ],
    }),
    component: FamilyPage,
});

function FamilyPage() {
    return (
        <div className="min-h-screen">
            <SiteNav />
            <header className="px-6 pt-40 pb-16 md:px-10">
                <div className="mx-auto max-w-7xl">
                    <p className="eyebrow mb-4 animate-shimmer">Linajes del Imperio</p>
                    <h1 className="text-display text-shimmer text-6xl md:text-8xl">
                        Genealogía
                    </h1>
                    <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
                        Explora las conexiones sanguíneas y políticas de las Grandes Casas que
                        forjaron el destino del universo conocido. Haz clic en los nodos para
                        expandir o colapsar ramas.
                    </p>
                </div>
            </header>

            <section className="mx-auto max-w-7xl px-6 pb-24 md:px-10">
                <FamilyTreeUnified />
            </section>

            <SiteFooter />
        </div>
    );
}