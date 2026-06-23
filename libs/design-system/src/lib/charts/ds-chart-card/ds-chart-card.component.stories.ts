import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { DsChartCardComponent } from './ds-chart-card.component';

const meta: Meta<DsChartCardComponent> = {
  component: DsChartCardComponent,
  title: 'Charts/Chart Card',
  decorators: [
    moduleMetadata({
      imports: [DsChartCardComponent],
    }),
  ],
  argTypes: {
    value: {
      control: { type: 'number' },
      description: 'Numeric value displayed in the card',
    },
    text: {
      control: 'text',
      description: 'Text label displayed below the value',
    },
  },
  args: {
    value: 1250,
    text: 'Total Sales',
  },
};

export default meta;
type Story = StoryObj<DsChartCardComponent>;

export const Default: Story = {
  render: args => ({
    props: args,
    template: `
      <ds-chart-card
        [value]="value"
        [text]="text">
      </ds-chart-card>
    `,
  }),
};
