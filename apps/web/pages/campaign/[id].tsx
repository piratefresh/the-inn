import {
  GetCampaignDocument,
  GetCampaignQuery,
  GetCampaignQueryVariables,
  MembershipRole,
  useGetCampaignQuery,
} from "@generated/graphql";
import { CampaignLayout } from "@layouts/index";
import { useRouter } from "next/router";
import { HeroImage, Text, mediaString, Avatar } from "ui";
import React from "react";
import { ReadOnly } from "@components/RichTextEditor/ReadOnly";
import { CampaignTags } from "@components/CampaignTags";
import { CampaignDetails } from "@components/CampaignDetails";
import { ITimezoneOption } from "ui/src/TimeZonePicker/TimeZonePicker";
import { CampaignSideCard } from "@components/CampaignSideCard/CampaignSideCard";
import { useMediaQuery } from "@hooks/useMediaQueries";
import { CampaignBottomCard } from "@components/CampaignBottomCard";
import { Loader } from "@components/Loader";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { initUrqlClient } from "@utils/initUrqlClient";
import { GetStaticPropsContext } from "next";

export async function getServerSideProps({ params }: GetStaticPropsContext) {
  const { urqlClient, ssrCache } = initUrqlClient(
    process.env.NEXT_PUBLIC_API_URL as string,
    {}
  );

  const campaign = await urqlClient
    .query<GetCampaignQuery, GetCampaignQueryVariables>(GetCampaignDocument, {
      id: params.id as string,
    })
    .toPromise();
  return {
    props: {
      urqlState: ssrCache.extractData(),
    },
  };
}

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

  const handleJoinCampaign = () => {
    router.push(`/join/${id}`);
  };

  if (router.isFallback) {
    return <div>loading...</div>;
  }

  if (fetching && !campaign) return <Loader />;

  const isOwner = session?.id === campaign?.getCampaign.gmId;
  const isMember = campaign?.getCampaign.memberships.filter(
    (member) =>
      member.user.id.includes(session?.id) && member.role !== MembershipRole.Gm
  );

  return (
    <>
      {!isDesktop ? (
        <CampaignBottomCard
          campaign={campaign?.getCampaign}
          isOwner={isOwner}
          isMember={!isMember}
          onSubmit={handleJoinCampaign}
        />
      ) : (
        <CampaignSideCard
          campaign={campaign?.getCampaign}
          isOwner={isOwner}
          isMember={!isMember}
          onSubmit={handleJoinCampaign}
        />
      )}
      <div className="mt-16 max-w-7xl mx-auto relative px-4">
        <div
          className="relative"
          style={{ width: "100%", minHeight: "500px", height: "500px" }}
        >
          <HeroImage
            src={campaign?.getCampaign.imageUrl}
            fill
            gold
            alt={`Header image for ${campaign.getCampaign.title}`}
          />
        </div>
        <div className="relative mt-12">
          <CampaignTags tags={campaign?.getCampaign.tags} />
          <div className="my-8">
            <Text size="xl" color="lightContrast" className="font-trejanSans">
              {campaign?.getCampaign.title}
            </Text>
          </div>
          <div className="my-8">
            <Text
              style={{ fontFamily: "Alegreya Sans" }}
              size="xl"
              color="loContrast"
              className="break-words"
            >
              {campaign?.getCampaign.gameSystem} |{" "}
              {`${campaign?.getCampaign.maxSeats} Players `}|
              {campaign?.getCampaign.isOnline ? " Online" : " Offline"}
            </Text>
          </div>

          <div className="flex flex-row">
            {campaign?.getCampaign.memberships.slice(0, 5).map((member) => (
              <Link
                className="flex flex-col items-center"
                href={`/user/${member.user.id}`}
                key={member.user.id}
              >
                <Avatar
                  imageUrl={member.user.imageUrl}
                  name={member.user.firstName}
                />
                <Text>{member.role}</Text>
              </Link>
            ))}
          </div>
          {isDesktop && (
            <div className="my-8">
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

          <div className="my-8">
            <Text size="xl" color="lightContrast" className="font-trejanSans">
              About the Campaign
            </Text>
            <ReadOnly textString={campaign?.getCampaign.jsonSummary} />
          </div>

          <div className="my-8">
            <Text size="xl" color="lightContrast" className="font-trejanSans">
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
