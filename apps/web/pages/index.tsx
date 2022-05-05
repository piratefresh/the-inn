import { client, ssrCache } from "@utils/createUrqlClient";
import type { NextPage } from "next";
import { GetListingsDocument, useGetListingsQuery } from "generated/graphql";
import { HeroImage } from "@components/HeroImage";
import { Layout } from "../layouts";
import Link from "next/link";
import { CampaignCard } from "@components/CampaignCard";

export async function getStaticProps() {
  const listings = await client
    .query(GetListingsDocument, {
      limit: 15,
      cursor: null,
    })
    .toPromise();

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time

  console.log("listings: ", listings);
  return {
    props: {
      urqlState: ssrCache.extractData(),
    },
  };
}

const Home: NextPage = () => {
  const [{ data }] = useGetListingsQuery({
    variables: {
      limit: 15,
      cursor: null,
    },
  });

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
          {data.getListings.listings.map((p) =>
            !p ? null : (
              <Link
                href="/listing/[id]"
                as={`/listing/${p.id}`}
                key={p.id}
                passHref
              >
                <CampaignCard
                  name={p.title}
                  date={"Tuesday, Thursday"}
                  time="16:00"
                  maxPlayers={4}
                  joinedPlayers={3}
                  image={p.imageUrl}
                  gameSystem="Pathfinder 2E"
                  tags={["Campaign", "Foundry VTT", "Discord"]}
                />
              </Link>
            )
          )}
        </div>
      </div>
    </>
  );
};

Home.layoutProps = {
  meta: {
    title: "Create Campaign",
  },
  Layout,
};

export default Home;
