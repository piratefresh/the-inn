import { format } from "date-fns";
import { Card, Header, Tag, Text } from "ui";
import Link from "next/link";
import { GetCampaignsQuery } from "@generated/graphql";
import { styled } from "ui/src/theme";

interface CampaignCardProps {
  campaign: GetCampaignsQuery["getCampaigns"][0];
}

const StyledText = styled(Text, {
  margin: "0 0px",
  lineHeight: "$lineHeights$tall",
  color: "#666",
  whiteSpace: "nowrap",
});

const StyledCardImage = styled(Card.Image, {
  maxHeight: "180px",
  minHeight: "180px",
});

export const CampaignCard = ({ campaign }: CampaignCardProps) => {
  return (
    <Card
      gold
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

      <Card.Section style={{ flex: 1 }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <StyledText size="sm" weight="medium">
            {campaign.gameSystem}
          </StyledText>
          {/* <StyledText size="sm" weight="medium">
                      {campaign.members.length} out of {campaign.partySize}{" "}
                      Players
                    </StyledText> */}
        </div>
        <Link href={`/campaign/${campaign.id}`}>
          <a style={{ cursor: "pointer" }}>
            <Header className="font-oldFenris" color="hiContrast" size="xl">
              {campaign.title}
            </Header>
          </a>
        </Link>
        <StyledText size="sm">
          {format(new Date(campaign.startDate), "EEE',' MMM dd 'at' h bbb")}
        </StyledText>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {campaign.tags?.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </Card.Section>
    </Card>
  );
};
