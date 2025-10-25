import type { Meta, StoryObj } from "@storybook/react";
import type { ComponentProps } from "react";
import { Button } from "./Button";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: { layout: "centered" },
  args: { children: "Кнопка", priority: "primary", tone: "brand", size: "md", disabled: false },
  argTypes: {
    priority: { control: "inline-radio", options: ["primary", "secondary", "tertiary"] },
    tone: { control: "inline-radio", options: ["brand", "default", "error"] },
    size: { control: "inline-radio", options: ["sm", "md"] },
    leftIcon: { control: false },
    rightIcon: { control: false }
  }
};
export default meta;

type Story = StoryObj<typeof Button>;
export const Playground: Story = {};
export const Matrix: Story = {
  render: (args: ComponentProps<typeof Button>) => {
    const sizes: Array<"sm" | "md"> = ["sm", "md"];
    const priorities: Array<"primary" | "secondary" | "tertiary"> = [
      "primary",
      "secondary",
      "tertiary",
    ];
    const tonesByPriority: Record<
      (typeof priorities)[number],
      Array<"brand" | "default" | "error">
    > = {
      primary: ["brand", "default"],
      secondary: ["brand", "default"],
      tertiary: ["brand", "default", "error"],
    } as const;

    const Row = ({
      p,
      t,
      s,
    }: {
      p: "primary" | "secondary" | "tertiary";
      t: "brand" | "default" | "error";
      s: "sm" | "md";
    }) => (
      <div className="flex flex-wrap items-center gap-3">
        {/* text only */}
        <Button {...args} priority={p} tone={t} size={s} />
        {/* start icon */}
        <Button
          {...args}
          priority={p}
          tone={t}
          size={s}
          leftIcon={<AddRoundedIcon fontSize="inherit" />}
        />
        {/* end icon */}
        <Button
          {...args}
          priority={p}
          tone={t}
          size={s}
          rightIcon={<ArrowForwardRoundedIcon fontSize="inherit" />}
        />
        {/* both icons */}
        <Button
          {...args}
          priority={p}
          tone={t}
          size={s}
          leftIcon={<AddRoundedIcon fontSize="inherit" />}
          rightIcon={<ArrowForwardRoundedIcon fontSize="inherit" />}
        />
        {/* icon only */}
        <Button
          {...args}
          priority={p}
          tone={t}
          size={s}
          iconOnly
          leftIcon={<AddRoundedIcon fontSize="inherit" />}
          aria-label="Иконка"
        />
      </div>
    );

    return (
      <div className="space-y-10">
        {priorities.map((p) => (
          <div key={p} className="space-y-6">
            <div className="text-fg-2 text-sm">priority: {p}</div>
            {sizes.map((s) => (
              <div key={`${p}-${s}`} className="space-y-3">
                <div className="text-fg-3 text-xs uppercase tracking-wide">
                  {s === "sm" ? "Small" : "Medium"}
                </div>
                {tonesByPriority[p].map((t) => (
                  <Row key={`${p}-${t}-${s}`} p={p} t={t} s={s} />
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  },
};