import { FormControl } from '@angular/forms';
import { Meta, StoryObj, applicationConfig } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';

import { DsCheckboxComponent } from './ds-checkbox.component';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';

const meta: Meta<DsCheckboxComponent> = {
  component: DsCheckboxComponent,
  title: 'Form Controls/Checkbox',
  decorators: [
    applicationConfig({
      providers: [provideAnimations(), importProvidersFrom(CheckboxModule, InputTextModule)],
    }),
  ],
  argTypes: {
    id: { control: 'text', description: 'Unique ID for the checkbox' },
    label: { control: 'text', description: 'Label text' },
    control: {
      control: { type: 'boolean' },
      description: 'Initial value of the checkbox (checked/unchecked)',
    },
  },
  args: {
    id: 'story-checkbox',
    label: 'כותרת',
    control: false, // Default unchecked
  },
};

export default meta;
type Story = StoryObj<DsCheckboxComponent>;

export const Primary: Story = {
  render: args => {
    const control = new FormControl({ value: args.control });

    return {
      props: {
        ...args,
        control,
      },
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
          <ds-checkbox
            [formControl]="control"
            [id]="id"
            [label]="label"
          ></ds-checkbox>
        </div>
      `,
    };
  },
};
