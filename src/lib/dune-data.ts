import paul from "@/assets/paul.jpg";
import gesserit from "@/assets/bene-gesserit.jpg";
import jessica from "@/assets/jessica.jpg";
import harkonnen from "@/assets/harkonnen.jpg";
import fremen from "@/assets/fremen.jpg";
import sandworm from "@/assets/sandworm.jpg";
import spice from "@/assets/spice.jpg";
import arrakeen from "@/assets/arrakeen.jpg";
import caladan from "@/assets/caladan.jpg";
import giedi from "@/assets/giedi.jpg";
import leto from "@/assets/leto.jpg";
import stilgar from "@/assets/stilgar.jpg";
import ornithopter from "@/assets/ornithopter.jpg";
import crys from "@/assets/crysknife.png";
import navigator from "@/assets/navigator.jpg";
import stillsuit from "@/assets/stillsuit.jpg";
import chani from "@/assets/chani.jpg";
import vladimir from "@/assets/vladimir.jpg";
import atreides from "@/assets/atreides.jpg";
import cofradia from "@/assets/cofradia.jpg";
import landsraad from "@/assets/landsraad.jpg";
import cosechadora from "@/assets/cosechadora.jpg";
import voz from "@/assets/voz.jpg";
import linaje from "@/assets/linaje.jpg";
import kwisatz from "@/assets/kwisatz-haderach.jpg";
import agua from "@/assets/agua-vida.jpg";
import muad from "@/assets/muad-dib.webp";
import metat from "@/assets/metat.jpg";
import choam from "@/assets/choam.jpg";
import melange from "@/assets/melange.jpg";

/* ===================== PERSONAJES ===================== */

export type Character = {
  slug: string;
  name: string;
  title: string;
  house: string;
  image: string;
  quote: string;
  bio: string;
};

export const characters: Character[] = [
  {
    slug: "paul",
    name: "Paul Atreides",
    title: "Muad'Dib · Lisan al-Gaib",
    house: "Atreides",
    image: paul,
    quote: "El miedo es el asesino de la mente.",
    bio: "Heredero del Duque Leto Atreides y Lady Jessica. Entrenado en las disciplinas Bene Gesserit y Mentat. Tras la caída de su casa, encuentra refugio entre los Fremen, quienes lo reconocen como la voz prometida del desierto.",
  },
  {
    slug: "leto",
    name: "Duque Leto Atreides",
    title: "El Duque Rojo",
    house: "Atreides",
    image: leto,
    quote: "Estaré contigo. Eso es lo que un padre le debe a su hijo.",
    bio: "Patriarca de la Casa Atreides y señor de Caladan. Hombre de honor y carisma magnético, aceptó el feudo envenenado de Arrakis sabiendo que era una trampa imperial. Murió traicionado, pero su legado se convirtió en mito.",
  },
  {
    slug: "jessica",
    name: "Lady Jessica",
    title: "Hermana Bene Gesserit",
    house: "Atreides",
    image: jessica,
    quote: "No conozco el miedo, porque el miedo mata la mente.",
    bio: "Concubina del Duque Leto y madre de Paul. Desobedeció a la Hermandad al engendrar un varón, alterando un programa genético milenario. Maestra de la Voz y del Camino Prana-Bindu.",
  },
  {
    slug: "stilgar",
    name: "Stilgar",
    title: "Naib del Sietch Tabr",
    house: "Fremen",
    image: stilgar,
    quote: "¡Larga vida a los combatientes!",
    bio: "Líder espiritual y militar del Sietch Tabr. Reconoce en Paul al Mahdi prometido por las leyendas Misionaria Protectiva. Guerrero implacable, diplomático sutil y devoto absoluto del desierto.",
  },
  {
    slug: "chani",
    name: "Chani",
    title: "Sayyadina Fremen",
    house: "Fremen",
    image: chani,
    quote: "El desierto recuerda a sus muertos.",
    bio: "Hija del planetólogo Liet-Kynes, guerrera del sietch Tabr. Sus ojos arden con el azul total de la Ibad. Compañera de Paul Muad'Dib y voz crítica de la jihad que se avecina.",
  },
  {
    slug: "vladimir",
    name: "Barón Vladimir Harkonnen",
    title: "Siridar de Giedi Prime",
    house: "Harkonnen",
    image: vladimir,
    quote: "El que controla la especia, controla el universo.",
    bio: "Patriarca cruel y calculador de la Casa Harkonnen. Orquestó la traición contra los Atreides con la complicidad del Emperador Padishah. Suspendido por cinturones gravitatorios sobre las refinerías de Arrakis.",
  },
];

/* ===================== CASAS Y FACCIONES ===================== */

export type House = {
  slug: string;
  name: string;
  motto: string;
  seat: string;
  sigil: string;
  image: string;
  color: string;
  description: string;
  allies?: string[];
  enemies?: string[];
  military?: string;
};

