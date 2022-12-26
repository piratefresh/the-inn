import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Table } from "./Table";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "MGUI/Table",
  component: Table,
  parameters: {
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "rgb(13, 10, 0)" },
        { name: "facebook", value: "#3b5998" },
      ],
    },
  },
} as ComponentMeta<typeof Table>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Table> = (args) => <Table></Table>;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {};
