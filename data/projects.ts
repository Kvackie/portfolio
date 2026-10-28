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
  /** Path under /public. Omit for projects with no screenshot yet. */
  image?: string;
  imageAlt?: string;
  /**
   * GitHub URL. Private repositories are linked too; they only open for
   * people with access, so mark them with `status: "private"`.
   */
  repo?: string;
  /** Live URL, when there is something playable. */
  play?: string;
  /** Short labels for the tech pills. */
  tech: string[];
  /** Rendered as a badge. */
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
    tech: ["TypeScript", "Phaser", "Three.js", "Capacitor", "Vite"],
    status: "private",
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
    tech: ["TypeScript", "Phaser", "Capacitor", "Vite"],
    status: "private",
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
    tech: ["TypeScript", "Phaser", "Vite", "Vitest"],
    status: "private",
  },
  {
    slug: "space-game",
    title: "Space Game",
    tagline: "Mine, build ships and send fleets out on expeditions.",
    description:
      "A single-player space fleet management game in the browser: mine and refine ore, craft, build ships, recruit captains and send fleets on expeditions and into battle. The 3D view is Babylon.js with Blender-built models, the menus are HTML and CSS on top, and Vitest covers the clock, crafting, fleets, battles and saves. No title yet -- the name is still open.",
    repo: "https://github.com/Kvackie/space-game",
    tech: ["TypeScript", "Babylon.js", "Blender", "Vite", "Vitest"],
    status: "private",
  },
  {
    slug: "guild-desk",
    title: "The Guild Desk",
    tagline: "Run the front desk of an adventurers' guild.",
    description:
      "A deduction game in three shifts. Mornings, read a client's quest, work out the monster from the bestiary, rate its danger and pack the right supplies. Days, check returning claims against loot, licence and deadline. Nights, cook monster loot into dishes that heal your injured adventurers. Quests are generated from a seed so every one has exactly one answer, and the rules are unit-tested.",
    repo: "https://github.com/Kvackie/deduction-game",
    tech: ["TypeScript", "Phaser", "Vite", "Vitest"],
    status: "private",
  },
  {
    slug: "management-game",
    title: "Management Game",
    tagline: "A tile-based management sim, still in design.",
    description:
      "A data-driven management game: resources, buildings whose levels above the first are derived by formula rather than hand-written, crafting recipes, and combat with armor and damage maths. The design document and the content database are the source of truth. The playable build is early, so this one stays private for now.",
    repo: "https://github.com/Kvackie/management-game",
    tech: ["TypeScript", "Phaser", "Vite"],
    status: "private",
  },
  {
    slug: "ytdlp-gui",
    title: "yt-dlp GUI",
    tagline: "Paste a link, get the video. One file, nothing to install.",
    description:
      "A desktop app for Windows and Linux that downloads video and audio with yt-dlp. On first start it fetches yt-dlp, FFmpeg and Deno, checks them against their published checksums and keeps them up to date. A queue that survives restarts, playlists, subtitles, SponsorBlock cutting and an exact-format picker, all shipped as a single executable.",
    image: "/img/ytdlp-gui.webp",
    imageAlt:
      "The yt-dlp GUI main window: a link box, download options, and a queue with downloads in progress, merging, done and failed.",
    repo: "https://github.com/Kvackie/ytdlp-gui",
    tech: ["Python", "PySide6", "PyInstaller"],
  },
  {
    slug: "media-renamer",
    title: "Media Renamer",
    tagline: "Rename movie, TV and anime files from online databases.",
    description:
      "Drop files in, match them against TMDB, TVmaze, AniDB or OpenSubtitles, preview the new names and rename, move or copy them -- with undo history. Naming is Jinja2 templates with live preview, the layout is dockable panels, and API keys live in the system password store. A single file for Windows and Linux.",
    repo: "https://github.com/Kvackie/media-renamer",
    tech: ["Python", "PySide6", "Jinja2", "PyInstaller"],
    status: "private",
  },
  {
    slug: "nikke-tracker",
    title: "Nikke Collection Tracker",
    tagline: "Track which of the 185 characters you own.",
    description:
      "A small self-contained tracker for Goddess of Victory: NIKKE, with owned and completion counts up top, search, and filters for rarity and element. Private for now -- it is a personal tool rather than something finished.",
    repo: "https://github.com/Kvackie/nikke-tracker-private",
    tech: ["HTML", "CSS", "JavaScript"],
    status: "private",
  },
  {
    slug: "boombox-controller",
    title: "Boombox Controller",
    tagline: "Play any YouTube track on the boombox in Lethal Company.",
    description:
      "My rework of Koder-Tech's Boombox Controller mod. Type /bplay and a YouTube link in chat, and the mod downloads the audio with yt-dlp and FFmpeg and loads it onto the in-game boombox. I cut the original down to that core and rewrote the download and playback path.",
    repo: "https://github.com/Kvackie/Boombox-Controller",
    tech: ["C#", "BepInEx", "Harmony", "Unity"],
    status: "private",
  },
];

/** Skills are grouped by what they are for, not alphabetically. */
export const SKILL_GROUPS: { label: string; items: string[] }[] = [
  {
    label: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "C#", "HTML", "CSS"],
  },
  {
    label: "Games",
    items: ["Phaser 3/4", "Three.js", "Babylon.js", "Canvas 2D", "Pixel art"],
  },
  {
    label: "Frameworks",
    items: ["React", "Next.js", "Vite", "Capacitor", "PySide6 (Qt)"],
  },
  {
    label: "Tooling",
    items: [
      "Vitest",
      "TDD",
      "Prettier",
      "Biome",
      "GitHub Actions",
      "PyInstaller",
      "Blender",
    ],
  },
  {
    label: "Platforms",
    items: ["GitHub Pages", "Android", "Web", "Windows", "Linux"],
  },
];

export const STATS: { value: string; label: string }[] = [
  { value: "11", label: "Side projects" },
  { value: "7", label: "Games" },
  { value: "6", label: "Android builds" },
  { value: "12", label: "Years on GitHub" },
];

export const LINKS = {
  name: "Valentin Wannesian",
  monogram: "VW",
  headline: "Software Engineer, projects and small ideas brought to life!",
  location: "Sweden",
  github: "https://github.com/Kvackie",
  linkedin: "https://www.linkedin.com/in/valentin-w-9aab96141",
} as const;
