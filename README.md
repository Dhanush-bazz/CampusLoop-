# CampusLoop – Campus Life in One Place

CampusLoop is a unified, role-based campus event discovery, management, and moderation platform built for universities. It centralizes scattered campus activities into a single interactive platform, providing dedicated portals for Students, Club Organisers, and University Administrators.

---

## 1. Project Overview

In university ecosystems, academic departments, registered student clubs, cultural societies, and technical chapters organize dozens of workshops, hackathons, guest lectures, competitions, and festivals every semester. However, information about these events is typically fragmented across disparate channels—ephemeral chat groups, social media stories, physical bulletin boards, and departmental circulars.

**CampusLoop** solves this fragmentation by providing a structured, centralized web platform where:
1. **Students** discover verified events across categories, filter by dates, bookmark listings, track external registration deadlines, and schedule reminders.
2. **Club Organisers** create and submit structured event proposals, manage drafts, view live review statuses, and receive administrative feedback.
3. **University Administrators** oversee campus activities through a moderation queue, approving compliant proposals for student publication or returning rejected proposals with actionable feedback.

The application is implemented as a client-side simulated MVP using Next.js 16, React 19, TypeScript, and Tailwind CSS v4, with complete state synchronization and persistence managed across portals via React Context and `localStorage`.

---

## 2. Problem Statement

Campus event coordination currently suffers from critical communication gaps:
* **Information Fragmentation:** Students frequently miss hackathons, workshops, and competition registration deadlines because announcements are scattered across unofficial messaging groups, social media accounts, and physical posters.
* **No Central Event Schedule:** Students lack a single calendar or chronological feed showing what is happening across different campus departments this week or this month.
* **Unstructured Submission Workflows:** Campus clubs and student societies rely on manual email threads, paper booking slips, or ad-hoc chats with faculty advisors to get events approved and announced.
* **Lack of Status Visibility:** Organisers cannot easily track whether an event proposal is pending, approved, or rejected, leading to scheduling conflicts and delayed promotion.
* **No Reminder or Tracking Mechanisms:** Students have no centralized dashboard to manage their bookmarks, track events they have registered for externally, or configure reminders.

---

## 3. Project Objectives

The core objectives of the CampusLoop platform are:
1. **Centralize Campus Discovery:** Provide an accessible, categorized directory of all upcoming collegiate events.
2. **Standardize Event Submissions:** Offer club organizers a standardized form to propose events with schedules, venues, external registration links, and category tags.
3. **Streamline Administrative Governance:** Equip campus authorities with a dedicated moderation console to review, approve, and reject submissions with official remarks.
4. **Facilitate Event Tracking:** Enable students to save events, track registrations, and set personalized deadline reminders.
5. **Demonstrate End-to-End Workflow:** Provide an interactive, zero-configuration local MVP where an event created by an organizer can be reviewed by an administrator and subsequently discovered by a student.

---

## 4. Key Features

### A. Student Portal
* **Personalized Welcome & Summary:** Greets the authenticated student, displays counts of upcoming events scheduled for the current week, and shows active reminders.
* **Featured Spotlight Carousel:** Highlights premier campus events with slide navigation controls, event categories, organizers, and quick bookmarking.
* **Event Discovery & Filtering:** Filter upcoming events dynamically by category (Workshop, Hackathon, Competition, Cultural Event, Technical Event, Club Activity) and timeframe (This Week, This Month).
* **Comprehensive Event Search:** Full-text search across event titles, organizers, venues, and descriptions.
* **Event Details Page:** Displays complete event information, date/time spans, venue locations, host club details, registration deadlines, and external registration links.
* **Bookmark Management:** One-click bookmarking of interesting events with dedicated bookmark directory and item removal.
* **External Registration Tracking:** Links students directly to external registration portals (Google Forms, Unstop, Devpost) with a toggle to mark events as registered and track registration dates.
* **Configurable Reminders:** Set custom deadline alerts (1 day before, 1 hour before, or custom date/time) targeted to either event commencement or registration closure.
* **Student Profile:** View and update student details (full name, college name) with read-only college email display.

### B. Organiser Portal
* **Organiser Dashboard:** Central console displaying aggregated statistics (Total Events, Approved, Pending Review, Rejected Proposals).
* **Event Creation Studio:** Multi-field event creation form capturing title, category, date, start/end times, venue, registration deadlines, registration URLs, banner images, and host club identity.
* **Draft Saving & Submission:** Save partially filled listings as local drafts or formally submit proposals for administrative moderation.
* **Event Directory & Filtering:** Tabbed filtering of organizer events by approval status (All, Approved, Pending, Rejected, Draft) with search.
* **Event Editing & Updating:** Modify event details, update venues or schedules, and resubmit rejected proposals.
* **Administrative Feedback Viewing:** Clear display of rejection reasons and compliance notes provided by university moderators.
* **Listing Deletion:** Safe deletion modal preventing accidental removal of event records.
* **Organiser Profile:** Manage club representative name, club identity, and associated academic department.

