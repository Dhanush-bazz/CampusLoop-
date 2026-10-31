export type EventCategory =
  | "Workshop"
  | "Hackathon"
  | "Competition"
  | "Cultural Event"
  | "Technical Event"
  | "Club Activity";

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
    featured: true,
  },
  {
    id: "open-mic-night",
    title: "Open Mic Night",
    category: "Club Activity",
    date: "02 Dec 2026",
    startTime: "18:00",
    endTime: "21:00",
    venue: "Open Air Theatre",
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
];

