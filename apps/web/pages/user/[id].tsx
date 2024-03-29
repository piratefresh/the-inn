import { CampaignCard } from "@components/CampaignCard";
import { ReadOnly } from "@components/RichTextEditor/ReadOnly";
import {
  MembershipRole,
  useGetCampaignsQuery,
  useGetUserQuery,
} from "@generated/graphql";
import { UserPageLayout } from "@layouts/index";
import Image from "next/image";
import { useRouter } from "next/router";
import { Loader } from "@components/Loader";
import { Button, Note, styled, Text } from "ui";
import Link from "next/link";
import { useSession } from "next-auth/react";

const StyledMiddleContainer = styled("div", {
  background:
    "linear-gradient(180deg, rgba(102, 24, 14, 0) 0%, rgba(102, 24, 14, 0.59) 27.6%, rgba(102, 24, 14, 0.919691) 83.85%, rgba(39, 52, 53, 0) 100%)",
});

const StyledPreviousGameContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  margin: "0 auto",
  maxHeight: "100%",
  width: "100%",
  background:
    "linear-gradient(180deg, rgba(39, 52, 53, 0) 0%, rgba(39, 52, 53, 0.506667) 40.9%, #273435 70.88%)",
});

const StyledFlame1 = styled("div", {
  backgroundImage: 'url("/images/fire1.png")',
  backgroundRepeat: "repeat",
  mixBlendMode: "screen",
  width: "100%",
  height: "600px",
});

const StyledFlame2 = styled(StyledFlame1, {
  backgroundImage: 'url("/images/fire2.png")',
});
const StyledUl = styled("ul", {
  listStyleType: "disc",
  margin: "$16 0px",
});

const StyledListItem = styled("li", {
  fontFamily: "trajan-sans-pro",
  marginTop: "$14",
  listStyleType: "none",
  "&::before": {
    fontFamily: "sans-serif",
    float: "left",
    content: "• ",
    fontSize: "4em",
    color: "$gold1",
    verticalAlign: "middle",
    lineHeight: "34px",
  },
});

const StyledUserImage = styled(Image, {
  position: "relative",
  borderRadius: "$radii$md",
  border: "3px solid transparent !important",
  backgroundOrigin: "border-box",
  backgroundClip: "padding-box, border-box",
  backgroundImage:
    "linear-gradient($whiteBrand, $whiteBrand),linear-gradient($yellowBrand, $orangeBrand)",
  overflow: "hidden",
});

const UserPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = router.query;

  const [{ data, error, fetching }] = useGetUserQuery({
    variables: {
      id: id as string,
    },
  });

  const [
    { data: campaigns, fetching: fetchingCampaigns, error: errorCampaigns },
  ] = useGetCampaignsQuery();

  const PreviousCampaigns = fetchingCampaigns ? (
    <div>Loading...</div>
  ) : (
    <div className="my-14 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {campaigns?.getCampaigns.slice(0, 4).map((campaign) => (
          <div style={{ maxWidth: "275px" }} key={campaign.title}>
            <CampaignCard campaign={campaign} />
          </div>
        ))}
      </div>
    </div>
  );

  if (fetching) return <Loader />;

  const hostedGames = data.getUser.memberships.filter(
    (member) => member.role === MembershipRole.Gm
  );
  const joinedGames = data.getUser.memberships.filter(
    (member) => member.role === MembershipRole.Player
  );

  console.log("session: ", session);

  return (
    <>
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-2 gap-8 my-24">
          <div>
            <Text className="font-oldFenris" size="6xl" color="gold">
              {data.getUser.firstName} {data.getUser.lastName}
            </Text>
            <div className="my-8">
              <Text className="font-alegreyaSans my-8" size="lg" color="gold">
                Good guy | 0 reviews
              </Text>
              {data.getUser.id !== session.id && (
                <Button>
                  <Link href={`/user/messages/thread?id=${data.getUser.id}`}>
                    Message
                  </Link>
                </Button>
              )}

              <Text color="loContrast" size="lg">
                <ReadOnly textString={data.getUser.htmlAboutMe} />
              </Text>
            </div>
          </div>
          {data.getUser.imageUrl && (
            <div className="flex justify-center items-center">
              <StyledUserImage
                src={data.getUser.imageUrl}
                width={400}
                height={400}
                objectFit="cover"
                alt="user image"
              />
            </div>
          )}
        </div>
        {data.getUser.htmlGmStyle && (
          <>
            <Text size="4xl" color="loContrast">
              Game Master Style
            </Text>
            <Text color="loContrast" size="lg">
              <ReadOnly textString={data.getUser.htmlGmStyle} />
            </Text>
          </>
        )}
      </div>
      <StyledMiddleContainer>
        <StyledFlame1 />
        <div className="flex flex-col mx-auto">
          <div className="flex flex-col gap-16 mx-auto lg:justify-around lg:flex-row lg:items-center">
            <div className="flex flex-col gap-1">
              <Text size="7xl" color="loContrast" className="font-trejanSans">
                {hostedGames.length}
              </Text>
              <Text size="4xl" color="loContrast" className="font-trejanSans">
                Hosted Games
              </Text>
            </div>
            <div className="flex flex-col">
              <Text size="7xl" color="loContrast" className="font-trejanSans">
                0
              </Text>
              <Text size="4xl" color="loContrast" className="font-trejanSans">
                Completed
              </Text>
            </div>
            <div className="flex flex-col">
              <Text size="7xl" color="loContrast" className="font-trejanSans">
                {joinedGames.length}
              </Text>
              <Text size="4xl" color="loContrast" className="font-trejanSans">
                Joined
              </Text>
            </div>
          </div>
          {/* <div className="flex flex-row mt-12 mb-0 justify-around gap-4 overflow-x-auto">
            <Note>
              “George is a fantastic GM. He really knows the rules and helps
              beginners. He always makes sure everyone I comfortable and having
              fun. I love that he uses different voices for different NPCs.”
            </Note>
            <Note>
              “George is a fantastic GM. He really knows the rules and helps
              beginners. He always makes sure everyone I comfortable and having
              fun. I love that he uses different voices for different NPCs.”
            </Note>
          </div> */}
        </div>

        <StyledFlame2 />
      </StyledMiddleContainer>
      <StyledPreviousGameContainer>
        <div className="max-w-7xl mx-auto">
          <Text color="loContrast" font="oldFenris" size="4xl">
            Previous Games
          </Text>
          <div className="flex flex-col items-center justify-center">
            {PreviousCampaigns}
          </div>
        </div>
      </StyledPreviousGameContainer>
    </>
  );
};

UserPage.layoutProps = {
  meta: {
    title: "User Profile",
  },
  Layout: UserPageLayout,
};

export default UserPage;