### C. Admin Portal
* **Admin Dashboard:** High-level institutional console showing submission metrics, pending review counters, and recent submission logs.
* **Moderation Queue (`/admin/events/pending`):** Dedicated queue displaying pending proposals from registered student clubs with sorting by submission date.
* **In-Depth Event Review (`/admin/events/[id]/review`):** Comprehensive side-by-side inspection view showing complete event parameters, banner preview, and external URLs before taking action.
* **One-Click Approval:** Instantly approve compliant proposals, stamping the approval date and publishing the event directly into the student catalog.
* **Rejection with Required Feedback:** Reject non-compliant proposals with mandatory written justification (e.g., curfew violations, venue clashes, missing approvals).
* **Approved Directory (`/admin/events/approved`):** Searchable archive of all officially sanctioned campus events with approval dates.
* **Rejected Log (`/admin/events/rejected`):** Dedicated log of rejected events displaying recorded feedback reasons, with the ability to reconsider and approve upon resolution.

### D. Shared & Platform Features
* **Role-Based Routing & Route Guards:** Automatic verification of user authentication state and permissions; unauthorized accesses redirect to login with query return targets.
* **Mock Authentication Engine:** Simulates realistic credential validation, session restoration, and role resolution without requiring external OAuth/JWT infrastructure.
* **Predefined Realistic Accounts:** Instant testing credentials available for Student, Organiser, and Administrator roles.
* **Client-Side Persistence:** Seamless synchronization of events, bookmarks, registrations, reminders, and profiles in `localStorage`.
* **Cross-Portal Event Lifecycle:** Real-time synchronization where an event approved in the Admin Portal immediately surfaces in the Student Portal with deduplication against baseline static events.
* **Responsive Layouts:** Mobile-first layout system designed and verified across five screen sizes from 320px mobile to 1920px+ monitors.

---

## 5. User Roles and Permissions

| Capability | Public Visitor | Student | Organiser | Administrator |
| :--- | :---: | :---: | :---: | :---: |
| Browse Public Landing & About | Yes | Yes | Yes | Yes |
| Explore Public Event Catalog | Yes | Yes | Yes | Yes |
| Sign Up for a Student Account | Yes | — | — | — |
| Sign In via Dedicated / Unified Login | Yes | Yes | Yes | Yes |
| Bookmark Events | No | **Yes** | No | No |
| Mark Events as Registered | No | **Yes** | No | No |
| Set & Receive Reminders | No | **Yes** | No | No |
| Edit Student Profile | No | **Yes** | No | No |
| Create Event Proposals | No | No | **Yes** | No |
| Save Event Drafts | No | No | **Yes** | No |
| Edit Own Club Events | No | No | **Yes** | No |
| Delete Own Club Events | No | No | **Yes** | No |
| View Administrative Rejection Notes | No | No | **Yes** | **Yes** |
| Access Admin Moderation Console | No | No | No | **Yes** |
| Approve Event Submissions | No | No | No | **Yes** |
| Reject Submissions with Feedback | No | No | No | **Yes** |
| Reconsider Previously Rejected Events | No | No | No | **Yes** |

---

## 6. System Architecture

CampusLoop is architected as a modular Next.js application using React Context providers layered within a centralized `AppShell`. The architecture strictly separates concerns between presentation, authentication simulation, role-specific domain state, and data storage.

