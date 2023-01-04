import React from "react";
import { StoryObj, Meta } from "@storybook/react";
import { Dialog } from "./Dialog";
import { Button } from "../Button";

const meta: Meta<typeof Dialog> = {
  title: "MGUI/Dialog",
  component: Dialog,
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Primary: Story = {
  args: {
    children:
      "George is a fantastic GM.  He really knows the rules and helps beginners.",
  },
  render: (args) => {
    const [open, setOpen] = React.useState(false);
    return (
      <Dialog
        title="Campaign Application"
        description="Fill out form to apply for the campaign"
        trigger={<Button size="large">Edit profile</Button>}
        onOpen={setOpen}
        open={open}
      >
        {args.children}
      </Dialog>
    );
  },
};
