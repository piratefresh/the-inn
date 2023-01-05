import { General } from "@components/Campaings/CreateCampaigns/General";
import Uploady from "@rpldy/uploady";
import { css } from "@stitches/react";
import { useIsAuth } from "@utils/useIsAuth";
import { GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth";
import { nextAuthOptions } from "pages/api/auth/[...nextauth]";

const root = css({
  background:
    "linear-gradient(179.62deg, #0E0A00 -79.35%, #25120E -3.81%, #25120E 25.17%, #0D0A00 68.63%)",
});

export async function getServerSideProps({
  req,
  res,
}: GetServerSidePropsContext) {
  const session = await unstable_getServerSession(
    req,
    res,
    nextAuthOptions(req, res)
  );
  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}

const CreateGeneralCampaign = () => {
  useIsAuth();
  return (
    // @ts-ignore
    <Uploady
      destination={{
        url: `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
        params: {
          upload_preset: "the_inn_campaign",
          folder: "The inn/campaignmedia",
        },
      }}
      clearPendingOnAdd
      multiple={false}
      autoUpload={false}
      noPortal
    >
      <div
        className={`relative mx-auto w-full lg:max-w-7xl py-10 px-4 lg:px100`}
      >
        <General />
      </div>
    </Uploady>
  );
};

export default CreateGeneralCampaign;
