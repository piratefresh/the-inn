import { useGetCampaignsQuery } from "@generated/graphql";
import { HeroImage, Text } from "ui";
// import {
//   useChannel,
//   useEvent,
//   usePresenceChannel,
//   useTrigger,
//   useClientTrigger,
// } from "@harelpls/use-pusher";
import { configureAbly, useChannel, usePresence } from "@ably-labs/react-hooks";
import { RootLayout } from "../layouts";
import type { NextPageWithLayout } from "./_app";
import { CampaignCard } from "@components/CampaignCard";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "@utils/createUrqlClient";
import React from "react";
import { Types } from "ably";
import { Geocoder } from "@components/ui/Geocoder";

const Home: NextPageWithLayout = () => {
  const [{ data: campaigns, fetching, error }] = useGetCampaignsQuery();

  // const channel = useChannel("my-channel");
  // useEvent(channel, "my-event", (data) => console.log(data));

  // const {
  //   channel: presenceChannel,
  //   members,
  //   ...rest
  // } = usePresenceChannel("presence-awesome");

  const [messages, updateMessages] = React.useState<Types.Message[]>([]);
  const [channel, ably] = useChannel("getting-started", (message) => {
    updateMessages((prev) => [...prev, message]);
  });
  const [presenceData, updateStatus] = usePresence("getting-started");

  // console.log(presenceChannel, rest);
  // console.log("members: ", members);

  const peers = presenceData.map((msg, index) => (
    <li key={index}>
      {msg.clientId}: {msg.data}
    </li>
  ));

  console.log("presenceData: ", presenceData);

  return (
    <>
      <div className="bg-main">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-oldFenris text-6xl text-white my-14">
            Recruit, or join <span className="text-yellow-400">epic</span>{" "}
            adventures
          </h1>
          <div className="my-14 relative">
            <HeroImage
              height={500}
              width={1280}
              src="https://res.cloudinary.com/film-it/image/upload/v1648264459/The%20inn/david-edwards-artwork-final-013.jpg"
            />
          </div>
        </div>
      </div>
      <div className="relative">
        <div className="bg-gamesBg bg-games absolute inset-0 bottom-10 bg-bottom bg-no-repeat goldenBorder2 border-l-0 border-r-0" />
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
    title: "Create Campaign",
  },
  Layout: RootLayout,
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Home);
