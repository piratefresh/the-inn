import { useCreateCampaignMutation } from "@generated/graphql";
import { useAppSelector } from "@store/store";
import router from "next/router";
import { Button } from "ui";

export const Preview = () => {
  const createCampaignData = useAppSelector((state) => state.createCampaign);
  const [_, createCampaign] = useCreateCampaignMutation();

  const onSubmit = async () => {
    const timezone = Intl.DateTimeFormat().resolvedOptions();
    const { data: createdCampaign, error } = await createCampaign({
      createCampaignInput: {
        ...createCampaignData,
        jsonAdditionalDetails: JSON.stringify(
          createCampaignData.jsonAdditionalDetails
        ),
        jsonSummary: JSON.stringify(createCampaignData.jsonSummary),
        endDate: new Date(),
        startDate: new Date(),
        lat: 0,
        lng: 0,
        city: "Online",
        state: "Online",
        price: 0,
        timezone: "GMT",
        maxSeats: parseInt(createCampaignData.maxSeats, 10),
      },
    });

    if (createdCampaign) {
      await router.push("/");
    }
    if (error) {
      console.log("error: ", error);
    }
  };

  return (
    <>
      <pre>{JSON.stringify(createCampaignData, null, "\t")}</pre>
      <Button onClick={onSubmit}>Create Campaign</Button>
    </>
  );
};
