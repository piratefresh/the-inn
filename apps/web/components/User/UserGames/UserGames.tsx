import { CampaignCard, CampaignCardSmall } from "@components/CampaignCard";
import { useGetUserCampaignQuery } from "@generated/graphql";
import { useSession } from "next-auth/react";
import { Text } from "ui";

export const UserGames = () => {
  const { data: session, status } = useSession();
  const [{ data: myCampaigns, fetching }] = useGetUserCampaignQuery();

  if (fetching) return <div>...Loading</div>;
  return (
    <div>
      <div className="my-16">
        <Text size="6xl" color="lightContrast">
          My Campaigns
        </Text>
        <div className="my-4">
          <Text>Click to edit campaigns</Text>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-8">
        {myCampaigns?.getUserCampaign.map((campaign) => (
          <div style={{ maxWidth: "350px" }} key={campaign.title}>
            <CampaignCardSmall campaign={campaign} />
          </div>
        ))}
      </div>
    </div>
  );
};
