import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ParentsizeSVG } from "@cutting/svg";
import { AppIcon } from "./AppIcon";

const meta: Meta<typeof AppIcon> = {
  title: "MGUI/AppIcon",
  component: AppIcon,
};

export default meta;
type Story = StoryObj<typeof AppIcon>;

export const Primary: Story = {
  render: () => <AppIcon />,
};

export const Smaller: Story = {
  render: () => {
    const ref = React.useRef<HTMLDivElement>(null);
    return (
      <div ref={ref}>
        <ParentsizeSVG ref={ref}>
          <AppIcon height={60} width={60} />
        </ParentsizeSVG>
      </div>
    );
  },
};
