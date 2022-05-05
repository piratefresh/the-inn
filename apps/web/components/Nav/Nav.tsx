import NavStyles from "./Nav.module.css";
import { NavItem } from "./NavItem";
import { isServer } from "@utils/isServer";
import { useLogoutMutation, useMeQuery } from "generated/graphql";

export const Nav = () => {
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  // console.log("user: ", data);
  const user = data?.me?.username ? (
    <>
      <NavItem label={data.me.username} />
      <NavItem
        label="Logout"
        onClick={() => {
          logout();
        }}
      />
    </>
  ) : (
    <>
      <NavItem label="Login" href="/login" />
      <NavItem label="Sign up" href="/signup" />
    </>
  );
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

      <div className="flex justify-end col-start-11 col-end-13">{user}</div>
    </nav>
  );
};
