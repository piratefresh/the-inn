import { Meta, StoryObj } from "@storybook/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./Tabs";

const meta: Meta<typeof Tabs> = {
  title: "MGUI/Tabs",
  component: Tabs,
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Primary: Story = {
  args: {},
  render: (args) => {
    return (
      <Tabs defaultValue="basic" className="text-white">
        <div
          className="max-w-7xl mx-auto my-16 grid"
          style={{ gridTemplateColumns: "auto", gridAutoRows: "max-content" }}
        >
          <TabsList className="flex mt-8 border-b border-brandYellow">
            <TabsTrigger
              className="flex flex-row items-center justify-center px-8 h-16 border border-brandYellow hover:text-brandYellow hover:bg-brandLightBlack data-[state=active]:text-brandYellow"
              value="basic"
            >
              Basic Settings
            </TabsTrigger>
            <TabsTrigger
              className="flex flex-row items-center justify-center px-8 h-16 border border-brandYellow hover:text-brandYellow hover:bg-brandLightBlack data-[size=active]:text-brandYellow"
              value="profile"
            >
              Profile
            </TabsTrigger>
            <TabsTrigger
              className="flex flex-row items-center justify-center px-8 h-16 border border-brandYellow hover:text-brandYellow hover:bg-brandLightBlack data-[size=active]:text-brandYellow"
              value="password"
            >
              Password
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basic">Basic Settings</TabsContent>
          <TabsContent value="profile">Profile</TabsContent>
          <TabsContent value="password">Passsword</TabsContent>
        </div>
      </Tabs>
    );
  },
};
