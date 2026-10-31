# CampusLoop Design System

## 1. Project Overview

CampusLoop helps students discover, save, and keep track of campus events, while
giving organisers a place to publish and manage them. The system should make
event details easy to scan and the next useful action easy to find.

The approved screen layouts are documented in
[`docs/wireframes/campusloop-wireframe.svg`](./docs/wireframes/campusloop-wireframe.svg)
and are the source of truth for page structure and user flows. The palette and
component guidance below remain provisional where the wireframes do not define
them; do not change a wireframe-driven layout to accommodate an implementation
mistake.

## 2. Design Principles

- **Consistency:** Use shared tokens and component patterns across discovery,
  event details, organiser tools, and administration.
- **Simplicity:** Prioritise event title, date, location, and registration
  status. Keep secondary actions visually quiet.
- **Accessibility:** Use semantic HTML, keyboard-operable controls, visible
  focus, clear labels, and sufficient text contrast. Never communicate status
  by colour alone.
- **Responsiveness:** Make core discovery and registration flows work on small
  screens first, then use additional space for richer layouts.
- **Reusability:** Prefer shared components with documented variants over
  one-off styling.

## 3. Colour Palette

The initial direction is a calm, light neutral canvas with confident blue
actions and teal for positive or campus-related accents. These values are
proposals, not extracted from wireframes.

| Token | Value | Intended use |
| --- | --- | --- |
| `canvas` | `#F8FAFC` | Application page background |
| `surface` | `#FFFFFF` | Cards, menus, dialogs, and input backgrounds |
| `surface-muted` | `#F1F5F9` | Subtle grouped areas and inactive controls |
| `surface-hover` | `#E2E8F0` | Hovered surface controls |
| `text-primary` | `#0F172A` | Headings and primary body text |
| `text-secondary` | `#475569` | Supporting text and metadata |
| `text-tertiary` | `#64748B` | Compact metadata and icon labels |
| `text-disabled` | `#64748B` | Disabled labels; pair with a visibly disabled control |
| `border` | `#CBD5E1` | Dividers, input outlines, and card borders |
| `primary` | `#1D4ED8` | Primary actions, links, and selected navigation |
| `primary-hover` | `#1E40AF` | Hover and pressed primary actions |
| `accent` | `#0F766E` | Secondary emphasis and positive event highlights |
| `success` | `#166534` | Successful registration and completed actions |
| `warning` | `#92400E` | Deadlines, limited availability, and caution |
| `danger` | `#B91C1C` | Errors, destructive actions, and cancellation |
| `focus` | `#2563EB` | Keyboard focus ring |

Use the dark foreground values for text on light surfaces. Status text should
use its corresponding dark status colour on a tinted background. Do not place
small white text on light tints. Links must be underlined in body copy or
otherwise have a non-colour cue. Validate final foreground/background pairs
against WCAG 2.2 AA: at least 4.5:1 for normal text and 3:1 for large text and
meaningful non-text UI indicators.

If dark mode is introduced, define and validate a separate set of semantic
surface, text, border, and status tokens; do not mechanically invert these
values.

## 4. Typography

Use **Geist Sans** for interface text, matching the font already configured by
the application. Reserve **Geist Mono** for codes or other genuinely
monospaced data.

| Style | Size / line height | Weight | Typical use |
| --- | --- | --- | --- |
| Display | `36 / 44 px` | 700 | Landing-page or major page headline |
| Page title | `30 / 38 px` | 700 | Page heading |
| Section title | `22 / 30 px` | 600 | Card groups and page sections |
| Card title | `18 / 26 px` | 600 | Event and panel titles |
| Body | `16 / 24 px` | 400 | Default descriptions and controls |
| Small | `14 / 20 px` | 400 | Metadata, helper text, and table content |
| Label | `14 / 20 px` | 500 | Form labels and compact navigation |
| Fine print | `12 / 16 px` | 400 | Supplemental information only |

Keep body text at 16 px where practical. Do not use fine print for important
event dates, deadlines, eligibility, or form instructions. Use sentence case,
short descriptive headings, and comfortable line lengths (about 65–75
characters for long-form text).

