import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { DsButtonComponent } from './ds-button.component';
import { DsSvgIconComponent } from '../ds-svg-icon/ds-svg-icon.component';

const meta: Meta<DsButtonComponent> = {
  component: DsButtonComponent,
  title: 'Buttons/Button',
  decorators: [
    moduleMetadata({
      imports: [DsSvgIconComponent],
      providers: [],
    }),
  ],
};

export default meta;
type Story = StoryObj<DsButtonComponent>;
export const byVariant: Story = {
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'tertiary',
        'fourth',
        'primary_gradient',
        'primary_gradient_white',
        'primary_white',
        'secondary_white',
        'primary_pink',
        'primary_purple',
        'primary_teal',
        'primary_gray',
      ],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'big'],
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    iconStartSize: {
      control: 'select',
      options: ['small', 'medium', 'large', 'xlarge'],
    },
    iconEndSize: {
      control: 'select',
      options: ['small', 'medium', 'large', 'xlarge'],
    },
    subVariant: {
      control: 'select',
      options: ['default', 'positive', 'negative'],
    },
    checkedMode: {
      control: 'boolean',
      description: 'Enables checked toggle behavior',
    },
  },
  args: {
    size: 'small',
    label: 'צור קובץ',
    variant: 'primary',
    subVariant: 'default',
    loading: false,
    checkedMode: true,
  },
  render: args => {
    const darkVariants = ['primary_gradient_white', 'primary_white', 'secondary_white'];
    const initialBackground = darkVariants.includes(args.variant) ? '#292D33' : '#ffffff';

    return {
      props: {
        ...args,
        backgroundColor: initialBackground,
        toggleBackground() {
          this['backgroundColor'] = this['backgroundColor'] === '#292D33' ? '#ffffff' : '#292D33';
        },
      },
      template: `
        <div
          [ngStyle]="{ background: backgroundColor }"
          (click)="toggleBackground()"
          style="width: 100%; height: 200px; padding: 1rem;"
        >
          <ds-button
            [variant]="variant"
            [subVariant]="subVariant"
            [label]="label"
            [size]="size"
            [disabled]="disabled"
            [loading]="loading"
            [checkedMode]="checkedMode"
            [checked]="checked"
            id="by-variant"
          ></ds-button>
        </div>
      `,
    };
  },
};

