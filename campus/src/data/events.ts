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
  image: string; // banner image URL or Data URL
  bannerUrl: string; // alias for image
  approvalStatus: EventApprovalStatus;
  submissionDate: string;
  approvalDate?: string;
  adminFeedback?: string;
  featured?: boolean;
}

export type OrganiserEvent = Event;

export const EVENT_IMAGE_MAP: Record<string, string> = {
  "ai-ml-workshop":
    "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80",
  "code-sprint-hackathon":
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
  "inter-college-debate":
    "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80",
  "photography-walk":
    "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=1200&q=80",
  "cultural-night":
    "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80",
  "robotics-expo":
    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80",
  "open-mic-night":
    "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",
  "web-dev-bootcamp":
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
  "annual-music-fest":
    "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80",
  "design-thinking-masterclass":
    "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80",
  "cybersecurity-ctf-challenge":
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
  "quiz-bowl-championship":
    "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80",
  "startup-pitch-day":
    "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1200&q=80",
  "late-night-gaming":
    "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
};

export const CATEGORY_FALLBACK_IMAGES: Record<EventCategory, string> = {
  Workshop:
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
  Hackathon:
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
  Competition:
    "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80",
  "Cultural Event":
    "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80",
  "Technical Event":
    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80",
  "Club Activity":
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
};

export function getFallbackBanner(id?: string, category?: string): string {
  if (id && EVENT_IMAGE_MAP[id]) return EVENT_IMAGE_MAP[id];
  if (category && CATEGORY_FALLBACK_IMAGES[category as EventCategory]) {
    return CATEGORY_FALLBACK_IMAGES[category as EventCategory];
  }
  return CATEGORY_FALLBACK_IMAGES.Workshop;
}

export function resolveEventBanner(event: {
  id?: string;
  category?: string;
  image?: string;
  bannerUrl?: string;
}): string {
  const custom = event.bannerUrl || event.image;
  if (
    custom &&
    custom !== "/file.svg" &&
    custom.trim() !== "" &&
    (custom.startsWith("data:") ||
      custom.startsWith("http://") ||
      custom.startsWith("https://") ||
      custom.startsWith("/"))
  ) {
    return custom;
  }
  return getFallbackBanner(event.id, event.category);
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
    image: EVENT_IMAGE_MAP["code-sprint-hackathon"],
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
    image: EVENT_IMAGE_MAP["ai-ml-workshop"],
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
    image: EVENT_IMAGE_MAP["inter-college-debate"],
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
    image: EVENT_IMAGE_MAP["cultural-night"],
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
    image: EVENT_IMAGE_MAP["web-dev-bootcamp"],
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
    image: EVENT_IMAGE_MAP["annual-music-fest"],
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
    image: EVENT_IMAGE_MAP["design-thinking-masterclass"],
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
    image: EVENT_IMAGE_MAP["cybersecurity-ctf-challenge"],
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
    image: EVENT_IMAGE_MAP["quiz-bowl-championship"],
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
    image: EVENT_IMAGE_MAP["robotics-expo"],
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
    image: EVENT_IMAGE_MAP["photography-walk"],
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
    image: EVENT_IMAGE_MAP["startup-pitch-day"],
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
    image: EVENT_IMAGE_MAP["open-mic-night"],
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
    image: EVENT_IMAGE_MAP["late-night-gaming"],
    approvalStatus: "Rejected",
    submissionDate: "2026-10-21",
    adminFeedback: "Timing violates campus curfew policy.",
    featured: false,
  }),
];

export const DUMMY_EVENTS: Event[] = INITIAL_EVENTS;
