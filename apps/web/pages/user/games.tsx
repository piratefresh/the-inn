import { UserGames } from "@components/User";
import { UserPageLayout } from "@layouts/UserPageLayout";
import { GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth";
import { nextAuthOptions } from "pages/api/auth/[...nextauth]";

export async function getServerSideProps({
  req,
  res,
}: GetServerSidePropsContext) {
  const session = await unstable_getServerSession(
    req,
    res,
    nextAuthOptions(req, res)
  );
  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}

const UserGamesPage = () => {
  return (
    <div className="lg:max-w-7xl mx-auto my-16">
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
