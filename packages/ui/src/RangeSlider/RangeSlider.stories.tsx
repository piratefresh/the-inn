import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Input } from "../Input";
import { styled } from "../theme";
import { RangeSlider } from "./RangeSlider";

const StyledInput = styled(Input, {});

const StyledInputGroup = styled("div", {
  display: "flex",
  position: "relative",
  marginTop: "$8",
});

const meta: Meta<typeof RangeSlider> = {
  title: "MGUI/Form/RangeSlider",
  component: RangeSlider,
};

export default meta;
type Story = StoryObj<typeof RangeSlider>;

export const Primary: Story = {
  args: {},
  render: (args) => {
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
  },
};
