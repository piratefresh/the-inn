import React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

interface TabsProps {
  children: React.ReactNode;
  defaultValue: string;
  className?: string;
}

export const Tabs = ({ children, defaultValue, className }: TabsProps) => {
  return (
    <TabsPrimitive.Root
      defaultValue={defaultValue}
      className={className}
      style={{ boxShadow: "0 2px 10px black" }}
    >
      {children}

      {/* Example of children dom */}
      {/* <TabsPrimitive.List className="border-b border-brandYellow ">
        <TabsPrimitive.Trigger value="tab1">Account</TabsPrimitive.Trigger>
        <TabsPrimitive.Trigger value="tab2">Password</TabsPrimitive.Trigger>
      </TabsPrimitive.List>
      <TabsPrimitive.Content className="bg-white h-screen" value="tab1">
        <Text color="hiContrast">Account</Text>
      </TabsPrimitive.Content>
      <TabsPrimitive.Content className="bg-white" value="tab2">
        <Text color="hiContrast">Password</Text>
      </TabsPrimitive.Content> */}
    </TabsPrimitive.Root>
  );
};

export const TabsContent = TabsPrimitive.Content;
export const TabsTrigger = TabsPrimitive.Trigger;
export const TabsList = TabsPrimitive.List;
