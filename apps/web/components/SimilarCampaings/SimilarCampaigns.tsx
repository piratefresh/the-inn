import { CampaignCard } from "@components/CampaignCard";
import { GetCampaignQuery } from "@generated/graphql";

interface SimilarCampaignsProps {
  campaigns: GetCampaignQuery["getCampaign"][];
}

export const SimilarCampaigns = ({ campaigns }: SimilarCampaignsProps) => {
  return (
    <div className="my-14 mx-auto">
      <div className="grid justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {campaigns.slice(0, 4).map((campaign) => (
          <div style={{ maxWidth: "275px" }} key={campaign.title}>
            <CampaignCard campaign={campaign} />
          </div>
        ))}
      </div>
    </div>
  );
};