export const houses: House[] = [
  {
    slug: "atreides",
    name: "Casa Atreides",
    motto: "Lealtad y Honor",
    seat: "Caladan · Arrakis",
    sigil: "Halcón Rojo",
    image: atreides,
    color: "oklch(0.72 0.13 70)",
    description:
      "Antiguo linaje de raíces helénicas. Gobernantes de Caladan durante veintiséis generaciones antes de aceptar el feudo envenenado de Arrakis por decreto imperial.",
    allies: ["Fremen", "Casa Vernius (histórica)"],
    enemies: ["Casa Harkonnen", "Emperador Shaddam IV"],
    military: "Tropas de Élite entrenadas por Gurney Halleck y Duncan Idaho.",
  },
  {
    slug: "harkonnen",
    name: "Casa Harkonnen",
    motto: "Miedo y Control",
    seat: "Giedi Prime",
    sigil: "Grifo Negro",
    image: harkonnen,
    color: "oklch(0.58 0.22 25)",
    description:
      "Dinastía industrial nacida de la traición de Abulurd. Su dominio se basa en la crueldad sistemática, la explotación de esclavos y el saqueo de la especia.",
    allies: ["Casa Corrino (secretamente)"],
    enemies: ["Casa Atreides", "Fremen"],
    military: "Sardaukar imperiales prestados, legiones de saqueadores.",
  },
  {
    slug: "fremen",
    name: "Los Fremen",
    motto: "Bi-la kaifa",
    seat: "Sietches del desierto profundo",
    sigil: "Diente de Shai-Hulud",
    image: fremen,
    color: "oklch(0.68 0.18 245)",
    description:
      "Pueblo libre de Arrakis. Descendientes de los Zensunni errantes. Maestros del agua, del traje destilador y del cabalgar gusanos. Aguardan al Mahdi prometido.",
    allies: ["Casa Atreides bajo Muad'Dib"],
    enemies: ["Harkonnen", "Sardaukar"],
    military: "Fedaykin: comandos suicidas, los mejores guerreros del Imperio.",
  },
  {
    slug: "bene-gesserit",
    name: "Bene Gesserit",
    motto: "Existimos para servir",
    seat: "Wallach IX",
    sigil: "Ojo sin párpado",
    image: gesserit,
    color: "oklch(0.62 0.21 305)",
    description:
      "Hermandad milenaria de mujeres entrenadas en la Voz, la memoria genética y la observación. Tejen siglos de planes a través del programa Kwisatz Haderach.",
    allies: ["Todas las casas (infiltración)"],
    enemies: ["Bene Tleilax"],
    military: "No tienen ejército. Su arma es el conocimiento y la palabra.",
  },
  {
    slug: "cofradia",
    name: "Cofradía Espacial",
    motto: "El monopolio es la verdad",
    seat: "Junction",
    sigil: "Infinito plegado",
    image: cofradia,
    color: "oklch(0.67 0.13 165)",
    description:
      "Monopolio absoluto del viaje interestelar. Sus Navegantes, mutados por la especia, pliegan el espacio con presciencia. Sin Cofradía, el Imperio se desmorona.",
    allies: ["CHOAM"],
    enemies: ["Quien amenace la oferta de especia"],
    military: "Ninguna; controlan el universo por dependencia logística.",
  },
  {
    slug: "landsraad",
    name: "El Landsraad",
    motto: "Equilibrio del poder",
    seat: "Kaitain (sesiones)",
    sigil: "Anillo de las Grandes Casas",
    image: landsraad,
    color: "oklch(0.92 0.01 95)",
    description:
      "Consejo de las Grandes Casas del Imperio. Contrapeso político del Emperador Padishah. Allí se votan kanlys, alianzas matrimoniales y guerras feudales.",
    allies: ["Bene Gesserit", "CHOAM"],
    enemies: ["Cualquier intento imperial de tiranía absoluta"],
    military: "La suma de los ejércitos de todas las Grandes Casas.",
  },
];

/* ===================== LUGARES ===================== */

export type Place = {
  slug: string;
  name: string;
  nickname: string;
  image: string;
  coords: string;
  climate: string;
  fauna: string;
  imperial: string;
  description: string;
  starX: number;
  starY: number;
};

export const places: Place[] = [
  {
    slug: "arrakis",
    name: "Arrakis",
    nickname: "Dune",
    image: arrakeen,
    coords: "Sistema Canopus",
    climate: "Desértico extremo · sin lluvia registrada",
    fauna: "Shai-Hulud, ratón saltarín, halcón del desierto",
    imperial: "Feudo rotativo · fuente única de melange",
    description:
      "El único mundo conocido donde se produce la especia melange. Un planeta desértico donde el agua vale más que la sangre y los gusanos gigantes recorren las dunas como dioses.",
    starX: 62,
    starY: 48,
  },
  {
    slug: "caladan",
    name: "Caladan",
    nickname: "Hogar del Halcón",
    image: caladan,
    coords: "Delta Pavonis",
    climate: "Oceánico templado · tormentas constantes",
    fauna: "Pundi rice, peces gigantes, aves marinas",
    imperial: "Feudo hereditario de la Casa Atreides",
    description:
      "Mundo oceánico y templado, hogar ancestral de los Atreides. Un paraíso de mares tormentosos, castillos sobre acantilados y cielos eternamente nublados.",
    starX: 22,
    starY: 30,
  },
  {
    slug: "giedi-prime",
    name: "Giedi Prime",
    nickname: "Mundo Harkonnen",
    image: giedi,
    coords: "Ophiuchi B",
    climate: "Industrial · cielos cargados de hollín",
    fauna: "Casi extinta · esclavos humanos en su lugar",
    imperial: "Feudo hereditario de la Casa Harkonnen",
    description:
      "Planeta industrial bañado por un sol negro. Sus arenas son cenizas, sus mares son aceite. Capital del horror burocrático de los Harkonnen.",
    starX: 80,
    starY: 22,
  },
];

/* ===================== CRIATURAS ===================== */

export const creatures = [
  {
    slug: "shai-hulud",
    name: "Shai-Hulud",
    aka: "Gusano de Arena · El Hacedor",
    image: sandworm,
    description:
      "Titanes vermiformes de cientos de metros. Su ciclo vital crea la especia. Los Fremen los cabalgan con ganchos de doma; los profanos son devorados sin distinción.",
  },
  {
    slug: "melange",
    name: "Melange",
    aka: "La Especia · El Maná",
    image: melange,
    description:
      "Geriátrica, expansora de consciencia, esencial para los Navegantes de la Cofradía. Quien la controla, controla el universo. Quien la destruye, lo destruye todo.",
  },
];

/* ===================== CÓDICE ===================== */

export type CodexEntry = {
  slug: string;
  name: string;
  subtitle: string;
  image: string;
  short: string;
  body: string;
  tag: string;
};

export type CodexCategory = {
  id: "tecnologia" | "bene-gesserit" | "instituciones" | "criaturas";
  label: string;
  blurb: string;
  entries: CodexEntry[];
};

