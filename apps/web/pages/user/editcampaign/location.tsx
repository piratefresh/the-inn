import { Location } from "@components/Campaings/CreateCampaigns/Location";
import { Loader } from "@components/Loader";
import { useGetCampaignQuery } from "@generated/graphql";
import { css } from "@stitches/react";
import { useIsAuth } from "@utils/useIsAuth";
import { GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth";
import { useRouter } from "next/router";
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

  const router = useRouter();
  const { id } = router.query;
  const [{ data: campaign, fetching }] = useGetCampaignQuery({
    variables: {
      id: id as string,
    },
  });

  if (fetching) return <Loader />;
  return (
    <div className={` py-10 px-100`}>
      <Location campaign={campaign.getCampaign} />
    </div>
  );
};

export default CreateLocationCampaign;
