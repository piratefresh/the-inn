import { HeroImage } from "@components/HeroImage";
import { useGetCampaignsQuery } from "@generated/graphql";
import { Card, Header, Tag, Text } from "ui";
import { styled } from "ui/src/theme";
import { format, parse } from "date-fns";
import { RootLayout } from "../layouts";

import type { NextPageWithLayout } from "./_app";

const StyledText = styled(Text, {
  margin: "0 0px",
  lineHeight: "$lineHeights$tall",
  color: "#666",
  whiteSpace: "nowrap",
});

const Home: NextPageWithLayout = () => {
  const [{ data: campaigns, fetching, error }] = useGetCampaignsQuery();
  return (
    <>
      <div className="bg-main px-100 pt-10 pb-20">
        <h1 className="font-oldFenris text-6xl text-white mb-12">
          Recruit, or join <span className="text-yellow-400">epic</span>{" "}
          adventures
        </h1>
        <HeroImage image="https://res.cloudinary.com/film-it/image/upload/v1648264459/The%20inn/david-edwards-artwork-final-013.jpg" />
      </div>
      <div className="bg-games px-100 py-20">
        <h2 className="font-oldFenris text-white text-4xl mb-12">
          Upcoming Games
        </h2>
        <div className="grid grid-cols-4 gap-4">
          {campaigns?.getCampaigns.map((campaign) => (
            <div style={{ maxWidth: "275px" }} key={campaign.title}>
              <Card
                gold
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <Card.Image
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
                  <Header color="hiContrast" size="xl">
                    {campaign.title}
                  </Header>
                  <StyledText size="sm">
                    {format(
                      new Date(campaign.startDate),
                      "EEE',' MMM dd 'at' h bbb"
                    )}
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
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

Home.layoutProps = {
  meta: {
    title: "Create Campaign",
  },
  Layout: RootLayout,
};

export default Home;
