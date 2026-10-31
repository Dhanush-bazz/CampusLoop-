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

export interface Event {
  id: string;
  title: string;
  category: EventCategory;
  date: string; // e.g. "12 Nov 2026"
  startTime: string; // e.g. "10:00"
  endTime: string; // e.g. "13:00"
  venue: string; // e.g. "Seminar Hall B"
  organiser: string; // e.g. "Coding Club"
  description: string;
  registrationDeadline: string; // e.g. "10 Nov 2026"
  registrationLink: string;
  image: string; // image path or placeholder identifier
  featured?: boolean;
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

export const DUMMY_EVENTS: Event[] = [
  {
    id: "ai-ml-workshop",
    title: "AI/ML Workshop",
    category: "Workshop",
    date: "12 Nov 2026",
    startTime: "10:00",
    endTime: "13:00",
    venue: "Seminar Hall B",
    organiser: "Coding Club",
    description:
      "A hands-on introduction to machine learning and neural networks. Learn foundational concepts, build your first model, and explore practical AI applications.",
    registrationDeadline: "10 Nov 2026",
    registrationLink: "https://forms.example/aiml-workshop",
    image: "/file.svg",
    featured: true,
  },
  {
    id: "code-sprint-hackathon",
    title: "Code Sprint Hackathon",
    category: "Hackathon",
    date: "18 Nov 2026",
    startTime: "09:00",
    endTime: "21:00",
    venue: "Main Auditorium",
    organiser: "IEEE Student Branch",
    description:
      "A 24-hour build challenge where student teams design and ship a working prototype. Mentors, meals, and prizes provided. Teams of 2 to 4 members are welcome.",
    registrationDeadline: "15 Nov 2026",
    registrationLink: "https://forms.example/codesprint",
    image: "/file.svg",
    featured: true,
  },
  {
    id: "inter-college-debate",
    title: "Inter-College Debate",
    category: "Competition",
    date: "22 Nov 2026",
    startTime: "14:00",
    endTime: "17:00",
    venue: "Room 204",
    organiser: "Literary Club",
    description:
      "An inter-college parliamentary debate competition testing rhetoric, policy analysis, and spontaneous critical thinking. Open to all departments.",
    registrationDeadline: "20 Nov 2026",
    registrationLink: "https://forms.example/debate",
    image: "/file.svg",
    featured: true,
  },
  {
    id: "photography-walk",
    title: "Photography Walk",
    category: "Club Activity",
    date: "25 Nov 2026",
    startTime: "07:00",
    endTime: "10:00",
    venue: "Campus Botanical Gardens",
    organiser: "Photography Club",
    description:
      "Explore campus architecture and morning natural light with fellow photographers. Bring your DSLR, mirrorless camera, or smartphone.",
    registrationDeadline: "23 Nov 2026",
    registrationLink: "https://forms.example/photo-walk",
    image: "/file.svg",
    featured: true,
  },
  {
    id: "cultural-night",
    title: "Cultural Night",
    category: "Cultural Event",
    date: "28 Nov 2026",
    startTime: "18:00",
    endTime: "22:00",
    venue: "Open Air Theatre",
    organiser: "Cultural Committee",
    description:
      "An evening celebrating music, dance, theatrical performances, and campus talent. Join in with fellow students for an unforgettable campus night.",
    registrationDeadline: "25 Nov 2026",
    registrationLink: "https://forms.example/cultural-night",
    image: "/file.svg",
    featured: false,
  },
  {
    id: "robotics-expo",
    title: "Robotics Expo",
    category: "Technical Event",
    date: "30 Nov 2026",
    startTime: "11:00",
    endTime: "16:00",
    venue: "Innovation Lab",
    organiser: "Robotics Society",
    description:
      "Showcasing student-built autonomous rovers, robotic arms, drone demos, and interactive IoT hardware installations.",
    registrationDeadline: "27 Nov 2026",
    registrationLink: "https://forms.example/robotics-expo",
    image: "/file.svg",
    featured: false,
  },
  {
    id: "open-mic-night",
    title: "Open Mic Night",
    category: "Club Activity",
    date: "02 Dec 2026",
    startTime: "18:00",
    endTime: "21:00",
    venue: "Student Centre Amphitheatre",
    organiser: "Music Club",
    description:
      "Showcase your talent in poetry, acoustic music, stand-up comedy, or storytelling in a relaxed and supportive campus atmosphere.",
    registrationDeadline: "28 Nov 2026",
    registrationLink: "https://forms.example/openmic",
    image: "/file.svg",
    featured: false,
  },
  {
    id: "web-dev-bootcamp",
    title: "Web Dev Bootcamp",
    category: "Technical Event",
    date: "05 Dec 2026",
    startTime: "10:00",
    endTime: "16:00",
    venue: "Computer Lab 3",
    organiser: "Web Developers Club",
    description:
      "A fast-paced full-stack development workshop covering modern web frameworks, component architecture, and API integration.",
    registrationDeadline: "02 Dec 2026",
    registrationLink: "https://forms.example/webdev-bootcamp",
    image: "/file.svg",
    featured: false,
  },
  {
    id: "annual-music-fest",
    title: "Annual Music Fest",
    category: "Cultural Event",
    date: "08 Dec 2026",
    startTime: "17:00",
    endTime: "22:00",
    venue: "Main Stage Ground",
    organiser: "Fine Arts Club",
    description:
      "A musical evening featuring college bands, acoustic ensembles, and guest indie musicians. Food stalls and merchandise booths available.",
    registrationDeadline: "05 Dec 2026",
    registrationLink: "https://forms.example/music-fest",
    image: "/file.svg",
    featured: false,
  },
  {
    id: "design-thinking-masterclass",
    title: "Design Thinking Masterclass",
    category: "Workshop",
    date: "10 Dec 2026",
    startTime: "14:00",
    endTime: "17:00",
    venue: "Design Studio 2",
    organiser: "UX & Product Club",
    description:
      "Master the fundamentals of user research, rapid prototyping, wireframing, and user testing through hands-on collaborative sprint exercises.",
    registrationDeadline: "08 Dec 2026",
    registrationLink: "https://forms.example/design-thinking",
    image: "/file.svg",
    featured: false,
  },
  {
    id: "cybersecurity-ctf-challenge",
    title: "Cybersecurity CTF Challenge",
    category: "Hackathon",
    date: "15 Dec 2026",
    startTime: "10:00",
    endTime: "18:00",
    venue: "Cybersecurity Lab 1",
    organiser: "InfoSec Club",
    description:
      "Compete in cryptography, reverse engineering, web security, and network forensics challenges. Solo or teams of two are eligible.",
    registrationDeadline: "12 Dec 2026",
    registrationLink: "https://forms.example/ctf-challenge",
    image: "/file.svg",
    featured: false,
  },
  {
    id: "quiz-bowl-championship",
    title: "Quiz Bowl Championship",
    category: "Competition",
    date: "18 Dec 2026",
    startTime: "15:00",
    endTime: "18:00",
    venue: "Auditorium 2",
    organiser: "Quiz Club",
    description:
      "A battle of wits covering general knowledge, science, literature, pop culture, and sports history. Medals and certificates for finalists.",
    registrationDeadline: "15 Dec 2026",
    registrationLink: "https://forms.example/quiz-bowl",
    image: "/file.svg",
    featured: false,
  },
];
