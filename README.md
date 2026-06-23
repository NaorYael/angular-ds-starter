# Angular DS Starter

A lightweight **Angular 21 + Nx** starter with a personal Design System (`ds-*` components) — ready for prototypes, take-home assignments, and personal projects.

Clone this repo and start building immediately with `ds-button`, `ds-input`, `ds-dialog`, and `ds-grid`.

Maintained by [NaorYael](https://github.com/NaorYael).

## What's included

| Package | Description |
|---------|-------------|
| `@ds/design-system` | `ds-button`, `ds-input`, `ds-dialog`, CSS tokens |
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
├── libs/design-system/        # ds-button, ds-input, ds-dialog
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
