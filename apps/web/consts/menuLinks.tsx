import { MenuLinksProps } from "ui";
import {
  Bars3Icon,
  BookOpenIcon,
  CircleStackIcon,
  DocumentPlusIcon,
  SwatchIcon,
  UserGroupIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";

export const MENU_DATA: MenuLinksProps[] = [
  {
    label: <Bars3Icon className="h-5 w-5" />,
    href: "/",
    children: [
      {
        label: "Campaigns",
        href: "/",
        children: [
          {
            label: "Find Campaigns",
            description: "Find campaigns to join other players",
            href: "/campaigns/findcampaigns",
            icon: <CircleStackIcon className="h-5 w-5" />,
          },
          {
            label: "Create Campaigns",
            description: "Looking for players for your campaign",
            href: "/campaigns/createcampaign/general",
            icon: <DocumentPlusIcon className="h-5 w-5" />,
          },
        ],
      },
      // {
      //   label: "Homebrew",
      //   href: "/homebrew",
      //   children: [
      //     {
      //       label: "Game Systems",
      //       description: "Explore player made game systems",
      //       href: "/homebrew/gamesystems",
      //       icon: <BookOpenIcon className="h-5 w-5" />,
      //     },
      //     {
      //       label: "Items",
      //       description: "Explore other peoples custom made items",
      //       href: "/homebrew/items",
      //       icon: <SwatchIcon className="h-5 w-5" />,
      //     },
      //     {
      //       label: "Npc's",
      //       description: "Explore other peoples custom made npc's",
      //       href: "/homebrew/npcs",
      //       icon: <UserGroupIcon className="h-5 w-5" />,
      //     },
      //     {
      //       label: "Skills",
      //       description: "Explore other peoples custom made skills",
      //       href: "/homebrew/npcs",
      //       icon: <WrenchScrewdriverIcon className="h-5 w-5" />,
      //     },
      //   ],
      // },
      {
        label: "Members",
        href: "/members/all",
      },
    ],
  },
];
