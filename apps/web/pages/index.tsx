import { HeroImage } from "@components/HeroImage";

import { RootLayout } from "../layouts";

import type { NextPageWithLayout } from "./_app";

const Home: NextPageWithLayout = () => {
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
        <div className="grid grid-cols-4 gap-4"></div>
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
