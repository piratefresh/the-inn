import { Preview } from "@components/Campaings/CreateCampaigns/Preview";
import { CampaignLayout } from "@layouts/CampaignLayout";
import { useIsAuth } from "@utils/useIsAuth";
import { unstable_getServerSession } from "next-auth";
import { GetServerSidePropsContext } from "next";
import { nextAuthOptions } from "pages/api/auth/[...nextauth]";

const CreatePreviewCampaign = () => {
  useIsAuth();
  return (
    <div className="relative mx-auto w-full py-10 px-4 lg:px100">
      <Preview />;
    </div>
  );
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
