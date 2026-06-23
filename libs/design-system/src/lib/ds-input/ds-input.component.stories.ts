import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { InputTextModule } from 'primeng/inputtext';
import { DsValidationInputComponent } from '../ds-validation-input/ds-validation-input.component';
import { DsInputComponent } from './ds-input.component';
import { DsCustomInputValidators } from '@ds/design-system/core';

const meta: Meta<DsInputComponent> = {
  component: DsInputComponent,
  title: 'Form Controls/Input',
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule, FormsModule, InputTextModule, DsValidationInputComponent],
    }),
  ],
  argTypes: {
    size: {
      disabled: { control: 'boolean', description: 'Is disabled' },
      placeholder: { control: 'string', description: 'הכנס מידע' },
    },
  },
};

export default meta;
type Story = StoryObj<DsInputComponent>;

export const Primary: Story = {
  args: {
    placeholder: 'הכנס מידע',
  },
  render: args => {
    const { placeholder } = args;

    const control = new FormControl({ value: null, disabled: false }, DsCustomInputValidators.required('שדה חובה'));

    return {
      template: `
        <div style="display: flex; gap: 1rem; margin-top: 1.5rem;">
          <ds-input
                [formControl]="control"
                label="לייבל"
                [placeholder]="placeholder"
                id="103"></ds-input>
        </div>
      `,
      props: {
        ...args,
        control,
        placeholder,
      },
    };
  },
};