export const codex: CodexCategory[] = [
  {
    id: "tecnologia",
    label: "Tecnología de Arrakis",
    blurb: "Artefactos forjados para sobrevivir al desierto y dominar la especia.",
    entries: [
      {
        slug: "crys",
        name: "Crys",
        subtitle: "Diente de Shai-Hulud",
        image: crys,
        tag: "Arma sagrada",
        short: "Cuchillo tallado del diente de un gusano de arena.",
        body: "El crys es la única arma que un Fremen jamás envaina sin sangre. Tallado del cristal dental de un Shai-Hulud, se considera sagrado: revelar uno fuera del sietch obliga al portador a matar o morir. Existen dos formas: fija (endurecida por el estómago del gusano) y libre (orgánica, frágil al frío).",
      },
      {
        slug: "destiltraje",
        name: "Destiltraje",
        subtitle: "Stillsuit · Segunda piel",
        image: stillsuit,
        tag: "Supervivencia",
        short: "Traje que recicla la humedad corporal hasta la última gota.",
        body: "Tejido de microsándwich con bombas de talón. Captura sudor, orina y aliento; los filtra y los devuelve potables a través de tubos de cuello. Un destiltraje bien ajustado pierde apenas un dedal de agua al día. Mal puesto, mata en horas.",
      },
      {
        slug: "ornitoptero",
        name: "Ornitóptero",
        subtitle: "Tóptero · Alas de libélula",
        image: ornithopter,
        tag: "Vehículo",
        short: "Aeronave de alas batientes, esencial sobre las dunas.",
        body: "El único vuelo viable sobre Arrakis: el batir de sus alas imita libélulas para minimizar la firma vibratoria que atrae a los gusanos. Modelos Atreides priorizan agilidad; los Harkonnen, blindaje. Cabina presurizada con escudo Holtzman opcional.",
      },
      {
        slug: "cosechadora",
        name: "Cosechadora de especia",
        subtitle: "Crawler · Factoría móvil",
        image: cosechadora,
        tag: "Industria",
        short: "Planta industrial sobre orugas que recolecta melange.",
        body: "Coloso de varias decenas de toneladas que aspira especia de la arena bajo presión. Vulnerable: cada vibración atrae a Shai-Hulud. Por eso vuela escoltada por ornitópteros y por la nave-grúa que la evacúa cuando aparece el gusano.",
      },
    ],
  },
  {
    id: "bene-gesserit",
    label: "Disciplinas Bene Gesserit",
    blurb: "Diez mil años de paciencia tejidos en carne, voz y memoria.",
    entries: [
      {
        slug: "la-voz",
        name: "La Voz",
        subtitle: "Imponer la voluntad con la garganta",
        image: voz,
        tag: "Disciplina",
        short: "Modular la voz para anular el libre albedrío ajeno.",
        body: "Las hermanas leen los matices psicológicos del oyente y construyen frases moduladas en frecuencia y ritmo capaces de sortear su corteza racional. Una orden dicha con la Voz se obedece antes de ser comprendida. Resiste solo el entrenado o quien ya conoce el truco.",
      },
      {
        slug: "linaje-selectivo",
        name: "Linaje Selectivo",
        subtitle: "Programa genético milenario",
        image: linaje,
        tag: "Eugenesia",
        short: "Cruces planificados durante miles de generaciones.",
        body: "La Hermandad cruza líneas sanguíneas de las Grandes Casas siguiendo un plan que solo conocen las Madres Superioras. El objetivo: condensar dones prescientes y memoria ancestral en un único ser. Lady Jessica rompió el plan al engendrar un varón Atreides.",
      },
      {
        slug: "kwisatz-haderach",
        name: "Kwisatz Haderach",
        subtitle: "El que acorta el camino",
        image: kwisatz,
        tag: "Profecía",
        short: "Macho Bene Gesserit capaz de cruzar el espacio interior.",
        body: "Un varón que pueda mirar simultáneamente los recuerdos masculinos y femeninos, y ver más allá del tiempo. Paul Atreides cumplió la profecía una generación antes de lo previsto y, con su hijo Leto II, llevó a la humanidad por el Sendero Dorado.",
      },
      {
        slug: "agua-de-vida",
        name: "Agua de Vida",
        subtitle: "Veneno transmutado",
        image: agua,
        tag: "Rito",
        short: "Líquido exhalado por gusanos jóvenes al morir.",
        body: "Veneno mortal para todos excepto para una Reverenda Madre, que puede transmutarlo dentro de su propio organismo. El rito desbloquea la memoria de todas sus antepasadas. Beberlo siendo varón mata o despierta al Kwisatz Haderach.",
      },
    ],
  },
  {
    id: "instituciones",
    label: "Instituciones del Imperio",
    blurb: "Las fuerzas invisibles que sostienen el equilibrio del Padishah.",
    entries: [
      {
        slug: "cofradia",
        name: "Cofradía Espacial",
        subtitle: "Spacing Guild · Monopolio del vacío",
        image: navigator,
        tag: "Poder",
        short: "Los únicos que pueden plegar el espacio sin pensar.",
        body: "Sus Navegantes, mutados por décadas de especia, ven los rumbos a través del tiempo y guían las naves de la Liga sin un cálculo Mentat. Cobran en especia. Su discreción es legendaria: no toman partido, pero quien amenace el flujo de melange firma su sentencia.",
      },
      {
        slug: "landsraad",
        name: "Landsraad",
        subtitle: "Concilio de las Grandes Casas",
        image: landsraad,
        tag: "Política",
        short: "Asamblea feudal que contrapesa al Emperador.",
        body: "Reúne a las Casas Mayores y Menores del Imperio en sesiones en Kaitain. Sus protocolos —kanly, Asamblea, Faufreluches— impiden que el Emperador acumule poder absoluto. La Carta del Landsraad protege incluso a la casa más pequeña… mientras tenga aliados.",
      },
      {
        slug: "choam",
        name: "CHOAM",
        subtitle: "Compañía Honnete Ober Advancer Mercantiles",
        image: choam,
        tag: "Comercio",
        short: "El cartel que mueve cada solari del Imperio.",
        body: "Toda transacción interestelar pasa por CHOAM. Sus directores son el Emperador, las Grandes Casas, la Cofradía y la Bene Gesserit por persona interpuesta. La especia constituye la mayor parte de sus ingresos: por eso Arrakis vale más que cualquier ejército.",
      },
      {
        slug: "mentat",
        name: "Mentat",
        subtitle: "Computadoras humanas",
        image: metat,
        tag: "Disciplina",
        short: "Mentes entrenadas para sustituir a las máquinas pensantes.",
        body: "Tras la Jihad Butleriana, las computadoras conscientes fueron prohibidas. Los Mentats las reemplazaron: humanos que procesan datos en cascada, ven patrones invisibles y proyectan futuros plausibles. Thufir Hawat sirvió tres generaciones de Atreides.",
      },
    ],
  },
  {
    id: "criaturas",
    label: "Criaturas de Arrakis",
    blurb: "La biosfera del desierto, articulada alrededor de un solo dios.",
    entries: [
      {
        slug: "shai-hulud",
        name: "Shai-Hulud",
        subtitle: "El Hacedor · El Viejo del Desierto",
        image: sandworm,
        tag: "Sagrado",
        short: "Gusano de arena de cientos de metros.",
        body: "Apex absoluto del desierto. Su ciclo vital — trucha de arena, gusano joven, leviatán — produce la especia. Los Fremen lo cabalgan con ganchos de doma como rito de adultez. Para todos los demás, Shai-Hulud es un dios al que solo se le ve la garganta.",
      },
      {
        slug: "muad-dib",
        name: "Muad'Dib",
        subtitle: "Ratón saltarín del desierto",
        image: muad,
        tag: "Tótem",
        short: "Pequeño roedor que enseña al hombre cómo sobrevivir.",
        body: "Salta entre dunas sin atraer al gusano y bebe el rocío de las rocas al amanecer. Los Fremen lo veneran como instructor. Paul Atreides escogió su nombre Fremen del cielo nocturno donde su sombra dibuja la constelación.",
      },
    ],
  },
];

/* ===================== CHAKOBSA ===================== */

export type ChakobsaEntry = {
  meaning: string;
  note?: string;
  verified: boolean;
};

