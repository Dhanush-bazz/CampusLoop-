export type EventCategory =
  | "Workshop"
  | "Hackathon"
  | "Competition"
  | "Cultural Event"
  | "Technical Event"
  | "Club Activity";

export const EVENT_CATEGORIES: readonly EventCategory[] = [
  "Workshop",
  "Hackathon",
  "Competition",
  "Cultural Event",
  "Technical Event",
  "Club Activity",
];

export type EventApprovalStatus = "Approved" | "Pending" | "Rejected" | "Draft";

export interface Event {
  id: string;
  title: string;
  category: EventCategory;
  date: string; // ISO "YYYY-MM-DD" or display "DD Mon YYYY"
  startTime: string; // e.g. "10:00"
  endTime: string; // e.g. "13:00"
  venue: string; // e.g. "Seminar Hall B"
  organiser: string; // e.g. "Coding Club"
  organiserName: string; // alias for organiser
  organiserEmail?: string;
  description: string;
  registrationDeadline: string; // e.g. "2026-11-10"
  registrationLink: string;
  registrationUrl: string; // alias for registrationLink
  image: string; // authoritative banner image URL or Data URL
  bannerUrl: string; // alias for image
  approvalStatus: EventApprovalStatus;
  submissionDate: string;
  approvalDate?: string;
  adminFeedback?: string;
  featured?: boolean;
}

export type OrganiserEvent = Event;

export const LOCAL_EVENT_BANNERS: Record<string, string> = {
  "ai-ml-workshop": "/images/events/ai-ml-workshop.jpg",
  "code-sprint-hackathon": "/images/events/code-sprint-hackathon.jpg",
  "inter-college-debate": "/images/events/inter-college-debate.jpg",
  "photography-walk": "/images/events/photography-walk.jpg",
  "cultural-night": "/images/events/cultural-night.jpg",
  "robotics-expo": "/images/events/robotics-expo.jpg",
  "open-mic-night": "/images/events/open-mic-night.jpg",
  "web-dev-bootcamp": "/images/events/web-dev-bootcamp.jpg",
  "annual-music-fest": "/images/events/annual-music-fest.jpg",
  "design-thinking-masterclass": "/images/events/design-thinking.jpg",
  "cybersecurity-ctf-challenge": "/images/events/cybersecurity-ctf.jpg",
  "quiz-bowl-championship": "/images/events/quiz-bowl.jpg",
  "startup-pitch-day": "/images/events/startup-pitch-day.jpg",
  "late-night-gaming": "/images/events/late-night-gaming.jpg",
};

export const LOCAL_CATEGORY_BANNERS: Record<EventCategory, string> = {
  Workshop: "/images/events/workshop-default.jpg",
  Hackathon: "/images/events/hackathon-default.jpg",
  Competition: "/images/events/competition-default.jpg",
  "Cultural Event": "/images/events/cultural-default.jpg",
  "Technical Event": "/images/events/technical-default.jpg",
  "Club Activity": "/images/events/club-default.jpg",
};

export const EVENT_IMAGE_MAP: Record<string, string> = LOCAL_EVENT_BANNERS;
export const CATEGORY_FALLBACK_IMAGES: Record<EventCategory, string> =
  LOCAL_CATEGORY_BANNERS;

export function getFallbackBanner(id?: string, category?: string): string {
  if (id && LOCAL_EVENT_BANNERS[id]) return LOCAL_EVENT_BANNERS[id];
  if (category && LOCAL_CATEGORY_BANNERS[category as EventCategory]) {
    return LOCAL_CATEGORY_BANNERS[category as EventCategory];
  }
  return LOCAL_CATEGORY_BANNERS.Workshop;
}

export function resolveEventBanner(event: {
  id?: string;
  category?: string;
  image?: string;
  bannerUrl?: string;
}): string {
  // 1. Authoritative local banner for known predefined events
  if (event.id && LOCAL_EVENT_BANNERS[event.id]) {
    return LOCAL_EVENT_BANNERS[event.id];
  }

  // 2. Custom organiser-uploaded base64 Data URL
  const custom = event.bannerUrl || event.image;
  if (custom?.startsWith("data:image/")) {
    return custom;
  }

  // 3. Valid local path in /images/
  if (custom?.startsWith("/images/")) {
    return custom;
  }

  // 4. Category local banner fallback
  if (
    event.category &&
    LOCAL_CATEGORY_BANNERS[event.category as EventCategory]
  ) {
    return LOCAL_CATEGORY_BANNERS[event.category as EventCategory];
  }

  return LOCAL_CATEGORY_BANNERS.Workshop;
}

