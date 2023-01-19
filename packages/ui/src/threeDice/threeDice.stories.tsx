import { Meta, StoryObj } from "@storybook/react";
import { ThreeDice } from "./ThreeDice";

const meta: Meta<typeof ThreeDice> = {
  title: "MGUI/ThreeDice",
  component: ThreeDice,
};

export default meta;
type Story = StoryObj<typeof ThreeDice>;

export const Primary: Story = {
  args: {
    children: <div className="text-white inline-flex">HOVER ME</div>,
    content: "HELLO",
  },
  render: (args) => {
    return (
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden">
        <ThreeDice />
      </div>
    );
  },
};
