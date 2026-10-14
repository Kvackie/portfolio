/**
 * The projects shown on the site.
 *
 * Descriptions are written from each repository's own README and code, not
 * invented -- if you change what a project is, change it here first.
 */

export type Project = {
  slug: string;
  title: string;
  /** The one-liner under the title. */
  tagline: string;
  /** One or two sentences on what it actually is. */
  description: string;
  /** Path under /public. Omit for projects with no public demo. */
  image?: string;
  imageAlt?: string;
  /** GitHub URL. Omit for private repositories -- those render unlinked. */
  repo?: string;
  /** Live URL, when there is something playable. */
  play?: string;
  /** Short labels for the tech pills. */
  tech: string[];
  /** Rendered as a badge; also suppresses the link. */
  status?: "private" | "in-progress";
};

export const PROJECTS: Project[] = [
  {
    slug: "trial-and-error",
    title: "Trial and Error",
    tagline: "Five small mobile games, each built and shipped on its own.",
    description:
      "A collection of five complete games in one repository: a falling-blocks puzzle, a potion match-three, a lantern-lit maze, a 3D hex town builder and a semi-idle dungeon defence. Every one has its own build and its own address, and all of them are mobile first -- designed for a phone held upright and played with thumbs. Progress keeps ticking for up to eight hours while the app is closed.",
    image: "/img/trial-and-error.webp",
    imageAlt:
      "The Trial and Error hub, listing Block Drop, Hex Hold, Lantern Maze, Potion Match and Throne of Souls with an icon for each.",
    repo: "https://github.com/Kvackie/Trial-and-error",
    play: "https://kvackie.github.io/Trial-and-error/",
    tech: ["TypeScript", "Phaser", "Three.js", "Capacitor", "Vite"],
  },
  {
    slug: "eternal-alchemy",
    title: "Eternal Alchemy",
    tagline: "A cozy fantasy potion shop that keeps running while you're away.",
    description:
      "Plant, tend and harvest, then match essences in the cauldron, bottle and price your stock. Three milestones deep: merchants and bought equipment, a mushroom cave that spreads on its own and a mining shaft that depletes and deepens, and the Long Distillation with its Mastery Codex.",
    image: "/img/eternal-alchemy.webp",
    imageAlt:
      "The Eternal Alchemy grounds screen, with five seeds and a row of empty plots waiting to be planted.",
    repo: "https://github.com/Kvackie/eternal-alchemy",
    play: "https://kvackie.github.io/eternal-alchemy/",
    tech: ["TypeScript", "Phaser", "Capacitor", "Vite"],
  },
  {
    slug: "huntdle",
    title: "Huntdle",
    tagline: "A daily guessing game for Hunt: Showdown 1896.",
    description:
      "Six games -- Weapon, Trait, Hunter quote, Hunter art, Trait icon and Bestiary -- each with its own daily puzzle and endless practice mode, each keeping its own streak. Built on real data and art pulled from the official wiki, with a generic grid engine and a reveal engine so a seventh game is mostly just a dataset.",
    image: "/img/huntdle.webp",
    imageAlt:
      "The Huntdle title screen with tabs for Weapon, Trait, Hunter quote, Hunter art, Trait icon and Bestiary.",
    repo: "https://github.com/Kvackie/huntdle",
    play: "https://kvackie.github.io/huntdle/",
    tech: ["TypeScript", "React", "Vite"],
  },
  {
    slug: "dark-fantasy-settlement",
    title: "Dark Fantasy Settlement",
    tagline: "Raise a frontier town and push back the fog.",
    description:
      "A grim settlement builder: raise a town, staff it with heroes and hold the line as the fog closes in. Started as a Godot 4 prototype and rebuilt for the browser on Phaser 4, with DOM panels over the canvas, localStorage saves and a Vitest suite covering the simulation and its balance.",
    image: "/img/dark-fantasy-settlement.webp",
    imageAlt:
      "The world map in Dark Fantasy Settlement, showing named biomes such as The Hollow March and Crystal Cavern among the fog.",
    repo: "https://github.com/Kvackie/dark-fantasy-management",
    play: "https://kvackie.github.io/dark-fantasy-management/",
    tech: ["TypeScript", "Phaser", "Vite", "Vitest"],
  },
  {
    slug: "management-game",
    title: "Management Game",
    tagline: "A tile-based management sim, still in design.",
    description:
      "A data-driven management game: resources, buildings whose levels above the first are derived by formula rather than hand-written, crafting recipes, and combat with armor and damage maths. The design document and the content database are the source of truth. The playable build is early, so this one stays private for now.",
    tech: ["TypeScript", "Phaser", "Vite"],
    status: "private",
  },
  {
    slug: "nikke-tracker",
    title: "Nikke Collection Tracker",
    tagline: "Track which of the 185 characters you own.",
    description:
      "A small self-contained tracker for Goddess of Victory: NIKKE, with owned and completion counts up top, search, and filters for rarity and element. Private for now -- it is a personal tool rather than something finished.",
    tech: ["HTML", "CSS", "JavaScript"],
    status: "private",
  },
];

/** Skills are grouped by what they are for, not alphabetically. */
export const SKILL_GROUPS: { label: string; items: string[] }[] = [
  {
    label: "Languages",
    items: ["TypeScript", "JavaScript", "HTML", "CSS"],
  },
  {
    label: "Games",
    items: ["Phaser 3/4", "Three.js", "Canvas 2D", "Pixel art"],
  },
  {
    label: "Frameworks",
    items: ["React", "Next.js", "Vite", "Capacitor"],
  },
  {
    label: "Tooling",
    items: ["Vitest", "TDD", "Prettier", "Biome", "GitHub Actions"],
  },
  {
    label: "Platforms",
    items: ["GitHub Pages", "Android", "Web"],
  },
];

export const STATS: { value: string; label: string }[] = [
  { value: "6", label: "Side projects" },
  { value: "4", label: "Playable right now" },
  { value: "6", label: "Android builds" },
  { value: "12", label: "Years on GitHub" },
];

export const LINKS = {
  name: "Valentin Wannesian",
  monogram: "VW",
  headline: "Software Engineer, side projects and other fun little ideas!",
  location: "Sweden",
  github: "https://github.com/Kvackie",
  linkedin: "https://www.linkedin.com/in/valentin-w-9aab96141",
  email: "valentin.wanne@gmail.com",
} as const;