export function normalizeEvent(
  item: Partial<Event> | Record<string, unknown>,
): Event {
  const input = item as Record<string, unknown>;
  const id = String(input.id || `event-${Date.now()}`);
  const title = String(input.title || "Untitled Campus Event");
  const category = (input.category as EventCategory) || "Workshop";
  const organiserName = String(
    input.organiserName || input.organiser || "Campus Organisation",
  );
  const registrationUrl = String(
    input.registrationUrl ||
      input.registrationLink ||
      "https://forms.example/event",
  );
  const bannerUrl = resolveEventBanner({
    id,
    category,
    image: typeof input.image === "string" ? input.image : undefined,
    bannerUrl:
      typeof input.bannerUrl === "string" ? input.bannerUrl : undefined,
  });

  return {
    id,
    title,
    category,
    date: String(input.date || "2026-11-20"),
    startTime: String(input.startTime || "09:00"),
    endTime: String(input.endTime || "17:00"),
    venue: String(input.venue || "Campus Auditorium"),
    organiser: organiserName,
    organiserName: organiserName,
    organiserEmail:
      typeof input.organiserEmail === "string"
        ? input.organiserEmail
        : "organiser@college.edu",
    description: String(
      input.description || "No description provided for this campus event.",
    ),
    registrationDeadline: String(
      input.registrationDeadline || input.date || "2026-11-18",
    ),
    registrationLink: registrationUrl,
    registrationUrl: registrationUrl,
    image: bannerUrl,
    bannerUrl: bannerUrl,
    approvalStatus: (input.approvalStatus as EventApprovalStatus) || "Approved",
    submissionDate: String(input.submissionDate || "2026-10-20"),
    approvalDate:
      typeof input.approvalDate === "string" ? input.approvalDate : undefined,
    adminFeedback:
      typeof input.adminFeedback === "string" ? input.adminFeedback : undefined,
    featured: Boolean(input.featured),
  };
}

export function getEventDateTimestamp(date: string): number | undefined {
  const isoDate = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  const displayDate = /^(\d{1,2}) ([A-Za-z]{3}) (\d{4})$/.exec(date);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let year: number;
  let month: number;
  let day: number;

  if (isoDate) {
    year = Number(isoDate[1]);
    month = Number(isoDate[2]) - 1;
    day = Number(isoDate[3]);
  } else if (displayDate) {
    year = Number(displayDate[3]);
    month = months.indexOf(displayDate[2]);
    day = Number(displayDate[1]);
  } else {
    return undefined;
  }

  if (month < 0 || day < 1) return undefined;
  const timestamp = new Date(year, month, day).getTime();
  const parsedDate = new Date(timestamp);
  if (
    parsedDate.getFullYear() !== year ||
    parsedDate.getMonth() !== month ||
    parsedDate.getDate() !== day
  ) {
    return undefined;
  }
  return timestamp;
}

export function isEventInDateRange(
  date: string,
  range: string,
  now: Date,
): boolean {
  const timestamp = getEventDateTimestamp(date);
  if (timestamp === undefined) return false;

  if (range === "this-month") {
    const eventDate = new Date(timestamp);
    return (
      eventDate.getFullYear() === now.getFullYear() &&
      eventDate.getMonth() === now.getMonth()
    );
  }
  if (range !== "this-week") return false;

  const startOfWeek = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  );
  const daysSinceMonday = (startOfWeek.getDay() + 6) % 7;
  startOfWeek.setDate(startOfWeek.getDate() - daysSinceMonday);
  const startOfNextWeek = new Date(startOfWeek);
  startOfNextWeek.setDate(startOfNextWeek.getDate() + 7);

  return (
    timestamp >= startOfWeek.getTime() && timestamp < startOfNextWeek.getTime()
  );
}

export function isUpcomingEvent(date: string, now: Date): boolean {
  const timestamp = getEventDateTimestamp(date);
  if (timestamp === undefined) return false;
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return timestamp >= today.getTime();
}

