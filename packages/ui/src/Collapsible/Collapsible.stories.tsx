import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Collapsible } from "./Collapsible";
import { Text } from "../Typography";

const meta: Meta<typeof Collapsible> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/7.0/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "MGUI/Collapsible",
};

export default meta;
type Story = StoryObj<typeof Collapsible>;

export const Primary: Story = {
  render: () => (
    <Collapsible.Root>
      <Collapsible.Trigger asChild>open</Collapsible.Trigger>
      <Collapsible.Content>
        <Text>@radix-ui/colors</Text>

        <Text>@stitches/react</Text>
      </Collapsible.Content>
    </Collapsible.Root>
  ),
};
