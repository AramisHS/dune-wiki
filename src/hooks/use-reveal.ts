import { useEffect, useRef } from "react";

export function useReveal<T extends HTMLElement = HTMLElement>(
    dep?: unknown,
    options?: { reset?: boolean; once?: boolean }
) {
    const ref = useRef<T | null>(null);
    const initialized = useRef(false);

    useEffect(() => {
        const root = ref.current;
        if (!root || typeof IntersectionObserver === "undefined") return;

        if (options?.once && initialized.current) return;

        const targets = root.querySelectorAll<HTMLElement>(
            ".reveal, .reveal-zoom, .reveal-left, .reveal-right",
        );

        if (!targets.length) return;

        if (options?.reset) {
            targets.forEach((t) => t.classList.remove("is-visible"));
        }

        const io = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        const el = entry.target as HTMLElement;
                        const delay = Number(el.dataset.delay ?? 0);
                        window.setTimeout(() => el.classList.add("is-visible"), delay);
                        io.unobserve(el);
                    }
                }
            },
            { threshold: 0, rootMargin: "0px" },
        );

        const raf = requestAnimationFrame(() => {
            targets.forEach((t) => io.observe(t));
            initialized.current = true;
        });

        return () => {
            cancelAnimationFrame(raf);
            io.disconnect();
        };
    }, [dep]);

    return ref;
}