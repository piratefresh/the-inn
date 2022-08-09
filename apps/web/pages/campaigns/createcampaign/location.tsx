import { Location } from "@components/Campaings/CreateCampaigns/Location";
import { css } from "@stitches/react";

const root = css({
  background: "linear-gradient(180deg, #25120E 0%, #273435 50%, #273435 100%)",
});

const CreateLocationCampaign = () => {
  return (
    <div className={`${root()} px-100 py-10`}>
      <Location />
    </div>
  );
};

export default CreateLocationCampaign;