export const chakobsaLanguage: Record<string, ChakobsaEntry> = {
  // ── Verbos ──
  aaha: { meaning: "Entrar, moverse hacia, subir a", verified: true },
  abrana: { meaning: "Gustar, disfrutar", verified: true },
  aga: { meaning: "Golpear, impactar", verified: true },
  anzadha: { meaning: "Traer, cargar, llevar", verified: true },
  anzaga: { meaning: "Lograr, conseguir, terminar con éxito", verified: true },
  atmara: { meaning: "Permanecer, quedarse, seguir estando", verified: true },
  azaga: { meaning: "Parecer, aparentar", verified: true },
  bana: { meaning: "Recostarse", verified: true },
  baza: { meaning: "Bailar", verified: true },
  bela: { meaning: "Sostener, sujetar", verified: true },
  belaza: { meaning: "Mantener, conservar", verified: true },
  chiva: { meaning: "Doblar, girar, torcer", verified: true },
  chiveladha: { meaning: "Desmontar, bajarse de", verified: true },
  chivala: { meaning: "Preocuparse", verified: true },
  chuka: { meaning: "Romper", verified: true },
  chukadha: { meaning: "Destrozar, hacer añicos", verified: true },
  dhauva: { meaning: "Necesitar", verified: true },
  dhika: { meaning: "Dar", verified: true },
  dhuavala: { meaning: "Sufrir", verified: true },
  dhuza: { meaning: "Desperdiciar", verified: true },
  dimadha: { meaning: "Cortar, amputar, atravesar cortando", verified: true },
  dimadhag: { meaning: "Decidir, elegir, juzgar", verified: true },
  dimala: { meaning: "Guiar, liderar, dirigir", verified: true },
  eladha: { meaning: "Montar, trepar a la cima de", verified: true },
  era: { meaning: "Medir (el tiempo)", verified: true },
  faiza: { meaning: "Saltar, brincar", verified: true },
  gasa: { meaning: "Estar libre, ser libre", verified: true },
  hadha: { meaning: "Detener, cesar, parar", verified: true },
  heshya: { meaning: "Ver", verified: true },
  heshidha: { meaning: "Ser testigo de", verified: true },
  heshisha: { meaning: "Prever, profetizar", verified: true },
  hiila: { meaning: "Reunir, recolectar", verified: true },
  hura: { meaning: "Llegar, arribar", verified: true },
  huraha: { meaning: "Reunirse, congregarse", verified: true },
  hurana: { meaning: "Visitar", verified: true },
  isadha: { meaning: "Irse, salir, marcharse", verified: true },
  isatha: { meaning: "Salir, despejarse (nubes, niebla)", verified: true },
  ithaza: { meaning: "Celebrar, alabar, bendecir", verified: true },
  jaha: { meaning: "Temer, tener miedo", verified: true },
  jahafa: { meaning: "Cambiar, transformarse", verified: true },
  jara: { meaning: "Contar, decir, hablar", verified: true },
  jila: { meaning: "Ir, viajar", verified: true },
  jiladha: { meaning: "Llegar hasta, alcanzar", verified: true },
  lafa: { meaning: "Robar, tomar sin permiso", verified: true },
  leda: { meaning: "Saber, conocer", verified: true },
  ledaga: { meaning: "Entender, comprender", verified: true },
  lija: { meaning: "Comer", verified: true },
  lijana: { meaning: "Picar, comer un poco, merendar", verified: true },
  lisana: { meaning: "Susurrar (muy suavemente)", verified: true },
  mara: { meaning: "Oír, escuchar", verified: true },
  medhadha: { meaning: "Prevalecer, triunfar", verified: true },
  minaza: { meaning: "Creer, pensar", verified: true },
  murasha: { meaning: "Arrodillarse", verified: true },
  nada: { meaning: "Montar, cabalgar", verified: true },
  nakala: { meaning: "Medir", verified: true },
  naza: { meaning: "Cargar, llevar peso", verified: true },
  qada: { meaning: "Gobernar, reinar", verified: true },
  qazdha: { meaning: "Merecer", verified: true },
  qira: { meaning: "Estar de pie, pararse", verified: true },
  qirasha: { meaning: "Levantarse; estar a punto de", verified: true },
  qithala: { meaning: "Escribir", verified: true },
  qula: { meaning: "Nacer, comenzar a existir", verified: true },
  saha: { meaning: "Tomar, recoger, conseguir", verified: true },
  sahala: { meaning: "Aceptar (en sentido amplio)", verified: true },
  sahatha: { meaning: "Permitir, dejar", verified: true },
  saika: { meaning: "Encontrar, descubrir", verified: true },
  sayaga: { meaning: "Confiar", verified: true },
  shenaza: { meaning: "Crear, hacer", verified: true },
  shaida: { meaning: "Amanecer", verified: true },
  shuna: { meaning: "Dormir", verified: true },
  tama: { meaning: "Esperar, aguardar", verified: true },
  tasa: { meaning: "Golpear, atacar", verified: true },
  tukafa: { meaning: "Astillar", verified: true },
  unara: { meaning: "Existir, haber", verified: true },
  uzzula: { meaning: "Estar muerto", verified: true },
  uzzulatha: { meaning: "Morir", verified: true },
  vaasha: { meaning: "Estar seco", verified: true },
  vaashadha: { meaning: "Aniquilar, destruir, borrar de la existencia", verified: true },
  vaija: { meaning: "Ser verdad", verified: true },
  vana: { meaning: "Suceder, ocurrir", verified: true },
  vizala: { meaning: "Cazar", verified: true },
  yala: { meaning: "Acostarse, tumbarse", verified: true },
  yazala: { meaning: "Preferir, favorecer", verified: true },
  zaiha: { meaning: "Beber, sorber", verified: true },
  zama: { meaning: "Pelear, luchar", verified: true },
  zeyasha: { meaning: "Comenzar a disolverse, comenzar a desvanecerse", verified: true },

  // ── Sustantivos comunes ──
  abzih: { meaning: "Mundo", verified: true },
  afshil: { meaning: "Tormenta", verified: true },
  akshahi: { meaning: "Amigo", verified: true },
  alfis: { meaning: "Botín, lo que ha sido robado", verified: true },
  alfit: { meaning: "Ladrón, ratero", verified: true },
  belak: { meaning: "Pilar", verified: true },
  belit: { meaning: "Guardián, custodio", verified: true },
  bil: { meaning: "Mujer", verified: true },
  biin: { meaning: "Cosa, objeto", verified: true },
  budhni: { meaning: "Sopa", verified: true },
  chaim: { meaning: "¿Dónde?", verified: true },
  chausij: { meaning: "El elegido", verified: true },
  chifthit: { meaning: "Bruja", verified: true },
  chimib: { meaning: "Alegría", verified: true },
  dimi: { meaning: "Filo (de una hoja)", verified: true },
  dimib: { meaning: "Cuchillo", verified: true },
  eddemi: { meaning: "Vida", verified: true },
  ekkeri: { meaning: "Agua", verified: true },
  ergevi: { meaning: "Mes", verified: true },
  erhuri: { meaning: "Año", verified: true },
  fadil: { meaning: "Paz", verified: true },
  faidhi: { meaning: "Alma, espíritu", verified: true },
  fashib: { meaning: "Mordaza, cubridor de boca", verified: true },
  fish: { meaning: "Viento", verified: true },
  fizi: { meaning: "Sol", verified: true },
  fremin: { meaning: "Fremen", verified: true },
  gari: { meaning: "Roca, piedra", verified: true },
  garig: { meaning: "Fuerza, poder, durabilidad", verified: true },
  garim: { meaning: "Montaña", verified: true },
  gev: { meaning: "Luna", verified: true },
  gifi: { meaning: "Sendero, camino, rastro", verified: true },
  gifith: { meaning: "Costumbre, método, modo", verified: true },
  haufi: { meaning: "Polvo", verified: true },
  hiilih: { meaning: "Todo, la totalidad", verified: true },
  ifir: { meaning: "Poder, fuerza (singular)", verified: true },
  ifri: { meaning: "Poder, fuerza", verified: true },
  ish: { meaning: "Momento", verified: true },
  jahi: { meaning: "Miedo", verified: true },
  jamis: { meaning: "Jamis", note: "Nombre propio Fremen", verified: true },
  jarib: { meaning: "Historia, relato", verified: true },
  kali: { meaning: "Madre", verified: true },
  kalig: { meaning: "Abuela", verified: true },
  jovi: { meaning: "Padre", verified: true },
  jovig: { meaning: "Abuelo", verified: true },
  kalihi: { meaning: "Ancestros, linaje", verified: true },
  kwadi: { meaning: "Hijo", verified: true },
  kyurih: { meaning: "Lengua, idioma", verified: true },
  ledag: { meaning: "Comprensión, entendimiento", verified: true },
  ledah: { meaning: "Conocimiento", verified: true },
  ledib: { meaning: "Profecía", verified: true },
  lehhiz: { meaning: "Guardián", verified: true },
  leki: { meaning: "Arena", verified: true },
  leksit: { meaning: "Extranjero, foráneo", verified: true },
  liiyet: { meaning: "Liet", note: "Nombre propio Fremen (Liet-Kynes)", verified: true },
  "lis'hi": { meaning: "Rumor, rumores, susurros", verified: true },
  lishi: { meaning: "Fuego", verified: true },
  lishik: { meaning: "Llama, chorro de llama", verified: true },
  medhidh: { meaning: "Victoria", verified: true },
  minizidh: { meaning: "Fe", verified: true },
  mwaddib: { meaning: "Ratón del desierto", verified: true },
  noqij: { meaning: "Gusano de arena", verified: true },
  oggori: { meaning: "Café", verified: true },
  qadim: { meaning: "Reino, dominio", verified: true },
  qadit: { meaning: "Rey, reina", verified: true },
  qeli: { meaning: "Luz", verified: true },
  qumih: { meaning: "Noche", verified: true },
  rabjil: { meaning: "Espía", verified: true },
  reshim: { meaning: "Desierto", verified: true },
  rudhi: { meaning: "Mano", verified: true },
  ruzam: { meaning: "Mente", verified: true },
  shadaut: { meaning: "Sacador de agua del pozo", verified: true },
  shadvi: { meaning: "Pozo", verified: true },
  shaidih: { meaning: "Amanecer, salida del sol", verified: true },
  shayil: { meaning: "Ancestro", verified: true },
  shidhgim: { meaning: "Paraíso", verified: true },
  shiidhish: { meaning: "Señal del gusano", verified: true },
  shiidhiz: { meaning: "Presagio, señal", verified: true },
  sich: { meaning: "Sietch", note: "Forma Chakobsa de 'sietch'", verified: true },
  sob: { meaning: "Nada", verified: true },
  tamrih: { meaning: "Otro", verified: true },
  thani: { meaning: "Cuerpo", verified: true },
  thodhit: { meaning: "Prisionero", verified: true },
  tuli: { meaning: "Salud, salubridad", verified: true },
  ukrib: { meaning: "Juramento, promesa, palabra, honor", verified: true },
  uuthig: { meaning: "Ojo interior", note: "La visión presciente", verified: true },
  uzzuli: { meaning: "Muerte", verified: true },
  uzzulich: { meaning: "Pequeña muerte", note: "El miedo; referido en la letanía Bene Gesserit", verified: true },
  vaashidh: { meaning: "Aniquilación, destrucción total", verified: true },
  vaiyiz: { meaning: "Melange, especia", verified: true },
  vanir: { meaning: "Destino, lo que se merece", verified: true },
  veyzish: { meaning: "Gusano de arena", note: "Término alternativo", verified: true },
  vizdhik: { meaning: "Asesino, agente letal (ej. veneno)", verified: true },
  zamig: { meaning: "Lado derecho (del cuerpo)", verified: true },
  zamih: { meaning: "Batalla", verified: true },
  zamil: { meaning: "Pelea, combate", verified: true },
  zamit: { meaning: "Luchador, combatiente", verified: true },
  zami: { meaning: "Puño", verified: true },
  zuni: { meaning: "Hogar", verified: true },
  // ── Adjetivos ──
  cheshii: { meaning: "Bueno, bien hecho", note: "Del Excel Chakobsa", verified: true },
  ezlii: { meaning: "Sagrado, santo", verified: true },
  fashii: { meaning: "Tranquilo, silencioso", verified: true },
  gaihii: { meaning: "Frío", verified: true },
  junii: { meaning: "Aún, todavía", verified: true },
  "lehii": { meaning: "Seguro, libre de peligro", verified: true },
  lifiiyith: { meaning: "Sigiloso, furtivo, clandestino", verified: true },
  ludhii: { meaning: "Joven", verified: true },
  nichii: { meaning: "Rápido, veloz", verified: true },
  omiig: { meaning: "Duro, difícil", verified: true },
  omiith: { meaning: "Digno, merecedor", verified: true },
  reshii: { meaning: "Largo", verified: true },
  thijii: { meaning: "Puro", verified: true },
  vejii: { meaning: "Verdadero, real, genuino", verified: true },
  // ── Frases y expresiones (lenguaje) ──
  "a-gef": { meaning: "¡Vamos!", note: "Expresión de movimiento grupal", verified: true },
  "belal kaifa": { meaning: "Amén; sin excepción", note: "Variante de Bi-la kaifa", verified: true },
  chivrassha: { meaning: "Adiós", verified: true },
  "e akshahi": { meaning: "Hermano, hermana", note: "Saludo entre amigos Fremen", verified: true },
  "ekkeri akahai": { meaning: "¡Bienvenido! (Nuestra agua es tu agua)", note: "Saludo Fremen de hospitalidad", verified: true },
  "fadilii": { meaning: "Gracias (informal)", verified: true },
  "fadilii ruk": { meaning: "Gracias a todos vosotros", verified: true },
  "fadilii rush": { meaning: "Gracias (a ti)", verified: true },
  "fadilim ruk": { meaning: "Os damos las gracias a todos", verified: true },
  "fadilim rush": { meaning: "Te damos las gracias", verified: true },
  nifri: { meaning: "Poder, ser capaz", verified: true },
  nifriha: { meaning: "Podría ser", verified: true },
  "ru cheshah": { meaning: "Por favor", verified: true },
  "sa fadla": { meaning: "Hola, saludos (en paz)", note: "Saludo formal Fremen", verified: true },
  "sa garga": { meaning: "Por la fuerza, por el poder", verified: true },
  "sah-ifir": { meaning: "Por el poder", verified: true },
  "ekkeri eddema": { meaning: "El Agua de Vida", note: "Frase ritual Fremen", verified: true },
};

