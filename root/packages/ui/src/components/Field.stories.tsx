// packages/ui/src/components/Field.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import type { ComponentProps } from "react";
import Field from "./Field";

const meta: Meta<typeof Field> = {
  title: "Components/Field",
  component: Field,
  args: {
    label: "Label",
    placeholder: "Value",
    disabled: false,
  },
  parameters: { layout: "centered" },
};
export default meta;

type Story = StoryObj<typeof Field>;

export const Playground: Story = {};

export const Matrix: Story = {
  render: (args: ComponentProps<typeof Field>) => (
    <div className="space-y-8 w-[820px]">
      {/* Default */}
      <section>
        <div className="text-fg-3 mb-2">Default</div>
        <div className="grid grid-cols-2 gap-8">
          <Field {...args} />
          <Field {...args} defaultValue="Text" />
        </div>
      </section>

      {/* Error state (border only) */}
      <section>
        <div className="text-fg-3 mb-2">Error state</div>
        <div className="grid grid-cols-2 gap-8">
          <Field {...args} error />
          <Field {...args} defaultValue="Text" error />
        </div>
      </section>

      {/* Helper text (description) */}
      <section>
        <div className="text-fg-3 mb-2">With helper text</div>
        <div className="grid grid-cols-2 gap-8">
          <Field {...args} description="Description text" />
          <Field {...args} defaultValue="Text" description="Description text" />
        </div>
      </section>

      {/* Error text (no extra manual duplicate under input) */}
      <section>
        <div className="text-fg-3 mb-2">With error text</div>
        <div className="grid grid-cols-2 gap-8">
          <Field {...args} error="Description text" />
          <Field {...args} defaultValue="Text" error="Description text" />
        </div>
      </section>
    </div>
  ),
};