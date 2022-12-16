import { GetCampaignsQuery } from "@generated/graphql";
import Image from "next/image";
import Link from "next/link";
import { usePalette } from "react-palette";
import { Button, Card, HeroImage, styled, Text } from "ui";

const StyledCard = styled(Card, {
  position: "relative",
  backgroundColor: "rgba(24, 24, 24, 1)",
  padding: "$8",
  borderRadius: "$base",
  width: "350px",
});

const Header = styled("div", {
  position: "relative",
  display: "grid",
  gridTemplateColumns: "50px 1fr",
  gap: "$8",
  justifyContent: "center",
  alignItems: "center",
});

const ImageContainer = styled("div", {
  position: "relative",
});
const MemberCircle = styled("div", {
  position: "relative",
  borderRadius: "9999px",
  height: "30px",
  width: "30px",
  backgroundColor: "$yellowBrand",
  marginLeft: "-10px",
  zIndex: 1,
});
const MemberAvatar = styled("img", {
  position: "relative",
  borderRadius: "9999px",
  height: "30px",
  width: "30px",
  marginLeft: "-10px",
  zIndex: 1,
});

const fakeMember = new Array(5).fill(0);

interface CampaignCardSmallProps {
  campaign: GetCampaignsQuery["getCampaigns"][0];
}

export const CampaignCardSmall = ({ campaign }: CampaignCardSmallProps) => {
  const { data, loading, error } = usePalette(
    "https://res.cloudinary.com/film-it/image/upload/v1654054323/xwea8auorlrsf6zhuvet.jpg"
  );

  if (!campaign) return <div>...loading</div>;

  return (
    <StyledCard gold={false}>
      <Header>
        <ImageContainer style={{ backgroundColor: data.vibrant }}>
          <HeroImage
            src="https://res.cloudinary.com/film-it/image/upload/v1654054323/xwea8auorlrsf6zhuvet.jpg"
            layout="responsive"
            height="100%"
            width="100%"
            alt="Campaign Image"
          />
        </ImageContainer>
        <div>
          <Text size="lg" style={{ fontFamily: "oldFenris" }}>
            {campaign.title}
          </Text>
        </div>
      </Header>

      <div className="my-4">
        <Text className="whitespace-nowrap" size="sm">
          {campaign.days.map((day, index) => (
            <span>{(index ? ", " : "") + day}</span>
          ))}{" "}
          at{" "}
          {campaign.timePeriods.map((period, index2) => (
            <span>{(index2 ? ", " : "") + period}</span>
          ))}
        </Text>
      </div>

      <div className="flex flex-row items-center ml-2">
        {campaign.memberships.map((member) => {
          return member.user.imageUrl ? (
            <MemberAvatar src={member.user.imageUrl} />
          ) : (
            <MemberCircle />
          );
        })}
      </div>

      <div className="border-yellow-500 border-b my-4" />
      <div className="flex flex-row items-center justify-between gap-4 ml-2">
        <Button outlined="primary">
          <Link href={`/campaign/${campaign.id}`}>
            <a>
              <Text className="whitespace-nowrap">View</Text>
            </a>
          </Link>
        </Button>
        <Button outlined="primary">
          <Text as="a" className="whitespace-nowrap">
            Deactivate
          </Text>
        </Button>
        <Button outlined="primary">
          <Text as="a" className="whitespace-nowrap" color="red">
            Delete
          </Text>
        </Button>
      </div>
    </StyledCard>
  );
};