```mermaid
graph TD
    subgraph Browser["Client Browser (Next.js 16 App Router)"]
        subgraph AppShellTree["Root Provider Tree (AppShell)"]
            AuthProv["AuthProvider\n(User Session & Auth State)"]
            OrgProv["OrganiserProvider\n(Event Master Store & Submissions)"]
            AdminProv["AdminProvider\n(Moderation Logic & Stats)"]
            StudentProv["StudentProvider\n(Unified Catalog, Bookmarks, Registrations, Reminders)"]
        end

        subgraph RouteLayers["Page & Component Layers"]
            PubRoutes["Public Pages\n- Landing Page (/)\n- Sign In (/login)\n- Sign Up (/signup)\n- Forgot Password (/forgot-password)"]
            StudentRoutes["Student Portal\n- Dashboard (/dashboard)\n- Explore (/explore)\n- Event Details (/events/id)\n- Bookmarks (/bookmarks)\n- Registrations (/registrations)\n- Reminders (/reminders)\n- Profile (/profile)"]
            OrgRoutes["Organiser Portal\n- Dashboard (/organiser/dashboard)\n- My Events (/organiser/events)\n- Create Event (/organiser/events/create)\n- Edit Event (/organiser/events/id/edit)\n- Event Status (/organiser/events/id)\n- Profile (/organiser/profile)"]
            AdminRoutes["Admin Portal\n- Dashboard (/admin/dashboard)\n- Pending Queue (/admin/events/pending)\n- Review Details (/admin/events/id/review)\n- Approved (/admin/events/approved)\n- Rejected (/admin/events/rejected)"]
        end

        subgraph Guards["Access Control"]
            ProtRoute["ProtectedRoute Component\n(Role Verification & Redirection)"]
        end

        subgraph StorageLayer["Browser Persistence (Storage API)"]
            LS1[("campusloop_session_v1")]
            LS2[("campusloop_registered_users_v1")]
            LS3[("campusloop_organiser_events_v1")]
            LS4[("campusloop_bookmarks")]
            LS5[("campusloop_registrations")]
            LS6[("campusloop_reminders")]
            LS7[("campusloop_profile")]
        end
    end

    AuthProv --> OrgProv
    OrgProv --> AdminProv
    AdminProv --> StudentProv
    StudentProv --> RouteLayers

    ProtRoute --> StudentRoutes
    ProtRoute --> OrgRoutes
    ProtRoute --> AdminRoutes

    AuthProv -.-> LS1
    AuthProv -.-> LS2
    OrgProv -.-> LS3
    StudentProv -.-> LS4
    StudentProv -.-> LS5
    StudentProv -.-> LS6
    StudentProv -.-> LS7
```

---

## 7. Complete Application Workflow

### Event Lifecycle Workflow

```mermaid
sequenceDiagram
    autonumber
    actor Organiser as Club Organiser
    participant OrgPortal as Organiser Portal
    participant Context as OrganiserContext / Storage
    participant AdminPortal as Admin Portal
    actor Admin as University Admin
    participant StudentPortal as Student Portal
    actor Student as Student User

    Note over Organiser,OrgPortal: 1. Event Submission
    Organiser->>OrgPortal: Fills event form (/organiser/events/create)
    OrgPortal->>Context: createEvent(status: "Pending")
    Context-->>OrgPortal: Stored in localStorage

    Note over Admin,AdminPortal: 2. Administrative Moderation
    Admin->>AdminPortal: Opens Pending Approvals (/admin/events/pending)
    AdminPortal->>Context: Reads pendingEvents
    Admin->>AdminPortal: Inspects event (/admin/events/[id]/review)
    
    alt Event Compliant
        Admin->>AdminPortal: Clicks "Approve Event"
        AdminPortal->>Context: updateEvent(status: "Approved", approvalDate)
        Context-->>StudentPortal: Synchronizes into allEvents catalog
        Note over Student,StudentPortal: 3. Student Discovery
        Student->>StudentPortal: Opens /dashboard or /explore
        StudentPortal->>Student: Displays newly approved event card
        Student->>StudentPortal: Clicks Bookmark / Set Reminder / Register
    else Event Non-Compliant
        Admin->>AdminPortal: Clicks "Reject Event" with remarks
        AdminPortal->>Context: updateEvent(status: "Rejected", feedback)
        Context-->>OrgPortal: Updates status with adminFeedback
        Organiser->>OrgPortal: Views rejection feedback on /organiser/events/[id]
        Organiser->>OrgPortal: Edits event & resubmits for review
    end
```

---

## 8. Technology Stack

The project relies exclusively on modern, verified technologies specified in `package.json` and project configurations:

| Category | Technology | Version | Purpose in CampusLoop |
| :--- | :--- | :--- | :--- |
| **Framework** | Next.js (App Router) | `16.4.3` | Server-rendered React framework providing file-system routing, layout nesting, partial prerendering, and Turbopack build engine. |
| **Core UI Library** | React & React DOM | `19.3.0` | Declarative UI rendering, hooks (`useContext`, `useMemo`, `useState`, `useEffect`), and concurrent features. |
| **Compiler Optimization** | Babel React Compiler | `1.0.0` | Automatic memoization of component render trees. |
| **Language** | TypeScript | `^5.0.0` | Strict type definitions, interfaces for events, users, profiles, and context contracts. |
| **Styling** | Tailwind CSS v4 | `^4.0.0` | Modern utility-first CSS styling utilizing `@theme inline` design tokens defined in `globals.css`. |
| **Turbopack Loader** | `@tailwindcss/turbopack` | `^4.0.0` | Fast incremental CSS bundling during Next.js Turbopack development and production builds. |
| **Iconography** | Lucide React | `^1.66.0` | Clean, accessible vector icons for categories, navigation, statuses, and action buttons. |
| **Code Quality** | Biome | `2.4.2` | Fast formatting and linting tool replacing ESLint and Prettier. |
| **State Management** | React Context API | Native | Hierarchical client state management without external overhead (`Zustand`/`Redux`). |
| **Data Persistence** | Web Storage API (`localStorage`) | Native | Browser-based JSON data persistence across page reloads and browser restarts. |
| **Fonts** | Next.js Font (`Geist Sans` & `Geist Mono`) | Native | Zero-layout-shift variable web fonts optimized directly by Vercel. |

