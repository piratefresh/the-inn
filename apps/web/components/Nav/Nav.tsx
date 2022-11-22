import React from "react";
import NavStyles from "./Nav.module.css";
import { NavItem } from "./NavItem";
import { signOut, useSession } from "next-auth/react";
import { Avatar } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";

export const Nav = () => {
  const { data: session } = useSession();

  const router = useRouter();

  console.log("session: ", session);

  const userInfo = React.useMemo(
    () =>
      session?.user ? (
        <div className="flex items-center">
          <div className="text-white mr-4">
            <Link href={`/user/${session.id}`}>{session.user.name}</Link>
          </div>

          <Avatar src={session.user.image} />
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
            <Link href="/auth/signin">Sign In</Link>
          </div>
          <div>
            <Link href="/auth/signup">Sign Up</Link>
          </div>
        </div>
      ),
    [router, session]
  );

  return (
    <nav className={`${NavStyles["nav"]}`}>
      <Link href="/">
        <a>
          <div className="font-oldFenris uppercase text-5xl text-white dark:text-brandBlack col-start-1 col-end-3 whitespace-nowrap">
            The Inn
          </div>
        </a>
      </Link>
      <div className="flex justify-center col-start-5 col-end-9">
        <NavItem label="Campaigns" href="/campaigns/createcampaign/general" />
        <NavItem label="Homebrews" href="/homebrews" />
        <NavItem label="Game Rules" href="/gamerules" />
        <NavItem label="Members" href="/users" />
      </div>
      <div className="flex justify-end col-start-11 col-end-13">{userInfo}</div>
    </nav>
  );
};
