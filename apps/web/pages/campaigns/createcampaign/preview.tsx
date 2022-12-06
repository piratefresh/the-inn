import { Preview } from "@components/Campaings/CreateCampaigns/Preview";
import { CampaignLayout } from "@layouts/CampaignLayout";

const CreatePreviewCampaign = () => {
  return (
    <div className="px-100 py-10">
      <Preview />
    </div>
  );
};

CreatePreviewCampaign.layoutProps = {
  meta: {
    title: "Create Campaign Preview",
  },
  Layout: CampaignLayout,
};

export default CreatePreviewCampaign;