export const Primary: Story = {
  render: () => ({
    props: {},
    template: `
      <div style="display: flex; gap: 0.5rem; align-items:center; padding: 1rem;">
        <ds-button variant="primary" subVariant="default" label="צור קובץ"></ds-button>
        <ds-button variant="primary" subVariant="positive" label="צור קובץ"></ds-button>
        <ds-button variant="primary" subVariant="negative" label="צור קובץ"></ds-button>
        <ds-button variant="primary" subVariant="default" label="צור קובץ" [disabled]="true"></ds-button>
        <ds-button variant="primary" subVariant="default" label="צור קובץ" [loading]="true"></ds-button>
        <ds-button variant="primary" subVariant="negative" label="צור קובץ" [loading]="true"></ds-button>
        <ds-button variant="primary" subVariant="positive" label="צור קובץ" [loading]="true"></ds-button>
      </div>
    `,
  }),
};
export const PrimaryGradient: Story = {
  render: () => ({
    props: {},
    template: `
      <div style="display: flex; gap: 0.5rem; align-items:center; padding: 1rem;">
        <ds-button variant="primary_gradient" subVariant="default" label="צור קובץ"></ds-button>
        <ds-button variant="primary_gradient" subVariant="positive" label="צור קובץ"></ds-button>
        <ds-button variant="primary_gradient" subVariant="negative" label="צור קובץ"></ds-button>
        <ds-button variant="primary_gradient" subVariant="default" label="צור קובץ" [disabled]="true"></ds-button>
        <ds-button variant="primary_gradient" subVariant="default" label="צור קובץ" [loading]="true"></ds-button>
        <ds-button variant="primary_gradient" subVariant="negative" label="צור קובץ" [loading]="true"></ds-button>
        <ds-button variant="primary_gradient" subVariant="positive" label="צור קובץ" [loading]="true"></ds-button>
      </div>
    `,
  }),
};
export const Secondary: Story = {
  render: () => ({
    props: {},
    template: `
      <div style="display: flex; gap: 0.5rem; align-items:center; padding: 1rem;">
        <ds-button variant="secondary" subVariant="default" label="צור קובץ"></ds-button>
        <ds-button variant="secondary" subVariant="positive" label="צור קובץ"></ds-button>
        <ds-button variant="secondary" subVariant="negative" label="צור קובץ"></ds-button>
        <ds-button variant="secondary" subVariant="default" label="צור קובץ" [disabled]="true"></ds-button>
        <ds-button variant="secondary" subVariant="default" label="צור קובץ" [loading]="true"></ds-button>
        <ds-button variant="secondary" subVariant="negative" label="צור קובץ" [loading]="true"></ds-button>
        <ds-button variant="secondary" subVariant="positive" label="צור קובץ" [loading]="true"></ds-button>
      </div>
    `,
  }),
};
export const Tertiary: Story = {
  render: () => ({
    props: {},
    template: `
      <div style="display: flex; gap: 0.5rem; align-items:center; padding: 1rem;">
        <ds-button variant="tertiary" subVariant="default" label="צור קובץ"></ds-button>
        <ds-button variant="tertiary" subVariant="positive" label="צור קובץ"></ds-button>
        <ds-button variant="tertiary" subVariant="negative" label="צור קובץ"></ds-button>
        <ds-button variant="tertiary" subVariant="default" label="צור קובץ" [disabled]="true"></ds-button>
        <ds-button variant="tertiary" subVariant="default" label="צור קובץ" [loading]="true"></ds-button>
        <ds-button variant="tertiary" subVariant="negative" label="צור קובץ" [loading]="true"></ds-button>
        <ds-button variant="tertiary" subVariant="positive" label="צור קובץ" [loading]="true"></ds-button>
      </div>
    `,
  }),
};
export const Fourth: Story = {
  render: () => ({
    props: {},
    template: `
      <div style="display: flex; gap: 0.5rem; align-items:center; padding: 1rem;">
        <ds-button variant="fourth" subVariant="default" label="צור קובץ"></ds-button>
        <ds-button variant="fourth" subVariant="positive" label="צור קובץ"></ds-button>
        <ds-button variant="fourth" subVariant="negative" label="צור קובץ"></ds-button>
        <ds-button variant="fourth" subVariant="default" label="צור קובץ" [disabled]="true"></ds-button>
        <ds-button variant="fourth" subVariant="default" label="צור קובץ" [loading]="true"></ds-button>
        <ds-button variant="fourth" subVariant="negative" label="צור קובץ" [loading]="true"></ds-button>
        <ds-button variant="fourth" subVariant="positive" label="צור קובץ" [loading]="true"></ds-button>
      </div>
    `,
  }),
};
export const PrimaryWhite: Story = {
  render: () => ({
    props: {},
    template: `
      <div style="display: flex; gap: 0.5rem; align-items:center; padding: 1rem; background:#292D33;">
        <ds-button variant="primary_white" subVariant="default" label="צור קובץ"></ds-button>
        <ds-button variant="primary_white" subVariant="positive" label="צור קובץ"></ds-button>
        <ds-button variant="primary_white" subVariant="negative" label="צור קובץ"></ds-button>
        <ds-button variant="primary_white" subVariant="default" label="צור קובץ" [disabled]="true"></ds-button>
        <ds-button variant="primary_white" subVariant="default" label="צור קובץ" [loading]="true"></ds-button>
        <ds-button variant="primary_white" subVariant="negative" label="צור קובץ" [loading]="true"></ds-button>
        <ds-button variant="primary_white" subVariant="positive" label="צור קובץ" [loading]="true"></ds-button>
      </div>
    `,
  }),
};
export const PrimaryGradientWhite: Story = {
  render: () => ({
    props: {},
    template: `
      <div style="display: flex; gap: 0.5rem; align-items:center; padding: 1rem;background:#292D33;">
        <ds-button variant="primary_gradient_white" subVariant="default" label="צור קובץ"></ds-button>
        <ds-button variant="primary_gradient_white" subVariant="positive" label="צור קובץ"></ds-button>
        <ds-button variant="primary_gradient_white" subVariant="negative" label="צור קובץ"></ds-button>
        <ds-button variant="primary_gradient_white" subVariant="default" label="צור קובץ" [disabled]="true"></ds-button>
        <ds-button variant="primary_gradient_white" subVariant="default" label="צור קובץ" [loading]="true"></ds-button>
        <ds-button variant="primary_gradient_white" subVariant="negative" label="צור קובץ" [loading]="true"></ds-button>
        <ds-button variant="primary_gradient_white" subVariant="positive" label="צור קובץ" [loading]="true"></ds-button>
      </div>
    `,
  }),
};

