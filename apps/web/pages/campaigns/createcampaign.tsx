import { CreateCampaigns } from "@components/Campaings/CreateCampaigns";

const links = [
  { title: "Basic Details", href: "/campaign/createcampaign" },
  { title: "Game Details", href: "/campaign/createcampaign2" },
  { title: "Extra", href: "/campaign/createcampaign3" },
];

const CreateCampaign = () => {
  return (
    <div className="bg-createCampaign px-100 py-10">
      <CreateCampaigns />
    </div>
  );
};

export default CreateCampaign;
