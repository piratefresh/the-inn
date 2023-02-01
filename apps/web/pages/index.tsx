import {
  useGetCampaignsQuery,
  GetCampaignsDocument,
  GetCampaignsQuery,
  GetCampaignsQueryVariables,
} from "@generated/graphql";
import { HeroImage, Text } from "ui";
import { usePresence } from "@ably-labs/react-hooks";
import { CampaignCard } from "@components/CampaignCard";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "@utils/createUrqlClient";
import React from "react";
import { UserPageLayout } from "@layouts/index";
import { Loader } from "@components/Loader";
import { GetStaticPropsContext } from "next";
import { initUrqlClient } from "@utils/initUrqlClient";

export async function getStaticProps() {
  const { urqlClient, ssrCache } = initUrqlClient(
    process.env.NEXT_PUBLIC_API_URL as string
  );

  const campaigns = await urqlClient
    .query<GetCampaignsQuery, GetCampaignsQueryVariables>(
      GetCampaignsDocument,
      {}
    )
    .toPromise();

  return {
    props: {
      urqlState: ssrCache.extractData(),
    },
    revalidate: 10, // In seconds
  };
}

const Home = () => {
  const [{ data: campaigns, fetching, error }] = useGetCampaignsQuery();

  if (fetching) return <Loader />;

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
          <div
            className="block w-full relative"
            style={{ height: "700px", width: "100%" }}
          >
            <HeroImage
              fill
              src="https://res.cloudinary.com/film-it/image/upload/v1671827083/the-inn/dnd2up.png"
              alt="Hero Home Page Image"
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

export default Home;
