import { moduleMetadata, Meta, StoryObj } from '@storybook/angular';
import { DsAvatarComponent } from './ds-avatar.component';

const meta: Meta<DsAvatarComponent> = {
  component: DsAvatarComponent,
  title: 'Miscellaneous/Avatar',
  decorators: [
    moduleMetadata({
      imports: [DsAvatarComponent],
    }),
  ],
  argTypes: {
    label: { control: 'text' },
    shape: { control: 'radio', options: ['ellipse', 'circle', 'square'] },
    size: { control: 'radio', options: ['regular', 'large', 'xlarge'] },
    image: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<DsAvatarComponent>;

// **Ellipse Avatars**
export const Ellipse: Story = {
  render: args => ({
    props: args,
    template: `
      <div class="component-container">
        <span class="component-showcase__title">Ellipse</span>
        <div class="component-showcase__group">
          <ds-avatar id="1" label="ע" shape="ellipse" size="regular"></ds-avatar>
          <ds-avatar id="2" label="ע" shape="ellipse" size="large"></ds-avatar>
          <ds-avatar id="3" label="ע" shape="ellipse" size="xlarge"></ds-avatar>
        </div>
      </div>
    `,
  }),
};

// **Square Avatars**
export const Square: Story = {
  render: args => ({
    props: args,
    template: `
      <div class="component-container">
        <span class="component-showcase__title">Square</span>
        <div class="component-showcase__group">
          <ds-avatar id="4" label="ע" shape="square" size="regular"></ds-avatar>
          <ds-avatar id="5" label="ע" shape="square" size="large"></ds-avatar>
          <ds-avatar id="6" label="ע" shape="square" size="xlarge"></ds-avatar>
        </div>
      </div>
    `,
  }),
};

// **Circle Avatars**
export const Circle: Story = {
  render: args => ({
    props: args,
    template: `
      <div class="component-container">
        <span class="component-showcase__title">Circle</span>
        <div class="component-showcase__group">
          <ds-avatar id="7" label="ע" shape="circle" size="regular"></ds-avatar>
          <ds-avatar id="8" label="ע" shape="circle" size="large"></ds-avatar>
          <ds-avatar id="9" label="ע" shape="circle" size="xlarge"></ds-avatar>
        </div>
      </div>
    `,
  }),
};

// **Circle with Camera Icon**
export const CircleWithCamera: Story = {
  render: args => ({
    props: args,
    template: `
      <div class="component-container">
        <span class="component-showcase__title">Circle with Camera Icon</span>
        <div class="component-showcase__group">
          <ds-avatar id="10" [showIcon]="true" label="ע" shape="circle" size="regular"></ds-avatar>
        </div>
      </div>
    `,
  }),
};

// **Ellipse with Camera Icon**
export const EllipseWithCamera: Story = {
  render: args => ({
    props: args,
    template: `
      <div class="component-container">
        <span class="component-showcase__title">Ellipse with Camera Icon</span>
        <div class="component-showcase__group">
          <ds-avatar id="11" [showIcon]="true" label="ע" shape="ellipse" size="regular"></ds-avatar>
        </div>
      </div>
    `,
  }),
};

// **Avatars Circle with Images**
export const CircleWithImage: Story = {
  render: args => ({
    props: args,
    template: `
      <div class="component-container">
        <span class="component-showcase__title">Circle with Image</span>
        <div class="component-showcase__group">
          <ds-avatar id="12" size="regular" image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png"></ds-avatar>
          <ds-avatar id="13" size="large" image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png"></ds-avatar>
          <ds-avatar id="14" size="xlarge" image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png"></ds-avatar>
        </div>
      </div>
    `,
  }),
};

// **Avatars Ellipse with Images**
export const EllipseWithImage: Story = {
  render: args => ({
    props: args,
    template: `
      <div class="component-container">
        <span class="component-showcase__title">Ellipse with Image</span>
        <div class="component-showcase__group">
          <ds-avatar id="15" size="regular" shape="ellipse" image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png"></ds-avatar>
          <ds-avatar id="16" size="large" shape="ellipse" image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png"></ds-avatar>
          <ds-avatar id="17" size="xlarge" shape="ellipse" image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png"></ds-avatar>
        </div>
      </div>
    `,
  }),
};
