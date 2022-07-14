// import { client, ssrCache } from "@utils/createUrqlClient";
// import { GetListingsDocument, useGetListingsQuery } from "generated/graphql";
import { HeroImage } from "@components/HeroImage";
import { useEffect } from "react";
import { RootLayout } from "../layouts";
// import Link from "next/link";
// import { CampaignCard } from "@components/CampaignCard";
import type { NextPageWithLayout } from "./_app";

// export async function getStaticProps() {
//   const listings = await client
//     .query(GetListingsDocument, {
//       limit: 15,
//       cursor: null,
//     })
//     .toPromise();

//   // By returning { props: { posts } }, the Blog component
//   // will receive `posts` as a prop at build time

//   console.log("listings: ", listings);
//   return {
//     props: {
//       urqlState: ssrCache.extractData(),
//     },
//   };
// }

const Home: NextPageWithLayout = () => {
  // const [{ data }] = useGetListingsQuery({
  //   variables: {
  //     limit: 15,
  //     cursor: null,
  //   },
  // });
  useEffect(() => {
    const parser = new DOMParser();

    const htmlString =
      '<p><a class="immutableLink" href="https://playdev.setvi.com/shared/index.html?cid=kxeGlzgsYcD0n%2b8ZLLKRCQ%3d%3d" target="_blank">Presentation</a></p><p><a class="immutableLink" href="https://playdev.setvi.com/shared/index.html?cid=2GivJXyNQeygp1mm9lc1BQ%3d%3d" target="_blank">Resources</a></p><p><a class="immutableLink" href="https://playdev.setvi.com/shared/index.html?cid=yR9WA9qq5SzaspOjg1j%2bAQ%3d%3d" target="_blank">My Resources</a></p><p><a class="immutableLink" href="https://playdev.setvi.com/shared/index.html?cid=xu7i3O7MIfjOO8bd8Ft7GA%3d%3d" target="_blank">My Favorites</a></p><br><br><br>';
    const htmlEle = parser.parseFromString(htmlString, "text/html");

    htmlEle.querySelectorAll("a.immutableLink").forEach((e) => {
      console.log("e: ", e);
      const viewLink = e.getAttribute("data-preview");
      // If not removed the immutablelink will override this.
      e.classList.remove("immutableLink");
      e.setAttribute("rel", "noopener noreferrer");
      e.setAttribute("href", viewLink);
    });
  }, []);

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
          {/* {data.getListings.listings.map((p) =>
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
          )} */}
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