export const duneTerminology: Record<string, ChakobsaEntry> = {
  "muad'dib": { meaning: "El ratón saltarín del desierto; nombre tribal de Paul", note: "Símbolo de fuerza y supervivencia", verified: true },
  muaddib: { meaning: "Variante sin apóstrofo de Muad'Dib", verified: true },
  "shai-hulud": { meaning: "Gran gusano de arena; El Hacedor", note: "Nombre que se pronuncia con reverencia", verified: true },
  "shai hulud": { meaning: "Gran gusano de arena; El Hacedor", verified: true },
  "lisan al-gaib": { meaning: "La voz del mundo exterior; el Mesías profetizado", verified: true },
  mahdi: { meaning: "Aquel que nos guiará al Paraíso", verified: true },
  usul: { meaning: "La base del pilar; nombre íntimo de Paul en el sietch", verified: true },
  fedaykin: { meaning: "Comandos de la muerte; guardia personal del Mahdi", verified: true },
  naib: { meaning: "Servidor jurado; líder del sietch", verified: true },
  sayyadina: { meaning: "Acólita sacerdotal Fremen", verified: true },
  "bi-la kaifa": { meaning: "Amén; literalmente: nada más necesita ser explicado", note: "Expresión de finalidad", verified: true },
  kanly: { meaning: "Vendetta formal entre Grandes Casas", verified: true },
  kwisatz: { meaning: "El que acorta; referido al Haderach", verified: true },
  haderach: { meaning: "El camino; el sendero del Kwisatz", verified: true },
  jihad: { meaning: "Guerra santa; cruzada de los Fremen", verified: true },
  ibad: { meaning: "El azul total de los ojos saturados de especia", verified: true },
  ya: { meaning: "Oh (vocativo); grito de combate", verified: true },
  "ya hya chouhada": { meaning: "Larga vida a los combatientes", note: "Grito de batalla Fedaykin", verified: true },
  hajra: { meaning: "Viaje de búsqueda", verified: true },
  melange: { meaning: "La especia; el maná del universo", verified: true },
  crys: { meaning: "Cuchillo sagrado tallado del diente de Shai-Hulud", verified: true },
  crysknife: { meaning: "Sinónimo común de crys", verified: true },
  destiltraje: { meaning: "Stillsuit; traje que recicla la humedad corporal", verified: true },
  stillsuit: { meaning: "Destiltraje", verified: true },
  sardaukar: { meaning: "Tropas de élite del Emperador Padishah", verified: true },
  arrakis: { meaning: "El planeta Dune; único mundo de la especia", verified: true },
  dune: { meaning: "Apodo común de Arrakis", verified: true },
  caladan: { meaning: "Mundo oceánico, hogar ancestral de los Atreides", verified: true },
  "giedi prime": { meaning: "Mundo industrial de los Harkonnen", verified: true },
  agua_de_vida: { meaning: "Veneno transmutado por una Reverenda Madre", verified: true },
  voz: { meaning: "Disciplina Bene Gesserit que somete la voluntad ajena", verified: true },
  baraka: { meaning: "Bendición sagrada; hacedor de milagros", verified: true },
  miseratus: { meaning: "Compasión; usado entre Fremen jurados", verified: true },

  abra: { meaning: "Lágrima", note: "Pl. ibar", verified: true },
  adab: { meaning: "Memoria insistente; recuerdo que exige ser escuchado", verified: true },
  akrab: { meaning: "Escorpión", verified: true },
  alam: { meaning: "Penas; sufrimientos", verified: true },
  alazor: { meaning: "Arena vieja y oxidada, de color amarillo a marrón rojizo", verified: true },
  almirez: { meaning: "Arena nueva, generalmente de color gris", verified: true },
  araq: { meaning: "Sudor", verified: true },
  atambal: { meaning: "Arena compacta que amplifica el sonido; se encuentra en la cara de barlovento de las dunas", verified: true },
  bakka: { meaning: "El Llorador", verified: true },
  baz: { meaning: "Halcón", verified: true },
  bled: { meaning: "Desierto plano y abierto", verified: true },
  chaumas: { meaning: "Veneno en alimento sólido", verified: true },
  chaumurky: { meaning: "Veneno en bebida", verified: true },
  cherem: { meaning: "Hermandad del odio", verified: true },
  chouhada: { meaning: "Luchadores con propósito", verified: true },
  cielago: { meaning: "Murciélago del desierto", note: "Del español 'murciélago'", verified: true },
  chukka: { meaning: "Alimento preparado con carne", verified: true },
  "el-sayal": { meaning: "Lluvia de arena o polvo de altitudes medias que trae humedad", verified: true },
  entary: { meaning: "Vestido transparente usado por mujeres Fremen", verified: true },
  galbana: { meaning: "Arena fina tipo guisante que requiere movimiento lento", verified: true },
  garrufo: { meaning: "Arena de piedrecillas que proporciona pisada firme", verified: true },
  ghafla: { meaning: "Negligencia", verified: true },
  ghanima: { meaning: "Botín de guerra", verified: true },
  hajj: { meaning: "Peregrinación sagrada", verified: true },
  "hal yawm": { meaning: "¡Ahora! ¡Por fin!", note: "Exclamación", verified: true },
  hiereg: { meaning: "Campamento en el desierto", verified: true },
  ichwan: { meaning: "Hermandad", verified: true },
  idray: { meaning: "Manos", verified: true },
  idras: { meaning: "Arena peligrosa", verified: true },
  "ikhut-eigh": { meaning: "Vendedor de agua", verified: true },
  ilm: { meaning: "Teología", verified: true },
  istislah: { meaning: "Ley de guerra", verified: true },
  jubba: { meaning: "Tipo de capa o manto", verified: true },
  kala: { meaning: "Desierto", verified: true },
  karama: { meaning: "Milagro", verified: true },
  kaveh: { meaning: "Café", verified: true },
  kaymun: { meaning: "Arena finamente molida como polvo", verified: true },
  ketman: { meaning: "Práctica de ocultar la identidad cuando revelarla podría ser dañino", verified: true },
  khala: { meaning: "Invocación de espíritu", verified: true },
  kindjal: { meaning: "Espada corta curva de doble filo", verified: true },
  kiswa: { meaning: "Figura o diseño ornamental", verified: true },
  kuhar: { meaning: "Bueno", verified: true },
  "kull wahad": { meaning: "Estoy profundamente conmovido", verified: true },
  "kwisatz haderach": { meaning: "El acortador del camino; el Mesías Bene Gesserit", verified: true },
  liban: { meaning: "Bebida de especia", verified: true },
  maqbara: { meaning: "Cementerio", verified: true },
  matar: { meaning: "Lluvia de arena desde grandes altitudes", verified: true },
  maula: { meaning: "Esclavo", verified: true },
  misr: { meaning: "El pueblo; los Zensunni", verified: true },
  "mu'addib": { meaning: "Preceptor; maestro", verified: true },
  "mu'adib": { meaning: "Variante de Mu'addib", verified: true },
  mudir: { meaning: "Gobernador", verified: true },
  "mu zein wallah": { meaning: "Nada bueno, bueno para nada", verified: true },
  nahya: { meaning: "Cobra", verified: true },
  nefij: { meaning: "Exilio", verified: true },
  qanat: { meaning: "Canal abierto de irrigación", verified: true },
  ramadhan: { meaning: "Noveno mes lunar sagrado", verified: true },
  sadus: { meaning: "Jueces sagrados", verified: true },
  sarfa: { meaning: "Alejarse de Dios", verified: true },
  "shari-a": { meaning: "Ritual sagrado; ley religiosa", verified: true },
  shadda: { meaning: "Marca de refuerzo en la escritura Fremen", verified: true },
  shadout: { meaning: "Extractor de agua del pozo", verified: true },
  sihaya: { meaning: "Primavera del desierto", verified: true },
  "subakh ul kuhar": { meaning: "¿Estás bien?", note: "Saludo Fremen", verified: true },
  "subakh un nar": { meaning: "Estoy bien, ¿y tú?", note: "Respuesta al saludo Fremen", verified: true },
  suhl: { meaning: "Paz", verified: true },
  tabara: { meaning: "Postre dulce a base de miel", verified: true },
  taqwa: { meaning: "El precio de la libertad", verified: true },
  tawalil: { meaning: "La ira", verified: true },
  tilsam: { meaning: "Medallón ornamental", verified: true },
  umma: { meaning: "Profeta; nación", verified: true },
  wali: { meaning: "Joven no probado en batalla", verified: true },
  yali: { meaning: "Cuartos habitacionales dentro de un sietch", verified: true },

  "sich tabir": { meaning: "Sietch Tabr", note: "El sietch de Stilgar", verified: true },
  ornitoptero: { meaning: "Aeronave de alas batientes", verified: true },
  cosechadora: { meaning: "Planta industrial sobre orugas que recolecta melange", verified: true },
  "itthuz vessha": { meaning: "Bendito sea el Hacedor", note: "Expresión sagrada Fremen", verified: true },
  "lisaanaha al-gayib": { meaning: "El universo está susurrando", note: "Expresión mística", verified: true },
  "e shayi huluud": { meaning: "Shai-Hulud", note: "Forma vocativa sagrada", verified: true },
};

