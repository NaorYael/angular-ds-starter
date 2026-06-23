# Angular DS Starter

A lightweight **Angular 21 + Nx** starter with a personal Design System (`ds-*` components) — ready for prototypes, take-home assignments, and personal projects.

Clone this repo and start building immediately with `ds-button`, `ds-input`, `ds-select`, `ds-checkbox`, `ds-badge`, `ds-card`, `ds-toast`, `ds-dialog`, and `ds-grid`.

Maintained by [NaorYael](https://github.com/NaorYael).

## What's included

| Package | Description |
|---------|-------------|
| `@ds/design-system` | `ds-button`, `ds-input`, `ds-textarea`, `ds-select`, `ds-checkbox`, `ds-switch`, `ds-badge`, `ds-card`, `ds-tabs`, `ds-spinner`, `ds-empty-state`, `ds-toast`, `ds-dialog`, CSS tokens |
| `@ds/grid` | AG Grid wrapper (`ds-grid`) |
| `apps/starter` | Demo app with component and grid examples |

## Quick start

```bash
git clone https://github.com/NaorYael/angular-ds-starter.git my-project
cd my-project
npm install
npm start
```

Open [http://localhost:4200](http://localhost:4200).

## Copy the starter for a new project

Use this when you start a **take-home assignment**, prototype, or client project. You get a fresh folder with no git history and no `node_modules`.

### Option 1 — Script (recommended)

From inside `angular-ds-starter`:

```bash
npm run new -- ../my-take-home
cd ../my-take-home
npm install
npm start
```

Always copy **outside** the starter repo (`../`) to avoid nested Nx projects.

This copies the repo, sets `package.json` name to `@ds/<folder-name>`, runs `git init`, and skips `node_modules`, `dist`, and cache folders.

### Option 2 — Git clone

```bash
git clone git@github.com:NaorYael/angular-ds-starter.git my-project
cd my-project
rm -rf .git
git init
npm install
npm start
```

Use this when the starter already lives on GitHub.

### Option 3 — GitHub Template

1. Open [github.com/NaorYael/angular-ds-starter](https://github.com/NaorYael/angular-ds-starter)
2. **Settings** → check **Template repository**
3. On the repo page, click **Use this template** → **Create a new repository**

GitHub creates a clean copy under your account with its own history.

### Option 4 — Manual copy

```bash
cp -R angular-ds-starter my-project
cd my-project
rm -rf node_modules dist .git .angular .nx
npm install
npm start
```

### After copying

| Step | What to do |
|------|------------|
| 1 | `npm install` && `npm start` — verify it runs |
| 2 | Optionally rename `package.json` `"name"` |
| 3 | Clear demo content in `apps/starter/src/app/pages/` when you begin real work |
| 4 | Keep `@ds/design-system` and `@ds/grid` — that is your design system |
| 5 | Create a new GitHub repo and push when ready |

You do **not** need to rename `apps/starter` for most assignments. Build inside it, or add another Nx app later with:

```bash
npx nx g @nx/angular:application my-app --standalone --routing
```

## Rename the project

After cloning, update these if you want a custom name:

1. **`package.json`** — change `"name": "@ds/starter"` to your package name
2. **`apps/starter/project.json`** — rename the Nx project (optional)
3. **Folder `apps/starter/`** — rename to your app name and update paths in `project.json`

The `@ds/*` library imports can stay as-is — they are your design system namespace.

## Usage examples

### Button

```typescript
import { DsButtonComponent } from '@ds/design-system';

@Component({
  imports: [DsButtonComponent],
  template: `<ds-button variant="primary" label="Save" (clicked)="save()" />`,
})
export class MyComponent {}
```

Variants: `primary`, `secondary`, `tertiary`, `danger`. Sizes: `sm`, `md`, `lg`.

### Input

```typescript
import { DsInputComponent } from '@ds/design-system';

@Component({
  imports: [DsInputComponent, FormsModule],
  template: `<ds-input label="Email" placeholder="you@example.com" [(ngModel)]="email" />`,
})
export class MyComponent {
  email = '';
}
```

Supports `ControlValueAccessor` — works with template-driven and reactive forms.

### Select

```typescript
import { DsSelectComponent, DsSelectOption } from '@ds/design-system';

readonly roles: DsSelectOption[] = [
  { label: 'Admin', value: 'admin' },
  { label: 'Editor', value: 'editor' },
];

@Component({
  imports: [DsSelectComponent, FormsModule],
  template: `<ds-select label="Role" [options]="roles" [(ngModel)]="role" />`,
})
export class MyComponent {
  role = 'editor';
}
```

### Checkbox

```typescript
import { DsCheckboxComponent } from '@ds/design-system';

@Component({
  imports: [DsCheckboxComponent, FormsModule],
  template: `<ds-checkbox label="I agree" [(ngModel)]="accepted" />`,
})
export class MyComponent {
  accepted = false;
}
```

### Textarea

```typescript
import { DsTextareaComponent } from '@ds/design-system';

@Component({
  imports: [DsTextareaComponent, FormsModule],
  template: `<ds-textarea label="Notes" [maxLength]="200" [(ngModel)]="notes" />`,
})
export class MyComponent {
  notes = '';
}
```

### Switch

```typescript
import { DsSwitchComponent } from '@ds/design-system';

@Component({
  imports: [DsSwitchComponent, FormsModule],
  template: `
    <ds-switch
      label="Notifications"
      description="Email me when something changes"
      [(ngModel)]="enabled"
    />
  `,
})
export class MyComponent {
  enabled = true;
}
```

### Tabs

```html
<ds-tabs [(value)]="activeTab">
  <ds-tab-panel label="Overview" value="overview">
    Overview content
  </ds-tab-panel>
  <ds-tab-panel label="Settings" value="settings">
    Settings content
  </ds-tab-panel>
</ds-tabs>
```

### Spinner

```html
<ds-spinner size="md" label="Loading data" />
```

### Empty state

```html
<ds-empty-state
  title="No results"
  description="Try adjusting your filters."
  icon="🔍"
>
  <ds-button ds-empty-action variant="primary" label="Clear filters" />
</ds-empty-state>
```

### Badge

```html
<ds-badge label="Active" variant="success" />
<ds-badge label="" variant="primary" [dot]="true" />
```

### Card

```html
<ds-card title="Summary" subtitle="Optional description">
  <div ds-card-body>Content goes here</div>
  <div ds-card-footer>
    <ds-button variant="primary" label="Save" />
  </div>
</ds-card>
```

### Toast

Add the container once in your root layout:

```html
<ds-toast-container />
```

Then inject the service anywhere:

```typescript
import { DsToastService } from '@ds/design-system';

private readonly toast = inject(DsToastService);

save(): void {
  this.toast.success('Saved successfully.');
  this.toast.error('Save failed.', { title: 'Error' });
}
```

### Dialog

```html
<ds-dialog [visible]="open()" [showFooter]="true" (closed)="open.set(false)">
  <div ds-header><h2>Title</h2></div>
  <div ds-body>Content</div>
  <div ds-footer>
    <ds-button variant="primary" label="OK" (clicked)="open.set(false)" />
  </div>
</ds-dialog>
```

### Grid

```typescript
import { Component, signal } from '@angular/core';
import { DsGridComponent } from '@ds/grid';
import { ColDef } from 'ag-grid-community';

@Component({
  imports: [DsGridComponent],
  template: `<ds-grid [rowData]="rows()" [columnDefs]="columns" />`,
})
export class GridPageComponent {
  columns: ColDef[] = [
    { field: 'name', headerName: 'Name' },
    { field: 'email', headerName: 'Email' },
  ];

  rows = signal([
    { name: 'Alice', email: 'alice@example.com' },
    { name: 'Bob', email: 'bob@example.com' },
  ]);
}
```

## Design tokens

Global CSS variables are defined in `apps/starter/src/styles.scss`:

```scss
--ds-color-primary
--ds-color-text
--ds-color-surface
--ds-radius-md
// ...
```

Override them in your app styles to theme the design system.

## Project structure

```
angular-ds-starter/
├── apps/starter/              # Demo application
├── libs/design-system/        # ds-button, ds-input, ds-select, ds-checkbox, ds-badge, ds-card, ds-toast, ds-dialog
├── libs/grid/                 # ds-grid (AG Grid wrapper)
├── package.json
└── tsconfig.base.json         # @ds/* path aliases
```

## Adding a new ds-* component

1. Create the component under `libs/design-system/src/lib/ds-your-component/`
2. Export it from `libs/design-system/src/index.ts`
3. Add the folder to `libs/design-system/tsconfig.lib.json` `include`
4. Use it in any app via `import { DsYourComponent } from '@ds/design-system'`

## Tech stack

- Angular 21, Nx 22
- AG Grid 34
- Standalone components, signals, OnPush change detection
- SCSS with `--ds-*` CSS variables (no UI framework required)

## Optional cleanup

If this folder was previously generated from Bizibox, you may still have unused legacy files on disk (they are gitignored). To remove them:

```bash
rm -rf libs/common libs/core
rm -rf libs/design-system/{core,common,components,assets,.storybook}
rm -rf libs/grid/src/lib/ds-grid/{components,core,services,interfaces,utils,types,pipes}
# Keep only ds-button, ds-input, ds-dialog under libs/design-system/src/lib/
```

## License

MIT
