import { useGetCampaignsQuery } from "@generated/graphql";
import { HeroImage, Text } from "ui";
import { configureAbly, useChannel, usePresence } from "@ably-labs/react-hooks";

import { CampaignCard } from "@components/CampaignCard";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "@utils/createUrqlClient";
import React from "react";
import { Types } from "ably";
import { NextPageWithLayout } from "Types/LayoutPage";
import { UserPageLayout } from "@layouts/UserPageLayout";

const Home: NextPageWithLayout = () => {
  const [{ data: campaigns, fetching, error }] = useGetCampaignsQuery();

  const [messages, updateMessages] = React.useState<Types.Message[]>([]);
  const [channel, ably] = useChannel("getting-started", (message) => {
    updateMessages((prev) => [...prev, message]);
  });
  const [presenceData, updateStatus] = usePresence("getting-started");

  const peers = presenceData.map((msg, index) => (
    <li key={index}>
      {msg.clientId}: {msg.data}
    </li>
  ));

  return (
    <>
      <div className="mx-auto">
        <div className="relative">
          <div
            className="absolute bottom-0 h-full w-full z-10"
            style={{
              background:
                "linear-gradient(180deg, rgba(217, 217, 217, 0) 0%, rgba(91, 105, 107, 0.28) 33.85%, #0D0A00 100%)",
            }}
          />
          <div className="absolute flex h-full w-full justify-center items-end pb-8 z-20">
            <div className="flex flex-col text-center">
              <Text
                as="h1"
                className="font-oldFenris"
                style={{ fontSize: "96px" }}
              >
                The Inn
              </Text>
              <Text
                as="h2"
                size="6xl"
                weight="bold"
                className="font-alegreyaSans my-4"
              >
                Recruit, or join <span className="text-yellow-400">epic</span>{" "}
                adventures
              </Text>
            </div>
          </div>
          <div className="block w-full" style={{ height: "700px" }}>
            <HeroImage
              objectFit="cover"
              layout="fill"
              gold
              className="aspect-w-16 aspect-h-9 w-full"
              src="https://res.cloudinary.com/film-it/image/upload/v1671827083/the-inn/dnd2up.png"
            />
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="relative py-20 mx-auto lg:max-w-7xl">
          <h2 className="font-oldFenris text-white text-4xl mb-12">
            Trending Tags
          </h2>
          <h2 className="font-oldFenris text-white text-4xl mb-12">
            Upcoming Games
          </h2>

          <div className="grid justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {campaigns?.getCampaigns.map((campaign) => (
              <div style={{ maxWidth: "275px" }} key={campaign.title}>
                <CampaignCard campaign={campaign} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

Home.layoutProps = {
  meta: {
    title: "Index",
  },
  Layout: UserPageLayout,
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Home);
