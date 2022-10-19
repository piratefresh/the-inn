import { Preview } from "@components/Campaings/CreateCampaigns/Preview";
import { css } from "@stitches/react";

const root = css({
  background: "linear-gradient(180deg, #25120E 0%, #273435 50%, #273435 100%)",
});

const CreatePreviewCampaign = () => {
  return (
    <div className={`${root()} px-100 py-10`}>
      <Preview />
    </div>
  );
};

export default CreatePreviewCampaign;
