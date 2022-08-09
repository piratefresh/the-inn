import { General } from "@components/Campaings/CreateCampaigns/General";
import Uploady from "@rpldy/uploady";
import { css } from "@stitches/react";

const root = css({
  background:
    "linear-gradient(179.62deg, #0E0A00 -79.35%, #25120E -3.81%, #25120E 25.17%, #0D0A00 68.63%)",
});

const links = [
  { title: "Basic Details", href: "/campaign/createcampaign" },
  { title: "Game Details", href: "/campaign/createcampaign2" },
  { title: "Extra", href: "/campaign/createcampaign3" },
];

const CreateGeneralCampaign = () => {
  return (
    <div className={`${root()} px-100 py-10`}>
      <Uploady
        debug
        destination={{
          url: `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
          params: {
            upload_preset: "the_inn_campaign",
            folder: "The inn/campaignmedia",
          },
        }}
        clearPendingOnAdd
        multiple={false}
        autoUpload={false}
        noPortal
      >
        <General />
      </Uploady>
    </div>
  );
};

export default CreateGeneralCampaign;
