import React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { Text } from "../Typography";

export const Tabs = () => {
  return (
    <TabsPrimitive.Root className="text-white">
      <TabsPrimitive.List>
        <TabsPrimitive.Trigger value="tab1">Account</TabsPrimitive.Trigger>
        <TabsPrimitive.Trigger value="tab2">Password</TabsPrimitive.Trigger>
      </TabsPrimitive.List>
      <TabsPrimitive.Content className="bg-white" value="tab1">
        <Text color="hiContrast">Account</Text>
      </TabsPrimitive.Content>
      <TabsPrimitive.Content className="bg-white" value="tab2">
        <Text color="hiContrast">Password</Text>
      </TabsPrimitive.Content>
    </TabsPrimitive.Root>
  );
};

export const TabsContent = TabsPrimitive.Content;
export const TabsTrigger = TabsPrimitive.Trigger;
