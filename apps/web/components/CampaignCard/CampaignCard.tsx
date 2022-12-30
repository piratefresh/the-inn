import { format } from "date-fns";
import { Card, CardImage, CardSection, Header, Tag, Text } from "ui";
import Link from "next/link";
import { GetCampaignsQuery, MembershipRole } from "@generated/graphql";
import { styled } from "ui/src/theme";
import React from "react";

interface CampaignCardProps {
  campaign: GetCampaignsQuery["getCampaigns"][0];
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
      campaign.memberships.filter(
        (member) => member.role === MembershipRole.Pending
      ),
    [campaign.memberships]
  );
  const acceptedMember = React.useMemo(
    () =>
      campaign.memberships.filter(
        (member) => member.role === MembershipRole.Player
      ),
    [campaign.memberships]
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
            {acceptedMember.length} out of {campaign.maxSeats} Players
          </StyledText>
        </div>
        <div className="my-2">
          <StyledText size="sm" weight="medium">
            Pending requests {pendingMember.length}
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