export const SecondaryWhite: Story = {
  render: () => ({
    props: {},
    template: `
      <div style="display: flex; gap: 0.5rem; align-items:center; padding: 1rem;background:#292D33;">
        <ds-button variant="secondary_white" subVariant="default" label="צור קובץ"></ds-button>
        <ds-button variant="secondary_white" subVariant="positive" label="צור קובץ"></ds-button>
        <ds-button variant="secondary_white" subVariant="negative" label="צור קובץ"></ds-button>
        <ds-button variant="secondary_white" subVariant="default" label="צור קובץ" [disabled]="true"></ds-button>
        <ds-button variant="secondary_white" subVariant="default" label="צור קובץ" [loading]="true"></ds-button>
        <ds-button variant="secondary_white" subVariant="negative" label="צור קובץ" [loading]="true"></ds-button>
        <ds-button variant="secondary_white" subVariant="positive" label="צור קובץ" [loading]="true"></ds-button>
      </div>
    `,
  }),
};

export const PrimaryPink: Story = {
  render: () => ({
    props: {},
    template: `
      <div style="display: flex; gap: 0.5rem; align-items:center; padding: 1rem;">
        <ds-button variant="primary_pink" subVariant="default" label="צור קובץ"></ds-button>
        <ds-button variant="primary_pink" subVariant="default" label="צור קובץ" [disabled]="true"></ds-button>
        <ds-button variant="primary_pink" subVariant="default" label="צור קובץ" [loading]="true"></ds-button>
      </div>
    `,
  }),
};

export const PrimaryPurple: Story = {
  render: () => ({
    props: {},
    template: `
      <div style="display: flex; gap: 0.5rem; align-items:center; padding: 1rem;">
        <ds-button variant="primary_purple" subVariant="default" label="צור קובץ"></ds-button>
        <ds-button variant="primary_purple" subVariant="default" label="צור קובץ" [disabled]="true"></ds-button>
        <ds-button variant="primary_purple" subVariant="default" label="צור קובץ" [loading]="true"></ds-button>
      </div>
    `,
  }),
};

export const PrimaryTeal: Story = {
  render: () => ({
    props: {},
    template: `
      <div style="display: flex; gap: 0.5rem; align-items:center; padding: 1rem;">
        <ds-button variant="primary_teal" subVariant="default" label="צור קובץ"></ds-button>
        <ds-button variant="primary_teal" subVariant="default" label="צור קובץ" [disabled]="true"></ds-button>
        <ds-button variant="primary_teal" subVariant="default" label="צור קובץ" [loading]="true"></ds-button>
      </div>
    `,
  }),
};

export const PrimaryGray: Story = {
  render: () => ({
    props: {},
    template: `
      <div style="display: flex; gap: 0.5rem; align-items:center; padding: 1rem;">
        <ds-button variant="primary_gray" subVariant="default" label="צור קובץ"></ds-button>
        <ds-button variant="primary_gray" subVariant="default" label="צור קובץ" [disabled]="true"></ds-button>
        <ds-button variant="primary_gray" subVariant="default" label="צור קובץ" [loading]="true"></ds-button>
      </div>
    `,
  }),
};
