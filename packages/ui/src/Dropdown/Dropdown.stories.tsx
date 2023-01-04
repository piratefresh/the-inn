import { Meta, StoryObj } from "@storybook/react";
import React from "react";

import {
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuGroup,
} from "./Dropdown";

const meta: Meta<typeof DropdownMenuRoot> = {
  title: "MGUI/Dropdown",
  component: DropdownMenuRoot,
};

export default meta;
type Story = StoryObj<typeof DropdownMenuRoot>;

export const Primary: Story = {
  args: {},
  render: (args) => {
    return (
      <DropdownMenuRoot>
        <DropdownMenuTrigger>
          <div className="text-white rounded-md p-4">Campaign</div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex flex-row gap-20 bg-brandGray p-4 shadow-md border-b-4 border-t-4 border-solid rounded-md goldenImageBorder">
          <DropdownMenuItem className="text-white cursor-pointer hover:outline-none hover:text-brandLightBlack">
            Find Campaign
          </DropdownMenuItem>
          <DropdownMenuItem className="text-white cursor-pointer hover:outline-none hover:text-brandLightBlack">
            Create Campaign
          </DropdownMenuItem>
          <DropdownMenuItem className="text-white cursor-pointer hover:outline-none hover:text-brandLightBlack">
            Item
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuRoot>
    );
  },
};
