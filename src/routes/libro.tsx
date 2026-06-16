import { createFileRoute } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/SiteChrome";
import { DuneBookReader } from "@/components/ui/DuneBookReader";

export const Route = createFileRoute("/libro")({
    head: () => ({
        meta: [
            { title: "Libro · Dune Wiki" },
            {
                name: "description",
                content: "Lee el libro original de Dune de Frank Herbert directamente en tu navegador.",
            },
        ],
    }),
    component: BookPage,
});

function BookPage() {
    return (
        <div className="min-h-screen">
            <SiteNav />
            <header className="px-6 pt-40 pb-16 md:px-10">
                <div className="mx-auto max-w-7xl">
                    <p className="eyebrow mb-4 animate-shimmer">La obra maestra</p>
                    <h1 className="text-display text-shimmer text-6xl md:text-8xl">Dune</h1>
                    <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
                        Sumérgete en la obra maestra de Frank Herbert. Navega por el libro original
                        que dio origen al universo de Arrakis.
                    </p>
                </div>
            </header>

            <section className="mx-auto max-w-7xl px-6 pb-24 md:px-10">
                <DuneBookReader />
            </section>

            <SiteFooter />
        </div>
    );
}