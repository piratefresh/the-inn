import { Preview } from "@components/Campaings/CreateCampaigns/Preview";
import { CampaignLayout } from "@layouts/index";
import { useIsAuth } from "@utils/useIsAuth";
import { unstable_getServerSession } from "next-auth";
import { GetServerSidePropsContext } from "next";
import { nextAuthOptions } from "pages/api/auth/[...nextauth]";
import { useRouter } from "next/router";
import { useGetCampaignQuery } from "@generated/graphql";
import { Loader } from "@components/Loader";
import Uploady from "@rpldy/uploady";

const CreatePreviewCampaign = () => {
  useIsAuth();

  const router = useRouter();
  const { id } = router.query;
  const [{ data: campaign, fetching }] = useGetCampaignQuery({
    variables: {
      id: id as string,
    },
  });

  if (fetching) return <Loader />;

  return <Preview campaign={campaign.getCampaign} />;
};

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

CreatePreviewCampaign.layoutProps = {
  meta: {
    title: "Create Campaign Preview",
  },
  Layout: CampaignLayout,
};

export default CreatePreviewCampaign;
