import { General } from "@components/Campaings/CreateCampaigns/General";
import Uploady from "@rpldy/uploady";

const links = [
  { title: "Basic Details", href: "/campaign/createcampaign" },
  { title: "Game Details", href: "/campaign/createcampaign2" },
  { title: "Extra", href: "/campaign/createcampaign3" },
];

const CreateGeneralCampaign = () => {
  return (
    <div className="bg-createCampaign px-100 py-10">
      <Uploady
        debug
        destination={{
          url: `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
          params: {
            folder: "The inn/campaignmedia",
          },
        }}
        autoUpload={false}
        noPortal
      >
        <General />
      </Uploady>
    </div>
  );
};

export default CreateGeneralCampaign;