## 5. Spacing System

Use a 4 px base unit. Prefer these spacing steps for layout and component
padding:

| Token | Value | Typical use |
| --- | --- | --- |
| `space-1` | `4 px` | Icon-to-label gap, compact adjustments |
| `space-2` | `8 px` | Related inline items |
| `space-3` | `12 px` | Compact control padding |
| `space-4` | `16 px` | Default control and card padding |
| `space-6` | `24 px` | Section content gaps |
| `space-8` | `32 px` | Between content groups |
| `space-12` | `48 px` | Major section separation |
| `space-16` | `64 px` | Large page-level separation |

Use a consistent content gutter of 16 px on small screens and 24–32 px on
larger screens. Keep related content closer together than unrelated groups.
Avoid arbitrary one-off spacing values when a token will work.

### Shape and elevation

- Small controls: 6–8 px corner radius.
- Cards and larger panels: 12 px corner radius.
- Pills: fully rounded; reserve for compact filters and badges.
- Prefer a subtle border over a shadow for most cards. Use a restrained shadow
  for floating menus and dialogs to communicate elevation.

## 6. Reusable UI Components

The components below are design specifications; they are not a claim that each
has already been implemented.

### 6.1 Button

- Provide primary, secondary, tertiary/ghost, and destructive variants.
- Provide default, hover, pressed, focus-visible, disabled, and loading states.
- Use a minimum 44 × 44 px interactive target where possible.
- Use a consistent height (40–44 px), clear verb-first labels, and a visible
  focus ring. Keep one primary action visually dominant in a group.
- Use a real button for actions and a link for navigation. Do not use a
  disabled-looking style without actually disabling the control.

### 6.2 Navbar

- Provide a compact mobile layout and a full desktop layout.
- Keep brand, primary destinations, and account access in predictable
  locations. Indicate the active destination with more than colour alone.
- Make the mobile menu keyboard-accessible and expose its expanded state.
- Keep navigation labels short and avoid crowding it with secondary actions.

### 6.3 Sidebar

- Use for organiser/admin areas with several related destinations; avoid it
  when a small top navigation is sufficient.
- Show the current section clearly and preserve a logical heading hierarchy.
- On narrow screens, collapse to a drawer or compact navigation with an
  accessible open/close control.

### 6.4 Card

- Use event cards as links when the whole card opens event details. Do not nest
  buttons or links inside a whole-card link.
- Present title, date/time, venue, and category in a predictable order.
- Keep bookmark and other secondary actions separately focusable, labelled,
  and operable without triggering the card navigation.
- Use a consistent border, radius, and padding; reserve elevation for
  interactive hover/focus feedback where useful.

### 6.5 Modal

- Use for short, focused decisions that need to preserve the current context;
  prefer a page for complex forms.
- Include a descriptive title, a clear close/cancel action, and a visible
  primary action when needed.
- Move focus into the dialog on open, keep keyboard focus within it, close on
  Escape when safe, and restore focus to the opener.
- On small screens, use a full-width sheet or near-full-screen dialog with
  scrollable content.

### 6.6 Input

- Always provide a persistent visible label. Placeholder text is an example,
  not a substitute for a label.
- Associate help and error text programmatically with the input.
- Distinguish default, hover, focus-visible, filled, invalid, and disabled
  states. Explain how to fix an error in text.
- Use suitable input types, autocomplete, and input modes for the data.

### 6.7 Dropdown

- Use a native select for simple fixed choices when it meets the interaction
  needs. Use a custom combobox only when search or richer options are required.
- Make selected, expanded, focused, and disabled states perceivable.
- Support keyboard navigation and communicate the current value in the
  trigger. Do not use a dropdown for a small set of mutually exclusive
  options when radio buttons are clearer.

### 6.8 Table

- Use tables for genuinely tabular organiser/admin data, not for general page
  layout.
- Give each table a caption or accessible name and use semantic header cells.
- On small screens, keep essential columns visible or provide a deliberate
  alternate layout; do not silently clip critical values.
- Keep row actions labelled and keyboard-accessible. Provide a clear empty
  state and loading state.

### 6.9 Badge