export const chakobsa: Record<string, ChakobsaEntry> = {
  ...chakobsaLanguage,
  ...duneTerminology,
  gusano: { meaning: "Shai-Hulud — el Gran Hacedor", verified: false },
  especia: { meaning: "Melange — término Galáctico Estándar sin equivalente Chakobsa documentado", verified: false },
  desierto: { meaning: "Bled / reshim / kala — según contexto", verified: false },
  profeta: { meaning: "Mahdi / umma — según contexto", verified: false },
  guerra: { meaning: "Jihad / zamih — según contexto", verified: false },
};

export type FullPhrase = {
  chakobsa: string;
  spanish: string;
  gloss?: string;
};

export const chakobsaFullPhrases: FullPhrase[] = [
  {
    chakobsa: "Dimalash ludhii e-l isnii-dh",
    spanish: "Aleja a los jóvenes de mí",
  },
  {
    chakobsa: "Ru e-l isnii-dh, e-l isnii-dh, rudhi e-l isnii",
    spanish: "Lejos de mí, lejos de mí, lejos de mi mano",
  },
  {
    chakobsa: "Bellaha rudhi a-l dimbi-sh",
    spanish: "Sostén en la mano el cuchillo",
  },
  {
    chakobsa: "Ru a-l dimbi-sh, a-l dimbi, rudhi a-l dimbi-sh",
    spanish: "El cuchillo, el cuchillo, el cuchillo en mi mano",
  },
  {
    chakobsa: "Ru cheshah-r, chifthit, e-l isnii-dh",
    spanish: "Por favor, bruja, aléjate de mí",
  },
  {
    chakobsa: "Dimala-sh ludhii e-l isnii",
    spanish: "Aleja a los jóvenes de mí",
  },
  {
    chakobsa: "Bellaha rudhi a-l dimbi-sh",
    spanish: "Sostén en la mano el cuchillo",
  },
  {
    chakobsa: "Bellaha rudhi e-l isnii-dh",
    spanish: "Sostén mi mano y aléjate de mí",
  },
  {
    chakobsa: "Ru cheshah-r chifthit e-l isnii-dh",
    spanish: "Por favor, bruja, aléjate de mí",
  },
  {
    chakobsa: "Jila hiyak sa fadla",
    spanish: "Ve con ellos en paz",
  },
  {
    chakobsa: "Heshiigiishii",
    spanish: "Te reconozco",
  },
  {
    chakobsa: "Ruha leda gefthek sahiimbit qullaha hiyak",
    spanish: "Él conocerá tus caminos como si hubiera nacido con ellos",
  },
  {
    chakobsa: "Zeyaashaha qumih. Oma jiladha a-Sich Tabra.",
    spanish: "La noche se desvanece. Debemos llegar al Sietch Tabr.",
  },
  {
    chakobsa: "She Fremin.",
    spanish: "Eres Fremen.",
  },
  {
    chakobsa: "Ruha bela eddem hi uzzul un-raudhiha.",
    spanish: "Él sostendrá la vida y la muerte en sus manos.",
  },
  {
    chakobsa: "Ekkeri-akairi",
    spanish: "Bienvenido (nuestra agua es tu agua)",
  },
];

