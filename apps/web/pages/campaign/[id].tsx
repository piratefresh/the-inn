import { CampaignCard } from "@components/CampaignCard";
import { useGetCampaignQuery, useGetCampaignsQuery } from "@generated/graphql";
import { CampaignLayout } from "@layouts/CampaignLayout";
import { useRouter } from "next/router";
import { HeroImage, Note, Tag, Text } from "ui";
import React from "react";
import { ReadOnly } from "@components/RichTextEditor/ReadOnly";
import { styled } from "@components/Theme/Theme";

const StyledDay = styled(Note, {
  textTransform: "uppercase",
  textShadow: "3px 5px 5px rgba(0, 0, 0, 0.5)",
});
const JoinButton = styled("button", {
  position: "fixed",
  bottom: "15%",
  right: "15%",
  fontSize: "$7xl",
  width: 220,
  height: 220,
  borderRadius: 9999,
  backgroundColor: "$yellowBrand",
  textTransform: "uppercase",
});

const MemberAvatar = styled("img", {
  borderRadius: "9999px",
  backgroundColor: "$yellowBrand",
});

const Campaign = () => {
  const router = useRouter();

  const { id } = router.query;

  const [{ data: campaign, fetching }] = useGetCampaignQuery({
    variables: {
      id: id as string,
    },
  });

  const [{ data: campaigns, fetching: fetchingCampaigns, error }] =
    useGetCampaignsQuery();

  const SimilarCampaigns = fetchingCampaigns ? (
    <div>Loading...</div>
  ) : (
    <div className="my-14 mx-auto">
      <div className="grid grid-cols-4 gap-8">
        {campaigns?.getCampaigns.slice(0, 4).map((campaign) => (
          <div style={{ maxWidth: "275px" }} key={campaign.title}>
            <CampaignCard campaign={campaign} />
          </div>
        ))}
      </div>
    </div>
  );

  const handleJoinCampaign = () => {
    router.push(`./join/${id}`);
  };

  if (fetching && !campaign) return <div>Loading....</div>;
  console.log("campaign: ", campaign);
  return (
    <div className="mt-16 max-w-7xl mx-auto relative">
      <JoinButton onClick={handleJoinCampaign}>Join</JoinButton>
      <div className="relative aspect-w-16 aspect-h-9 flex flex-col justify-center items-center">
        <HeroImage
          className=""
          style={{ minHeight: "500px" }}
          layout="fill"
          objectFit="cover"
          width={1240}
          src={campaign?.getCampaign.imageUrl}
          gold
        />
      </div>
      <div className="relative flex flex-col mt-12">
        <div className="mb-8">
          <Text size="7xl" color="lightContrast" className="font-trejanSans">
            {campaign?.getCampaign.title}
          </Text>
        </div>
        <div className="mb-8">
          <Text
            style={{ fontFamily: "Alegreya Sans" }}
            size="4xl"
            color="loContrast"
          >
            {campaign?.getCampaign.gameSystem} |{" "}
            {`${campaign?.getCampaign.maxSeats} Players `}|
            {campaign?.getCampaign.isOnline ? " Online" : " Offline"}
          </Text>
        </div>

        <div className="flex flex-row">
          {campaign.getCampaign.memberships.map((member) => (
            <div className="flex flex-col">
              <MemberAvatar
                width={60}
                height={60}
                src={`https://joeschmoe.io/api/v1/${member.user.firstName}`}
              />
              <Text color="loContrast">{member.user.firstName}</Text>
            </div>
          ))}
        </div>

        <div className="mb-8">
          <ReadOnly jsonString={campaign?.getCampaign.jsonSummary} />
        </div>

        <div className="mb-8">
          <Text size="4xl" color="lightContrast" className="font-trejanSans">
            Game Details
          </Text>
          <Text size="4xl" color="loContrast" className="font-alegreyaSans">
            Every{" "}
            {campaign?.getCampaign.days.map((day) => (
              <Text weight="bold" size="4xl">
                {day}
              </Text>
            ))}
            in the {campaign?.getCampaign.timePeriods.map((time) => time)} after
            6PM {campaign?.getCampaign.timezone}
          </Text>
          <Text size="4xl" color="loContrast" className="font-alegreyaSans">
            This game is recommended FOR ALL skill levels
          </Text>
        </div>

        <div className="mb-8 flex flex-row justify-around">
          {campaign?.getCampaign.days.map((day) => (
            <StyledDay>
              <Text weight="medium" size="lg">
                {day}
              </Text>
              <Text weight="medium" size="lg">
                {campaign?.getCampaign.timePeriods}
              </Text>
            </StyledDay>
          ))}
        </div>

        <div className="mb-8">
          <ReadOnly jsonString={campaign?.getCampaign.jsonAdditionalDetails} />
        </div>

        <div className="my-14 mx-auto">
          <Note>
            “George is a fantastic GM. He really knows the rules and helps
            beginners. He always makes sure everyone I comfortable and having
            fun. I love that he uses different voices for different NPCs.”
          </Note>
        </div>
        {SimilarCampaigns}
      </div>
    </div>
  );
};

Campaign.layoutProps = {
  meta: {
    title: "campaign",
  },
  Layout: CampaignLayout,
};

export default Campaign;
