import { General } from "@components/Campaings/CreateCampaigns/General";
import { Loader } from "@components/Loader";
import { useGetCampaignQuery } from "@generated/graphql";
import Uploady from "@rpldy/uploady";
import { css } from "@stitches/react";
import { useIsAuth } from "@utils/useIsAuth";
import { GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth";
import { useRouter } from "next/router";
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

  const router = useRouter();
  const { id } = router.query;
  const [{ data: campaign, fetching }] = useGetCampaignQuery({
    variables: {
      id: id as string,
    },
  });

  if (fetching) return <Loader />;

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
      <div className={` px-100 py-10`}>
        <General campaign={campaign.getCampaign} />
      </div>
    </Uploady>
  );
};

export default CreateGeneralCampaign;
