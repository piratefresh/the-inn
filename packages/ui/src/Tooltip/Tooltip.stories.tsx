import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Tooltip } from "ui/src/Tooltip";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "MGUI/Tooltip",
  component: Tooltip,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Tooltip>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Tooltip> = (args) => (
  <div className="relative">
    <Tooltip content={args.content}>{args.children}</Tooltip>
  </div>
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  children: <div className="text-white inline-flex">HOVER ME</div>,
  content: "HELLO",
};