export const INITIAL_EVENTS: Event[] = [
  normalizeEvent({
    id: "code-sprint-hackathon",
    title: "Code Sprint Hackathon",
    category: "Hackathon",
    date: "2026-11-18",
    startTime: "09:00",
    endTime: "21:00",
    venue: "Main Auditorium",
    organiser: "IEEE Student Branch",
    description:
      "A 24-hour build challenge where student teams design and ship a working software prototype. Mentors, meals, cloud credits, and prizes provided. Teams of 2 to 4 members are welcome.",
    registrationDeadline: "2026-11-15",
    registrationLink: "https://forms.example/codesprint",
    image: "/images/events/code-sprint-hackathon.jpg",
    approvalStatus: "Approved",
    submissionDate: "2026-10-20",
    approvalDate: "2026-10-22",
    featured: true,
  }),
  normalizeEvent({
    id: "ai-ml-workshop",
    title: "AI/ML Workshop",
    category: "Workshop",
    date: "2026-11-12",
    startTime: "10:00",
    endTime: "16:00",
    venue: "Seminar Hall B",
    organiser: "Coding Club",
    description:
      "A hands-on introduction to machine learning, neural networks, and modern AI app deployment. Learn foundational concepts, build your first model with PyTorch, and explore practical computer vision.",
    registrationDeadline: "2026-11-10",
    registrationLink: "https://forms.example/aiml-workshop",
    image: "/images/events/ai-ml-workshop.jpg",
    approvalStatus: "Approved",
    submissionDate: "2026-10-18",
    approvalDate: "2026-10-20",
    featured: true,
  }),
  normalizeEvent({
    id: "inter-college-debate",
    title: "Inter-College Debate",
    category: "Competition",
    date: "2026-11-22",
    startTime: "14:00",
    endTime: "17:00",
    venue: "Room 204",
    organiser: "Literary Club",
    description:
      "An inter-college parliamentary debate competition testing rhetoric, policy analysis, and spontaneous critical thinking. Open to all departments and degree streams.",
    registrationDeadline: "2026-11-20",
    registrationLink: "https://forms.example/debate",
    image: "/images/events/inter-college-debate.jpg",
    approvalStatus: "Approved",
    submissionDate: "2026-10-19",
    approvalDate: "2026-10-21",
    featured: true,
  }),
  normalizeEvent({
    id: "cultural-night",
    title: "Cultural Night",
    category: "Cultural Event",
    date: "2026-11-28",
    startTime: "18:00",
    endTime: "22:00",
    venue: "Open Air Theatre",
    organiser: "Cultural Committee",
    description:
      "An evening celebrating music, classical and western dance, theatrical performances, and campus talent. Join in with fellow students for an unforgettable campus night.",
    registrationDeadline: "2026-11-25",
    registrationLink: "https://forms.example/cultural-night",
    image: "/images/events/cultural-night.jpg",
    approvalStatus: "Approved",
    submissionDate: "2026-10-21",
    approvalDate: "2026-10-23",
    featured: false,
  }),
  normalizeEvent({
    id: "web-dev-bootcamp",
    title: "Web Dev Bootcamp",
    category: "Technical Event",
    date: "2026-12-05",
    startTime: "10:00",
    endTime: "16:00",
    venue: "Computer Lab 3",
    organiser: "Web Developers Club",
    description:
      "A fast-paced full-stack development workshop covering modern web frameworks, component architecture, TypeScript, and API integration with interactive exercises.",
    registrationDeadline: "2026-12-02",
    registrationLink: "https://forms.example/webdev-bootcamp",
    image: "/images/events/web-dev-bootcamp.jpg",
    approvalStatus: "Approved",
    submissionDate: "2026-10-23",
    approvalDate: "2026-10-25",
    featured: false,
  }),
  normalizeEvent({
    id: "annual-music-fest",
    title: "Annual Music Fest",
    category: "Cultural Event",
    date: "2026-12-08",
    startTime: "17:00",
    endTime: "22:00",
    venue: "Main Stage Ground",
    organiser: "Fine Arts Club",
    description:
      "A musical evening featuring college bands, acoustic ensembles, and guest indie musicians. Food stalls and merchandise booths available for all attendees.",
    registrationDeadline: "2026-12-05",
    registrationLink: "https://forms.example/music-fest",
    image: "/images/events/annual-music-fest.jpg",
    approvalStatus: "Approved",
    submissionDate: "2026-10-24",
    approvalDate: "2026-10-26",
    featured: false,
  }),
  normalizeEvent({
    id: "design-thinking-masterclass",
    title: "Design Thinking Masterclass",
    category: "Workshop",
    date: "2026-12-10",
    startTime: "14:00",
    endTime: "17:00",
    venue: "Design Studio 2",
    organiser: "UX & Product Club",
    description:
      "Master the fundamentals of user research, rapid prototyping, wireframing, and user testing through hands-on collaborative design sprint exercises.",
    registrationDeadline: "2026-12-08",
    registrationLink: "https://forms.example/design-thinking",
    image: "/images/events/design-thinking.jpg",
    approvalStatus: "Approved",
    submissionDate: "2026-10-25",
    approvalDate: "2026-10-27",
    featured: false,
  }),
  normalizeEvent({
    id: "cybersecurity-ctf-challenge",
    title: "Cybersecurity CTF Challenge",
    category: "Hackathon",
    date: "2026-12-15",
    startTime: "10:00",
    endTime: "18:00",
    venue: "Cybersecurity Lab 1",
    organiser: "InfoSec Club",
    description:
      "Compete in cryptography, reverse engineering, web security, and network forensics challenges. Solo or teams of two are eligible with live leaderboard ranking.",
    registrationDeadline: "2026-12-12",
    registrationLink: "https://forms.example/ctf-challenge",
    image: "/images/events/cybersecurity-ctf.jpg",
    approvalStatus: "Approved",
    submissionDate: "2026-10-26",
    approvalDate: "2026-10-28",
    featured: false,
  }),
  normalizeEvent({
    id: "quiz-bowl-championship",
    title: "Quiz Bowl Championship",
    category: "Competition",
    date: "2026-12-18",
    startTime: "15:00",
    endTime: "18:00",
    venue: "Auditorium 2",
    organiser: "Quiz Club",
    description:
      "A battle of wits covering general knowledge, science, literature, pop culture, and sports history. Medals and certificates for finalists across departments.",
    registrationDeadline: "2026-12-15",
    registrationLink: "https://forms.example/quiz-bowl",
    image: "/images/events/quiz-bowl.jpg",
    approvalStatus: "Approved",
    submissionDate: "2026-10-27",
    approvalDate: "2026-10-29",
    featured: false,
  }),
  normalizeEvent({
    id: "robotics-expo",
    title: "Robotics Expo",
    category: "Technical Event",
    date: "2026-11-30",
    startTime: "10:00",
    endTime: "17:00",
    venue: "Mechanical Dept Courtyard",
    organiser: "Robotics Society",
    description:
      "Showcase of student-built autonomous bots, drones, line-followers, and industrial automation prototypes with live arena demonstrations.",
    registrationDeadline: "2026-11-25",
    registrationLink: "https://forms.example/robotics-expo",
    image: "/images/events/robotics-expo.jpg",
    approvalStatus: "Pending",
    submissionDate: "2026-10-28",
    featured: false,
  }),
  normalizeEvent({
    id: "photography-walk",
    title: "Photography Walk",
    category: "Club Activity",
    date: "2026-11-25",
    startTime: "16:00",
    endTime: "18:30",
    venue: "Campus Lake & Botanical Garden",
    organiser: "Photo Society",
    description:
      "Golden hour photo expedition across campus botanical garden and lake. Learn manual DSLR settings, framing, aperture control, and light composition.",
    registrationDeadline: "2026-11-23",
    registrationLink: "https://forms.example/photo-walk",
    image: "/images/events/photography-walk.jpg",
    approvalStatus: "Pending",
    submissionDate: "2026-10-27",
    featured: false,
  }),
  normalizeEvent({
    id: "startup-pitch-day",
    title: "Startup Pitch Day",
    category: "Competition",
    date: "2026-12-05",
    startTime: "09:30",
    endTime: "17:00",
    venue: "MBA Seminar Hall",
    organiser: "E-Cell",
    description:
      "Annual collegiate startup pitch competition. Pitch to angel investors and venture capitalists with seed funding awards and incubator access.",
    registrationDeadline: "2026-11-30",
    registrationLink: "https://forms.example/pitchday",
    image: "/images/events/startup-pitch-day.jpg",
    approvalStatus: "Pending",
    submissionDate: "2026-10-26",
    featured: false,
  }),
  normalizeEvent({
    id: "open-mic-night",
    title: "Open Mic Night",
    category: "Cultural Event",
    date: "2026-12-02",
    startTime: "18:00",
    endTime: "21:00",
    venue: "Open Air Theatre",
    organiser: "Music Club",
    description:
      "An acoustic evening of student singing, spoken word poetry, stand-up comedy, and musical performances in a supportive campus atmosphere.",
    registrationDeadline: "2026-11-28",
    registrationLink: "https://forms.example/openmic",
    image: "/images/events/open-mic-night.jpg",
    approvalStatus: "Rejected",
    submissionDate: "2026-10-25",
    adminFeedback:
      "Venue booking not confirmed. Please attach approval from the facilities office.",
    featured: false,
  }),
  normalizeEvent({
    id: "late-night-gaming",
    title: "Late Night Gaming",
    category: "Technical Event",
    date: "2026-11-20",
    startTime: "21:00",
    endTime: "03:00",
    venue: "Student Activity Center",
    organiser: "Gaming Society",
    description:
      "Inter-hostel LAN gaming championship featuring Valorant, FIFA, and Rocket League tournaments.",
    registrationDeadline: "2026-11-18",
    registrationLink: "https://forms.example/gamingnight",
    image: "/images/events/late-night-gaming.jpg",
    approvalStatus: "Rejected",
    submissionDate: "2026-10-21",
    adminFeedback: "Timing violates campus curfew policy.",
    featured: false,
  }),
];

export const DUMMY_EVENTS: Event[] = INITIAL_EVENTS;
