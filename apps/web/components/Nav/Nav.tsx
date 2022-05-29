import NavStyles from "./Nav.module.css";
import { NavItem } from "./NavItem";
import { useSession } from "next-auth/react";
import { Avatar } from "@mantine/core";

export const Nav = () => {
  const { data: session } = useSession();

  const userInfo = session?.user && (
    <div className="flex justify-end col-start-11 col-end-13">
      <div className="flex items-center">
        <div className="text-white mr-4"> {session.user.name}</div>

        <Avatar src={session.user.image} />
      </div>
    </div>
  );

  console.log("session: ", session);
  return (
    <nav className={`${NavStyles["nav"]}`}>
      <div className="font-oldFenris uppercase text-5xl text-white dark:text-brandBlack col-start-1 col-end-3">
        The Inn
      </div>
      <div className="flex justify-center col-start-5 col-end-9">
        <NavItem label="Campaigns" href="/campaign/createcampaign" />
        <NavItem label="Homebrews" href="/homebrews" />
        <NavItem label="Game Rules" href="/gamerules" />
      </div>

      {userInfo}
    </nav>
  );
};
