# Idol Audition Navi — Design Language

> A trusted audition desk on warm paper: editorial enough to feel credible, soft enough to feel approachable, and energetic enough to make the first step feel possible.

## Product character

- Audience: mainly young women considering an idol audition, including first-time applicants and students.
- Job: help people compare opportunities safely and move into an application with confidence.
- Voice: direct, kind, specific, never flashy or salesy.
- Visual idea: a carefully edited culture magazine crossed with an application notebook.

## Design tokens

### Color

| Role | Token | Value | Usage |
|---|---|---:|---|
| Canvas | `--canvas` | `#fffaf7` | Page background |
| Paper | `--paper` | `#fffefd` | Cards and primary surfaces |
| Paper tint | `--paper-tint` | `#f8f2ef` | Quiet secondary surfaces |
| Ink | `--ink` | `#241b24` | Headlines and primary actions |
| Muted ink | `--muted-ink` | `#6e6269` | Supporting copy |
| Line | `--line` | `#ded1d6` | Structural borders |
| Brand pink | `--brand` | `#e92d75` | Links, labels, selection and primary CTA |
| Brand dark | `--brand-dark` | `#b91f59` | Hover/focus states |
| Brand wash | `--brand-wash` | `#ffe7f0` | Tags and highlighted information |
| Lavender | `--decorative-lavender` | `#8f79c6` | Decorative accents only |
| Mint | `--positive` | `#257a62` | Confirmed/safe states only |

Brand pink is functional. Lavender is decorative and must not compete with an action.

### Typography

- Japanese UI/body: `Hiragino Sans`, `Yu Gothic`, `Meiryo`, system sans-serif.
- Display: the same family at 800–900 weight; personality comes from scale and line breaks, not novelty fonts.
- Display sizes: `clamp(2.6rem, 7vw, 5.8rem)`, line-height `0.98–1.08`.
- Page title: `clamp(2.1rem, 5vw, 4rem)`, line-height `1.08`.
- Section title: `clamp(1.65rem, 3vw, 2.5rem)`.
- Body: `16–18px`, line-height `1.8` for long Japanese text.
- Labels: `11–13px`, weight `700–800`, slight letter spacing. English labels may be uppercase.

### Spacing and layout

- Base unit: 4px.
- Page max-width: 1180px.
- Section gap: 72px desktop / 52px mobile.
- Card padding: 24–32px.
- Text measure: 42–48 Japanese characters where possible.
- Prefer asymmetric editorial grids to repeated centered blocks.

### Shape and elevation

- Cards: 16–20px radius. Do not default to 32px.
- Buttons/tags: pill radius is allowed because they are controls or labels.
- Borders: 1px solid `--line`; selected/featured surfaces may use 1.5px `--ink`.
- Card shadow: `0 10px 30px rgba(36, 27, 36, 0.06)` maximum.
- Avoid glassmorphism, neon, strong gradients, and deep shadows.

## Components

### Header

- Warm paper surface, fine bottom rule.
- Compact brand mark plus wordmark.
- Keep desktop navigation to the highest-value destinations.
- On mobile, provide a horizontal category rail instead of hiding discovery.
- One pink primary action: “募集を探す”.

### Hero

- Left-aligned display title and concise promise.
- One real audition image on the right whenever available.
- One primary CTA and one restrained secondary CTA.
- Use small paper labels and editorial numbering as personality, not abstract blobs.

### Audition card

- Photography occupies roughly 45% of the card.
- Region is overlaid as a paper label.
- Show no more than three feature tags.
- Title and group form the strongest hierarchy.
- Deadline is a consistent footer row; the arrow is the action affordance.
- Entire card is clickable with a visible focus state.

### Content panels

- Use a border and mostly flat paper fill.
- Introduce hierarchy with dividers, labels and whitespace before adding another nested card.
- Checklists use a small branded marker, not emoji.

### Application CTA

- Brand pink is reserved for the main “LINEで応募する” action.
- On mobile detail pages, keep a compact sticky bottom CTA.
- Explain what happens after tapping before the action.

## Imagery

- Use supplied official artist photographs and flyers as the primary visual material.
- Preserve original aspect ratio where the image contains important text; use `object-cover` only for photographic cards.
- Missing-image states use typography and a simple outlined star motif, never a generic gradient.

## Motion

- 160–220ms transitions.
- Card hover: translate up no more than 3px; image scale no more than 1.03.
- Respect `prefers-reduced-motion`.

## Accessibility

- Minimum 44px touch targets for primary controls.
- Always show `:focus-visible` with a 3px brand wash and ink outline.
- Maintain WCAG AA contrast for body text and controls.
- Do not communicate status using color alone.

## Do

- Make the listing inventory visible quickly.
- Make region, deadline, cost and beginner eligibility easy to scan.
- Use real names and concrete copy.
- Let photos and typography carry the personality.

## Do not

- Do not make every section a large rounded white card.
- Do not use decorative gradients as a substitute for imagery.
- Do not center long Japanese copy.
- Do not show more than one competing primary CTA in a section.
- Do not add decorative color without a defined role.
