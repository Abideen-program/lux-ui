# lux-ui

Beautiful React component library powered by [luxcss](https://github.com/Abideen-program/luxcss). 60+ components with glass, neon, aurora, and motion built in — out of the box.

> **Status:** Phase 1 complete (60 components). Not yet published to npm — currently used via `npm link` during development.

---

## Why lux-ui?

Most component libraries give you functional, correctly-styled components — but flat and corporate by default. lux-ui starts from the same foundation (think MUI, shadcn/ui) and adds the visual personality of [luxcss](https://github.com/Abideen-program/luxcss): glass surfaces, gradient text, magnetic buttons, confetti, tilt effects, and smooth motion — all as real, typed React components.

```tsx
import { Card, GradientText, Button, Avatar, Badge } from 'lux-ui';

function Welcome() {
  return (
    <Card variant="glass" radius="xl">
      <GradientText gradient="electric" as="h1">Welcome back</GradientText>
      <Avatar initials="AB" status="online" />
      <Badge tone="success">Pro Plan</Badge>
      <Button tone="primary" radius="full" ripple magnetic>
        Get Started
      </Button>
    </Card>
  );
}
```

---

## Installation

```bash
npm install lux-ui luxcss
```

lux-ui requires `luxcss` as a peer dependency, since every component is built on top of Lux's attribute system.

### Set up luxcss first

Follow the [luxcss Next.js setup guide](https://abideen-program.github.io/luxcss/docs.html#frameworks) — you need `lux.css` imported and a `LuxLoader` client component for `lux.js`, since Next.js App Router treats `layout.tsx` as a Server Component.

```tsx
// src/components/LuxLoader.tsx
'use client';
import 'luxcss/dist/lux.js';
export default function LuxLoader() {
  return null;
}
```

```tsx
// app/layout.tsx
import 'luxcss/dist/lux.css';
import LuxLoader from '@/components/LuxLoader';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LuxLoader />
        {children}
      </body>
    </html>
  );
}
```

### Then use lux-ui components anywhere

```tsx
import { Button } from 'lux-ui';

export default function Page() {
  return <Button tone="primary">Click me</Button>;
}
```

No extra setup needed — every lux-ui component already ships with the `'use client'` directive internally, so it works inside Server Components without you needing to add anything.

---

## Component Categories

### Inputs
`Button` · `ButtonGroup` · `IconButton` · `TextField` · `Textarea` · `Select` · `Checkbox` · `RadioGroup` · `Switch` · `Slider` · `Rating` · `ToggleButton` · `ToggleButtonGroup` · `Autocomplete`

### Data Display
`Typography` (`H1`–`H4`, `Lead`, `Body`, `Caption`, `Label`, `Code`, `Overline`) · `Avatar` · `AvatarGroup` · `Badge` · `Chip` · `Divider` · `List` · `ListItem` · `Table` · `Tooltip` · `ImageList`

### Feedback
`Alert` · `ToastProvider` / `useToast` · `Dialog` · `Progress` · `Skeleton` · `Spinner`

### Surfaces
`Card` (`GlassCard`, `NeonCard`, `AuroraCard`) · `Paper` · `Accordion` / `AccordionItem` · `AppBar`

### Navigation
`Tabs` / `TabList` / `Tab` / `TabPanel` · `Breadcrumbs` · `Pagination` · `Menu` · `Menubar` · `Stepper` · `SpeedDial` · `Link` · `BottomNavigation`

### Layout
`Box` · `Container` · `Grid` · `Stack` · `Masonry`

### Overlay
`Modal` · `Popover` · `Backdrop` · `Portal` · `Drawer`

### Lux Exclusive — visual personality
`GradientText` · `MagneticButton` · `ConfettiButton` · `TiltCard` · `Typewriter` · `Counter` · `Marquee` · `CursorTrail` · `Timeline` · `ColorPicker`

---

## Design Tokens

Every component accepts a consistent set of props mapped to luxcss design tokens:

| Prop | Type | Notes |
|---|---|---|
| `tone` | `'primary' \| 'danger' \| 'success' \| 'warning' \| 'info' \| 'accent' \| 'neutral'` | Color tone |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | Maps to Lux density internally |
| `radius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| 'full'` | Border radius |
| `variant` | `'solid' \| 'outline' \| 'ghost' \| 'soft'` | Visual style |

---

## TypeScript

lux-ui is written entirely in TypeScript. Every component, prop, and variant is fully typed — no `as any`, no missing autocomplete.

```tsx
import type { ButtonProps, CardVariant } from 'lux-ui';
```

---

## Requirements

- React ≥ 18
- React DOM ≥ 18
- luxcss ≥ 2.0.0
- Next.js (App Router or Pages Router) or any React framework

---

## Local Development / Testing (pre-publish)

```bash
git clone https://github.com/Abideen-program/lux-ui.git
cd lux-ui
npm install
npm run build
npm link
```

Then in a separate test project:

```bash
npm link lux-ui
```

> If using Next.js 16 with Turbopack, run `next dev --webpack` for symlinked packages, or add `turbopack.root` to `next.config.ts` pointing at the parent folder containing both projects.

---

## Roadmap

- **Phase 2:** DataGrid, DatePicker, TimePicker, RichTextEditor, CodeEditor, FileUpload, Kanban, Charts, TreeView, VirtualList
- **Phase 3:** Marketing blocks — Hero, FeatureGrid, PricingTable, TestimonialCarousel, FAQAccordion
- **Phase 4:** Dashboard blocks — StatCard, ActivityFeed, NotificationCenter, CommandPalette, SidebarNav

---

## License

MIT
