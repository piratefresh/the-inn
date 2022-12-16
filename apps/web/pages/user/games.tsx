import { UserGames } from "@components/User";
import { UserPageLayout } from "@layouts/UserPageLayout";

const UserGamesPage = () => {
  return (
    <div className="max-w-7xl mx-auto my-16">
      <UserGames />
    </div>
  );
};

UserGamesPage.layoutProps = {
  meta: {
    title: "User Profile",
  },
  Layout: UserPageLayout,
};

export default UserGamesPage;
