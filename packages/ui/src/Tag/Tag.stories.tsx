import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: "z3us components/Pill",
  component: Tag,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Tag>;

const Template: ComponentStory<typeof Tag> = (args) => {
  const { children } = args;
  const as = "div";
  return <Tag as={as}>{children}</Tag>;
};
