import {
  BellIcon,
  ChatBubbleBottomCenterIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import * as Menubar from "@radix-ui/react-menubar";
import Image from "next/image";
import Link from "next/link";
import { useLockScroll } from "../hooks/useLockScroll";
import { useMediaQuery } from "../hooks/useMediaQuery";

export interface Session {
  id: string;
  user: {
    id: string;
    name: string;
    email: string;
    image: string;
  };
}

export type MenuItemProps = {
  label: React.ReactNode;
  href: string;
  description?: string;
  icon?: React.ReactNode;
  type?: string;
  children?: MenuItemProps[];
  notifications?: any[];
};
export interface MenuLinksProps extends MenuItemProps {
  children?: MenuItemProps[];
  session?: Session;
  signOut?: () => void;
  opem?: boolean;
}

export interface MenuProps {
  menuLinks: MenuLinksProps[];
  session: Session;
  logo: string;
  signOut?: () => void;
  notifications?: any[];
}

export const Menu = ({
  logo,
  menuLinks,
  notifications,
  session,
  signOut,
}: MenuProps) => {
  const [open, setOpen] = React.useState(false);
  const isMobile = useMediaQuery("(max-width: 900px)");

  useLockScroll(open && isMobile, "html");
  return (
    <Menubar.Root
      onValueChange={(isOpen) => {
        console.log("isOpen: ", isOpen);
        setOpen(isOpen ? true : false);
      }}
      className="bg-brandGray flex items-center justify-between gap-10 bg-gray-25 p-4 text-primary-600 shadow-md md:justify-between md:rounded-md"
    >
      <Link href="/" className="flex items-center gap-2">
        <Image src={logo} alt="logo" width={32} height={32} />
        <h1 className="text-md font-bold text-brandYellow uppercase font-oldFenris">
          The Inn
        </h1>
      </Link>

      <div className="flex flex-auto justify-end gap-8 md:flex-1 md:justify-start">
        {menuLinks.map((link) => (
          <MenuLink
            key={link.href}
            label={link.label}
            href={link.href}
            // eslint-disable-next-line react/no-children-prop
            children={link.children}
            description={link.description}
            notifications={notifications}
            type={link.type}
            session={session}
            signOut={signOut}
          />
        ))}
      </div>

      <MenuUser
        notifications={notifications as any}
        signOut={signOut as () => void}
        session={session}
      />
    </Menubar.Root>
  );
};

function MenuLink({
  label,
  href,
  children,
  notifications,
  session,
  signOut,
}: MenuLinksProps) {
  return (
    <div>
      <Menubar.Menu>
        {children ? (
          <Menubar.Trigger className="text-md font-semibold text-white hover:text-brandYellow">
            <h3 className="text-md font-semibold">{label}</h3>
          </Menubar.Trigger>
        ) : (
          <Link href={href}>
            <button className="text-md font-semibold text-white hover:text-brandYellow">
              <h3 className="text-md font-semibold">{label}</h3>
            </button>
          </Link>
        )}

        <Menubar.Portal>
          <Menubar.Content
            className="flex z-dropdown h-[calc(100vh-70px)] w-screen min-w-[200px] flex-col gap-2 overflow-y-auto text-white bg-brandLightBlack shadow-lg md:h-full md:w-auto md:rounded-b-md md:pt-4"
            sideOffset={20}
          >
            {children?.map((item: MenuLinksProps) => {
              return (
                <MenuChild
                  key={item.href}
                  label={item.label}
                  href={item.href}
                  // eslint-disable-next-line react/no-children-prop
                  children={item.children}
                  description={item.description}
                  icon={item.icon}
                />
              );
            })}

            <MenuMobileUser
              notifications={notifications as any}
              signOut={signOut as () => void}
              session={session as Session}
            />
          </Menubar.Content>
        </Menubar.Portal>
      </Menubar.Menu>
    </div>
  );
}

function MenuChild({
  label,
  href,
  children,
  description,
  icon,
}: MenuLinksProps) {
  return (
    <div className="flex flex-col px-4 py-3">
      <Menubar.Sub>
        <Link href={href}>
          <div className="flex flex-row gap-4">
            {icon && icon}
            <div>
              <h3 className="text-md font-semibold">{label}</h3>
              <p className="break-words">{description}</p>
            </div>
          </div>
        </Link>

        {children?.map((link: MenuLinksProps) => (
          <MenuChild
            key={link.href}
            label={link.label}
            href={link.href}
            // eslint-disable-next-line react/no-children-prop
            children={link.children}
            description={link.description}
            icon={link.icon}
          />
        ))}
      </Menubar.Sub>
    </div>
  );
}

function MenuUser({
  notifications,
  session,
  signOut,
}: {
  notifications: any[];
  session: Session;
  signOut: () => void;
}) {
  if (session)
    return (
      <div className="hidden md:flex md:items-center md:gap-8">
        <a>
          <button className="relative">
            <div className="absolute top-0 rounded-full bg-brandYellow px-2 z-10">
              {notifications?.length > 0}
            </div>
            <BellIcon className="h-6 w-6 text-white hover:scale-105 hover:text-brandYellow" />
          </button>
        </a>

        <Link href="/user/messages/thread">
          <button>
            <ChatBubbleBottomCenterIcon className="h-6 w-6 text-white hover:scale-105 hover:text-brandYellow" />
          </button>
        </Link>
        <Link href="user/settings">
          <button>
            <Cog6ToothIcon className="h-6 w-6 text-white hover:scale-105 hover:text-brandYellow" />
          </button>
        </Link>
        <Link href={`/user/${session.id}`}>
          <button>
            {session.user.image ? (
              <Image
                className="inline-block h-8 w-8 rounded-full hover:scale-105"
                height={60}
                width={60}
                src={session.user.image}
                alt={`${session.user.name}`}
              />
            ) : (
              <h4 className="text-md text-white">{session.user.name}</h4>
            )}
          </button>
        </Link>
        <a>
          <button onClick={signOut} className="text-md text-white">
            Sign Out
          </button>
        </a>
      </div>
    );
  return (
    <div className="hidden items-center gap-8 md:flex">
      <Link href="/auth/signin">
        <button className="text-md rounded-md bg-primary-50 p-2 font-semibold text-brandYellow">
          Log In
        </button>
      </Link>
      <Link href="/auth/signup">
        <button className="text-md rounded-md bg-primary-600 p-2 font-semibold text-white">
          Sign Up
        </button>
      </Link>
    </div>
  );
}
function MenuMobileUser({
  notifications,
  session,
  signOut,
}: {
  notifications: any[];
  session: Session;
  signOut: () => void;
}) {
  if (session)
    return (
      <div className="flex flex-col gap-4 px-4 py-3 md:hidden">
        <Menubar.Separator className="bg-gray-50" style={{ height: "1px" }} />

        <Menubar.Item>
          <button className="flex items-center gap-4 relative">
            <div className="absolute top-0 rounded-full bg-brandYellow px-2 z-10">
              {notifications?.length > 0}
            </div>
            <BellIcon className="h-6 w-6" />
            Notifications
          </button>
        </Menubar.Item>
        <Link href="/user/messages/thread">
          <Menubar.Item className="flex items-center gap-4">
            <ChatBubbleBottomCenterIcon className="h-6 w-6" />
            <button>Messages</button>
          </Menubar.Item>
        </Link>
        <Link href="user/settings">
          <Menubar.Item>
            <button className="flex items-center gap-4">
              <Cog6ToothIcon className="h-6 w-6" />
              Account
            </button>
          </Menubar.Item>
        </Link>
        <Link href={`/user/${session.id}`}>
          <Menubar.Item>
            <button className="flex items-center gap-2">
              {session.user.image ? (
                <Image
                  className="inline-block h-8 w-8 rounded-full object-cover hover:scale-105"
                  height={60}
                  width={60}
                  src={session.user.image}
                  alt={`${session.user.name}`}
                />
              ) : null}
              {session.user.name}
            </button>
          </Menubar.Item>
        </Link>
        <a>
          <Menubar.Item>
            <button
              onClick={signOut}
              className="text-md flex w-full justify-center rounded-md bg-yellow-400 p-2 font-semibold text-black hover:bg-brandYellow hover:text-black hover:border hover:border-brandYellow"
            >
              Log Out
            </button>
          </Menubar.Item>
        </a>
      </div>
    );
  return (
    <div className="flex flex-col gap-4 px-4 py-3 md:hidden">
      <Menubar.Item className="">
        <button className="text-md flex w-full justify-center rounded-md bg-brandYellow p-2 font-semibold text-black">
          Sign Up
        </button>
      </Menubar.Item>
      <Menubar.Item>
        <button className="text-md w-full justify-center rounded-md bg-primary-50 p-2 font-semibold text-primary-700 hover:border hover:border-primary-600 hover:bg-primary-600 hover:bg-transparent">
          Log In
        </button>
      </Menubar.Item>
    </div>
  );
}
