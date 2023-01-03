import { CampaignCard } from "@components/CampaignCard";
import { ReadOnly } from "@components/RichTextEditor/ReadOnly";
import { useGetCampaignsQuery, useGetUserQuery } from "@generated/graphql";
import { UserPageLayout } from "@layouts/UserPageLayout";
import Image from "next/image";
import { useRouter } from "next/router";
import { Note, styled, Text } from "ui";

const StyledMiddleContainer = styled("div", {
  background:
    "linear-gradient(180deg, rgba(102, 24, 14, 0) 0%, rgba(102, 24, 14, 0.59) 27.6%, rgba(102, 24, 14, 0.919691) 83.85%, rgba(39, 52, 53, 0) 100%)",
});

const StyledPreviousGameContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  margin: "0 auto",
  height: "700px",
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
      <div className="grid grid-cols-4 gap-8">
        {campaigns?.getCampaigns.slice(0, 4).map((campaign) => (
          <div style={{ maxWidth: "275px" }} key={campaign.title}>
            <CampaignCard campaign={campaign} />
          </div>
        ))}
      </div>
    </div>
  );

  if (fetching) return <div>...Loading</div>;

  return (
    <>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 gap-8 my-24">
          <div>
            <Text className="font-oldFenris" size="6xl" color="gold">
              {data.getUser.firstName} {data.getUser.lastName}
            </Text>
            <div className="my-8">
              <Text className="font-alegreyaSans my-8" size="lg" color="gold">
                Good guy | 100 reviews
              </Text>
              <Text color="loContrast" size="lg">
                <ReadOnly textString={data.getUser.htmlAboutMe} />
              </Text>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <StyledUserImage
              src={data.getUser.imageUrl}
              width={400}
              height={400}
              objectFit="cover"
            />
          </div>
        </div>

        {/* <StyledUl>
          <StyledListItem>
            <Text size="4xl" color="loContrast"></Text>
          </StyledListItem>
          <StyledListItem>
            <Text size="4xl" color="loContrast">
              Game Master
            </Text>
          </StyledListItem>
        </StyledUl> */}

        <Text size="4xl" color="loContrast">
          Game Master Style
        </Text>
        <Text color="loContrast" size="lg">
          <ReadOnly textString={data.getUser.htmlGmStyle} />
        </Text>
      </div>
      <StyledMiddleContainer>
        <StyledFlame1 />
        <div className="flex flex-col mx-auto">
          <div className="flex flex-row justify-around items-center">
            <div className="flex flex-col">
              <Text size="7xl" color="loContrast" className="font-trejanSans">
                60
              </Text>
              <Text size="4xl" color="loContrast" className="font-trejanSans">
                Hosted Games
              </Text>
            </div>
            <div className="flex flex-col">
              <Text size="7xl" color="loContrast" className="font-trejanSans">
                80%
              </Text>
              <Text size="4xl" color="loContrast" className="font-trejanSans">
                Completed
              </Text>
            </div>
            <div className="flex flex-col">
              <Text size="7xl" color="loContrast" className="font-trejanSans">
                10
              </Text>
              <Text size="4xl" color="loContrast" className="font-trejanSans">
                Joined
              </Text>
            </div>
          </div>
          <div className="flex flex-row mt-12 mb-0 justify-around gap-4 overflow-x-auto">
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
          </div>
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
