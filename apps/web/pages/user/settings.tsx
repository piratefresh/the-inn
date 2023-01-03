import React from "react";
import {
  GetUserDocument,
  GetUserQuery,
  GetUserQueryVariables,
  useGetUserQuery,
} from "@generated/graphql";
import { UserPageLayout } from "@layouts/UserPageLayout";
import { useSession } from "next-auth/react";
import { styled, Tabs, TabsContent, TabsList, TabsTrigger } from "ui";
import { GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth";
import { nextAuthOptions } from "pages/api/auth/[...nextauth]";
import { BasicSettings } from "@components/Settings/BasicSettings";
import { ProfileSettings } from "@components/Settings/ProfileSettings";
import { HeaderSettings } from "@components/Settings/HeaderSettings";
import { initUrqlClient } from "@utils/initUrqlClient";
import { PasswordSettings } from "@components/Settings/PasswordSettings";

export const Section = styled("section", {
  padding: "$8",
  margin: "$16 0px",
  backgroundColor: "hsl(0, 0%, 9%)",
  border: "1px solid $yellowBrand",
  borderRadius: "$md",
});

const StyledTabsTrigger = styled(TabsTrigger, {
  borderRadius: "$md",
  borderRadiusBottomLeft: 0,
  borderBottomRightRadius: 0,
  '&[data-state="active"]': {
    color: "$yellowBrand",
    boxShadow: "inset 0 -1px 0 0 currentColor, 0 1px 0 0 currentColor",
    backgroundColor: "$lightBlackBrand",
  },
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

  const { urqlClient, ssrCache } = initUrqlClient(
    process.env.NEXT_PUBLIC_API_URL as string
  );

  urqlClient.query<GetUserQuery, GetUserQueryVariables>(GetUserDocument, {
    id: session?.user.id,
  });

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }
  return {
    props: { urqlState: ssrCache.extractData(), session },
  };
}

const SettingsPage = () => {
  const { data: session, status } = useSession();

  const [{ data, fetching }] = useGetUserQuery({
    variables: {
      id: session?.id,
    },
  });

  const user: GetUserQuery["getUser"] = React.useMemo(() => {
    return {
      ...data?.getUser,
    };
  }, [data]);

  if (!user || fetching) return <div>Loading...</div>;

  return (
    <Tabs defaultValue="basic" className="text-white">
      <div
        className="max-w-7xl mx-auto my-16 grid"
        style={{ gridTemplateColumns: "auto", gridAutoRows: "max-content" }}
      >
        <HeaderSettings session={session} user={user} />

        <TabsList className="flex mt-8 border-b border-brandYellow">
          <StyledTabsTrigger
            className="flex flex-row items-center justify-center px-8 h-16 border border-brandYellow hover:text-brandYellow hover:bg-brandLightBlack data-[state=active]:text-brandYellow"
            value="basic"
          >
            Basic Settings
          </StyledTabsTrigger>
          <StyledTabsTrigger
            className="flex flex-row items-center justify-center px-8 h-16 border border-brandYellow hover:text-brandYellow hover:bg-brandLightBlack data-[size=active]:text-brandYellow"
            value="profile"
          >
            Profile
          </StyledTabsTrigger>
          <StyledTabsTrigger
            className="flex flex-row items-center justify-center px-8 h-16 border border-brandYellow hover:text-brandYellow hover:bg-brandLightBlack data-[size=active]:text-brandYellow"
            value="password"
          >
            Password
          </StyledTabsTrigger>
        </TabsList>

        <TabsContent value="basic">
          <BasicSettings session={session} user={user} />
        </TabsContent>
        <TabsContent value="profile">
          <ProfileSettings session={session} user={user} />
        </TabsContent>
        <TabsContent value="password">
          <PasswordSettings session={session} user={user} />
        </TabsContent>
      </div>
    </Tabs>
  );
};

SettingsPage.layoutProps = {
  meta: {
    title: "User Profile",
  },
  Layout: UserPageLayout,
};

export default SettingsPage;
