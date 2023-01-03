import React from "react";

import {
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuGroup,
} from "./Dropdown";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "MGUI/Dropdown",
  component: DropdownMenuRoot,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = () => {
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
};

export const Primary = Template.bind({});
