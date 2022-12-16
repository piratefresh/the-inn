import { useGetCampaignsQuery } from "@generated/graphql";
import { HeroImage } from "ui";
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
      <div className="max-w-7xl mx-auto">
        <h1 className="font-oldFenris text-6xl text-white my-14">
          Recruit, or join <span className="text-yellow-400">epic</span>{" "}
          adventures
        </h1>
        <div className="my-14 relative">
          <div
            className="absolute bottom-0 h-4/5 rounded-full"
            style={{
              width: "100%",
              filter: "blur(150px)",
              backgroundColor: "#66180E",
            }}
          />

          <HeroImage
            height={500}
            width={1280}
            src="https://res.cloudinary.com/film-it/image/upload/v1648264459/The%20inn/david-edwards-artwork-final-013.jpg"
          />
        </div>
      </div>

      <div className="relative">
        <div className="relative py-20 max-w-7xl mx-auto">
          <h2 className="font-oldFenris text-white text-4xl mb-12">
            Upcoming Games
          </h2>

          <div className="grid grid-cols-4 gap-8">
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
