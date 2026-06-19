import { paul } from "./personajes/paul";
import { leto } from "./personajes/leto";
import { jessica } from "./personajes/jessica";
import { chani } from "./personajes/chani";
import { stilgar } from "./personajes/stilgar";
import { vladimir } from "./personajes/vladimir";
import { atreides } from "./casas/atreides";
import { harkonnen } from "./casas/harkonnen";
import { fremen } from "./casas/fremen";
import { beneGesserit } from "./casas/bene-gesserit";
import { cofradia } from "./casas/cofradia";
import { landsraad } from "./casas/landsraad";
import { arrakis } from "./lugares/arrakis";
import { caladan } from "./lugares/caladan";
import { giediPrime } from "./lugares/giedi-prime";
import { crys } from "./codice/crys";
import { destiltraje } from "./codice/destiltraje";
import { kwisatzHaderach } from "./codice/kwisatz-haderach";
import { ornitoptero } from "./codice/ornitoptero";
import { voz } from "./codice/voz";
import { frankHerbert } from "./escritor/frank-herbert";
import { chakobsaLanguage, duneTerminology } from "../lib/dune-data";

export const characters = [paul, leto, jessica, chani, stilgar, vladimir];
export const houses = [atreides, harkonnen, fremen, beneGesserit, cofradia, landsraad];
export const places = [arrakis, caladan, giediPrime];
export const autores = [frankHerbert];
export const codex = [
    {
        id: "codice",
        label: "Códice",
        blurb: "Compendio de tecnología, disciplinas e instituciones del Imperio",
        entries: [crys, destiltraje, kwisatzHaderach, ornitoptero, voz],
    },
];
export { chakobsaLanguage, duneTerminology };
export {
    paul,
    leto,
    jessica,
    chani,
    stilgar,
    vladimir,
    atreides,
    harkonnen,
    fremen,
    beneGesserit,
    cofradia,
    landsraad,
    arrakis,
    caladan,
    giediPrime,
    crys,
    destiltraje,
    kwisatzHaderach,
    ornitoptero,
    voz,
    frankHerbert,
};