import { useState, useRef, useEffect } from "react";
import Tree from "react-d3-tree";
import { unifiedFamilyTree } from "@/lib/dune-data";
import type { RawNodeDatum } from "react-d3-tree";

const containerStyles = {
    width: "100%",
    height: "650px",
    background: "transparent",
    position: "relative" as const,
};

// Colores de las casas (para los nodos)
const houseColors: Record<string, { bg: string; border: string; text: string }> = {
    Atreides: { bg: "#1a0a0a", border: "#8B0000", text: "#d4af37" }, // rojo oscuro + dorado
    Harkonnen: { bg: "#0a0a1a", border: "#2a2a4a", text: "#c0c0c0" }, // azul oscuro + plata
    Corrino: { bg: "#1a1400", border: "#b8860b", text: "#ffd700" }, // dorado
    Vernius: { bg: "#0a1a0a", border: "#2e8b57", text: "#98fb98" }, // verde
    Richese: { bg: "#1a0a1a", border: "#4b0082", text: "#dda0dd" }, // índigo
    "Bene Gesserit": { bg: "#1a0a1a", border: "#800080", text: "#e6b8e6" }, // púrpura
    Fremen: { bg: "#1a120a", border: "#cd853f", text: "#f5deb3" }, // marrón
};

// Componente de nodo personalizado (con diseño mejorado)
const renderCustomNode = ({ nodeDatum, toggleNode }: any) => {
    const house = nodeDatum.attributes?.house || "Desconocido";
    const colors = houseColors[house] || { bg: "#111", border: "#666", text: "#aaa" };
    const hasChildren = nodeDatum.children && nodeDatum.children.length > 0;

    return (
        <g>
            {/* Fondo del nodo (rectángulo con bordes redondeados y sombra) */}
            <rect
                x="-90"
                y="-40"
                width="180"
                height="80"
                rx="8"
                fill={colors.bg}
                stroke={colors.border}
                strokeWidth="2"
                filter="url(#glow)"
                onClick={toggleNode}
                style={{ cursor: "pointer" }}
            />
            {/* Línea decorativa superior */}
            <line
                x1="-80"
                y1="-35"
                x2="80"
                y2="-35"
                stroke={colors.border}
                strokeWidth="1"
                opacity="0.5"
            />
            {/* Nombre */}
            <text
                x="0"
                y="-10"
                textAnchor="middle"
                fill={colors.text}
                fontSize="15"
                fontWeight="bold"
                fontFamily="Cinzel, serif"
                style={{ textShadow: "0 0 10px rgba(212,175,55,0.3)" }}
            >
                {nodeDatum.name}
            </text>
            {/* Título (si existe) */}
            {nodeDatum.attributes?.title && (
                <text
                    x="0"
                    y="12"
                    textAnchor="middle"
                    fill="#a0a0a0"
                    fontSize="10"
                    fontFamily="Inter, sans-serif"
                    fontStyle="italic"
                >
                    {nodeDatum.attributes.title}
                </text>
            )}
            {/* Indicador de colapsable (si tiene hijos) */}
            {hasChildren && (
                <circle
                    cx="80"
                    cy="0"
                    r="10"
                    fill="transparent"
                    stroke={colors.border}
                    strokeWidth="1.5"
                    onClick={toggleNode}
                    style={{ cursor: "pointer" }}
                >
                    <title>{nodeDatum.__collapsed ? "Expandir" : "Colapsar"}</title>
                </circle>
            )}
            {/* Pequeña casa indicadora */}
            <text
                x="-80"
                y="30"
                fontSize="8"
                fill={colors.border}
                fontFamily="monospace"
                opacity="0.6"
            >
                {house.toUpperCase()}
            </text>
        </g>
    );
};

// Función para las líneas de conexión (curvas suaves)
const pathClassFunc = () => "custom-link";

// Estilos CSS para las líneas (se inyectan en el componente)
const linkStyles = `
  .custom-link {
    fill: none;
    stroke: #b8860b;
    stroke-width: 1.5;
    stroke-opacity: 0.4;
    transition: stroke-opacity 0.3s;
  }
  .custom-link:hover {
    stroke-opacity: 0.8;
  }
`;

export function FamilyTreeUnified() {
    const [translate, setTranslate] = useState({ x: 0, y: 80 });
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            const { width } = containerRef.current.getBoundingClientRect();
            setTranslate({ x: width / 2, y: 80 });
        }
    }, []);

    return (
        <div className="relative">
            {/* Inyectar estilos para las líneas */}
            <style>{linkStyles}</style>

            <div
                ref={containerRef}
                style={containerStyles}
                className="rounded-lg border border-spice/20 bg-linear-to-b from-dune-black/80 to-dune-black/40 p-4 shadow-2xl"
            >
                {/* Filtro de brillo para los nodos */}
                <svg style={{ position: "absolute", width: 0, height: 0 }}>
                    <defs>
                        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>
                </svg>

                <Tree
                    data={unifiedFamilyTree as RawNodeDatum}
                    translate={translate}
                    orientation="vertical"
                    renderCustomNodeElement={renderCustomNode}
                    zoomable={true}
                    collapsible={true}
                    separation={{ siblings: 1.5, nonSiblings: 2 }}
                    nodeSize={{ x: 200, y: 130 }}
                    pathFunc="step"
                    pathClassFunc={pathClassFunc}
                    initialDepth={2}
                />
            </div>

            {/* Leyenda de colores */}
            <div className="mt-4 flex flex-wrap justify-center gap-4">
                {Object.entries(houseColors).map(([house, colors]) => (
                    <div key={house} className="flex items-center gap-2">
                        <span
                            className="inline-block h-3 w-3 rounded-full"
                            style={{ backgroundColor: colors.border }}
                        />
                        <span className="font-mono text-[10px] tracking-[0.2em] text-sand/60 uppercase">
                            {house}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}