export type Affix = {
  meaning: string;
  type: "prefix" | "suffix";
};

export const chakobsaAffixes: Record<string, Affix> = {
  "chi": { meaning: "deshacer / revertir", type: "prefix" },
  "chi-": { meaning: "deshacer / revertir", type: "prefix" },
  "chiv": { meaning: "deshacer / revertir", type: "prefix" },
  "chiv-": { meaning: "deshacer / revertir", type: "prefix" },
  "chu": { meaning: "deshacer / revertir", type: "prefix" },
  "chu-": { meaning: "deshacer / revertir", type: "prefix" },
  "qab": { meaning: "retorno a un lugar anterior", type: "prefix" },
  "qab-": { meaning: "retorno a un lugar anterior", type: "prefix" },
  "yo": { meaning: "repetición (iterativo)", type: "prefix" },
  "yo-": { meaning: "repetición (iterativo)", type: "prefix" },
  "yoh": { meaning: "repetición (iterativo)", type: "prefix" },
  "yoh-": { meaning: "repetición (iterativo)", type: "prefix" },
  "ha": { meaning: "él, ella, ello (dependiente)", type: "suffix" },
  "-ha": { meaning: "él, ella, ello (dependiente)", type: "suffix" },
  "im": { meaning: "nosotros (dependiente)", type: "suffix" },
  "-im": { meaning: "nosotros (dependiente)", type: "suffix" },
  "m": { meaning: "nosotros (dependiente)", type: "suffix" },
  "-m": { meaning: "nosotros (dependiente)", type: "suffix" },
  "ash": { meaning: "tú (dependiente)", type: "suffix" },
  "-ash": { meaning: "tú (dependiente)", type: "suffix" },
  "sh": { meaning: "tú (dependiente) / inceptivo", type: "suffix" },
  "-sh": { meaning: "tú (dependiente) / inceptivo", type: "suffix" },
  "ii": { meaning: "yo (dependiente)", type: "suffix" },
  "-ii": { meaning: "yo (dependiente)", type: "suffix" },
  "yi": { meaning: "yo (dependiente)", type: "suffix" },
  "-yi": { meaning: "yo (dependiente)", type: "suffix" },
  "b": { meaning: "instrumental", type: "suffix" },
  "-b": { meaning: "instrumental", type: "suffix" },
  "ch": { meaning: "diminutivo", type: "suffix" },
  "-ch": { meaning: "diminutivo", type: "suffix" },
  "dh": { meaning: "terminativo", type: "suffix" },
  "-dh": { meaning: "terminativo", type: "suffix" },
  "f": { meaning: "diminutivo", type: "suffix" },
  "-f": { meaning: "diminutivo", type: "suffix" },
  "g": { meaning: "extensivo", type: "suffix" },
  "-g": { meaning: "extensivo", type: "suffix" },
  "h": { meaning: "colectivo", type: "suffix" },
  "-h": { meaning: "colectivo", type: "suffix" },
  "j": { meaning: "animado", type: "suffix" },
  "-j": { meaning: "animado", type: "suffix" },
  "k": { meaning: "instrumental", type: "suffix" },
  "-k": { meaning: "instrumental", type: "suffix" },
  "l": { meaning: "durativo", type: "suffix" },
  "-l": { meaning: "durativo", type: "suffix" },
  "r": { meaning: "reflexivo", type: "suffix" },
  "-r": { meaning: "reflexivo", type: "suffix" },
  "s": { meaning: "pasivo", type: "suffix" },
  "-s": { meaning: "pasivo", type: "suffix" },
  "t": { meaning: "humano", type: "suffix" },
  "-t": { meaning: "humano", type: "suffix" },
  "th": { meaning: "reductivo", type: "suffix" },
  "-th": { meaning: "reductivo", type: "suffix" },
  "y": { meaning: "adjetival", type: "suffix" },
  "-y": { meaning: "adjetival", type: "suffix" },
  "z": { meaning: "aumentativo", type: "suffix" },
  "-z": { meaning: "aumentativo", type: "suffix" },
};

