import { Preview } from "@components/Campaings/CreateCampaigns/Preview";
import { CampaignLayout } from "@layouts/CampaignLayout";

const CreatePreviewCampaign = () => {
  return (
    <div>
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
