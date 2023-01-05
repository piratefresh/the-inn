import React from "react";
import NavStyles from "./Nav.module.css";
import { NavItemButton, NavItemLink } from "./NavItem";
import { signOut, useSession } from "next-auth/react";
import { Avatar } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  useNewCampaignApplicationSubscription,
  useGetUnreadNotificationsQuery,
  useSetNotificationsReadMutation,
} from "@generated/graphql";
import { BellIcon, TicketIcon, UserIcon } from "@heroicons/react/24/solid";
import { Menu, HeadlessMenu, Text, mediaString } from "ui";
import { useMediaQuery } from "@hooks/useMediaQueries";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { MobileNav } from "./MobileNav";
import { useLockScroll } from "@hooks/useLockScroll";
import { Cross1Icon } from "@radix-ui/react-icons";

const navSubItems = {
  campaigns: [
    {
      label: "Find Campaigns",
      href: "/campaigns/findcampaigns",
    },
    {
      label: "Create Campaign",
      href: "/campaigns/createcampaign/general",
    },
  ],
  homebrews: [],
  gamerules: [],
  members: [
    {
      label: "Find Members",
      href: "/members/all",
    },
  ],
};

export const Nav = () => {
  const { data: session } = useSession();
  const [open, setOpen] = React.useState(false);
  const [subMenu, setSubMenu] = React.useState(null);
  const [{ data: notifications, fetching: fetchingNotifications }] =
    useGetUnreadNotificationsQuery();
  const [{ data: _newNotifications }] = useNewCampaignApplicationSubscription();
  const [_, setNotificationsRead] = useSetNotificationsReadMutation();

  const router = useRouter();
  const xs = useMediaQuery(mediaString.xs);
  const sm = useMediaQuery(mediaString.sm);
  const isMobile = xs || sm;

  const handleSetNotificationsRead = React.useMemo(
    () => async () => {
      console.log("set notification");
      const { data: setRead, error } = await setNotificationsRead({
        ids: notifications.getUnreadNotifications.map((n) => n.id),
      });

      console.log("data: ", setRead);

      if (error) {
        console.log("error: ", error);
      }
    },
    [notifications, setNotificationsRead]
  );

  const userInfo = React.useMemo(
    () =>
      session?.user ? (
        <div className="flex items-center relative">
          <div className="mx-8">
            <Menu
              onClick={handleSetNotificationsRead}
              trigger={
                <>
                  <div className="absolute top-0 rounded-full bg-red-500 px-2 z-10">
                    {notifications?.getUnreadNotifications.length}
                  </div>
                  <BellIcon className="h-6 w-6" />
                </>
              }
            >
              <div className="p-4">
                {notifications?.getUnreadNotifications.length > 0 ? (
                  notifications.getUnreadNotifications.map((notification) => (
                    <a href={`/campaign/${notification.relatedId}`}>
                      {notification.message}
                    </a>
                  ))
                ) : (
                  <Text color="hiContrast">No Notification</Text>
                )}
              </div>
            </Menu>
          </div>
          <div className="text-white mr-4">
            <Link href={`/user/${session.id}`}>{session.user.name}</Link>
          </div>

          <Menu
            onClick={handleSetNotificationsRead}
            trigger={<Avatar src={session.user.image} />}
          >
            <HeadlessMenu.Item>
              <Link href="/user/settings">
                <a className="flex flex-row items-center justify-center px-2 py-2">
                  <UserIcon className="h-6 w-6" />
                  Account Settings
                </a>
              </Link>
            </HeadlessMenu.Item>
            <HeadlessMenu.Item>
              <Link href="/user/games">
                <a className="flex flex-row items-center justify-center px-2 py-2">
                  <TicketIcon className="h-6 w-6" /> My Adventures
                </a>
              </Link>
            </HeadlessMenu.Item>
          </Menu>

          <div className="ml-4">
            <a
              className="text-white cursor-pointer"
              onClick={() => {
                signOut({
                  redirect: false,
                  callbackUrl: "/auth/signin",
                });

                router.push("auth/signin");
              }}
            >
              Sign Out
            </a>
          </div>
        </div>
      ) : (
        <div className="flex flex-row text-white">
          <div className="mr-4">
            <Link href="./auth/signin">Sign In</Link>
          </div>
          <div>
            <Link href="./auth/signup">Sign Up</Link>
          </div>
        </div>
      ),
    [router, session, notifications, handleSetNotificationsRead]
  );

  useLockScroll(open, "root");

  const handleCloseNav = () => setOpen(false);

  console.log("isMobile: ", isMobile);

  if (isMobile)
    <>
      <nav className="flex flex-row justify-between p-4">
        <div className="cursor-pointer">
          {!open ? (
            <HamburgerMenuIcon
              className="h-6 w-6 text-white"
              onClick={() => setOpen(!open)}
            />
          ) : (
            <Cross1Icon
              className="h-6 w-6 text-white"
              onClick={() => setOpen(!open)}
            />
          )}
        </div>

        <div className="flex justify-end whitespace-nowrap">{userInfo}</div>
      </nav>
      {open && (
        <div className="bg-brandLightBlack h-screen w-screen p-4">
          <ul>
            <li>
              <Text color="loContrast" size="2xl" className="font-oldFenris">
                Campaign
              </Text>
              <ul className="text-white font-alegreyaSans">
                <NavItemLink
                  onClick={handleCloseNav}
                  label="Create Campaign"
                  href="/campaigns/createcampaign/general"
                />
                <NavItemLink
                  onClick={handleCloseNav}
                  label="Find Campaigns"
                  href="/campaigns/findcampaigns"
                />
              </ul>
            </li>
            <li>
              <Text color="loContrast" size="2xl" className="font-oldFenris">
                Members
              </Text>
              <ul className="text-white font-alegreyaSans">
                <li className="cursor-pointer py-2">Find Member</li>
              </ul>
            </li>
          </ul>
        </div>
      )}
    </>;
  return (
    <>
      <nav className={`${NavStyles["nav"]}`}>
        <Link href="/">
          <a>
            <div className="font-oldFenris uppercase text-5xl text-brandBlack dark:text-white col-start-1 col-end-3 whitespace-nowrap">
              The Inn
            </div>
          </a>
        </Link>
        <div className="flex justify-center col-start-5 col-end-9">
          <NavItemButton
            label="Campaigns"
            href="/campaigns/"
            onClick={() => setSubMenu("campaigns")}
          />
          <NavItemButton
            label="Homebrews"
            href="/homebrews"
            onClick={() => setSubMenu("homebrews")}
          />
          <NavItemButton
            label="Game rules"
            href="/gamerules"
            onClick={() => setSubMenu("gamerules")}
          />
          <NavItemButton
            label="Members"
            href="/members/all"
            onClick={() => setSubMenu("members")}
          />
        </div>

        <div className="flex justify-end col-start-11 col-end-13">
          {userInfo}
        </div>
      </nav>
      {subMenu && (
        <nav
          className={`${NavStyles["nav"]}`}
          onMouseLeave={() => setSubMenu(null)}
        >
          <div className="flex justify-center col-start-5 col-end-9">
            {navSubItems[subMenu].map((item) => (
              <NavItemLink label={item.label} href={item.href} />
            ))}
          </div>
        </nav>
      )}
    </>
  );
};
