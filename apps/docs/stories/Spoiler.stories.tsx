import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Spoiler } from "ui/src/Spoiler";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "MGUI/Spoiler",
  component: Spoiler,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Spoiler>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Spoiler> = (args) => (
  <Spoiler {...args}>{args.children}</Spoiler>
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  children:
    "“George is a fantastic GM.  He really knows the rules and helps beginners.  He always makes sure everyone I comfortable and having fun.  I love that he uses different voices for different NPCs.”",
};