---

## 9. Project Directory Structure

```
CampusLoop-/
├── campus/                              # Next.js Application Source Root
│   ├── .next/                           # Production build output
│   ├── docs/                            # Project specifications & wireframes
│   │   └── wireframes/
│   │       ├── campusloop-wireframe.svg # Source-of-truth SVG wireframe export
│   │       └── README.md                # Wireframe documentation
│   ├── public/                          # Static assets and icons
│   ├── src/                             # Application source code
│   │   ├── app/                         # App Router routes and pages
│   │   │   ├── admin/                   # Administrator Portal
│   │   │   │   ├── dashboard/page.tsx   # Frame 18: Admin Dashboard
│   │   │   │   ├── events/
│   │   │   │   │   ├── approved/        # Frame 21: Approved Events Directory
│   │   │   │   │   ├── pending/         # Frame 19: Pending Event Approvals Queue
│   │   │   │   │   ├── rejected/        # Frame 22: Rejected Events Log
│   │   │   │   │   └── [id]/review/     # Frame 20: Event Review & Decision
│   │   │   │   └── login/page.tsx       # Frame 17: Admin Dedicated Login
│   │   │   ├── bookmarks/page.tsx       # Frame 08: Student Bookmarked Events
│   │   │   ├── dashboard/page.tsx       # Frame 05: Student Dashboard
│   │   │   ├── demo/page.tsx            # Internal redirect utility to /login
│   │   │   ├── events/[id]/page.tsx     # Frame 07: Event Details & Reminders
│   │   │   ├── explore/page.tsx         # Frame 06: Explore Events & Search
│   │   │   ├── forgot-password/page.tsx # Frame 04: Password Recovery
│   │   │   ├── login/page.tsx           # Frame 03: Unified / Student Login
│   │   │   ├── organiser/               # Organiser Portal
│   │   │   │   ├── dashboard/page.tsx   # Frame 13: Organiser Dashboard
│   │   │   │   ├── events/
│   │   │   │   │   ├── create/          # Frame 14: Create Event Proposal
│   │   │   │   │   ├── page.tsx         # My Events Directory
│   │   │   │   │   ├── [id]/edit/       # Frame 15: Edit Event Listing
│   │   │   │   │   └── [id]/page.tsx    # Frame 16: View Event Status
│   │   │   │   ├── login/page.tsx       # Frame 12: Organiser Dedicated Login
│   │   │   │   └── profile/page.tsx     # Organiser Profile Management
│   │   │   ├── profile/page.tsx         # Frame 11: Student Profile & Settings
│   │   │   ├── registrations/page.tsx   # Frame 09: Student Registrations
│   │   │   ├── reminders/page.tsx       # Frame 10: Student Reminders
│   │   │   ├── signup/page.tsx          # Frame 02: Student Registration
│   │   │   ├── globals.css              # Design tokens and Tailwind configuration
│   │   │   ├── layout.tsx               # Root HTML document and font bindings
│   │   │   └── page.tsx                 # Frame 01: Public Landing Page
│   │   ├── components/                  # Modular React UI components
│   │   │   ├── auth/                    # Protected route components
│   │   │   │   └── protected-route.tsx  # Role-based route guard
│   │   │   ├── common/                  # Shared primitive components
│   │   │   │   ├── badge.tsx            # Status and tag pill component
│   │   │   │   ├── button.tsx           # Button with variant styling
│   │   │   │   └── input.tsx            # Form input with validation states
│   │   │   ├── events/                  # Event-specific presentation cards
│   │   │   │   ├── event-card.tsx       # Public landing page event card
│   │   │   │   └── student-event-card.tsx# Interactive student card (dashboard/explore)
│   │   │   └── layout/                  # Navigation bars, footers, shells
│   │   │       ├── admin-layout.tsx     # Admin shell with sidebar & header
│   │   │       ├── app-shell.tsx        # Top-level context provider shell
│   │   │       ├── footer.tsx           # Public landing footer
│   │   │       ├── hero-section.tsx     # Public hero banner
│   │   │       ├── navbar.tsx           # Public navigation bar
│   │   │       ├── organiser-layout.tsx # Organiser shell with navigation
│   │   │       └── student-layout.tsx   # Student shell with search & drawer
│   │   ├── context/                     # React Context State Providers
│   │   │   ├── admin-context.tsx        # Moderation actions and admin stats
│   │   │   ├── auth-context.tsx         # Authentication state and login/logout
│   │   │   ├── bookmark-context.tsx     # Backward-compatible bookmark helper
│   │   │   ├── organiser-context.tsx    # Organiser event master store
│   │   │   └── student-context.tsx      # Unified events, bookmarks, reminders
│   │   ├── data/                        # Static and baseline data files
│   │   │   ├── events.ts                # Baseline DUMMY_EVENTS and categories
│   │   │   └── mock-users.ts            # Predefined test credentials
│   │   └── lib/                         # Utilities and services
│   │       ├── auth/                    # Authentication abstractions
│   │       │   ├── auth-service.ts      # Service interface and route resolver
│   │       │   ├── auth-types.ts        # User, session, and role types
│   │       │   └── mock-auth-service.ts # LocalStorage mock auth implementation
│   │       ├── storage.ts               # LocalStorage read/write/remove helpers
│   │       └── urls.ts                  # URL format validator
│   ├── biome.json                       # Biome formatter & linter configuration
│   ├── DESIGN-SYSTEM.md                 # Design tokens, typography, and spacing
│   ├── next.config.ts                   # Next.js 16 compiler & caching options
│   ├── package.json                     # Dependencies and run scripts
│   ├── PRODUCT-ASSUMPTIONS.md           # Product problem validation & MVP scope
│   └── tsconfig.json                    # TypeScript compiler options
└── README.md                            # Comprehensive Project Documentation
```

