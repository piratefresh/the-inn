import { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./Tooltip";

const meta: Meta<typeof Tooltip> = {
  title: "MGUI/Tooltip",
  component: Tooltip,
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Primary: Story = {
  args: {
    children: <div className="text-white inline-flex">HOVER ME</div>,
    content: "HELLO",
  },
  render: (args) => {
    return (
      <div className="relative">
        <Tooltip content={args.content}>{args.children}</Tooltip>
      </div>
    );
  },
};
