export interface PresetAvatar {
  id: string;
  name: string;
  category: string;
  svgDataUri: string;
}

// 8 Elegant, handcrafted SVG avatar Data URIs styled with modern gradients and clean icons
export const PRESET_AVATARS: PresetAvatar[] = [
  {
    id: "tech-scholar",
    name: "Tech Scholar",
    category: "Engineering",
    svgDataUri: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><defs><linearGradient id="g1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%233b82f6"/><stop offset="100%" stop-color="%231d4ed8"/></linearGradient></defs><rect width="120" height="120" rx="60" fill="url(%23g1)"/><circle cx="60" cy="46" r="22" fill="%23ffffff" opacity="0.95"/><path d="M26 100 C26 78 42 68 60 68 C78 68 94 78 94 100 Z" fill="%23ffffff" opacity="0.95"/><circle cx="53" cy="44" r="3" fill="%231d4ed8"/><circle cx="67" cy="44" r="3" fill="%231d4ed8"/><path d="M48 42 Q60 48 72 42" stroke="%231d4ed8" stroke-width="2" fill="none"/></svg>`,
  },
  {
    id: "code-crafter",
    name: "Code Crafter",
    category: "Developer",
    svgDataUri: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><defs><linearGradient id="g2" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%238b5cf6"/><stop offset="100%" stop-color="%236d28d9"/></linearGradient></defs><rect width="120" height="120" rx="60" fill="url(%23g2)"/><circle cx="60" cy="46" r="22" fill="%23ffffff" opacity="0.95"/><path d="M26 100 C26 78 42 68 60 68 C78 68 94 78 94 100 Z" fill="%23ffffff" opacity="0.95"/><path d="M52 40 L46 46 L52 52" stroke="%236d28d9" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M68 40 L74 46 L68 52" stroke="%236d28d9" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`,
  },
  {
    id: "campus-innovator",
    name: "Innovator",
    category: "Robotics & Tech",
    svgDataUri: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><defs><linearGradient id="g3" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%2306b6d4"/><stop offset="100%" stop-color="%230e7490"/></linearGradient></defs><rect width="120" height="120" rx="60" fill="url(%23g3)"/><circle cx="60" cy="46" r="22" fill="%23ffffff" opacity="0.95"/><path d="M26 100 C26 78 42 68 60 68 C78 68 94 78 94 100 Z" fill="%23ffffff" opacity="0.95"/><circle cx="60" cy="46" r="9" stroke="%230e7490" stroke-width="2.5" fill="none"/><path d="M60 32 L60 35 M60 57 L60 60 M46 46 L49 46 M71 46 L74 46" stroke="%230e7490" stroke-width="2.5" stroke-linecap="round"/></svg>`,
  },
  {
    id: "creative-artist",
    name: "Creative Spirit",
    category: "Arts & Culture",
    svgDataUri: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><defs><linearGradient id="g4" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%23ec4899"/><stop offset="100%" stop-color="%23be185d"/></linearGradient></defs><rect width="120" height="120" rx="60" fill="url(%23g4)"/><circle cx="60" cy="46" r="22" fill="%23ffffff" opacity="0.95"/><path d="M26 100 C26 78 42 68 60 68 C78 68 94 78 94 100 Z" fill="%23ffffff" opacity="0.95"/><path d="M60 38 Q65 46 60 54 Q55 46 60 38" fill="%23be185d"/><circle cx="53" cy="46" r="2.5" fill="%23be185d"/><circle cx="67" cy="46" r="2.5" fill="%23be185d"/></svg>`,
  },
  {
    id: "campus-leader",
    name: "Student Leader",
    category: "Leadership",
    svgDataUri: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><defs><linearGradient id="g5" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%23f59e0b"/><stop offset="100%" stop-color="%23b45309"/></linearGradient></defs><rect width="120" height="120" rx="60" fill="url(%23g5)"/><circle cx="60" cy="46" r="22" fill="%23ffffff" opacity="0.95"/><path d="M26 100 C26 78 42 68 60 68 C78 68 94 78 94 100 Z" fill="%23ffffff" opacity="0.95"/><polygon points="60,36 63,43 70,44 65,49 66,56 60,52 54,56 55,49 50,44 57,43" fill="%23b45309"/></svg>`,
  },
  {
    id: "science-researcher",
    name: "Researcher",
    category: "Sciences",
    svgDataUri: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><defs><linearGradient id="g6" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%2310b981"/><stop offset="100%" stop-color="%23047857"/></linearGradient></defs><rect width="120" height="120" rx="60" fill="url(%23g6)"/><circle cx="60" cy="46" r="22" fill="%23ffffff" opacity="0.95"/><path d="M26 100 C26 78 42 68 60 68 C78 68 94 78 94 100 Z" fill="%23ffffff" opacity="0.95"/><path d="M57 37 L63 37 M60 37 L60 45 L54 55 L66 55 L60 45" stroke="%23047857" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`,
  },
  {
    id: "club-lead",
    name: "Club Lead",
    category: "Organiser",
    svgDataUri: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><defs><linearGradient id="g7" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%236366f1"/><stop offset="100%" stop-color="%234338ca"/></linearGradient></defs><rect width="120" height="120" rx="60" fill="url(%23g7)"/><circle cx="60" cy="46" r="22" fill="%23ffffff" opacity="0.95"/><path d="M26 100 C26 78 42 68 60 68 C78 68 94 78 94 100 Z" fill="%23ffffff" opacity="0.95"/><circle cx="53" cy="46" r="4.5" fill="%234338ca"/><circle cx="67" cy="46" r="4.5" fill="%234338ca"/><path d="M57 46 L63 46" stroke="%234338ca" stroke-width="2"/></svg>`,
  },
  {
    id: "campus-dean",
    name: "Faculty & Admin",
    category: "Administration",
    svgDataUri: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><defs><linearGradient id="g8" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%230f172a"/><stop offset="100%" stop-color="%23334155"/></linearGradient></defs><rect width="120" height="120" rx="60" fill="url(%23g8)"/><circle cx="60" cy="46" r="22" fill="%23ffffff" opacity="0.95"/><path d="M26 100 C26 78 42 68 60 68 C78 68 94 78 94 100 Z" fill="%23ffffff" opacity="0.95"/><path d="M50 42 L60 36 L70 42 L60 48 Z" fill="%23334155"/><path d="M60 48 L60 55" stroke="%23334155" stroke-width="2"/></svg>`,
  },
];
