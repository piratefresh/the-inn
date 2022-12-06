import { CampaignDetails } from "@components/CampaignDetails";
import { CampaignTags } from "@components/CampaignTags";
import { ReadOnly } from "@components/RichTextEditor/ReadOnly";
import { reset } from "@features/createCampaign/createCampaignSlice";
import { useCreateCampaignMutation } from "@generated/graphql";
import { useAppDispatch, useAppSelector } from "@store/store";
import router from "next/router";
import { Button, HeroImage, styled, Tag, Text } from "ui";
import { ITimezoneOption } from "ui/src/TimeZonePicker/TimeZonePicker";

const PriceButton = styled("button", {
  position: "absolute",
  top: "0",
  right: "0%",
  fontSize: "$7xl",
  width: 160,
  height: 160,
  borderRadius: 9999,
  backgroundColor: "$yellowBrand",
  textTransform: "uppercase",
  zIndex: "$banner",
});

const StyledTag = styled(Tag, {
  marginLeft: "$4",
});

export const Preview = () => {
  const createCampaignData = useAppSelector((state) => state.createCampaign);
  const dispatch = useAppDispatch();
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
        startDate: new Date(),
        timezone: JSON.stringify(createCampaignData.timezone),
      },
    });

    if (createdCampaign) {
      await router.push("/");
      dispatch(reset());
    }
    if (error) {
      console.log("error: ", error);
    }
  };

  console.log("createCampaignData: ", createCampaignData);

  return (
    <div className="max-w-7xl mx-auto relative">
      {createCampaignData.price && (
        <PriceButton>${createCampaignData.price}</PriceButton>
      )}
      <HeroImage
        height={500}
        width={1280}
        objectFit="cover"
        src={createCampaignData.imageUrl}
      />
      <div className="my-16">
        <CampaignTags tags={createCampaignData.tags} />
      </div>
      <div className="my-16">
        <Text size="7xl" color="lightContrast" className="font-trejanSans">
          {createCampaignData.title}
        </Text>
      </div>
      <div className="my-16">
        <Text
          style={{ fontFamily: "Alegreya Sans" }}
          size="4xl"
          color="loContrast"
        >
          {createCampaignData.gameSystem} |{" "}
          {`${createCampaignData.maxSeats} Players `}|
          {createCampaignData.isOnline ? " Online" : " Offline"}| $
          {createCampaignData.price}
        </Text>
      </div>

      <div className="my-16">
        <CampaignDetails
          city={createCampaignData.city}
          days={createCampaignData.days}
          experience={createCampaignData.experience}
          state={createCampaignData.state}
          timePeriods={createCampaignData.timePeriods}
          timezone={createCampaignData.timezone as ITimezoneOption}
          isOnline={createCampaignData.isOnline}
        />
      </div>

      <div className="my-16">
        <ReadOnly jsonString={JSON.stringify(createCampaignData.jsonSummary)} />
      </div>

      <div className="my-16">
        <Text size="4xl" color="lightContrast" className="font-trejanSans">
          Additional Details
        </Text>
        <ReadOnly
          jsonString={JSON.stringify(createCampaignData.jsonAdditionalDetails)}
        />
      </div>
      <Button onClick={onSubmit}>Create Campaign</Button>
    </div>
  );
};
