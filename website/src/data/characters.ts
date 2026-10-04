export type Character = {
  name: string;
  role: string;
  bio: string;
  protagonist?: boolean;
  voicedBy?: string; // only when the actor has publicly confirmed it
};

// Officially revealed by Rockstar (May 2025 site update, Aug 2026 Extended Look).
// Add new ones as they're announced.
export const characters: Character[] = [
  {
    name: "Lucia Caminos",
    role: "Protagonist",
    protagonist: true,
    bio: "The first female lead in a mainline GTA since the 2D era. Fresh out of prison after taking the fall for a fight that went wrong, Lucia is sharp, fearless, and done being broke. Her father taught her to fight; Leonida taught her everything else.",
  },
  {
    name: "Jason Duval",
    role: "Protagonist",
    protagonist: true,
    bio: "An ex-Army drifter doing shady work for local drug runners in the Keys, dreaming of an easy life. Then he meets Lucia — and an easy score goes very wrong. If anything happens, it's on both of them.",
  },
  {
    name: "Cal Hampton",
    role: "The conspiracy theorist",
    bio: "Jason's friend and a true believer that the internet is watching. Happiest at home with a beer, eavesdropping on Coast Guard radio chatter and connecting dots nobody else can see.",
  },
  {
    name: "Boobie Ike",
    role: "Vice City legend",
    bio: "From the streets to the boardroom — Boobie turned local fame into an empire of real estate, a strip club, and a recording studio. Nothing moves in Vice City without him hearing about it.",
  },
  {
    name: "Dre'Quan Priest",
    role: "The music mogul",
    bio: "A hustler who never crossed into gangster territory. He broke into the music business, signed the Real Dimez, and now has his sights set on owning the Vice City scene.",
  },
  {
    name: "Real Dimez",
    role: "Rap duo",
    bio: "Bae-Luxe and Roxy — friends since high school who went from shaking down local dealers to going viral. Their tracks run Vice City's social feeds.",
  },
  {
    name: "Raul Bautista",
    role: "The bank robber",
    bio: "A seasoned heist man with confidence, charm, and cunning to spare. Always recruiting for the next job — and the next job is always bigger.",
  },
  {
    name: "Brian Heder",
    role: "The landlord",
    voicedBy: "Stephen Root",
    bio: "A classic Keys drug runner from the golden era of smuggling. Jason lives rent-free on one of Brian's properties — in exchange for the occasional odd job.",
  },
];