---

## 10. Installation and Setup

### Prerequisites
* **Node.js:** Version `18.18.0` or higher (Node `20.x` LTS or `22.x` recommended).
* **Package Manager:** `npm` (bundled with Node.js) or `pnpm`.
* **Browser:** Modern evergreen browser (Chrome, Firefox, Safari, Edge) supporting ES6+ and `localStorage`.

### Step 1: Clone the Repository
```bash
git clone https://github.com/valarxdhn/CampusLoop-.git
cd CampusLoop-/campus
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Environment Configuration
**No environment variables or `.env` files are required.** The application is an MVP running completely on client-side simulation.

### Step 4: Run the Development Server
```bash
npm run dev
```
Open your browser and navigate to:
```
http://localhost:3000
```

### Step 5: Build for Production
To create an optimized production build and test prerendered assets:
```bash
npm run build
npm run start
```

---

## 11. Application Routes

| Route | Page Name | Intended Role | Access Requirement | Primary Interactions & Features |
| :--- | :--- | :--- | :--- | :--- |
| `/` | Landing Page | Public | Open | Platform introduction, hero banner, featured events preview, about section, direct links to Sign In / Sign Up. |
| `/login` | Sign In | Public / Student | Open | Unified sign-in form with predefined test account copy-paste shortcuts; redirects authenticated users to their role portal. |
| `/signup` | Student Registration | Public | Open | Self-registration form for new students; validates input and logs student in directly. |
| `/forgot-password` | Password Recovery | Public | Open | Password reset request form with simulated confirmation messaging. |
| `/organiser/login` | Organiser Login | Organiser | Open | Dedicated sign-in portal for club leads with quick pre-filled credential shortcuts. |
| `/admin/login` | Admin Login | Admin | Open | Dedicated administrative sign-in portal for faculty moderators and university administrators. |
| `/dashboard` | Student Dashboard | Student | `role === "student"` | Personalized welcome, upcoming event count, featured carousel, category tiles, filter dropdowns. |
| `/explore` | Explore Events | Student | `role === "student"` | Full event catalog, live text search, category tabs, timeframe filters, sorting options, pagination. |
| `/events/[id]` | Event Details | Student | `role === "student"` | Detailed view of event description, schedules, location, host, bookmark toggle, registration modal, reminder configuration. |
| `/bookmarks` | Bookmarked Events | Student | `role === "student"` | Directory of saved events with counters, details links, and removal buttons. |
| `/registrations` | My Registrations | Student | `role === "student"` | Directory of events marked as registered with status badges and external links. |
| `/reminders` | My Reminders | Student | `role === "student"` | Schedule of set reminders with custom dates/times and delete controls. |
| `/profile` | Student Profile | Student | `role === "student"` | Editable student name and college name, read-only email, and sign out button. |
| `/organiser/dashboard`| Organiser Dashboard | Organiser | `role === "organiser"`| Aggregate event metrics (Total, Approved, Pending, Rejected), quick filters, event table with edit/delete actions. |
| `/organiser/events` | My Events | Organiser | `role === "organiser"`| Filterable list of club events with live status badges and direct management links. |
| `/organiser/events/create`| Create Event | Organiser | `role === "organiser"`| Multi-field event proposal form, banner image preview, draft saving, and administrative submission. |
| `/organiser/events/[id]/edit`| Edit Event | Organiser | `role === "organiser"`| Form to revise event details, reschedule times, update descriptions, and resubmit rejected proposals. |
| `/organiser/events/[id]`| Event Status | Organiser | `role === "organiser"`| Overview of specific event parameters, moderation status badge, and recorded administrative feedback notes. |
| `/organiser/profile` | Organiser Profile | Organiser | `role === "organiser"`| Club leadership contact details and departmental affiliations. |
| `/admin/dashboard` | Admin Dashboard | Admin | `role === "admin"` | Institutional moderation dashboard with pending review banners, summary statistics, and recent submissions table. |
| `/admin/events/pending` | Pending Approvals | Admin | `role === "admin"` | Moderation queue of pending events with quick inline Approve and Reject actions. |
| `/admin/events/[id]/review`| Review Details | Admin | `role === "admin"` | Deep-dive review screen with banner display, schedule metadata, and side-by-side approval/rejection dialogs. |
| `/admin/events/approved`| Approved Events | Admin | `role === "admin"` | Archive of approved events with approval date stamps and details links. |
| `/admin/events/rejected`| Rejected Events | Admin | `role === "admin"` | Log of rejected events with recorded reasons and option to reconsider approval. |
| `/demo` | Demo Helper | Public | Open | Utility route redirecting directly to `/login`. |

---

## 12. Authentication and Predefined Test Accounts

CampusLoop implements a **Mock Authentication Service** (`MockAuthService`) that simulates realistic identity validation, role-based authorization, and session persistence using `localStorage`.

> **Important Security Notice:** This is an educational MVP simulation designed for local development and technical demonstration. It does not use encrypted HTTP-only cookies, JWT verification, or a remote identity provider.

### Predefined Test Accounts

The platform includes verified mock credentials pre-configured in `src/data/mock-users.ts`:

| Role | Display Name | Email Address | Password | Authorized Portal |
| :--- | :--- | :--- | :--- | :--- |
| **Student** | Rahul Sharma | `student@campusloop.com` | `Student@123` | Student Portal (`/dashboard`) |
| **Student (Alias)** | Priya Sharma | `priya@college.edu` | `Student@123` | Student Portal (`/dashboard`) |
| **Organiser** | Priya Nair | `organiser@campusloop.com` | `Organiser@123` | Organiser Portal (`/organiser/dashboard`) |
| **Organiser (Alias)**| Arun Kumar | `organiser@college.edu` | `Organiser@123` | Organiser Portal (`/organiser/dashboard`) |
| **Administrator** | Campus Administrator | `admin@campusloop.com` | `Admin@123` | Admin Portal (`/admin/dashboard`) |
| **Administrator (Alias)**| Dr. Sunita Rao | `admin@college.edu` | `Admin@123` | Admin Portal (`/admin/dashboard`) |

### Authentication Behavior
1. **Login:** Users enter email and password on `/login`, `/organiser/login`, or `/admin/login`. The service authenticates credentials and writes a session object to `campusloop_session_v1`.
2. **Session Restoration:** When the application loads, `AuthProvider` reads `campusloop_session_v1` and restores the user session without forcing re-login.
3. **Route Guards:** If an unauthenticated user navigates to `/dashboard`, `ProtectedRoute` intercepts the request and redirects to `/login?redirect=%2Fdashboard`.
4. **Role Mismatches:** If an authenticated student attempts to open `/admin/dashboard`, `ProtectedRoute` intercepts and redirects them back to their authorized dashboard (`/dashboard`).
5. **Sign Out:** Calling `logout()` wipes the session from storage and redirects the browser to `/login`.

---

## 13. Data Flow and State Management

### Context Architecture

The application coordinates data through four nested context providers:
1. **`AuthProvider`:** Manages authenticated user identity, role, and login/logout state.
2. **`OrganiserProvider`:** Manages the primary event catalog (`campusloop_organiser_events_v1`). Handles event creation, updates, deletions, and draft statuses.
3. **`AdminProvider`:** Consumes `OrganiserProvider`. Derives pending, approved, and rejected slices. Exposes `approveEvent(id)` and `rejectEvent(id, reason)` which update event records in the organizer store.
4. **`StudentProvider`:** Consumes `OrganiserProvider`. Filters events for `approvalStatus === "Approved"`, maps them to standard student event objects, and merges them with baseline static events (`DUMMY_EVENTS`) using title/date/venue deduplication. Manages student bookmarks, registrations, reminders, and profile updates.

### LocalStorage Schema Keys

| Storage Key | Format | Data Description |
| :--- | :--- | :--- |
| `campusloop_session_v1` | Object (`StoredSession`) | Current active session: `{ userId, role, email }`. |
| `campusloop_registered_users_v1` | Array (`MockUser[]`) | Student accounts created via the `/signup` form. |
| `campusloop_organiser_events_v1` | Array (`OrganiserEvent[]`) | Master list of organizer events (Draft, Pending, Approved, Rejected). |
| `campusloop_organiser_profile_v1`| Object (`OrganiserProfile`) | Club representative contact details and department. |
| `campusloop_bookmarks` | Array (`string[]`) | IDs of events bookmarked by the student. |
| `campusloop_registrations` | Array (`RegistrationItem[]`) | Event IDs and statuses marked as registered. |
| `campusloop_reminders` | Array (`ReminderItem[]`) | Configured reminders with timing, target, and timestamps. |
| `campusloop_profile` | Object (`StudentProfile`) | Student's name, email, and college name. |

---

## 14. Responsive Design

CampusLoop is designed mobile-first and tested to ensure zero horizontal overflow and proper touch ergonomics across five viewport categories:

* **Small Mobile (320px – 374px):** Form buttons and dialog actions stack vertically (`flex-col`); filter selects expand to full available width; card action bars become full-width stackable buttons; dialog modals are constrained to `max-h-[90vh] overflow-y-auto`.
* **Standard Mobile (375px – 639px):** Tap targets exceed $44\text{px} \times 44\text{px}$; category tabs feature horizontal touch-scrolling; mobile navigation menus open via a responsive hamburger drawer.
* **Tablet (640px – 1023px):** Grids transition from single-column to 2-column layouts; tables utilize internal horizontal scroll wrappers (`min-w-[640px]`) within cards; action bars transition to horizontal layouts (`sm:flex-row`).
* **Desktop (1024px – 1439px):** Fixed navigation sidebars on organizer and admin portals; 3-column event grids; multi-column event review screens.
* **Large Monitors (1440px and above):** Content is bounded within maximum width containers (`max-w-6xl`, `max-w-7xl`) with centered alignment, preventing awkward visual stretching.

---

## 15. Screenshots

The following representative screens illustrate the key interfaces across CampusLoop.

| Screen | Route | Wireframe Reference | Suggested Screenshot File |
| :--- | :--- | :--- | :--- |
| **Landing Page** | `/` | Frame 01 | `docs/screenshots/01-landing-page.png` |
| **Student Sign Up** | `/signup` | Frame 02 | `docs/screenshots/02-student-signup.png` |
| **Unified Sign In** | `/login` | Frame 03 | `docs/screenshots/03-unified-login.png` |
| **Student Dashboard** | `/dashboard` | Frame 05 | `docs/screenshots/04-student-dashboard.png` |
| **Explore Events** | `/explore` | Frame 06 | `docs/screenshots/05-explore-events.png` |
| **Event Details & Reminder Modal** | `/events/[id]` | Frame 07 | `docs/screenshots/06-event-details.png` |
| **Bookmarked Events** | `/bookmarks` | Frame 08 | `docs/screenshots/07-bookmarks.png` |
| **My Registrations** | `/registrations` | Frame 09 | `docs/screenshots/08-registrations.png` |
| **My Reminders** | `/reminders` | Frame 10 | `docs/screenshots/09-reminders.png` |
| **Student Profile** | `/profile` | Frame 11 | `docs/screenshots/10-student-profile.png` |
| **Organiser Dashboard** | `/organiser/dashboard` | Frame 13 | `docs/screenshots/11-organiser-dashboard.png` |
| **Create Event Form** | `/organiser/events/create`| Frame 14 | `docs/screenshots/12-create-event.png` |
| **Edit Event Listing** | `/organiser/events/[id]/edit`| Frame 15 | `docs/screenshots/13-edit-event.png` |
| **Organiser Event Status** | `/organiser/events/[id]`| Frame 16 | `docs/screenshots/14-organiser-status.png` |
| **Admin Dashboard** | `/admin/dashboard` | Frame 18 | `docs/screenshots/15-admin-dashboard.png` |
| **Pending Approvals Queue** | `/admin/events/pending` | Frame 19 | `docs/screenshots/16-pending-approvals.png` |
| **Event Review & Decision** | `/admin/events/[id]/review`| Frame 20 | `docs/screenshots/17-admin-review.png` |
| **Approved Events Directory** | `/admin/events/approved`| Frame 21 | `docs/screenshots/18-approved-events.png` |
| **Rejected Events Log** | `/admin/events/rejected`| Frame 22 | `docs/screenshots/19-rejected-events.png` |

> *To capture and add screenshots, create the `campus/docs/screenshots/` directory, capture the pages at standard $1280 \times 800$ resolution, and save them using the suggested filenames above.*

---

## 16. Testing and Quality Checks

The codebase includes verification commands configured in `package.json`:

```bash
# 1. Format and Linting Check (Biome)
npm run lint

