import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import {
  NavigationMenuRoot,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuPrimitive,
  NavigationMenuViewport,
  List,
  ListItem,
  ViewportPosition,
  NavigationMenuSub,
} from "ui";

export const MobileNav = ({ children }) => {
  return (
    <NavigationMenuRoot
      className="text-white relative"
      orientation="vertical"
      onValueChange={(value) => console.log("e: ", value)}
    >
      <NavigationMenuPrimitive.List>
        <NavigationMenuPrimitive.Item>
          <NavigationMenuPrimitive.Trigger>
            <HamburgerMenuIcon className="h-6 w-6" />
          </NavigationMenuPrimitive.Trigger>
          <div className="relative">
            <NavigationMenuPrimitive.Content className="absolute top-5 z-50">
              <NavigationMenuPrimitive.List className="flex gap-8 w-full">
                <NavigationMenuPrimitive.Item value="sub1">
                  <List>
                    Campaign
                    <ListItem title="Create Players" />
                    <ListItem title="Find Players" />
                  </List>
                </NavigationMenuPrimitive.Item>
                <NavigationMenuPrimitive.Item value="sub2">
                  <List>
                    Members
                    <ListItem title="Create Players" />
                    <ListItem title="Find Players" />
                  </List>
                </NavigationMenuPrimitive.Item>
              </NavigationMenuPrimitive.List>
            </NavigationMenuPrimitive.Content>
          </div>
        </NavigationMenuPrimitive.Item>
      </NavigationMenuPrimitive.List>
      <ViewportPosition>
        <NavigationMenuViewport />
      </ViewportPosition>
    </NavigationMenuRoot>
  );
};
