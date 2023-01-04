import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Card } from "./Card";
import { Header, Text } from "../Typography";
import { styled } from "../theme";
import { Tag } from "../Tag";
import { CardImage, CardProps, CardSection } from "./Card";

const campaigns = [
  {
    name: "Living World Campaign: The Monster Slayer's Guild",
    gameSystem: "Dungeon & Dragons 5e",
    partySize: 6,
    members: [
      { name: "John Doe" },
      { name: "John Doe" },
      { name: "John Doe" },
      { name: "John Doe" },
    ],
    startDate: "Tuesday, January 11 at 16:00",
    tags: ["Action", "Comedy", "VVT"],
    imageURL:
      "https://cdnb.artstation.com/p/assets/images/images/053/245/783/4k/envar-studio-06fr012-wizenedsmith-1.jpg?1661780033",
  },
  {
    name: "Ornn's Forge",
    gameSystem: "Pathfinder 2E",
    partySize: 6,
    members: [{ name: "John Doe" }, { name: "John Doe" }, { name: "John Doe" }],
    startDate: "Tuesday, January 11 at 16:00",
    tags: ["Action", "Comedy", "VVT"],
    imageURL:
      "https://cdnb.artstation.com/p/assets/images/images/053/287/239/4k/envar-studio-ornnsforge-final.jpg?1661868325",
  },
  {
    name: "SPELLJAMMER One-Shot: Catching the Astral Tide (Spelljammer race",
    gameSystem: "Star Wars Fantasy Gaming",
    partySize: 4,
    members: [{ name: "John Doe" }, { name: "John Doe" }, { name: "John Doe" }],
    startDate: "Tuesday, January 11 at 16:00",
    tags: ["One shot", "Dungeons & Dragons 5e", "Zoom"],
    imageURL:
      "https://startplaying.games/_next/image?url=https%3A%2F%2Fspg-images.s3.us-west-1.amazonaws.com%2F0f9f6aa5-a6dd-42d4-8b61-ae14d8ec9e4a&w=3840&q=75",
  },
  {
    name: "The Alchemist - Dungeon Exploration - One Shot",
    gameSystem: "Dungeons & Dragons 5e",
    partySize: 4,
    members: [{ name: "John Doe" }, { name: "John Doe" }, { name: "John Doe" }],
    startDate: "Tuesday, January 11 at 16:00",
    tags: ["One shot", "Dungeons & Dragons 5e", "Zoom", "Fantasy Grounds"],
    imageURL:
      "https://startplaying.games/_next/image?url=https%3A%2F%2Fspg-images.s3.us-west-1.amazonaws.com%2Fceb14f21-5d4f-4518-81fb-3ce5d00dce86&w=3840&q=75",
  },
  {
    name: "Secrets of Saltmarsh",
    gameSystem: "Dungeon & Dragons 5e",
    partySize: 6,
    members: [
      { name: "John Doe" },
      { name: "John Doe" },
      { name: "John Doe" },
      { name: "John Doe" },
    ],
    startDate: "Tuesday, January 11 at 16:00",
    tags: ["Action", "Comedy", "VVT"],
    imageURL:
      "https://cdnb.artstation.com/p/assets/images/images/053/351/543/large/sun-gy-1.jpg?1662000171",
  },
  {
    name: "The Pub Quiz Dungeon: Dante's Tomb of Dastardly Trivia and Terrible Death",
    gameSystem: "Pathfinder 2E",
    partySize: 6,
    members: [{ name: "John Doe" }, { name: "John Doe" }, { name: "John Doe" }],
    startDate: "Tuesday, January 11 at 16:00",
    tags: ["Action", "Comedy", "VVT"],
    imageURL:
      "https://cdna.artstation.com/p/assets/images/images/053/279/648/large/liang-mark-final-render2.jpg?1661855705",
  },
  {
    name: "The Gems of Kalathos-Begining DnD Campaign",
    gameSystem: "Star Wars Fantasy Gaming",
    partySize: 4,
    members: [{ name: "John Doe" }, { name: "John Doe" }, { name: "John Doe" }],
    startDate: "Tuesday, January 11 at 16:00",
    tags: ["One shot", "Dungeons & Dragons 5e", "Zoom"],
    imageURL:
      "https://cdnb.artstation.com/p/assets/images/images/053/338/243/4k/dmitry-prozorov-death-knights-4k.jpg?1661969561",
  },
  {
    name: "Baldur's Gate: Descent into Avernus - Level 5",
    gameSystem: "Dungeons & Dragons 5e",
    partySize: 4,
    members: [{ name: "John Doe" }, { name: "John Doe" }, { name: "John Doe" }],
    startDate: "Tuesday, January 11 at 16:00",
    tags: ["One shot", "Dungeons & Dragons 5e", "Zoom", "Fantasy Grounds"],
    imageURL:
      "https://startplaying.games/_next/image?url=https%3A%2F%2Fspg-images.s3.us-west-1.amazonaws.com%2F0374aea3-8b52-4265-962f-b00d5cb5d581&w=3840&q=75",
  },
];

const StyledText = styled(Text, {
  margin: "0 0px",
  lineHeight: "$lineHeights$tall",
  color: "#666",
  whiteSpace: "nowrap",
});

const meta: Meta<typeof Card> = {
  title: "MGUI/Card",
  component: Card,
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Primary: Story = {
  args: {
    background: "dark",
    gold: true,
  },
  render: (args) => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "1rem",
      }}
    >
      {campaigns.map((campaign) => (
        <div style={{ maxWidth: "275px" }} key={campaign.name}>
          <Card
            {...args}
            style={{ display: "flex", flexDirection: "column", height: "100%" }}
          >
            <CardImage
              gold={args.gold}
              width="100%"
              height="175px"
              src={campaign.imageURL}
            />

            <CardSection style={{ flex: 1 }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <StyledText size="sm" weight="medium">
                  {campaign.gameSystem}
                </StyledText>
                <StyledText size="sm" weight="medium">
                  {campaign.members.length} out of {campaign.partySize} Players
                </StyledText>
              </div>
              <Header size="xl">{campaign.name}</Header>
              <StyledText size="sm">{campaign.startDate}</StyledText>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                }}
              >
                {campaign.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </CardSection>
          </Card>
        </div>
      ))}
    </div>
  ),
};

export const SingleCard: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "1rem",
      }}
    >
      {[campaigns[0]].map((campaign) => (
        <div style={{ maxWidth: "275px" }} key={campaign.name}>
          <Card
            style={{ display: "flex", flexDirection: "column", height: "100%" }}
          >
            <CardImage
              gold
              width="100%"
              height="175px"
              src={campaign.imageURL}
            />

            <CardSection style={{ flex: 1 }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <StyledText size="sm" weight="medium">
                  {campaign.gameSystem}
                </StyledText>
                <StyledText size="sm" weight="medium">
                  {campaign.members.length} out of {campaign.partySize} Players
                </StyledText>
              </div>
              <Header size="xl">{campaign.name}</Header>
              <StyledText size="sm">{campaign.startDate}</StyledText>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                }}
              >
                {campaign.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </CardSection>
          </Card>
        </div>
      ))}
    </div>
  ),
};