# 2. Automated Code Formatting (Biome)
npm run format

# 3. TypeScript Type Compilation Check
npx tsc --noEmit

# 4. Production Next.js Build Verification
npm run build
```

### Verification Results
* **Biome Linting:** Clean pass across all 56 source files with 0 errors.
* **TypeScript:** Complete static check with 0 type errors.
* **Next.js Production Build:** All 28 routes compile and prerender successfully.

---

## 17. Current Limitations

* **Client-Side Mock Authentication:** Passwords are validated locally against predefined user arrays; no cryptographic hashing or OAuth provider is used.
* **Browser-Local Storage:** Data is persisted in `localStorage`. Changes made on one device or browser do not automatically sync to other devices.
* **No Real-Time Push Notifications:** Reminders are recorded and displayed in the UI, but external push notifications (SMS, Email, Web Push) are not yet integrated.
* **External Event Registration:** Registration occurs via external URLs (Google Forms, Unstop, etc.). The platform tracks student registration status as a personal record rather than an internal ticket issuing system.
* **Simulated File Uploads:** Event banner images use web image URLs or local object URLs rather than a cloud object storage service (AWS S3, Cloudinary).

---

## 18. Future Improvements

Planned enhancements for future production phases include:
1. **Production Backend:** Implement a centralized backend with PostgreSQL and Prisma ORM to enable persistent, multi-tenant campus data storage.
2. **Real Authentication:** Integrate NextAuth.js / Auth0 with institutional SSO (Single Sign-On via university email domains).
3. **Automated Email & Push Notifications:** Dispatch email reminders and notifications when proposals are approved or deadlines approach.
4. **QR Code Attendance & Ticketing:** In-app check-ins allowing organizers to scan student QR codes at venue entrances.
5. **Analytics & Engagement Dashboard:** Metrics tracking student engagement, peak attendance categories, and club performance.

---

## 19. Security Considerations

* **Mock Environment Boundary:** The current authentication implementation is intended strictly for demonstrations and development. Sensitive student data or real administrative passwords should never be stored in this MVP.
* **Input Sanitization:** URL inputs are validated via `isValidHttpUrl()`, and JSON parsed from `localStorage` is guarded by type validator functions (`isRecord`, `isOrganiserEventArray`, `isStudentProfile`).
* **Route Protection:** Protected routes prevent casual URL tampering by checking role privileges before rendering portal layouts.

---

## 20. Contribution Guidelines

1. **Fork the Repository:** Create your feature branch (`git checkout -b feature/amazing-feature`).
2. **Follow Coding Standards:** Ensure changes adhere to Biome formatting and linting rules (`npm run format` and `npm run lint`).
3. **Verify Types:** Ensure zero TypeScript errors (`npx tsc --noEmit`).
4. **Test Production Build:** Verify that all routes build cleanly (`npm run build`).
5. **Submit a Pull Request:** Open a detailed pull request describing the changes and referencing the relevant wireframe frame if applicable.

---

## 21. License

No license file is currently present in this repository. All rights are reserved by the original project authors.

---

## 22. Acknowledgements

* **Next.js Team (Vercel):** For the Next.js 16 App Router and Turbopack.
* **Tailwind Labs:** For Tailwind CSS v4.
* **Lucide:** For the comprehensive Lucide React icon library.
* **Biome Tooling:** For high-speed JavaScript/TypeScript formatting and linting.
* **CampusLoop Product Team:** For the wireframes and product assumption specifications documented in `docs/wireframes/campusloop-wireframe.svg` and `PRODUCT-ASSUMPTIONS.md`.

