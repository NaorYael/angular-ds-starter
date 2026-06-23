# Angular DS Starter

A lightweight **Angular 21 + Nx** starter with a personal Design System (`ds-*` components) — ready for prototypes, take-home assignments, and personal projects.

Maintained by [NaorYael](https://github.com/NaorYael).

## What's included

| Package | Description |
|---------|-------------|
| `@ds/design-system` | Form controls, feedback, layout, charts, CSS tokens |
| `@ds/grid` | AG Grid wrapper with badge/actions cell renderers |
| `apps/starter` | Demo app with components, grid, charts, auth skeleton |

### Design system components

**Forms:** `ds-button`, `ds-input`, `ds-textarea`, `ds-select`, `ds-multi-select`, `ds-autocomplete`, `ds-checkbox`, `ds-switch`, `ds-radio`, `ds-input-password`, `ds-datepicker`, `ds-file-upload`

**Feedback:** `ds-toast`, `ds-dialog`, `ds-drawer`, `ds-spinner`, `ds-badge`, `ds-tag`, `ds-empty-state`, `ds-alert`, `ds-progress`, `ds-skeleton`

**Layout & navigation:** `ds-card`, `ds-tabs`, `ds-breadcrumbs`, `ds-stepper`, `ds-menu`, `ds-tooltip`, `ds-avatar`

**Data:** `ds-table`, `ds-pagination`, `ds-chart`, `ds-chart-card`, `ds-grid`

### App skeleton

- Mock **auth** (`AuthService`, guards, interceptors, login/dashboard/settings)
- **HTTP** wrapper with `environment.apiUrl`
- **Loading** and **error** interceptors
- **Dark mode** via CSS variables + `ThemeService`
- Lightweight **i18n** skeleton (EN / HE + RTL toggle)

## Quick start

```bash
git clone https://github.com/NaorYael/angular-ds-starter.git my-project
cd my-project
npm install
npm start
```

Open [http://localhost:4200](http://localhost:4200).

## Copy for a new project

```bash
npm run new -- ../my-take-home
cd ../my-take-home
npm install
npm start
```

Always copy **outside** the starter repo (`../`) to avoid nested Nx projects.

See the full README sections in-repo for GitHub Template, manual copy, and rename instructions.

## Routes

| Path | Description |
|------|-------------|
| `/` | Component demos |
| `/grid` | AG Grid + cell renderers + server-side pagination demo |
| `/charts` | Chart.js demos |
| `/login` | Guest-only login page |
| `/dashboard` | Protected dashboard |
| `/settings` | Protected profile/settings page |

## Design tokens

Global CSS variables live in `apps/starter/src/styles.scss`. Toggle dark mode from the app header or set `data-theme="dark"` on `<html>`.

```scss
--ds-color-primary
--ds-color-text
--ds-color-surface
--ds-radius-md
```

## Project structure

```
angular-ds-starter/
├── apps/starter/              # Demo application
├── libs/design-system/        # ds-* components
├── libs/grid/                 # ds-grid + cell renderers
├── tools/new-project.mjs      # Copy script
└── .github/workflows/ci.yml   # Lint + build on push/PR
```

## Adding a new ds-* component

1. Create the component under `libs/design-system/src/lib/ds-your-component/`
2. Export it from `libs/design-system/src/index.ts`
3. Add the folder to `libs/design-system/tsconfig.lib.json` `include`
4. Use it via `import { DsYourComponent } from '@ds/design-system'`

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Serve demo app |
| `npm run build` | Production build |
| `npm run lint` | Lint apps and libraries |
| `npm run new -- ../folder` | Copy starter to a new folder |

## Tech stack

- Angular 21, Nx 22
- AG Grid 34, Chart.js 4
- Standalone components, signals, OnPush
- SCSS with `--ds-*` CSS variables (no UI framework)

## License

MIT