export const chakobsaPhrases = [
  {
    phrase: [
      "No debo temer.",
      "El miedo es el asesino de la mente.",
      "El miedo es la pequeña muerte que conduce a la destrucción total.",
      "Afrontaré mi miedo.",
      "Permitiré que pase sobre mí y a través de mí.",
      "Y cuando haya pasado, volveré mi ojo interior para ver su camino.",
      "Donde el miedo haya pasado no quedará nada.",
      "Solo quedaré yo."
    ],
    meaning: "Letanía Bene Gesserit contra el miedo."
  }
];

export const browserTitles = [
  "El miedo mata la mente",
  "La especia debe fluir",
  "El futuro ya ocurrió",
  "Las dunas recuerdan",
  "Arrakis juzga",
  "La visión persiste",
  "El camino dorado",
  "La profecía vive",
  "Muad'Dib ha visto",
  "Los ojos del Ibad",
  "Shai-Hulud espera",
  "La arena observa",
  "El sueño continúa",
  "La yihad se acerca",
  "El desierto reclama",
  "El tiempo se pliega",
  "Nada escapa a Arrakis",
  "La especia despierta",
  "Los muertos aconsejan",
  "La arena conoce tu nombre",
  "La visión te encontró",
  "Ya has estado aquí",
  "El futuro te observa",
  "Los senderos convergen",
  "La historia se repite",
  "El universo conspira",
  "Las dunas susurran",
  "La tormenta se acerca",
  "El destino aguarda",
  "La conciencia expande",
    "El miedo mata la mente",
  "La especia debe fluir",
  "El futuro ya ocurrió",
  "Las dunas recuerdan",
  "Arrakis juzga",
  "La visión persiste",
  "El camino dorado",
  "La profecía vive",
  "Muad'Dib ha visto",
  "Los ojos del Ibad",
  "Shai-Hulud espera",
  "La arena observa",
  "El sueño continúa",
  "La yihad se acerca",
  "El desierto reclama",
  "El tiempo se pliega",
  "Nada escapa a Arrakis",
  "La especia despierta",
  "Los muertos aconsejan",
  "La arena conoce tu nombre",
  "La visión te encontró",
  "Ya has estado aquí",
  "El futuro te observa",
  "Los senderos convergen",
  "La historia se repite",
  "El universo conspira",
  "Las dunas susurran",
  "La tormenta se acerca",
  "El destino aguarda",
  "La conciencia expande"
];