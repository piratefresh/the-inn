import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Dialog } from "ui/src/Dialog";
import { Button } from "ui/src/Button";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "MGUI/Dialog",
  component: Dialog,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Dialog>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Dialog> = (args) => {
  const [open, setOpen] = React.useState(false);
  return (
    <Dialog
      title="Campaign Application"
      description="Fill out form to apply for the campaign"
      trigger={<Button size="large">Edit profile</Button>}
      onOpen={setOpen}
      open={open}
      children={args.children}
    />
  );
};

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  children:
    "“George is a fantastic GM.  He really knows the rules and helps beginners.  He always makes sure everyone I comfortable and having fun.  I love that he uses different voices for different NPCs.”",
};
