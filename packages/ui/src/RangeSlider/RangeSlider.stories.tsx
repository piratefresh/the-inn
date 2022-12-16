import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { RangeSlider } from "ui/src/RangeSlider";
import { styled } from "ui/src/theme";
import { Input } from "ui/src/Input";

const StyledInput = styled(Input, {});

const StyledInputGroup = styled("div", {
  display: "flex",
  position: "relative",
  marginTop: "$8",
});

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "MGUI/Form/RangeSlider",
  component: RangeSlider,
  parameters: {
    backgrounds: {
      default: "facebook",
      values: [{ name: "facebook", value: "#273435" }],
    },
  },
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof RangeSlider>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof RangeSlider> = (args) => {
  const [value, setValue] = React.useState([25]);

  return (
    <div>
      <RangeSlider
        defaultValue={[25]}
        value={value}
        minStepsBetweenThumbs={1}
        onValueChange={setValue}
      />

      <StyledInputGroup>
        <StyledInput gold value={`$ ${value}` as string} />
      </StyledInputGroup>
    </div>
  );
};

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {};
