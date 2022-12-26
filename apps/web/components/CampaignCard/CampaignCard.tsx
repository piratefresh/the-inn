import { format } from "date-fns";
import { Card, CardImage, CardSection, Header, Tag, Text } from "ui";
import Link from "next/link";
import { GetCampaignsQuery } from "@generated/graphql";
import { styled } from "ui/src/theme";

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
            {campaign.memberships.length} out of {campaign.maxSeats} Players
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
