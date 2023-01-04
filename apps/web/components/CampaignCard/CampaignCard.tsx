import { format } from "date-fns";
import { Card, CardImage, CardSection, Header, Tag, Text } from "ui";
import Link from "next/link";
import { GetCampaignsQuery, MembershipRole } from "@generated/graphql";
import { styled } from "ui";
import React from "react";

export interface CampaignProps {
  id: string;
  imageUrl: string;
  title: string;
  gameSystem: string;
  maxSeats: number;
  members?: number;
  pending?: number;
  memberships?: GetCampaignsQuery["getCampaigns"][0]["memberships"];
  startDate: GetCampaignsQuery["getCampaigns"][0]["startDate"];
  tags: string[];
}

interface CampaignCardProps {
  campaign: CampaignProps;
  hideTags?: boolean;
}

const StyledText = styled(Text, {
  margin: "0 0px",
  lineHeight: "$lineHeights$tall",
  color: "#666",
  whiteSpace: "nowrap",
});

const StyledCardImage = styled(CardImage, {
  maxHeight: "180px",
  minHeight: "180px",
});

export const CampaignCard = ({ campaign, hideTags }: CampaignCardProps) => {
  const pendingMember = React.useMemo(
    () =>
      campaign.memberships
        ? campaign.memberships.filter(
            (member) => member.role === MembershipRole.Pending
          ).length
        : campaign.pending,
    [campaign.pending, campaign.memberships]
  );
  const acceptedMember = React.useMemo(
    () =>
      campaign.memberships
        ? campaign.memberships.filter(
            (member) => member.role === MembershipRole.Player
          ).length
        : campaign.members,
    [campaign.members, campaign.memberships]
  );
  return (
    <Card
      background="dark"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <StyledCardImage
        gold
        width="100%"
        height="175px"
        src={campaign.imageUrl}
      />

      <CardSection style={{ flex: 1 }}>
        <div className="flex flex-col my-2">
          <StyledText size="sm" weight="medium">
            {campaign.gameSystem}
          </StyledText>
        </div>

        <div className="my-2">
          <StyledText size="sm" weight="medium">
            {acceptedMember} out of {campaign.maxSeats} Players
          </StyledText>
        </div>
        <div className="my-2">
          <StyledText size="sm" weight="medium">
            Pending requests {pendingMember}
          </StyledText>
        </div>
        <Link href={`/campaign/${campaign.id}`}>
          <a style={{ cursor: "pointer" }}>
            <Header className="font-oldFenris" size="xl">
              {campaign.title}
            </Header>
          </a>
        </Link>
        <div className="my-2">
          <StyledText size="sm">
            {format(new Date(campaign.startDate), "EEE',' MMM dd 'at' h bbb")}
          </StyledText>
        </div>

        <div className="flex flex-wrap">
          {!hideTags &&
            campaign.tags?.length > 0 &&
            campaign.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
        </div>
      </CardSection>
    </Card>
  );
};
