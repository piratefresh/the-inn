import { CampaignApplication } from "@components/CampaignApplication";
import { CampaignSideCard } from "@components/CampaignSideCard";
import { useGetCampaignQuery } from "@generated/graphql";
import { CampaignLayout } from "@layouts/CampaignLayout";
import { useRouter } from "next/router";
import { css } from "ui";

const root = css({
  background:
    "linear-gradient(179.62deg, #0E0A00 -79.35%, #25120E -3.81%, #25120E 25.17%, #0D0A00 68.63%)",
});

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
