import { CampaignApplication } from "@components/CampaignApplication";
import { CampaignSideCard } from "@components/CampaignSideCard";
import {
  useAddPlayerApplicationMutation,
  useGetCampaignQuery,
} from "@generated/graphql";
import { CampaignLayout } from "@layouts/CampaignLayout";
import { GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth";
import { useRouter } from "next/router";
import { nextAuthOptions } from "pages/api/auth/[...nextauth]";
import { css } from "ui";

const root = css({
  background:
    "linear-gradient(179.62deg, #0E0A00 -79.35%, #25120E -3.81%, #25120E 25.17%, #0D0A00 68.63%)",
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

const Join = () => {
  const router = useRouter();
  const { id } = router.query;
  const [{ data: campaign, fetching }] = useGetCampaignQuery({
    variables: {
      id: id as string,
    },
  });

  if (fetching && !campaign) return <div>Loading....</div>;

  return (
    <div className={`${root()}  py-10`}>
      {/* Fix Later */}
      {/* @ts-ignore */}
      <CampaignSideCard campaign={campaign?.getCampaign} />
      <div className="max-w-7xl mx-auto h-screen relative">
        <CampaignApplication />
      </div>
    </div>
  );
};

Join.layoutProps = {
  meta: {
    title: "campaign",
  },
  Layout: CampaignLayout,
};

export default Join;
