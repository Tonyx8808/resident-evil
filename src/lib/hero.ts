export const FRAME_COUNT = 240;
export const framePath = (n: number) =>
  `/nemesis-frame/ezgif-frame-${String(n).padStart(3, "0")}.png`;

export type Dialogue = {
  id: string;
  show: number;
  hide: number;
  code: string;
  quote: string;
  speaker: string;
  classification: string;
};

export const DIALOGUES: Dialogue[] = [
  {
    id: "d1",
    show: 0.1,
    hide: 0.3,
    code: "INCIDENT-001 // T-VIRUS",
    quote:
      "The T-Virus recombinant properties exceed all projected parameters. Containment is no longer viable.",
    speaker: "Dr. William Birkin",
    classification: "RACCOON CITY — 1998",
  },
  {
    id: "d2",
    show: 0.35,
    hide: 0.55,
    code: "INCIDENT-002 // G-VIRUS",
    quote:
      "We are not monsters. We are the next step. Obedience. Sacrifice. Loyalty.",
    speaker: "Albert Wesker",
    classification: "UMBRELLA HQ — 2003",
  },
  {
    id: "d3",
    show: 0.6,
    hide: 0.8,
    code: "INCIDENT-003 // UROBOROS",
    quote:
      "Do you know the meaning of fear? You will. The Uroboros virus selects only the worthy.",
    speaker: "Albert Wesker",
    classification: "KIJUJU — 2009",
  },
];

export const HERO_TEXT_FADE_END = 0.08;
