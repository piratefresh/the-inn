import { Location } from "@components/Campaings/CreateCampaigns/Location";
import { css } from "@stitches/react";
import { useIsAuth } from "@utils/useIsAuth";
import { GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth";
import { nextAuthOptions } from "pages/api/auth/[...nextauth]";

const root = css({
  background: "linear-gradient(180deg, #25120E 0%, #273435 50%, #273435 100%)",
});

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
const CreateLocationCampaign = () => {
  useIsAuth();
  return (
    <div
      className={`${root()} relative mx-auto w-full lg:max-w-7xl py-10 px-4 lg:px100`}
    >
      <Location />
    </div>
  );
};

export default CreateLocationCampaign;
