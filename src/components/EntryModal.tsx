import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export type EntryModalData = {
  name: string;
  subtitle?: string;
  image: string;
  tag?: string;
  quote?: string;
  body: string;
  meta?: { label: string; value: string }[];
};

export function EntryModal({
  open,
  onOpenChange,
  entry,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  entry: EntryModalData | null;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl overflow-hidden border-sand/20 bg-dune-black p-0 text-foreground">
        <DialogTitle className="sr-only">{entry?.name ?? "Entrada"}</DialogTitle>
        <DialogDescription className="sr-only">{entry?.subtitle ?? ""}</DialogDescription>
        {entry && (
          <div className="grid grid-cols-1 md:grid-cols-5">
            <div className="relative md:col-span-2 md:min-h-[440px]">
              <img
                src={entry.image}
                alt={entry.name}
                className="h-full max-h-[260px] w-full object-cover md:max-h-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dune-black via-transparent to-transparent md:bg-gradient-to-r" />
              {entry.tag && (
                <span className="absolute top-4 left-4 border border-spice bg-dune-black/70 px-3 py-1 font-mono text-[9px] tracking-[0.3em] text-spice uppercase backdrop-blur">
                  {entry.tag}
                </span>
              )}
            </div>
            <div className="space-y-5 p-8 md:col-span-3 md:p-10">
              {entry.subtitle && <p className="eyebrow text-spice">{entry.subtitle}</p>}
              <h2 className="text-display text-4xl text-sand-soft md:text-5xl">{entry.name}</h2>
              {entry.quote && (
                <blockquote className="border-l-2 border-spice/60 pl-4">
                  <p className="text-display text-lg italic text-sand-soft">“{entry.quote}”</p>
                </blockquote>
              )}
              <p className="leading-relaxed text-muted-foreground">{entry.body}</p>
              {entry.meta && entry.meta.length > 0 && (
                <dl className="grid grid-cols-2 gap-3 border-t border-sand/10 pt-5">
                  {entry.meta.map((m) => (
                    <div key={m.label}>
                      <dt className="font-mono text-[9px] tracking-[0.3em] text-sand/50 uppercase">
                        {m.label}
                      </dt>
                      <dd className="mt-1 text-sm text-sand-soft">{m.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
