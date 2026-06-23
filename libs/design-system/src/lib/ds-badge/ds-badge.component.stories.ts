import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { DsBadgeComponent } from './ds-badge.component';

const meta: Meta<DsBadgeComponent> = {
  component: DsBadgeComponent,
  title: 'Miscellaneous/Badge',
  decorators: [
    moduleMetadata({
      imports: [DsBadgeComponent],
      providers: [],
    }),
  ],
  argTypes: {
    id: { control: 'text', description: 'Unique ID for the badge' },
    color: {
      control: 'select',
      options: ['red', 'green', 'blue', 'black'],
    },
    value: {
      control: 'text',
      description: 'Write a value for the badge',
    },
  },
};

export default meta;
type Story = StoryObj<DsBadgeComponent>;

export const byDefault: Story = {
  args: {
    color: 'red',
    value: 22,
  },
  render: args => ({
    props: args,
    template: `
      <div
        style="
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          width: 100%;
        "
      >
        <div style=" display:flex; padding: 2rem; position: absolute; margin-right: 3rem">
          <ds-badge
            [id]="id"
            [color]="color"
            [value]="value">
          </ds-badge>
        </div>
      </div>
      `,
  }),
};
