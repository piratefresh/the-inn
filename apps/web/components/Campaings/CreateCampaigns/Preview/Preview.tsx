import { CampaignDetails } from "@components/CampaignDetails";
import { CampaignSideCard } from "@components/CampaignSideCard";
import { CampaignTags } from "@components/CampaignTags";
import { ReadOnly } from "@components/RichTextEditor/ReadOnly";
import { reset } from "@features/createCampaign/createCampaignSlice";
import {
  GetCampaignQuery,
  useCreateCampaignMutation,
  useUpdateCampaignMutation,
} from "@generated/graphql";
import { useAppDispatch, useAppSelector } from "@store/store";
import { useRouter } from "next/router";
import React from "react";
import { Button, HeroImage, styled, Text, mediaString } from "ui";
import { ITimezoneOption } from "ui/src/TimeZonePicker/TimeZonePicker";
import { useMediaQuery } from "@hooks/useMediaQueries";
import { CampaignBottomCard } from "@components/CampaignBottomCard";

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

interface LocationProps {
  campaign?: GetCampaignQuery["getCampaign"];
}

export const Preview = ({ campaign }: LocationProps) => {
  const createCampaignData = useAppSelector((state) => state.createCampaign);
  const dispatch = useAppDispatch();
  const [_, createCampaign] = useCreateCampaignMutation();
  const [__, updateCampaign] = useUpdateCampaignMutation();
  const router = useRouter();

  const xs = useMediaQuery(mediaString.xs);
  const sm = useMediaQuery(mediaString.sm);
  const isMobile = xs || sm;

  const isEditing = React.useMemo(
    () => router.pathname.includes("editcampaign"),
    [router]
  );

  const onBack = React.useCallback(
    (e) => {
      e.preventDefault();
      if (router.pathname.includes("editcampaign")) {
        return router.push(`/user/editcampaign/location?id=${campaign.id}`);
      }
      return router.push(`./location`);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [campaign?.id]
  );

  const onSubmit = async () => {
    if (isEditing) {
      const { data: updatedCampaign, error } = await updateCampaign({
        createCampaignInput: {
          ...createCampaignData,
          startDate: createCampaignData.startDate.toString(),
          timezone: JSON.stringify(createCampaignData.timezone),
        },
        campaignId: campaign.id,
      });

      if (updatedCampaign) {
        await router.push("/user/games");
        return dispatch(reset());
      }
      if (error) {
        return console.log("error: ", error);
      }
    } else {
      const { data: createdCampaign, error } = await createCampaign({
        createCampaignInput: {
          ...createCampaignData,
          startDate: createCampaignData.startDate.toString(),
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
    }
  };

  return (
    <>
      {isMobile ? (
        <CampaignBottomCard
          campaign={createCampaignData}
          onSubmit={onSubmit}
          submitText={isEditing ? "Update Campaign" : "Create Campaign"}
        />
      ) : (
        <CampaignSideCard
          campaign={createCampaignData}
          onSubmit={onSubmit}
          submitText={isEditing ? "Update Campaign" : "Create Campaign"}
        />
      )}

      <div className="lg:max-w-7xl mx-auto w-full relative mb-40">
        {createCampaignData.price && (
          <PriceButton>${createCampaignData.price}</PriceButton>
        )}

        <HeroImage
          height={500}
          width={1280}
          objectFit="cover"
          gold
          src={createCampaignData.imageUrl}
        />

        <div className="flex flex-row flex-wrap my-16">
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
            className="break-words"
          >
            {createCampaignData.gameSystem} |{" "}
            {`${createCampaignData.maxSeats} Players `}|
            {createCampaignData.isOnline ? " Online" : " Offline"}| $
            {createCampaignData.price}
          </Text>
        </div>

        {!isMobile && (
          <div className="my-16 whitespace-pre-wrap">
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
        )}

        <div className="my-16">
          <ReadOnly textString={createCampaignData.jsonSummary} />
        </div>

        <div className="my-16">
          <Text size="4xl" color="lightContrast" className="font-trejanSans">
            Additional Details
          </Text>
          <ReadOnly textString={createCampaignData.jsonAdditionalDetails} />
        </div>
        <Button
          css={{ marginRight: "$8" }}
          size="large"
          onClick={onBack}
          type="button"
        >
          Previous
        </Button>
        <Button size="large" onClick={onSubmit}>
          {isEditing ? "Update Campaign" : "Create Campaign"}
        </Button>
      </div>
    </>
  );
};