- Use for concise categories and statuses such as “Workshop”, “Open”, or
  “Cancelled”.
- Pair status colour with text or an icon; do not make colour carry meaning by
  itself.
- Keep badges visually secondary to the event title and avoid using them as
  buttons unless they have clear interactive affordance.

### 6.10 Loading State

- Use a progress indicator for brief waits and a skeleton only when it
  meaningfully previews the incoming layout.
- Keep layout stable to reduce visual movement. Announce meaningful loading
  changes to assistive technology without repeatedly announcing decorative
  skeletons.
- For long operations, provide progress or a useful status message and do not
  imply completion before it occurs.

### 6.11 Empty State

- Explain what is absent in plain language and, when useful, why.
- Provide one relevant next step, such as changing filters or creating the
  first event.
- Keep the action specific to the current context. Avoid treating a successful
  search with no results as an error.

## 7. Component Variants

Use variants to communicate hierarchy or state, not to decorate. Keep variant
names consistent across components where the meaning is the same.

| Component | Variants / states |
| --- | --- |
| Button | `primary`, `secondary`, `tertiary`, `destructive`; `default`, `hover`, `pressed`, `focus-visible`, `disabled`, `loading` |
| Navbar | `desktop`, `mobile`; `default`, `active`, `expanded` |
| Sidebar | `expanded`, `collapsed`, `mobile-drawer`; `default`, `active` |
| Card | `default`, `interactive`, `selected`, `disabled` |
| Modal | `standard`, `confirmation`, `mobile-sheet`; `open`, `closing` |
| Input | `text`, `search`, `date`, `select`; `default`, `focus`, `filled`, `invalid`, `disabled` |
| Dropdown | `select`, `combobox`; `closed`, `open`, `selected`, `disabled` |
| Table | `default`, `compact`; `loading`, `empty`, `error` |
| Badge | `category`, `neutral`, `success`, `warning`, `danger` |
| Loading | `spinner`, `skeleton`, `progress` |
| Empty state | `no-events`, `no-search-results`, `no-bookmarks`, `no-managed-events` |

Avoid adding a variant until a real use case needs a distinct appearance or
behavior. Variants must retain the same accessible interaction requirements as
their base component.

## 8. Responsive Breakpoints

Use mobile-first layouts and the project's Tailwind CSS default breakpoints:

| Breakpoint | Width | Guidance |
| --- | --- | --- |
| Base | `< 640 px` | Single-column content, compact navigation, full-width controls |
| `sm` | `640 px` | Room for two-column card layouts where content allows |
| `md` | `768 px` | Introduce wider page composition or tablet navigation |
| `lg` | `1024 px` | Use desktop navigation and optional sidebar layouts |
| `xl` | `1280 px` | Expand content width; do not stretch text indefinitely |
| `2xl` | `1536 px` | Keep a readable max-width and use whitespace rather than oversized controls |

These are layout thresholds, not target devices. Let content determine when a
layout changes. At every width, preserve readable text, visible focus, usable
touch targets, and access to all information and actions.

## 9. Component Usage Guidelines

- Use semantic headings in order and landmark elements for page structure.
- Make all functionality available by keyboard, with a clear focus-visible
  indicator that is not obscured.
- Provide accessible names for icon-only controls; decorative icons should be
  hidden from assistive technology.
- Use descriptive link and button text, such as “View event” or “Save event”,
  instead of ambiguous labels like “Click here”.
- Keep event information consistent across cards, details, and organiser
  views. Format dates and times clearly and include a timezone when it matters.
- Preserve filter and search context when users navigate back from an event.
- Show validation errors next to the relevant field and summarize form errors
  when helpful. Never rely on colour alone to identify an error.
- Respect reduced-motion preferences. Avoid unnecessary animation and do not
  use motion as the only way to communicate a state change.
- Ensure layouts work with zoom and reflow; do not require horizontal scrolling
  for ordinary page content.
- Use design tokens for colours, type, spacing, and shape. Avoid isolated
  hard-coded values that create visual drift.
- Revisit provisional choices when approved wireframes and user feedback are
  available; record intentional departures from these patterns.