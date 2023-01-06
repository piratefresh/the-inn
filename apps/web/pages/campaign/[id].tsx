import { useGetCampaignQuery } from "@generated/graphql";
import { CampaignLayout } from "@layouts/CampaignLayout";
import { useRouter } from "next/router";
import { HeroImage, Text, mediaString } from "ui";
import React from "react";
import { ReadOnly } from "@components/RichTextEditor/ReadOnly";
import { CampaignTags } from "@components/CampaignTags";
import { CampaignDetails } from "@components/CampaignDetails";
import { ITimezoneOption } from "ui/src/TimeZonePicker/TimeZonePicker";
import { CampaignSideCard } from "@components/CampaignSideCard/CampaignSideCard";
import { useMediaQuery } from "@hooks/useMediaQueries";
import { CampaignBottomCard } from "@components/CampaignBottomCard";
import { Loader } from "@components/Loader";
import { SimilarCampaigns } from "@components/SimilarCampaings";
import { useSession } from "next-auth/react";

const Campaign = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: session } = useSession();

  const isDesktop = useMediaQuery(mediaString.lg);

  const [{ data: campaign, fetching }] = useGetCampaignQuery({
    variables: {
      id: id as string,
    },
  });

  const isOwner = session?.id === campaign.getCampaign.gmId;

  // const [{ data: campaigns, fetching: fetchingCampaigns, error }] =
  //   useGetCampaignsQuery();

  const handleJoinCampaign = () => {
    router.push(`/join/${id}`);
  };

  if (fetching && !campaign) return <Loader />;

  return (
    <>
      {!isDesktop ? (
        <CampaignBottomCard
          campaign={campaign?.getCampaign}
          isOwner={isOwner}
          onSubmit={handleJoinCampaign}
        />
      ) : (
        <CampaignSideCard
          campaign={campaign?.getCampaign}
          isOwner={isOwner}
          onSubmit={handleJoinCampaign}
        />
      )}
      <div className="mt-16 max-w-7xl mx-auto relative px-4">
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
          <div className="my-16">
            <Text size="7xl" color="lightContrast" className="font-trejanSans">
              {campaign?.getCampaign.title}
            </Text>
          </div>
          <div className="my-16">
            <Text
              style={{ fontFamily: "Alegreya Sans" }}
              size="4xl"
              color="loContrast"
              className="break-words"
            >
              {campaign?.getCampaign.gameSystem} |{" "}
              {`${campaign?.getCampaign.maxSeats} Players `}|
              {campaign?.getCampaign.isOnline ? " Online" : " Offline"}
            </Text>
          </div>

          <div className="flex flex-row">
            {campaign?.getCampaign.memberships.map((member) => (
              <div className="flex flex-col">
                <Text color="loContrast">{member.user.firstName}</Text>
              </div>
            ))}
          </div>
          {isDesktop && (
            <div className="my-16">
              <CampaignDetails
                city={campaign?.getCampaign.city}
                days={campaign?.getCampaign.days}
                experience={campaign?.getCampaign.experience}
                state={campaign?.getCampaign.state}
                timePeriods={campaign?.getCampaign.timePeriods}
                timezone={
                  campaign?.getCampaign.timezone as unknown as ITimezoneOption
                }
                isOnline={campaign?.getCampaign.isOnline}
              />
            </div>
          )}

          <div className="my-16">
            <Text size="4xl" color="lightContrast" className="font-trejanSans">
              About the Campaign
            </Text>
            <ReadOnly textString={campaign?.getCampaign.jsonSummary} />
          </div>

          <div className="my-16">
            <Text size="4xl" color="lightContrast" className="font-trejanSans">
              Additional Details
            </Text>
            <ReadOnly
              textString={campaign?.getCampaign.jsonAdditionalDetails}
            />
          </div>

          {/* ADD LATER FEATURE SEE REVIEWS */}
          {/* <div className="my-14 mx-auto">
            <Note>
              <Text
                style={{ lineHeight: "125%", textTransform: "uppercase" }}
                size="2xl"
                font="cinzel"
                weight="bold"
                color="hiContrast"
              >
                “George is a fantastic GM. He really knows the rules and helps
                beginners. He always makes sure everyone I comfortable and
                having fun. I love that he uses different voices for different
                NPCs.”
              </Text>
            </Note>
          </div> */}
          {/* <SimilarCampaigns campaigns={campaings.getCampaings} /> */}
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
