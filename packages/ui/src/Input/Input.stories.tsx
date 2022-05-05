import { Input } from "./Input";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import { InputWrapper } from "@mantine/core";
import InputStyles from "./Input.module.css";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Input",
  component: Input,
} as ComponentMeta<typeof Input>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Input> = (args) => (
  <InputWrapper className={InputStyles.inputWrapper} label="*Campaign Name?">
    <Input {...args} />
  </InputWrapper>
);

export const Primary = Template.bind({});

Primary.args = {};
