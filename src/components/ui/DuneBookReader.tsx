import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import duneBook from "@/assets/dune-book.pdf";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCw } from "lucide-react";

const workerUrl = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
).toString();
pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;
interface DuneBookReaderProps {
    file?: string;
}

export function DuneBookReader({ file = duneBook }: DuneBookReaderProps) {
    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [scale, setScale] = useState<number>(1.2);
    const [rotate, setRotate] = useState<number>(0);
    const [isClient, setIsClient] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
        setPageNumber(1);
        setError(null);
    };

    const onDocumentLoadError = (err: Error) => {
        console.error("Error al cargar el PDF:", err);
        setError("No se pudo cargar el libro. Verifica que el archivo exista en: /src/assets/dune-book.pdf");
    };

    const goToPrevPage = () => {
        if (pageNumber > 1) setPageNumber(pageNumber - 1);
    };

    const goToNextPage = () => {
        if (pageNumber < numPages) setPageNumber(pageNumber + 1);
    };

    const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.2, 3));
    const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.4));
    const handleRotate = () => setRotate((prev) => (prev + 90) % 360);

    // No renderizar nada en el servidor
    if (!isClient) {
        return (
            <div className="flex h-[600px] items-center justify-center text-sand/40 text-sm animate-pulse">
                Cargando lector de libros…
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-[600px] p-8 text-center border border-red-500/30 rounded-xl bg-red-500/10">
                <h3 className="text-xl font-display text-red-400 mb-2">Error al cargar el libro</h3>
                <p className="text-muted-foreground">{error}</p>
                <p className="text-xs text-muted-foreground/50 mt-4">
                    Asegúrate de que el archivo existe en la ruta: <code className="bg-dune-black/50 px-2 py-1 rounded">/src/assets/dune-book.pdf</code>
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center gap-4">
            {/* Barra de herramientas */}
            <div className="flex flex-wrap items-center justify-center gap-3 w-full max-w-4xl px-4 py-3 rounded-lg bg-dune-black/60 border border-spice/20 backdrop-blur-sm">
                <button
                    onClick={goToPrevPage}
                    disabled={pageNumber <= 1}
                    className="p-2 rounded hover:bg-spice/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    aria-label="Página anterior"
                >
                    <ChevronLeft className="h-5 w-5 text-sand" />
                </button>

                <span className="font-mono text-sm text-sand/80">
                    Página {pageNumber} de {numPages || "..."}
                </span>

                <button
                    onClick={goToNextPage}
                    disabled={pageNumber >= numPages}
                    className="p-2 rounded hover:bg-spice/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    aria-label="Página siguiente"
                >
                    <ChevronRight className="h-5 w-5 text-sand" />
                </button>

                <div className="w-px h-6 bg-spice/20" />

                <button
                    onClick={handleZoomOut}
                    className="p-2 rounded hover:bg-spice/10 transition-colors"
                    aria-label="Alejar"
                >
                    <ZoomOut className="h-5 w-5 text-sand" />
                </button>

                <span className="font-mono text-xs text-sand/60">{Math.round(scale * 100)}%</span>

                <button
                    onClick={handleZoomIn}
                    className="p-2 rounded hover:bg-spice/10 transition-colors"
                    aria-label="Acercar"
                >
                    <ZoomIn className="h-5 w-5 text-sand" />
                </button>

                <div className="w-px h-6 bg-spice/20" />

                <button
                    onClick={handleRotate}
                    className="p-2 rounded hover:bg-spice/10 transition-colors"
                    aria-label="Rotar"
                >
                    <RotateCw className="h-5 w-5 text-sand" />
                </button>
            </div>

            {/* Visor del PDF */}
            <div className="relative w-full max-w-4xl overflow-auto rounded-xl border border-spice/20 bg-dune-black/40 p-4 shadow-2xl backdrop-blur-sm max-h-[80vh]">
                <Document
                    file={file}
                    onLoadSuccess={onDocumentLoadSuccess}
                    onLoadError={onDocumentLoadError}
                    className="flex justify-center"
                    loading={
                        <div className="flex items-center justify-center h-[500px] text-sand/40 animate-pulse">
                            Cargando páginas…
                        </div>
                    }
                >
                    <Page
                        pageNumber={pageNumber}
                        scale={scale}
                        rotate={rotate}
                        className="shadow-xl rounded-lg"
                        renderTextLayer={true}
                        renderAnnotationLayer={true}
                    />
                </Document>
            </div>

            {/* Contador de páginas al pie */}
            <div className="text-xs text-muted-foreground/50 font-mono tracking-wider">
                {numPages > 0 ? `${pageNumber} / ${numPages}` : "Cargando..."}
            </div>
        </div>
    );
}