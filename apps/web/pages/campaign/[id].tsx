import { CampaignCard } from "@components/CampaignCard";
import { useGetCampaignQuery, useGetCampaignsQuery } from "@generated/graphql";
import { CampaignLayout } from "@layouts/CampaignLayout";
import { useRouter } from "next/router";
import { Button, HeroImage, Note, Tag, Text } from "ui";
import React from "react";
import { ReadOnly } from "@components/RichTextEditor/ReadOnly";
import { styled } from "@components/Theme/Theme";
import { CampaignTags } from "@components/CampaignTags";
import { CampaignDetails } from "@components/CampaignDetails";
import { ITimezoneOption } from "ui/src/TimeZonePicker/TimeZonePicker";

const SideCard = styled("div", {
  display: "flex",
  flexDirection: "column",
  padding: "$4",
  position: "sticky",
  marginTop: "64px",
  top: "64px",
  right: "10%",

  fontSize: "$7xl",
  width: 275,
  float: "right",

  borderRadius: "$radii$md",
  textTransform: "uppercase",
  zIndex: "$banner",
  border: "3px solid transparent",
  backgroundOrigin: "border-box",
  backgroundClip: "padding-box, border-box",
  backgroundImage:
    "linear-gradient(rgba(36, 37, 38, 1), rgba(36, 37, 38, 1)),linear-gradient($yellowBrand, $orangeBrand)",
});

const MemberAvatar = styled("img", {
  borderRadius: "9999px",
  backgroundColor: "$yellowBrand",
});

const StyledList = styled("ul", {
  listStyle: "disc",
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
    <>
      <SideCard>
        <Text size="lg" color="lightContrast" className="font-trejanSans">
          {campaign?.getCampaign.title}
        </Text>

        <div className="my-8">
          <Text size="sm" color="loContrast" className="font-trejanSans">
            Schedule:{" "}
            <Text color="lightContrast">
              {campaign?.getCampaign.days.map((day) => day)}
            </Text>
          </Text>
          <Text size="sm" color="loContrast" className="font-trejanSans">
            Party Size: <Text color="lightContrast">5 members</Text>
          </Text>

          <Text size="sm" color="loContrast" className="font-trejanSans">
            Recommended Experience: <Text color="lightContrast">Advanced</Text>
          </Text>
        </div>
        <div>
          {campaign?.getCampaign.isOnline ? (
            <>
              <Text size="sm" color="loContrast" className="font-trejanSans">
                Played: <Text color="lightContrast">Online</Text>
              </Text>
              <Text size="sm" color="loContrast" className="font-trejanSans">
                Virtual Table Top:
                <Text color="lightContrast">
                  {campaign.getCampaign.virtualTable}
                </Text>
              </Text>
              <Text size="sm" color="loContrast" className="font-trejanSans">
                Voice Chat:
                <Text color="lightContrast">
                  {campaign.getCampaign.voipSystem}
                </Text>
              </Text>
            </>
          ) : (
            <>
              <Text size="sm" color="loContrast" className="font-trejanSans">
                Played: <Text color="lightContrast">Offline</Text>
              </Text>
              <Text size="sm" color="loContrast" className="font-trejanSans">
                Area:
                <Text color="lightContrast">{campaign.getCampaign.area}</Text>
              </Text>
            </>
          )}
        </div>

        <div className="my-2 w-full">
          <Button size="large" fullWidth>
            Join
          </Button>
        </div>
      </SideCard>
      <div className="mt-16 max-w-7xl mx-auto relative">
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
        <div className="relative mt-12">
          <CampaignTags tags={campaign?.getCampaign.tags} />
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
            <CampaignDetails
              city={campaign?.getCampaign.city}
              days={campaign?.getCampaign.days}
              experience={campaign?.getCampaign.experience}
              state={campaign?.getCampaign.state}
              timePeriods={campaign?.getCampaign.timePeriods}
              timezone={campaign?.getCampaign.timezone as ITimezoneOption}
              isOnline={campaign?.getCampaign.isOnline}
            />
          </div>

          <div className="mb-8">
            <Text size="4xl" color="lightContrast" className="font-trejanSans">
              About the Campaign
            </Text>
            <ReadOnly jsonString={campaign?.getCampaign.jsonSummary} />
          </div>

          <div className="mb-8">
            <Text size="4xl" color="lightContrast" className="font-trejanSans">
              Additional Details
            </Text>
            <ReadOnly
              jsonString={campaign?.getCampaign.jsonAdditionalDetails}
            />
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
    </>
  );
};

Campaign.layoutProps = {
  meta: {
    title: "campaign",
  },
  Layout: CampaignLayout,
};

export default Campaign;
